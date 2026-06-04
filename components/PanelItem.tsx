"use client";

export interface Panel {
  id: string;
  title: string;
  tagline: string;
  category: string;
  gradient: string;
  number: string;
  videoSrc?: string;
  imageSrc?: string;
}

interface PanelItemProps {
  panel: Panel;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

export default function PanelItem({ panel, isActive, onActivate, onDeactivate }: PanelItemProps) {
  return (
    <div
      className="panel-item relative overflow-hidden cursor-pointer min-w-0"
      style={{ flex: isActive ? "5 1 0%" : "1 1 0%" }}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onClick={onActivate}
    >
      {/* ── Background: video / image / gradient ── */}
      {panel.videoSrc ? (
        <video
          src={panel.videoSrc}
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{ transform: isActive ? "scale(1.06)" : "scale(1)" }}
        />
      ) : panel.imageSrc ? (
        <img
          src={panel.imageSrc}
          alt={panel.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{ transform: isActive ? "scale(1.06)" : "scale(1)" }}
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-700"
          style={{
            background: panel.gradient,
            transform: isActive ? "scale(1.06)" : "scale(1)",
          }}
        />
      )}

      {/* Dark vignette */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: isActive
            ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.25) 100%)"
            : "rgba(0,0,0,0.58)",
        }}
      />

      {/* ── Collapsed: number + rotated label ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 pointer-events-none transition-opacity duration-400"
        style={{ opacity: isActive ? 0 : 1 }}
      >
        <span
          className="text-[9px] tracking-[0.45em] text-[rgba(212,168,67,0.3)]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {panel.number}
        </span>
        <span
          className="text-[10px] font-semibold tracking-[0.45em] uppercase text-[rgba(212,168,67,0.7)] whitespace-nowrap"
          style={{ transform: "rotate(90deg)", fontFamily: "var(--font-syne)" }}
        >
          {panel.category}
        </span>
      </div>

      {/* ── Expanded: glass content card ── */}
      <div
        className="absolute bottom-4 left-4 right-4 transition-all duration-500 pointer-events-none"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <div
          className="glass-dark float-shadow p-5 md:p-6"
          style={{ borderRadius: 20 }}
        >
          {/* Number + category row */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[9px] tracking-[0.45em] text-[rgba(212,168,67,0.35)]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {panel.number}
            </span>
            <div className="h-px flex-1 bg-[rgba(212,168,67,0.15)]" />
            <span
              className="text-[9px] tracking-[0.45em] uppercase text-[#d4a843] font-semibold gold-shimmer"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {panel.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-2xl md:text-3xl text-[#f0ece3] leading-tight mb-1.5"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            {panel.title}
          </h3>

          {/* Tagline */}
          <p
            className="text-xs text-[rgba(240,236,227,0.55)] leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {panel.tagline}
          </p>

          {/* CTA */}
          <div className="inline-flex items-center gap-2 group">
            <div className="h-px w-5 bg-[#d4a843]" />
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-[#d4a843] font-semibold"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Explore →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
