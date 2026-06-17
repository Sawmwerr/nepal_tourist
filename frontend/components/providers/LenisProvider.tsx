"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function LenisProvider() {
  const pathname  = usePathname();
  const lenisRef  = useRef<Lenis | null>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    // Respect prefers-reduced-motion — skip Lenis entirely, fall back to native scroll
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Intercept /#hash anchor clicks → hand off to lenis.scrollTo for smooth scroll.
    // If the target element is not on this page (e.g. navigating from /community to
    // /#mountains), getElementById returns null and we leave the browser to navigate.
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href.startsWith("/#")) return;
      const el = document.getElementById(href.slice(2));
      if (!el) return;
      e.preventDefault();
      lenisRef.current?.scrollTo(el, { offset: -80, duration: 1.0 });
    };
    document.addEventListener("click", handleAnchorClick);

    const startLenis = () => {
      if (lenisRef.current) return; // guard against double-start (event + failsafe)

      const lenis = new Lenis({
        lerp: 0.1,         // subtle — 10 % of remaining distance per frame at 60 fps
        smoothWheel: true,
        // syncTouch defaults to false → native touch feel on mobile
      });
      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      };
      rafRef.current = requestAnimationFrame(raf);
    };

    // Start immediately for returning visitors (intro already done) or wait for
    // the intro:done custom event dispatched by IntroLoader when animation finishes.
    // A 3.5 s failsafe ensures Lenis always starts even if the event misfires.
    const alreadyDone = document.documentElement.dataset.introComplete === "1";
    let failsafe: ReturnType<typeof setTimeout> | undefined;

    if (alreadyDone) {
      startLenis();
    } else {
      window.addEventListener("intro:done", startLenis, { once: true });
      failsafe = setTimeout(startLenis, 3500);
    }

    return () => {
      clearTimeout(failsafe);
      window.removeEventListener("intro:done", startLenis);
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafRef.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Route change → jump to top instantly so the new page starts at position 0.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
