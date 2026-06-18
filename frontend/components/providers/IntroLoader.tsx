"use client";

import { useEffect, useRef, useState } from "react";

// IMPORTANT — client-only render:
// By returning null until after first mount (hasMounted), the SSR HTML has no
// overlay.  Chrome measures LCP from the poster <img> in the accordion, which
// is in the SSR HTML and backed by a <link rel="preload"> — it paints the
// moment the image bytes arrive, typically < 800 ms on Fast 3G.
// The intro overlay only appears after JS hydration, which is fine: on real
// networks it happens within 150–300 ms so the flash is imperceptible.

type Phase = "loading" | "fading" | "done";

export default function IntroLoader() {
  const [hasMounted, setHasMounted] = useState(false);
  const [phase,      setPhase]      = useState<Phase>("loading");

  const fillRef    = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const rafRef     = useRef<number>(0);
  const timersRef  = useRef<ReturnType<typeof setTimeout>[]>([]);
  const alive      = useRef(true);

  useEffect(() => {
    alive.current = true;
    queueMicrotask(() => setHasMounted(true));

    // Skip for returning visitors or prefers-reduced-motion
    try {
      if (
        sessionStorage.getItem("introSeen") ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        try { sessionStorage.setItem("introSeen", "1"); } catch { /* private */ }
        document.documentElement.dataset.introComplete = "1";
        window.dispatchEvent(new Event("intro:done"));
        queueMicrotask(() => setPhase("done"));
        return;
      }
    } catch { /* private mode — treat as skip */ }

    try { sessionStorage.setItem("introSeen", "1"); } catch { /* private */ }

    document.body.style.overflow = "hidden";

    const FILL  = 700;
    const start = performance.now();

    const tick = (now: number) => {
      if (!alive.current) return;
      const p   = Math.min((now - start) / FILL, 1);
      const pct = Math.round(p * 100);

      if (fillRef.current)    fillRef.current.style.transform  = `scaleX(${p})`;
      if (counterRef.current) counterRef.current.textContent   = `${String(pct).padStart(3, " ")}%`;

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const addTimer = (fn: () => void, ms: number) => {
        const id = setTimeout(() => { if (alive.current) fn(); }, ms);
        timersRef.current.push(id);
      };

      addTimer(() => setPhase("fading"), 0);
      addTimer(() => {
        document.body.style.overflow = "";
        document.documentElement.dataset.introComplete = "1";
        window.dispatchEvent(new Event("intro:done"));
        setPhase("done");
      }, 500);
    };

    rafRef.current = requestAnimationFrame(tick);

    const failsafe = setTimeout(() => {
      if (!alive.current) return;
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
      document.documentElement.dataset.introComplete = "1";
      window.dispatchEvent(new Event("intro:done"));
      setPhase("done");
    }, 3000);
    timersRef.current.push(failsafe);

    return () => {
      alive.current = false;
      cancelAnimationFrame(rafRef.current);
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      document.body.style.overflow = "";
    };
  }, []);

  // Return null during SSR and the first synchronous client render.
  // The useEffect above sets hasMounted → true after that render, so the
  // overlay only enters the DOM after hydration.
  if (!hasMounted || phase === "done") return null;

  return (
    <div
      id="intro-overlay"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--background)",
        overflow: "hidden",
        opacity: phase === "fading" ? 0 : 1,
        transition: phase === "fading" ? "opacity 0.5s ease" : "none",
        willChange: "opacity",
        pointerEvents: phase === "fading" ? "none" : "auto",
      }}
    >
      {/* ── Foreground: NEPAL wordmark + progress ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(28px, 4vw, 48px)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            color: "var(--foreground)",
            letterSpacing: "0.18em",
            lineHeight: 1,
            animation: "intro-stamp 0.55s cubic-bezier(0.34,1.56,0.64,1) both",
            willChange: "transform, opacity",
          }}
        >
          NEPAL
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            width: "min(260px, 55vw)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 1,
              background: "rgba(212,168,67,0.15)",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <div
              ref={fillRef}
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, var(--gold), var(--gold-bright))",
                transform: "scaleX(0)",
                transformOrigin: "left center",
                willChange: "transform",
              }}
            />
          </div>

          <span
            ref={counterRef}
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.3em",
              color: "var(--muted)",
              fontVariantNumeric: "tabular-nums",
              userSelect: "none",
            }}
          >
            {"   0%"}
          </span>
        </div>
      </div>
    </div>
  );
}
