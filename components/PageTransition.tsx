"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const DURATION = 0.35; // per phase — 0.70 s total, under the 0.80 s budget
const FAILSAFE_MS = 1400;

type Phase = "idle" | "covering" | "uncovering";

export default function PageTransition() {
  const pathname      = usePathname();
  const reduceMotion  = useReducedMotion();
  const [phase, setPhase]     = useState<Phase>("idle");
  const phaseRef              = useRef<Phase>("idle");
  const [enabled, setEnabled] = useState(false);
  const prevPathRef           = useRef(pathname);
  const failsafeRef           = useRef<ReturnType<typeof setTimeout> | null>(null);

  function go(p: Phase) {
    phaseRef.current = p;
    setPhase(p);
  }

  // Mirror the exact intro-done handshake used by LenisProvider:
  // check the dataset flag synchronously, then fall back to the event,
  // then a hard failsafe — so the wipe never fires during the intro loader.
  useEffect(() => {
    const alreadyDone =
      typeof document !== "undefined" &&
      document.documentElement.dataset.introComplete === "1";
    if (alreadyDone) { setEnabled(true); return; }

    const handler = () => setEnabled(true);
    window.addEventListener("intro:done", handler, { once: true });
    const fallback = setTimeout(() => setEnabled(true), 3500);
    return () => {
      window.removeEventListener("intro:done", handler);
      clearTimeout(fallback);
    };
  }, []);

  // Detect real route changes.
  // usePathname() returns the path only — no hash — so same-page anchor clicks
  // (e.g. /#destinations) never change `pathname` and never trigger the wipe.
  useEffect(() => {
    if (!enabled) {
      // Keep prevPath in sync while disabled so first real nav is always clean.
      prevPathRef.current = pathname;
      return;
    }
    const prev = prevPathRef.current;
    prevPathRef.current = pathname; // always advance, even if we skip below
    if (pathname === prev) return;
    if (phaseRef.current !== "idle") return; // mid-wipe: let it finish

    go("covering");
    failsafeRef.current = setTimeout(() => go("idle"), FAILSAFE_MS);
  }, [pathname, enabled]);

  // Called by Motion when each animate target is reached.
  // "covering" completes → start "uncovering"
  // "uncovering" completes → back to idle, clear failsafe
  function onAnimationComplete() {
    if (phaseRef.current === "covering") {
      go("uncovering");
    } else if (phaseRef.current === "uncovering") {
      if (failsafeRef.current) {
        clearTimeout(failsafeRef.current);
        failsafeRef.current = null;
      }
      go("idle");
    }
  }

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <motion.div
          key="page-wipe"
          // Enters from below, covers, then exits upward — coherent with the
          // site's downward scroll direction and existing image-reveal lifts.
          initial={{ y: "100%" }}
          animate={{ y: phase === "covering" ? "0%" : "-101%" }}
          exit={{ y: "-101%" }}
          transition={{ duration: DURATION, ease: EASE_OUT }}
          onAnimationComplete={onAnimationComplete}
          aria-hidden="true"
          style={{
            position:      "fixed",
            inset:         0,
            zIndex:        9050, // below intro loader (9999), above all page content
            background:    "var(--gold)",
            pointerEvents: phase === "covering" ? "all" : "none",
            willChange:    "transform",
          }}
        />
      )}
    </AnimatePresence>
  );
}
