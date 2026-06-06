import Link from "next/link";
import { MOUNTAIN_PEAKS, TREK_ROUTES, VIEWPOINTS } from "@/lib/data";
import Reveal from "./Reveal";

export default function MountainsTeaser() {
  return (
    <section className="section-pad" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-[1400px] mx-auto">

        {/* ── Header ── */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p
              className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
              style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
            >
              Mountains &amp; Treks
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#f0ece3] leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Eight peaks above{" "}
              <em className="text-gradient-gold">8,000 m</em>
            </h2>
            <p
              className="mt-4 text-[13px] text-[rgba(240,236,227,0.5)] max-w-lg leading-relaxed"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Nepal holds 8 of the planet&apos;s 14 highest mountains and over
              1,400 trekking routes — from half-day walks to month-long
              high-altitude expeditions.
            </p>
          </div>
          <Link
            href="/mountains"
            className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-[#d4a843] hover:text-[#f0ece3] transition-colors duration-300 hover-line shrink-0"
            style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
          >
            View all →
          </Link>
        </Reveal>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Left — 8,000 m peaks — stagger */}
          <div>
            <p
              className="text-[9px] tracking-[0.45em] uppercase text-[#6b6a5a] mb-4 font-semibold"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Nepal&apos;s 8,000 m peaks
            </p>
            <div className="grid grid-cols-2 gap-3">
              {MOUNTAIN_PEAKS.map((peak, i) => (
                <Reveal key={peak.name} delay={i * 0.06}>
                  <div
                    className="glass float-shadow card-lift flex items-start gap-3 p-4"
                    style={{ borderRadius: 16 }}
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{peak.icon}</span>
                    <div className="min-w-0">
                      <p
                        className="text-[13px] font-semibold text-[#f0ece3] leading-tight truncate"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {peak.name}
                      </p>
                      <p
                        className="text-[11px] text-gradient-gold font-bold mt-0.5"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {peak.elevation}
                      </p>
                      <p
                        className="text-[10px] text-[#6b6a5a] mt-0.5"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {peak.note}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right — Trek routes — stagger */}
          <div>
            <p
              className="text-[9px] tracking-[0.45em] uppercase text-[#6b6a5a] mb-4 font-semibold"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Classic trekking routes
            </p>
            <div className="flex flex-col gap-2">
              {TREK_ROUTES.map((route, i) => (
                <Reveal key={route.name} delay={i * 0.06}>
                  <Link
                    href={route.href}
                    className="glass float-shadow flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:border-[rgba(212,168,67,0.3)]"
                    style={{ borderRadius: 14 }}
                  >
                    <span className="text-lg shrink-0">{route.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[12px] font-semibold text-[#f0ece3] truncate"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {route.name}
                      </p>
                      <p
                        className="text-[10px] text-[#6b6a5a]"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {route.note}
                      </p>
                    </div>
                    <span
                      className="text-[10px] text-[#d4a843] shrink-0 font-medium"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {route.duration}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── Viewpoints strip — stagger ── */}
        <div>
          <p
            className="text-[9px] tracking-[0.45em] uppercase text-[#6b6a5a] mb-4 font-semibold"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            High-altitude viewpoints
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {VIEWPOINTS.map((vp, i) => (
              <Reveal key={vp.name} delay={i * 0.05}>
                <Link
                  href={vp.href}
                  className="glass float-shadow flex flex-col items-center text-center gap-2 p-4 transition-all duration-200 hover:border-[rgba(212,168,67,0.25)]"
                  style={{ borderRadius: 16 }}
                >
                  <span className="text-2xl">{vp.icon}</span>
                  <p
                    className="text-[11px] font-semibold text-[#f0ece3] leading-tight"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {vp.name}
                  </p>
                  <p
                    className="text-[10px] text-gradient-gold font-bold"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {vp.elevation}
                  </p>
                  <p
                    className="text-[9px] text-[#6b6a5a] leading-tight"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {vp.note}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="flex justify-center mt-8 md:hidden">
          <Link
            href="/mountains"
            className="text-[10px] tracking-[0.4em] uppercase text-[#d4a843] glass float-shadow rounded-full px-8 py-3 hover:border-[rgba(212,168,67,0.3)] transition-colors duration-300"
            style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
          >
            View all mountains →
          </Link>
        </div>

      </div>
    </section>
  );
}
