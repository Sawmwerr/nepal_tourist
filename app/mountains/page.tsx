import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrayerFlagDivider from "@/components/PrayerFlagDivider";
import { MOUNTAIN_PEAKS, TREK_ROUTES, VIEWPOINTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mountains & Treks — Nepal",
  description:
    "Nepal's eight 8,000 m peaks, classic trekking routes, and high-altitude basecamps — inspiration and practical information for your Himalayan adventure.",
};

const DIFFICULTY_COLOR: Record<string, string> = {
  "Easy":               "#52c98a",
  "Easy–Moderate":      "#7ecfa0",
  "Moderate":           "#d4a843",
  "Moderate–Challenging":"#e0a040",
  "Challenging":        "#e88a3a",
  "Expert":             "#e05a5a",
};

export default function MountainsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* ── Hero ── */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-14 pb-10">
          <p
            className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-4 fade-up"
            style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
          >
            Mountains &amp; Treks · पर्वत र ट्रेकिङ
          </p>
          <h1
            className="text-5xl md:text-7xl leading-none mb-5 fade-up"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, animationDelay: "80ms" }}
          >
            The highest place{" "}
            <em className="text-gradient-gold">on Earth</em>
          </h1>
          <p
            className="text-[14px] text-[rgba(240,236,227,0.55)] max-w-xl leading-relaxed fade-up"
            style={{ fontFamily: "var(--font-syne)", animationDelay: "160ms" }}
          >
            Nepal holds eight of the world&apos;s fourteen 8,000 m peaks and some
            of the most celebrated trekking routes on the planet. This is where
            adventure is measured in altitude — and beauty in every step between.
          </p>
        </div>

        <PrayerFlagDivider className="mx-10 mb-0" opacity={0.45} />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 flex flex-col gap-20">

          {/* ── 8,000 m Peaks ── */}
          <section>
            <p
              className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
              style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
            >
              8,000 m Peaks
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <h2
                className="text-3xl md:text-4xl text-[#f0ece3]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                Nepal&apos;s giants
              </h2>
              <p className="text-[12px] text-[#8a8978] md:text-right max-w-xs" style={{ fontFamily: "var(--font-syne)" }}>
                Eight of Earth&apos;s fourteen highest summits rise from Nepal&apos;s borders.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {MOUNTAIN_PEAKS.map((peak) => (
                <div
                  key={peak.name}
                  className="glass float-shadow rounded-2xl overflow-hidden group relative"
                >
                  {/* Photo */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={peak.photo}
                      alt={peak.name}
                      fill
                      sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 50vw"
                      className="object-cover graded transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-black/30 to-transparent" />

                    {/* Elevation badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider"
                        style={{
                          fontFamily: "var(--font-syne)",
                          background: "rgba(212,168,67,0.18)",
                          border: "1px solid rgba(212,168,67,0.35)",
                          color: "#d4a843",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {peak.elevation}
                      </span>
                    </div>

                    {/* Icon accent */}
                    <div className="absolute top-3 right-3 text-lg opacity-70">
                      {peak.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p
                      className="text-[15px] font-semibold text-[#f0ece3] mb-0.5"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {peak.name}
                    </p>
                    <p
                      className="text-[13px] mb-2"
                      style={{ fontFamily: "var(--font-devanagari)", color: "#d4a843", opacity: 0.75 }}
                    >
                      {peak.devanagari}
                    </p>
                    <p
                      className="text-[11px] text-[rgba(240,236,227,0.55)] leading-snug mb-2"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {peak.description}
                    </p>
                    <p
                      className="text-[9px] tracking-wider uppercase text-[#8a8978]"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {peak.note}
                    </p>
                  </div>

                  {/* Book trek hover CTA */}
                  <Link
                    href="/booking?cat=trekking"
                    className="absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <span
                      className="px-3 py-1.5 rounded-full text-[10px] font-semibold"
                      style={{
                        fontFamily: "var(--font-syne)",
                        background: "rgba(212,168,67,0.15)",
                        border: "1px solid rgba(212,168,67,0.4)",
                        color: "#d4a843",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      Book trek →
                    </span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Booking nudge */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/booking?cat=trekking"
                className="glass-gold float-shadow rounded-full px-8 py-3 text-[12px] font-semibold tracking-[0.2em] uppercase text-[#d4a843] hover:scale-105 transition-transform duration-200"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Plan your Himalayan trek →
              </Link>
            </div>
          </section>

          <PrayerFlagDivider opacity={0.3} />

          {/* ── Trekking Routes ── */}
          <section>
            <p
              className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
              style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
            >
              Trekking Routes · ट्रेकिङ मार्गहरू
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#f0ece3] mb-8"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Classic trails
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {TREK_ROUTES.map((route) => {
                const diffCol = DIFFICULTY_COLOR[route.difficulty] ?? "#d4a843";
                return (
                  <Link
                    key={route.name}
                    href={route.href}
                    className="glass float-shadow card-lift rounded-2xl overflow-hidden group flex flex-col sm:flex-row"
                  >
                    {/* Photo */}
                    <div className="relative shrink-0 h-44 sm:h-auto sm:w-44 overflow-hidden">
                      <Image
                        src={route.photo}
                        alt={route.name}
                        fill
                        sizes="(min-width:640px) 176px, 100vw"
                        className="object-cover graded transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#07070d]/20 sm:bg-gradient-to-r sm:from-transparent sm:to-[#07070d]/40" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
                      <div>
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-xl shrink-0">{route.icon}</span>
                          <div>
                            <p
                              className="text-[15px] font-semibold text-[#f0ece3] group-hover:text-[#d4a843] transition-colors leading-tight"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {route.name}
                            </p>
                            <p
                              className="text-[11px] text-[#d4a843] mt-0.5"
                              style={{ fontFamily: "var(--font-syne)" }}
                            >
                              {route.duration}
                            </p>
                          </div>
                        </div>
                        <p
                          className="text-[12px] leading-relaxed text-[rgba(240,236,227,0.58)] line-clamp-3"
                          style={{ fontFamily: "var(--font-syne)" }}
                        >
                          {route.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <span
                          className="px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-wider"
                          style={{
                            fontFamily: "var(--font-syne)",
                            background: `${diffCol}18`,
                            border: `1px solid ${diffCol}44`,
                            color: diffCol,
                          }}
                        >
                          {route.difficulty}
                        </span>
                        <span
                          className="px-2.5 py-1 rounded-full text-[9px] text-[#8a8978]"
                          style={{
                            fontFamily: "var(--font-syne)",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          📅 {route.season}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <PrayerFlagDivider opacity={0.3} />

          {/* ── Basecamps & Viewpoints ── */}
          <section>
            <p
              className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
              style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
            >
              Basecamps &amp; Viewpoints
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#f0ece3] mb-8"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              High-altitude landmarks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {VIEWPOINTS.map((vp) => (
                <Link
                  key={vp.name}
                  href={vp.href}
                  className="glass float-shadow card-lift rounded-2xl overflow-hidden group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={vp.photo}
                      alt={vp.name}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover graded transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <p
                        className="text-[13px] font-semibold text-[#f0ece3] group-hover:text-[#d4a843] transition-colors mb-0.5"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {vp.icon} {vp.name}
                      </p>
                      <p
                        className="text-[11px] text-[#d4a843]"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {vp.elevation}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <p
                      className="text-[11px] text-[#8a8978]"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {vp.note}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Book CTA ── */}
          <section className="pb-6">
            <div
              className="glass-gold float-shadow-gold rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-6 items-center justify-between"
              style={{ border: "1px solid rgba(212,168,67,0.2)" }}
            >
              <div>
                <p
                  className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-2"
                  style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
                >
                  Ready for the mountains?
                </p>
                <h2
                  className="text-3xl md:text-4xl text-[#f0ece3] mb-2"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  Book your trek
                </h2>
                <p
                  className="text-xl text-[#d4a843] mb-3"
                  style={{ fontFamily: "var(--font-devanagari)", opacity: 0.75 }}
                >
                  तपाईंको ट्रेक बुक गर्नुहोस्
                </p>
                <p
                  className="text-[14px] text-[#8a8978] max-w-md"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Guided and self-guided treks with instant confirmation. Local expertise, fair pricing.
                </p>
              </div>
              <Link
                href="/booking?cat=trekking"
                className="shrink-0 px-8 py-4 rounded-full font-semibold text-[13px] tracking-[0.15em] uppercase transition-all duration-200 hover:scale-105"
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
