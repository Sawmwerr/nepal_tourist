"use client";

import { useEffect, useRef } from "react";
import { useActiveSection } from "./ScrollStoryContext";

const SECTIONS = [
  { id: "destinations", word: "Destinations" },
  { id: "mountains",    word: "Mountains"    },
  { id: "experiences",  word: "Experiences"  },
  { id: "plan",         word: "Plan"         },
  { id: "community",    word: "Community"    },
] as const;

export default function SectionWatermark() {
  const { activeSection, setActiveSection } = useActiveSection();

  // Detect reduced-motion preference once on mount
  const reducedMotion = useRef(false);
  useEffect(() => {
    reducedMotion.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // IntersectionObserver — track which sections are currently intersecting;
  // pick the topmost one. rootMargin shrinks the observation window to below
  // the navbar (-72px top) and only the upper 45% of the viewport (-55% bottom).
  useEffect(() => {
    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        const active = SECTIONS.find((s) => intersecting.has(s.id));
        setActiveSection(active?.id ?? "");
      },
      { rootMargin: "-72px 0px -55% 0px", threshold: 0 },
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 0 }}
    >
      {SECTIONS.map(({ id, word }) => {
        const isActive = activeSection === id;
        const noMotion = reducedMotion.current;
        return (
          <span
            key={id}
            style={{
              position: "absolute",
              bottom: "8%",
              right: "-3%",
              fontSize: "clamp(6rem, 18vw, 20rem)",
              lineHeight: 1,
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "#d4a843",
              opacity: isActive ? 0.038 : 0,
              transform: isActive ? "translateY(0)" : "translateY(28px)",
              transition: noMotion
                ? "none"
                : "opacity 0.65s ease, transform 0.65s ease",
              willChange: "opacity, transform",
              whiteSpace: "nowrap",
              userSelect: "none",
              letterSpacing: "-0.02em",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
