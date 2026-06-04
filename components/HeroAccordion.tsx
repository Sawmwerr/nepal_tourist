"use client";

import { useState } from "react";
import PanelItem, { Panel } from "./PanelItem";

const panels: Panel[] = [
  {
    id: "himalayas",
    number: "01",
    title: "The Himalayas",
    tagline: "Where the sky begins and silence speaks louder than words.",
    category: "Himalayas",
    gradient: "linear-gradient(160deg, #0a1520 0%, #142d48 45%, #0c2238 70%, #070f1a 100%)",
    videoSrc: "/himilaya.mp4",
  },
  {
    id: "culture",
    number: "02",
    title: "Living Culture",
    tagline: "Centuries alive in every carved stone and painted prayer wheel.",
    category: "Culture",
    gradient: "linear-gradient(160deg, #180c04 0%, #4a2209 45%, #6e3a12 70%, #2e1204 100%)",
    videoSrc: "/heritage.mp4",
  },
  {
    id: "traditions",
    number: "03",
    title: "Sacred Traditions",
    tagline: "Stories worn on skin, rituals kept across a thousand years.",
    category: "Traditions",
    gradient: "linear-gradient(160deg, #100718 0%, #2e1448 45%, #4a2570 70%, #180a2c 100%)",
    imageSrc: "/tradation.jpg",
  },
  {
    id: "food",
    number: "04",
    title: "Mountain Flavors",
    tagline: "Taste the altitude — from dal bhat to Sherpa stew.",
    category: "Food",
    gradient: "linear-gradient(160deg, #160c04 0%, #4a2e08 45%, #6e4514 70%, #2e1804 100%)",
    videoSrc: "/landescape.mp4",
  },
  {
    id: "adventure",
    number: "05",
    title: "Raw Adventure",
    tagline: "Push past the edge where comfort ends and legend begins.",
    category: "Adventure",
    gradient: "linear-gradient(160deg, #041508 0%, #0c4824 45%, #156836 70%, #06301a 100%)",
    videoSrc: "/advanture.mp4",
  },
];

export default function HeroAccordion() {
  const [activeId, setActiveId] = useState<string | null>("himalayas");

  return (
    <section className="relative w-full h-screen flex flex-col overflow-hidden">

      {/* ── Floating glass heading card ── */}
      <div className="flex justify-center pt-28 pb-4 px-4 z-10 fade-up">
        <div
          className="glass float-shadow flex flex-col items-center px-12 py-10 w-full"
          style={{ borderRadius: 28, maxWidth: 640 }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[rgba(212,168,67,0.35)]" />
            <span
              className="text-[10px] tracking-[0.55em] uppercase text-[#d4a843] gold-shimmer"
              style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
            >
              A journey beyond imagination
            </span>
            <div className="h-px w-8 bg-[rgba(212,168,67,0.35)]" />
          </div>

          {/* Title */}
          <h1
            className="text-gradient text-[5rem] md:text-[7.5rem] text-center tracking-[-0.01em] select-none"
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
              lineHeight: 1.15,
              paddingBottom: "0.15em",   /* room for descenders like p, y, g */
            }}
          >
            Nepal
          </h1>

          {/* Sub */}
          <p
            className="text-[10px] tracking-[0.38em] uppercase text-[#6b6a5a] mt-6"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Hover a panel · explore the journey
          </p>
        </div>
      </div>

      {/* ── Accordion — rounded glass container ── */}
      <div
        className="flex flex-1 min-h-0 mx-3 mb-3 overflow-hidden float-shadow-lg"
        style={{ gap: "2px", borderRadius: 24 }}
      >
        {panels.map((panel) => (
          <PanelItem
            key={panel.id}
            panel={panel}
            isActive={activeId === panel.id}
            onActivate={() => setActiveId(panel.id)}
            onDeactivate={() => setActiveId(null)}
          />
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
        <div className="scroll-bounce">
          <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
            <rect x="1" y="1" width="18" height="30" rx="9" stroke="rgba(212,168,67,0.25)" strokeWidth="1.5" />
            <rect x="9" y="6" width="2" height="8" rx="1" fill="rgba(212,168,67,0.5)">
              <animate attributeName="y" values="6;14;6" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="1.8s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>
      </div>
    </section>
  );
}
