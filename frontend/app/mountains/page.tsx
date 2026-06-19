import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PrayerFlagDivider from "@/components/ui/PrayerFlagDivider";
import { MOUNTAIN_PEAKS, TREK_ROUTES, VIEWPOINTS } from "@/lib/data";
import type { MountainPeak, TrekRoute, Viewpoint } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mountains & Treks — Nepal",
  description:
    "Nepal's eight 8,000 m peaks, classic trekking routes, and high-altitude basecamps — inspiration and practical information for your Himalayan adventure.",
};

// ─── Route category → semantic colour token ───────────────────────────────────
// Keeps colour-meaning consistent: blue=info, green=loop, amber=sunrise, etc.
const ROUTE_CAT: Record<string, { bg: string; color: string; label: string }> = {
  "Classic":      { bg: "rgba(59,130,246,0.18)",  color: "#93c5fd", label: "Classic"    },
  "Epic Loop":    { bg: "rgba(34,197,94,0.18)",   color: "#86efac", label: "Loop"       },
  "Near KTM":     { bg: "rgba(20,184,166,0.18)",  color: "#5eead4", label: "Accessible" },
  "Remote":       { bg: "rgba(249,115,22,0.18)",  color: "#fdba74", label: "Remote"     },
  "Best Sunrise": { bg: "rgba(234,179,8,0.18)",   color: "#fde047", label: "Sunrise"    },
  "Advanced":     { bg: "rgba(239,68,68,0.18)",   color: "#fca5a5", label: "Advanced"   },
  "Sacred Lake":  { bg: "rgba(168,85,247,0.18)",  color: "#c4b5fd", label: "Sacred"     },
  "Restricted":   { bg: "rgba(220,38,38,0.18)",   color: "#fca5a5", label: "Restricted" },
};

// ─── Shared section header ─────────────────────────────────────────────────────
function SectionHeader({
  label,
  title,
  link,
}: {
  label: string;
  title: string;
  link?: { href: string; text: string };
}) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <p
          className="mb-1.5 text-[11px] font-semibold uppercase text-white/35"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "2px" }}
        >
          {label}
        </p>
        <h2
          className="text-2xl md:text-3xl text-[#f0ece3]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          {title}
        </h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="flex shrink-0 items-center gap-1 text-[11px] text-white/30 transition-colors hover:text-white/60"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {link.text} <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}

// ─── Peak card — gold elevation is the hero number; gold stays exclusive here ─
function PeakCard({ peak }: { peak: MountainPeak }) {
  return (
    <Link
      href="/booking?cat=trekking"
      className="group flex flex-col gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] p-4 transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.08]"
    >
      <span className="text-xl leading-none" aria-hidden>
        {peak.icon}
      </span>
      <div>
        <p
          className="text-[14px] font-medium text-[#f0ece3] transition-colors group-hover:text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {peak.name}
        </p>
        <p
          className="mt-0.5 text-[11px] text-white/30"
          style={{ fontFamily: "var(--font-devanagari)" }}
        >
          {peak.devanagari}
        </p>
      </div>
      {/* Elevation — #c9a84c gold used ONLY here across the whole page */}
      <p
        className="text-[18px] font-bold leading-none"
        style={{ fontFamily: "var(--font-display)", color: "#c9a84c" }}
      >
        {peak.elevation}
      </p>
      <p
        className="text-[11px] leading-snug text-white/30"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {peak.note}
      </p>
    </Link>
  );
}

// ─── Trek route row — vertical list for fast scanning ─────────────────────────
function RouteRow({ route }: { route: TrekRoute }) {
  const cat = ROUTE_CAT[route.note] ?? {
    bg: "rgba(255,255,255,0.07)",
    color: "rgba(240,236,227,0.40)",
    label: route.note,
  };

  return (
    <Link
      href={route.href}
      className="group flex items-center gap-4 rounded-lg border border-white/[0.07] bg-white/[0.03] px-4 py-3 transition-all duration-200 hover:border-white/[0.13] hover:bg-white/[0.07]"
    >
      {/* 36 px icon tile — colour encodes category meaning */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg leading-none"
        style={{ background: cat.bg }}
        aria-hidden
      >
        {route.icon}
      </div>

      {/* Route name + category label */}
      <div className="min-w-0 flex-1">
        <p
          className="truncate text-[13px] font-medium text-[#f0ece3] transition-colors group-hover:text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {route.name}
        </p>
        <p
          className="mt-0.5 text-[11px]"
          style={{ fontFamily: "var(--font-syne)", color: cat.color }}
        >
          {cat.label}
        </p>
      </div>

      {/* Duration + difficulty — right-aligned, muted */}
      <div className="shrink-0 text-right">
        <p
          className="text-[12px] text-white/40"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {route.duration}
        </p>
        <p
          className="mt-0.5 text-[10px] text-white/20"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {route.difficulty}
        </p>
      </div>
    </Link>
  );
}

// ─── Viewpoint card — lighter weight, no gold, signals secondary content ──────
function ViewpointCard({ vp }: { vp: Viewpoint }) {
  return (
    <Link
      href={vp.href}
      className="group flex flex-col items-center gap-1.5 rounded-xl p-5 text-center transition-all duration-200 hover:bg-white/[0.05]"
    >
      <span className="mb-1 text-2xl leading-none" aria-hidden>
        {vp.icon}
      </span>
      <p
        className="text-[13px] font-medium text-[#f0ece3] transition-colors group-hover:text-white/90"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {vp.name}
      </p>
      {/* Elevation — white/muted, deliberately NOT gold so gold stays exclusive to peaks */}
      <p
        className="text-[12px] text-white/40"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {vp.elevation}
      </p>
      <p
        className="text-[11px] leading-snug text-white/22"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {vp.note}
      </p>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MountainsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 overflow-x-hidden">

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section className="relative flex min-h-[480px] items-center md:min-h-[540px]">
          <div className="absolute inset-0">
            <Image
              src="/Kala Patthar.jpg"
              alt="Kala Patthar viewpoint — Nepal Himalayas"
              fill
              priority
              className="object-cover graded"
              style={{ objectPosition: "center 20%" }}
            />
            {/* 4-stop gradient: dark top (navbar) → image breathes → dark bottom (stats) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.35) 42%, rgba(10,10,10,0.42) 60%, rgba(10,10,10,0.88) 100%)",
              }}
            />
          </div>

          {/* All content centred */}
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10 py-28 flex flex-col items-center text-center">
            <p
              className="mb-4 text-[10px] font-semibold uppercase text-[#d4a843] fade-up"
              style={{ fontFamily: "var(--font-syne)", letterSpacing: "0.5em" }}
            >
              Mountains &amp; Treks · पर्वत र ट्रेकिङ
            </p>

            <h1
              className="mb-5 max-w-3xl text-5xl md:text-6xl leading-tight fade-up"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                animationDelay: "80ms",
                textShadow: "0 2px 24px rgba(0,0,0,0.65)",
              }}
            >
              Eight peaks above{" "}
              <em className="text-gradient-gold not-italic">8,000 m</em>
            </h1>

            <p
              className="mb-12 max-w-xl text-[15px] leading-relaxed text-[rgba(240,236,227,0.70)] fade-up"
              style={{
                fontFamily: "var(--font-syne)",
                animationDelay: "160ms",
                textShadow: "0 1px 12px rgba(0,0,0,0.50)",
              }}
            >
              Nepal holds eight of the planet&apos;s fourteen highest mountains
              and over 1,400 trekking routes — from half-day walks to
              month-long high-altitude expeditions.
            </p>

            {/* Stats — centred flex row, consistent gap */}
            <div
              className="flex flex-wrap justify-center gap-x-9 gap-y-6 fade-up"
              style={{ animationDelay: "240ms" }}
            >
              {[
                { n: "8",       sub: "Peaks above 8,000 m"    },
                { n: "8 of 14", sub: "World's highest summits" },
                { n: "1,400+",  sub: "Trekking routes"         },
                { n: "8,848 m", sub: "Highest point on Earth"  },
              ].map(({ n, sub }) => (
                <div key={sub} className="flex flex-col items-center">
                  <span
                    className="text-2xl md:text-3xl font-bold leading-none text-gradient-gold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {n}
                  </span>
                  <span
                    className="mt-1.5 text-[9px] uppercase tracking-widest text-white/35"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PrayerFlagDivider className="mx-6 md:mx-10" opacity={0.35} />

        {/* ══ CONTENT ═══════════════════════════════════════════════════════ */}
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-14 flex flex-col gap-14">

          {/* ── 8,000 m peaks ─────────────────────────────────────────────── */}
          <section>
            <SectionHeader
              label="Nepal's 8,000 m Peaks"
              title="Nepal's giants"
              link={{ href: "/booking?cat=trekking", text: "View all" }}
            />
            {/* 4-col on desktop, 2-col on tablet/mobile */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {MOUNTAIN_PEAKS.map((peak) => (
                <PeakCard key={peak.name} peak={peak} />
              ))}
            </div>
          </section>

          <hr className="border-none h-px bg-white/[0.06]" />

          {/* ── Classic trekking routes — vertical list ────────────────────── */}
          <section>
            <SectionHeader
              label="Classic Trekking Routes"
              title="Classic trails"
            />
            <div className="flex flex-col gap-2">
              {TREK_ROUTES.map((route) => (
                <RouteRow key={route.name} route={route} />
              ))}
            </div>
          </section>

          <hr className="border-none h-px bg-white/[0.06]" />

          {/* ── High-altitude viewpoints — lighter secondary section ────────── */}
          <section>
            <SectionHeader
              label="High-Altitude Viewpoints"
              title="High-altitude landmarks"
            />
            {/* Muted surface wrapper signals this is secondary vs the peaks grid */}
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 md:p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {VIEWPOINTS.map((vp) => (
                  <ViewpointCard key={vp.name} vp={vp} />
                ))}
              </div>
            </div>
          </section>

          {/* ── Book CTA ──────────────────────────────────────────────────── */}
          <section>
            <div className="relative overflow-hidden rounded-2xl border border-[#c9a84c]/20 bg-[#c9a84c]/[0.04] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="absolute inset-0">
                <Image
                  src="/Island Peak BC.jpg"
                  alt=""
                  fill
                  className="object-cover graded opacity-[0.10]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07070d]/88 to-[#07070d]/62" />
              </div>

              <div className="relative z-10">
                <p
                  className="mb-1 text-[10px] font-semibold uppercase text-[#c9a84c]"
                  style={{ fontFamily: "var(--font-syne)", letterSpacing: "2px" }}
                >
                  Ready for the mountains?
                </p>
                <h2
                  className="text-2xl md:text-3xl text-[#f0ece3]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  Book your trek
                </h2>
                <p
                  className="mt-0.5 text-lg"
                  style={{ fontFamily: "var(--font-devanagari)", color: "#c9a84c", opacity: 0.7 }}
                >
                  तपाईंको ट्रेक बुक गर्नुहोस्
                </p>
                <p
                  className="mt-2 max-w-md text-[13px] text-[rgba(240,236,227,0.52)]"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Guided and self-guided treks with instant confirmation. Local expertise, fair pricing.
                </p>
              </div>

              <Link
                href="/booking?cat=trekking"
                className="relative z-10 shrink-0 rounded-full px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-200 hover:scale-105"
                style={{
                  fontFamily: "var(--font-syne)",
                  background: "linear-gradient(135deg, #c9a84c, #e8c547)",
                  color: "#07070d",
                }}
              >
                Plan your trek →
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
