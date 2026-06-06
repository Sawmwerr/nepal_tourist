"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "loading" | "fading" | "splitting" | "done";

export default function IntroLoader() {
  const [phase, setPhase] = useState<Phase>("loading");

  // Refs let the rAF loop write to DOM directly — no React re-renders at 60 fps.
  const fillRef    = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const rafRef     = useRef<number>(0);
  const timersRef  = useRef<ReturnType<typeof setTimeout>[]>([]);
  const alive      = useRef(true);

  useEffect(() => {
    alive.current = true;

    // ── Guard: skip for returning visitors or prefers-reduced-motion ──
    try {
      if (
        sessionStorage.getItem("introSeen") ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        try { sessionStorage.setItem("introSeen", "1"); } catch { /* private mode */ }
        document.documentElement.dataset.introComplete = "1";
        window.dispatchEvent(new Event("intro:done"));
        setPhase("done");
        return;
      }
    } catch { /* private mode — treat as skip */ }

    // Mark seen for the rest of this session
    try { sessionStorage.setItem("introSeen", "1"); } catch { /* private mode */ }

    // Lock body scroll while overlay is up
    document.body.style.overflow = "hidden";

    const DELAY = 200;   // ms before bar starts moving (logo stamps in during this gap)
    const FILL  = 1500;  // ms to fill 0 → 100 %
    const start = performance.now();

    const tick = (now: number) => {
      if (!alive.current) return;

      const elapsed = now - start - DELAY;
      const p       = elapsed < 0 ? 0 : Math.min(elapsed / FILL, 1);
      const pct     = Math.round(p * 100);

      // Direct DOM writes — keeps rAF off React's render queue
      if (fillRef.current)    fillRef.current.style.transform     = `scaleX(${p})`;
      if (counterRef.current) counterRef.current.textContent      = `${String(pct).padStart(3, " ")}%`;

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // p === 1 — schedule the two-step exit
      const addTimer = (fn: () => void, ms: number) => {
        const id = setTimeout(() => { if (alive.current) fn(); }, ms);
        timersRef.current.push(id);
      };

      addTimer(() => setPhase("fading"),    0);    // content fades out (0.18 s)
      addTimer(() => setPhase("splitting"), 200);  // panels split open  (0.22 s)
      addTimer(() => {
        document.body.style.overflow = "";
        document.documentElement.dataset.introComplete = "1";
        window.dispatchEvent(new Event("intro:done"));
        setPhase("done");
      }, 430);                                     // remove from DOM after split completes
    };

    rafRef.current = requestAnimationFrame(tick);

    // ── Failsafe: force-dismiss no matter what ──
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

  if (phase === "done") return null;

  const isFading    = phase === "fading"   || phase === "splitting";
  const isSplitting = phase === "splitting";

  return (
    <div
      id="intro-overlay"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* ── Top half panel ── */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "50%",
          background: "var(--background)",
          transform: isSplitting ? "translateY(-100%)" : "translateY(0)",
          transition: isSplitting ? "transform 0.22s cubic-bezier(0.4,0,1,1)" : "none",
          willChange: "transform",
        }}
      />

      {/* ── Bottom half panel ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "50%",
          background: "var(--background)",
          transform: isSplitting ? "translateY(100%)" : "translateY(0)",
          transition: isSplitting ? "transform 0.22s cubic-bezier(0.4,0,1,1)" : "none",
          willChange: "transform",
        }}
      />

      {/* ── Foreground: logo + progress ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(28px, 4vw, 48px)",
          opacity: isFading ? 0 : 1,
          transition: isFading ? "opacity 0.18s ease" : "none",
          willChange: "opacity",
        }}
      >
        {/* NEPAL wordmark */}
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

        {/* Progress track + counter */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            width: "min(260px, 55vw)",
          }}
        >
          {/* Track */}
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
            {/* Fill — updated directly via fillRef */}
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

          {/* Counter — updated directly via counterRef */}
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
            {"   0%"}{/* figure-space padding — overwritten by rAF on client */}
          </span>
        </div>
      </div>
    </div>
  );
}
