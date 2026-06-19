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
  /** Used for the two depth/decorative cards behind the main image */
  secondaryImageUrl?: string;
  ctaLabel: string;
  ctaHref: string;
}

interface Props {
  entries: SpotlightEntry[];
  /** Auto-advance interval in ms — default 5 500 */
  intervalMs?: number;
}

const TEXT_FADE = 320; // ms — text crossfade duration
const IMG_FADE  = 560; // ms — image crossfade duration (via CSS transition)

// ─── Component ────────────────────────────────────────────────────────────────
export default function RotatingSpotlight({ entries, intervalMs = 5500 }: Props) {
  const n = entries.length;

  // activeRef holds the true current slide without causing stale closures in setInterval
  const activeRef   = useRef(0);
  const isPausedRef = useRef(false);

  // imgActive drives the image opacity layers (changes immediately on slide change)
  const [imgActive, setImgActive]   = useState(0);
  // textIdx is what the text block renders — lags by TEXT_FADE for the crossfade illusion
  const [textIdx, setTextIdx]       = useState(0);
  // textVisible drives the opacity/translate of the text block
  const [textVisible, setTextVisible] = useState(true);
  // isPaused as state so the progress bar animationPlayState re-renders
  const [isPaused, setIsPaused]     = useState(false);

  const goTo = useCallback((idx: number) => {
    if (idx === activeRef.current) return;
    activeRef.current = idx;

    // Images start crossfading immediately
    setImgActive(idx);

    // Text: fade out → swap content at midpoint → fade in
    setTextVisible(false);
    setTimeout(() => {
      setTextIdx(idx);
      setTextVisible(true);
    }, TEXT_FADE);
  }, []);

  // Auto-advance — reads from ref so the interval closure is never stale
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPausedRef.current) {
        goTo((activeRef.current + 1) % n);
      }
    }, intervalMs);
    return () => clearInterval(timer);
  }, [goTo, intervalMs, n]);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
    setIsPaused(true);
  };
  const handleMouseLeave = () => {
    isPausedRef.current = false;
    setIsPaused(false);
  };

  const entry   = entries[textIdx];
  const secondary = entry.secondaryImageUrl ?? entry.imageUrl;

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ══ LEFT — text panel ══════════════════════════════════════════════ */}
        <div className="flex flex-col">
          <div
            style={{
              opacity:    textVisible ? 1 : 0,
              transform:  textVisible ? "translateY(0)" : "translateY(10px)",
              transition: `opacity ${TEXT_FADE}ms ease, transform ${TEXT_FADE}ms ease`,
            }}
          >
            {/* Eyebrow label */}
            <p
              className="mb-3 text-[10px] font-semibold uppercase text-[#d4a843]"
              style={{ fontFamily: "var(--font-syne)", letterSpacing: "3px" }}
            >
              {entry.label}
            </p>

            {/* Title */}
            <h2
              className="mb-4 text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-[#f0ece3]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {entry.title}
            </h2>

            {/* Description */}
            <p
              className="mb-8 max-w-[420px] text-[15px] leading-relaxed text-[rgba(240,236,227,0.58)]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {entry.description}
            </p>

            {/* CTA */}
            <Link
              href={entry.ctaHref}
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-200 hover:scale-105 hover:shadow-xl"
              style={{
                fontFamily: "var(--font-syne)",
                background: "linear-gradient(135deg, #c9943c, #d4a843, #e8c547)",
                color: "#07070d",
                boxShadow: "0 4px 22px rgba(212,168,67,0.28)",
              }}
            >
              {entry.ctaLabel}
              <ArrowRight />
            </Link>
          </div>

          {/* Progress bars */}
          <div className="mt-10 flex items-center gap-2">
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
                {/* Active — animated fill */}
                {i === imgActive && (
                  <span
                    key={`fill-${imgActive}`}
                    className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-[#d4a843]"
                    style={{
                      animation: `spotlightProgress ${intervalMs}ms linear forwards`,
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                  />
                )}
                {/* Past — solid dim gold */}
                {i < imgActive && (
                  <span className="absolute inset-0 rounded-full bg-[#d4a843]/45" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ══ RIGHT — image cluster ══════════════════════════════════════════ */}
        <div className="relative h-[340px] sm:h-[420px] lg:h-[500px]">

          {/*
            Three stacked planes — back and middle are decorative depth cards,
            front is the fully opaque active card.
            Each plane renders all N images as absolute layers and crossfades
            between them via CSS opacity transitions.
          */}

          {/* Plane 1 — back, rotated right, very faded */}
          <ClusterPlane
            entries={entries}
            active={imgActive}
            imageKey="secondary"
            opacity={0.22}
            style={{ transform: "rotate(6deg) translate(5%, 3%)", zIndex: 1 }}
            fadeDuration={IMG_FADE}
          />

          {/* Plane 2 — middle, rotated left, semi-faded */}
          <ClusterPlane
            entries={entries}
            active={imgActive}
            imageKey="secondary"
            opacity={0.40}
            style={{ transform: "rotate(-3.5deg) translate(-4%, 1.5%)", zIndex: 2 }}
            fadeDuration={IMG_FADE}
          />

          {/* Plane 3 — front, centered, fully opaque, deep shadow */}
          <ClusterPlane
            entries={entries}
            active={imgActive}
            imageKey="primary"
            opacity={1}
            style={{
              zIndex: 3,
              boxShadow:
                "0 28px 64px rgba(0,0,0,0.65), 0 8px 24px rgba(0,0,0,0.40)",
            }}
            fadeDuration={IMG_FADE}
            isPrimary
          />

          {/* Hidden preload for the next slide */}
          <div className="sr-only" aria-hidden>
            <Image
              src={entries[(imgActive + 1) % n].imageUrl}
              alt=""
              width={4}
              height={3}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── ClusterPlane — one card slot in the depth stack ─────────────────────────
function ClusterPlane({
  entries,
  active,
  imageKey,
  opacity,
  style,
  fadeDuration,
  isPrimary = false,
}: {
  entries:     SpotlightEntry[];
  active:      number;
  imageKey:    "primary" | "secondary";
  opacity:     number;
  style?:      React.CSSProperties;
  fadeDuration: number;
  isPrimary?:  boolean;
}) {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-2xl"
      style={style}
    >
      {entries.map((e, i) => {
        const src = imageKey === "primary"
          ? e.imageUrl
          : (e.secondaryImageUrl ?? e.imageUrl);

        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity:    i === active ? opacity : 0,
              transition: `opacity ${fadeDuration}ms ease`,
            }}
          >
            <Image
              src={src}
              alt={isPrimary ? e.title : ""}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
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
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
