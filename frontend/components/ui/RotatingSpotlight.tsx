"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface SpotlightEntry {
  label: string;
  title: string;
  description: string;
  imageUrl: string;
  secondaryImageUrl?: string;
  ctaLabel: string;
  ctaHref: string;
}

interface Props {
  entries: SpotlightEntry[];
  intervalMs?: number;
}

const TEXT_FADE = 320;
const IMG_FADE  = 560;

// ─── Component ────────────────────────────────────────────────────────────────
export default function RotatingSpotlight({ entries, intervalMs = 5500 }: Props) {
  const n = entries.length;

  const activeRef   = useRef(0);
  const isPausedRef = useRef(false);

  const [imgActive,   setImgActive]   = useState(0);
  const [textIdx,     setTextIdx]     = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [isPaused,    setIsPaused]    = useState(false);

  const goTo = useCallback((idx: number) => {
    if (idx === activeRef.current) return;
    activeRef.current = idx;
    setImgActive(idx);
    setTextVisible(false);
    setTimeout(() => { setTextIdx(idx); setTextVisible(true); }, TEXT_FADE);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (!isPausedRef.current) goTo((activeRef.current + 1) % n);
    }, intervalMs);
    return () => clearInterval(t);
  }, [goTo, intervalMs, n]);

  const pause  = () => { isPausedRef.current = true;  setIsPaused(true);  };
  const resume = () => { isPausedRef.current = false; setIsPaused(false); };

  const entry = entries[textIdx];

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >

      {/* ══ LEFT — everything centre-aligned (matches reference) ════════════ */}
      <div className="flex flex-col items-center text-center">
        <div
          className="flex flex-col items-center"
          style={{
            opacity:    textVisible ? 1 : 0,
            transform:  textVisible ? "translateY(0)" : "translateY(10px)",
            transition: `opacity ${TEXT_FADE}ms ease, transform ${TEXT_FADE}ms ease`,
          }}
        >
          {/* Eyebrow */}
          <p
            className="mb-3 text-[10px] font-semibold uppercase text-[#d4a843] text-center"
            style={{ fontFamily: "var(--font-syne)", letterSpacing: "3px" }}
          >
            {entry.label}
          </p>

          {/* Title */}
          <h2
            className="mb-5 text-4xl md:text-5xl font-bold leading-tight text-[#f0ece3] text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {entry.title}
          </h2>

          {/* Description */}
          <p
            className="mb-8 max-w-[380px] text-[14px] leading-relaxed text-[rgba(240,236,227,0.58)] text-center"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {entry.description}
          </p>

          {/* CTA button — centred */}
          <Link
            href={entry.ctaHref}
            className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-200 hover:scale-105"
            style={{
              fontFamily: "var(--font-syne)",
              background:  "linear-gradient(135deg, #c9943c, #d4a843, #e8c547)",
              color:        "#07070d",
              boxShadow:    "0 4px 22px rgba(212,168,67,0.28)",
            }}
          >
            {entry.ctaLabel}
            <ArrowRight />
          </Link>
        </div>

        {/* Progress bars — centred */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {entries.map((e, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to ${e.title}`}
              className="relative h-[3px] cursor-pointer overflow-hidden rounded-full transition-all duration-300"
              style={{
                width:      i === imgActive ? 40 : 14,
                background: "rgba(240,236,227,0.13)",
              }}
            >
              {i === imgActive && (
                <span
                  key={`fill-${imgActive}`}
                  className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-[#d4a843]"
                  style={{
                    animation:          `spotlightProgress ${intervalMs}ms linear forwards`,
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                />
              )}
              {i < imgActive && (
                <span className="absolute inset-0 rounded-full bg-[#d4a843]/45" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ══ RIGHT — contained fan cluster (overflow: hidden keeps cards ════
          strictly inside the right column — no bleed into text area)
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative h-[360px] sm:h-[440px] lg:h-[500px] overflow-hidden">

        {/* Left peek — occupies left 58%, behind main card, shows ~12% on the left edge */}
        <FanCard
          entries={entries}
          active={imgActive}
          imageKey="secondary"
          targetOpacity={0.42}
          fadeDuration={IMG_FADE}
          style={{ position: "absolute", left: 0, right: "42%", top: "8%", bottom: "8%", zIndex: 1 }}
        />

        {/* Right peek — occupies right 58%, behind main card, shows ~12% on the right edge */}
        <FanCard
          entries={entries}
          active={imgActive}
          imageKey="secondary"
          targetOpacity={0.42}
          fadeDuration={IMG_FADE}
          style={{ position: "absolute", left: "42%", right: 0, top: "8%", bottom: "8%", zIndex: 2 }}
        />

        {/* Main card — centre 76%, highest z-index, deep shadow */}
        <FanCard
          entries={entries}
          active={imgActive}
          imageKey="primary"
          targetOpacity={1}
          fadeDuration={IMG_FADE}
          isPrimary
          style={{
            position:  "absolute",
            left:      "12%",
            right:     "12%",
            top:       0,
            bottom:    0,
            zIndex:    3,
            boxShadow: "0 28px 64px rgba(0,0,0,0.60), 0 8px 24px rgba(0,0,0,0.38)",
          }}
        />

        {/* Hidden preload for next slide */}
        <div className="sr-only" aria-hidden>
          <Image src={entries[(imgActive + 1) % n].imageUrl} alt="" width={4} height={3} />
        </div>
      </div>

    </div>
  );
}

// ─── FanCard — one card slot; fades all N images via opacity layers ───────────
function FanCard({
  entries,
  active,
  imageKey,
  targetOpacity,
  fadeDuration,
  isPrimary = false,
  style,
}: {
  entries:       SpotlightEntry[];
  active:        number;
  imageKey:      "primary" | "secondary";
  targetOpacity: number;
  fadeDuration:  number;
  isPrimary?:    boolean;
  style?:        React.CSSProperties;
}) {
  return (
    <div className="overflow-hidden rounded-2xl" style={style}>
      {entries.map((e, i) => {
        const src = imageKey === "primary"
          ? e.imageUrl
          : (e.secondaryImageUrl ?? e.imageUrl);
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity:    i === active ? targetOpacity : 0,
              transition: `opacity ${fadeDuration}ms ease`,
            }}
          >
            <Image
              src={src}
              alt={isPrimary ? e.title : ""}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover graded"
              priority={isPrimary && i === 0}
              aria-hidden={!isPrimary}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── Arrow icon ───────────────────────────────────────────────────────────────
function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
