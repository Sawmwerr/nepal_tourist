"use client";

import { useEffect, useRef } from "react";
import { useActiveSection } from "@/components/providers/ScrollStoryContext";

const SECTIONS = [
  { id: "destinations", word: "Destinations" },
  { id: "mountains",    word: "Mountains"    },
  { id: "experiences",  word: "Experiences"  },
  { id: "plan",         word: "Plan"         },
  { id: "community",    word: "Community"    },
] as const;

// Simple pagoda/stupa silhouette — Newari 5-tiered pagoda shape
const PagodaMotif = ({ opacity }: { opacity: number }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 120 160"
    style={{
      position: "absolute",
      bottom: "6%",
      left: "3%",
      width: "clamp(80px, 12vw, 160px)",
      opacity,
      transition: "opacity 0.65s ease",
      fill: "#d4a843",
    }}
  >
    {/* Finial spire */}
    <rect x="56" y="0" width="8" height="22" rx="2" />
    <polygon points="60,22 44,36 76,36" />
    {/* Tier 5 (topmost) */}
    <rect x="44" y="36" width="32" height="6" rx="1" />
    <polygon points="60,42 34,54 86,54" />
    {/* Tier 4 */}
    <rect x="34" y="54" width="52" height="7" rx="1" />
    <polygon points="60,61 24,75 96,75" />
    {/* Tier 3 */}
    <rect x="24" y="75" width="72" height="8" rx="1" />
    <polygon points="60,83 14,99 106,99" />
    {/* Tier 2 */}
    <rect x="14" y="99" width="92" height="9" rx="1" />
    <polygon points="60,108 4,126 116,126" />
    {/* Tier 1 / base roof */}
    <rect x="4" y="126" width="112" height="10" rx="1" />
    {/* Plinth */}
    <rect x="28" y="136" width="64" height="8" rx="2" />
    <rect x="18" y="144" width="84" height="6" rx="2" />
    <rect x="8"  y="150" width="104" height="10" rx="2" />
  </svg>
);

export default function SectionWatermark() {
  const { activeSection, setActiveSection } = useActiveSection();

  const reducedMotion = useRef(false);
  useEffect(() => {
    reducedMotion.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

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

  const isActive = !!activeSection;
  const noMotion = reducedMotion.current;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 0 }}
    >
      {/* Pagoda silhouette — bottom-left, fades in when any section is active */}
      <PagodaMotif opacity={isActive && !noMotion ? 0.03 : 0} />

      {/* Section name watermark — bottom-right */}
      {SECTIONS.map(({ id, word }) => {
        const active = activeSection === id;
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
              opacity: active ? 0.038 : 0,
              transform: active ? "translateY(0)" : "translateY(28px)",
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
