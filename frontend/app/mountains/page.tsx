import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PrayerFlagDivider from "@/components/ui/PrayerFlagDivider";
import { MOUNTAIN_PEAKS, TREK_ROUTES, VIEWPOINTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mountains & Treks — Nepal",
  description:
    "Nepal's eight 8,000 m peaks, classic trekking routes, and high-altitude basecamps — inspiration and practical information for your Himalayan adventure.",
};

const MAX_ELEV = 8848.86;
function elevNum(s: string) {
  return parseFloat(s.replace(/,/g, "").replace(" m", ""));
}

const DIFF_BADGE: Record<string, string> = {
  "Easy":                 "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  "Easy–Moderate":        "bg-amber-500/15   text-amber-400   border-amber-500/25",
  "Moderate":             "bg-amber-500/15   text-amber-400   border-amber-500/25",
  "Moderate–Challenging": "bg-orange-500/15  text-orange-400  border-orange-500/25",
  "Challenging":          "bg-red-500/15     text-red-400     border-red-500/25",
  "Expert":               "bg-rose-600/20    text-rose-400    border-rose-600/30",
};

// ─── Trek card — three visual weights ───────────────────────────────────────
function TrekCard({ route, size }: { route: typeof TREK_ROUTES[number]; size: "hero" | "mid" | "compact" }) {
  const isBooking = route.href.startsWith("/booking");
  const diffClass = DIFF_BADGE[route.difficulty] ?? "bg-white/10 text-white/60 border-white/10";

  return (
    <Link
      href={route.href}
      className={`group relative overflow-hidden rounded-2xl block card-lift ${
        size === "hero" ? "aspect-[16/7]" : "aspect-[4/3]"
      }`}
    >
      <Image
        src={route.photo}
        alt={route.name}
        fill
        sizes="(min-width:1024px) 50vw, 100vw"
        className="object-cover graded transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {/* Badges — top left */}
      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
        <span className={`rounded-full border px-2.5 py-0.5 text-[9px] font-semibold backdrop-blur-sm ${diffClass}`}>
          {route.difficulty}
        </span>
        <span className="rounded-full border border-white/15 bg-black/30 backdrop-blur-sm px-2.5 py-0.5 text-[9px] text-white/55">
          {route.duration}
        </span>
      </div>

      {/* Season — top right */}
      <span className="absolute top-3 right-3 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm px-2.5 py-0.5 text-[9px] text-white/40">
        {route.season}
      </span>

      {/* Content — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        {size === "hero" && (
          <p className="text-[10px] uppercase tracking-widest text-white/35 mb-1">{route.note}</p>
        )}
        <p className={`font-bold text-white group-hover:text-[#d4a843] transition-colors duration-200 leading-tight ${size === "hero" ? "text-xl md:text-2xl" : size === "mid" ? "text-[15px]" : "text-[13px]"}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {route.name}
        </p>
        {size !== "compact" && (
          <p className="mt-1 text-[11px] text-white/40 line-clamp-2 leading-relaxed" style={{ fontFamily: "var(--font-syne)" }}>
            {route.description}
          </p>
        )}
        <p className="mt-2.5 text-[10px] font-semibold text-[#d4a843]" style={{ fontFamily: "var(--font-syne)" }}>
          {isBooking ? "Book trek →" : "Explore →"}
        </p>
      </div>
    </Link>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function MountainsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 overflow-x-hidden">

        {/* ══════════════════════════════
            HERO — cinematic bg image
        ══════════════════════════════ */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src="/Kala Patthar.jpg"
              alt=""
              fill
              priority
              className="object-cover object-center graded"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#07070d]/10 via-[#07070d]/60 to-[#07070d]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07070d]/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-20">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-4 fade-up"
               style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}>
              Mountains &amp; Treks · पर्वत र ट्रेकिङ
            </p>
            <h1 className="text-5xl md:text-7xl leading-none mb-6 fade-up"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, animationDelay: "80ms" }}>
              Eight peaks above{" "}
              <em className="text-gradient-gold not-italic">8,000 m</em>
            </h1>
            <p className="text-[14px] text-[rgba(240,236,227,0.55)] max-w-xl leading-relaxed mb-12 fade-up"
               style={{ fontFamily: "var(--font-syne)", animationDelay: "160ms" }}>
              Nepal holds eight of the planet&apos;s fourteen highest mountains and over 1,400 trekking
              routes — from half-day walks to month-long high-altitude expeditions.
            </p>

            {/* ── Stat strip ── */}
            <div className="flex flex-wrap gap-x-10 gap-y-5 fade-up" style={{ animationDelay: "240ms" }}>
              {[
                { n: "8", sub: "Peaks above 8,000 m" },
                { n: "8 of 14", sub: "World's highest summits" },
                { n: "1,400+", sub: "Trekking routes" },
                { n: "8,848 m", sub: "Highest point on Earth" },
              ].map(({ n, sub }) => (
                <div key={sub}>
                  <p className="text-2xl md:text-3xl font-bold leading-none text-gradient-gold"
                     style={{ fontFamily: "var(--font-display)" }}>
                    {n}
                  </p>
                  <p className="text-[9px] uppercase tracking-widest text-white/30 mt-1"
                     style={{ fontFamily: "var(--font-syne)" }}>
                    {sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PrayerFlagDivider className="mx-6 md:mx-10" opacity={0.4} />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 flex flex-col gap-24">

          {/* ══════════════════════════════
              8,000 m PEAKS
              Portrait towers — elevation as hero number,
              proportional bar on left edge, hover reveals desc
          ══════════════════════════════ */}
          <section>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
                   style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}>
                  Nepal&apos;s 8,000 m Peaks · ८,०००+ मिटर
                </p>
                <h2 className="text-3xl md:text-4xl text-[#f0ece3]"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  Nepal&apos;s giants
                </h2>
              </div>
              <Link href="/booking?cat=trekking"
                    className="hidden md:block text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d4a843] hover:text-[#e8c547] transition-colors"
                    style={{ fontFamily: "var(--font-syne)" }}>
                Book a trek →
              </Link>
            </div>

            {/* Elevation comparison bar — gives instant visual of scale */}
            <div className="mb-5 hidden md:flex items-end gap-[3px] h-10">
              {MOUNTAIN_PEAKS.map((peak) => {
                const pct = (elevNum(peak.elevation) / MAX_ELEV) * 100;
                return (
                  <div key={peak.name} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-sm"
                      style={{
                        height: `${pct}%`,
                        background: `linear-gradient(to top, rgba(212,168,67,0.65), rgba(212,168,67,0.15))`,
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Portrait peak cards — tall, image-dominant */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-[3px] md:gap-1.5">
              {MOUNTAIN_PEAKS.map((peak, i) => {
                const pct = (elevNum(peak.elevation) / MAX_ELEV) * 100;
                return (
                  <Link
                    key={peak.name}
                    href="/booking?cat=trekking"
                    className="group relative overflow-hidden rounded-xl aspect-[3/5]"
                  >
                    <Image
                      src={peak.photo}
                      alt={peak.name}
                      fill
                      sizes="(min-width:1024px) 12.5vw, 25vw"
                      className="object-cover graded transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                    {/* Left edge — proportional elevation bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white/[0.06]">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-[#d4a843]"
                        style={{ height: `${pct}%` }}
                      />
                    </div>

                    {/* Rank */}
                    <div className="absolute top-2 right-2">
                      <span className="text-[8px] font-bold text-white/25" style={{ fontFamily: "var(--font-syne)" }}>
                        #{i + 1}
                      </span>
                    </div>

                    {/* Elevation — top */}
                    <div className="absolute top-2.5 left-3">
                      <p className="text-[10px] font-bold text-[#d4a843] leading-none"
                         style={{ fontFamily: "var(--font-display)" }}>
                        {peak.elevation}
                      </p>
                    </div>

                    {/* Name + Devanagari + note — bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-2.5">
                      <p className="text-[11px] font-bold text-white leading-tight group-hover:text-[#d4a843] transition-colors duration-200"
                         style={{ fontFamily: "var(--font-display)" }}>
                        {peak.name}
                      </p>
                      <p className="text-[9px] text-[#d4a843]/55 mt-0.5"
                         style={{ fontFamily: "var(--font-devanagari)" }}>
                        {peak.devanagari}
                      </p>
                      <p className="text-[8px] uppercase tracking-widest text-white/25 mt-1"
                         style={{ fontFamily: "var(--font-syne)" }}>
                        {peak.note}
                      </p>
                    </div>

                    {/* Hover — description overlay */}
                    <div className="absolute inset-0 bg-[#07070d]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                      <p className="text-[10px] text-white/75 text-center leading-relaxed"
                         style={{ fontFamily: "var(--font-syne)" }}>
                        {peak.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="/booking?cat=trekking"
                className="glass-gold rounded-full px-8 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#d4a843] hover:scale-105 transition-transform duration-200"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Plan your Himalayan trek →
              </Link>
            </div>
          </section>

          <PrayerFlagDivider opacity={0.25} />

          {/* ══════════════════════════════
              TREK ROUTES
              Magazine layout: 2 hero wide + 3 mid + 3 compact
          ══════════════════════════════ */}
          <section>
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
                 style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}>
                Trekking Routes · ट्रेकिङ मार्गहरू
              </p>
              <h2 className="text-3xl md:text-4xl text-[#f0ece3] mb-2"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                Classic trails
              </h2>
              <p className="text-[13px] text-[rgba(240,236,227,0.55)] max-w-lg leading-relaxed"
                 style={{ fontFamily: "var(--font-syne)" }}>
                From a 4-day introduction to a 20-day expedition — a route for every ambition.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Row 1 — 2 hero-wide cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {TREK_ROUTES.slice(0, 2).map((r) => <TrekCard key={r.name} route={r} size="hero" />)}
              </div>
              {/* Row 2 — 3 mid cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TREK_ROUTES.slice(2, 5).map((r) => <TrekCard key={r.name} route={r} size="mid" />)}
              </div>
              {/* Row 3 — 3 compact cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TREK_ROUTES.slice(5, 8).map((r) => <TrekCard key={r.name} route={r} size="compact" />)}
              </div>
            </div>
          </section>

          <PrayerFlagDivider opacity={0.25} />

          {/* ══════════════════════════════
              VIEWPOINTS
              Wide 16:9 panoramic cards — feel like looking through a viewfinder
          ══════════════════════════════ */}
          <section>
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
                 style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}>
                Basecamps &amp; Viewpoints · बेसक्याम्प
              </p>
              <h2 className="text-3xl md:text-4xl text-[#f0ece3] mb-2"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                High-altitude landmarks
              </h2>
              <p className="text-[13px] text-[rgba(240,236,227,0.55)] max-w-lg leading-relaxed"
                 style={{ fontFamily: "var(--font-syne)" }}>
                The world&apos;s greatest high-altitude vantage points — all accessible on foot.
              </p>
            </div>

            {/* Mosaic: first card spans 2 cols, rest fill 3-col grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Featured — double width */}
              <Link
                href={VIEWPOINTS[0].href}
                className="group relative overflow-hidden rounded-2xl col-span-1 sm:col-span-2 aspect-[16/7] card-lift"
              >
                <Image src={VIEWPOINTS[0].photo} alt={VIEWPOINTS[0].name} fill
                  sizes="(min-width:1024px) 66vw, 100vw"
                  className="object-cover graded transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="rounded-full bg-black/40 backdrop-blur-sm border border-white/10 px-3 py-1 text-[10px] font-semibold text-[#d4a843]"
                        style={{ fontFamily: "var(--font-syne)" }}>
                    {VIEWPOINTS[0].elevation}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xl font-bold text-white group-hover:text-[#d4a843] transition-colors duration-200"
                     style={{ fontFamily: "var(--font-display)" }}>
                    {VIEWPOINTS[0].icon} {VIEWPOINTS[0].name}
                  </p>
                  <p className="text-[12px] text-white/40 mt-0.5" style={{ fontFamily: "var(--font-syne)" }}>
                    {VIEWPOINTS[0].note}
                  </p>
                </div>
              </Link>

              {/* 2nd card — single */}
              <Link
                href={VIEWPOINTS[1].href}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] card-lift"
              >
                <Image src={VIEWPOINTS[1].photo} alt={VIEWPOINTS[1].name} fill
                  sizes="(min-width:1024px) 33vw, 100vw"
                  className="object-cover graded transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="rounded-full bg-black/40 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-[#d4a843]"
                        style={{ fontFamily: "var(--font-syne)" }}>
                    {VIEWPOINTS[1].elevation}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[15px] font-bold text-white group-hover:text-[#d4a843] transition-colors duration-200"
                     style={{ fontFamily: "var(--font-display)" }}>
                    {VIEWPOINTS[1].icon} {VIEWPOINTS[1].name}
                  </p>
                  <p className="text-[11px] text-white/40 mt-0.5" style={{ fontFamily: "var(--font-syne)" }}>
                    {VIEWPOINTS[1].note}
                  </p>
                </div>
              </Link>

              {/* Remaining 4 — equal 3-col then 1-col */}
              {VIEWPOINTS.slice(2).map((vp) => (
                <Link
                  key={vp.name}
                  href={vp.href}
                  className="group relative overflow-hidden rounded-2xl aspect-[16/9] card-lift"
                >
                  <Image src={vp.photo} alt={vp.name} fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover graded transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="rounded-full bg-black/40 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-[#d4a843]"
                          style={{ fontFamily: "var(--font-syne)" }}>
                      {vp.elevation}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[14px] font-bold text-white group-hover:text-[#d4a843] transition-colors duration-200"
                           style={{ fontFamily: "var(--font-display)" }}>
                          {vp.icon} {vp.name}
                        </p>
                        <p className="text-[10px] text-white/35 mt-0.5" style={{ fontFamily: "var(--font-syne)" }}>
                          {vp.note}
                        </p>
                      </div>
                      <span className="text-[10px] text-[#d4a843] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ fontFamily: "var(--font-syne)" }}>
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════
              BOOK CTA
          ══════════════════════════════ */}
          <section className="pb-4">
            <div
              className="relative overflow-hidden glass-gold rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-6 items-center justify-between"
              style={{ border: "1px solid rgba(212,168,67,0.18)" }}
            >
              {/* Subtle background */}
              <div className="absolute inset-0">
                <Image src="/Island Peak BC.jpg" alt="" fill
                  className="object-cover graded opacity-[0.12]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07070d]/80 to-[#07070d]/50" />
              </div>

              <div className="relative z-10">
                <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-2"
                   style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}>
                  Ready for the mountains?
                </p>
                <h2 className="text-3xl md:text-4xl text-[#f0ece3] mb-2"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  Book your trek
                </h2>
                <p className="text-xl text-[#d4a843] mb-3"
                   style={{ fontFamily: "var(--font-devanagari)", opacity: 0.72 }}>
                  तपाईंको ट्रेक बुक गर्नुहोस्
                </p>
                <p className="text-[13px] text-[rgba(240,236,227,0.55)] max-w-md"
                   style={{ fontFamily: "var(--font-syne)" }}>
                  Guided and self-guided treks with instant confirmation. Local expertise, fair pricing.
                </p>
              </div>
              <Link
                href="/booking?cat=trekking"
                className="relative z-10 shrink-0 px-8 py-4 rounded-full font-semibold text-[13px] tracking-[0.15em] uppercase transition-all duration-200 hover:scale-105"
                style={{
                  fontFamily: "var(--font-syne)",
                  background: "linear-gradient(135deg, #d4a843, #e8c547)",
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
