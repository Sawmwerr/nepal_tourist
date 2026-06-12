import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOUNTAIN_PEAKS, TREK_ROUTES, VIEWPOINTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mountains & Treks — Nepal",
  description:
    "Nepal's 8,000m peaks, classic trekking routes, and high-altitude basecamps — everything you need to plan your Himalayan adventure.",
};

export default function MountainsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* ── Hero ── */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-14 pb-12">
          <p
            className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-4 fade-up"
            style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
          >
            Mountains &amp; Treks
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
            Nepal holds eight of the world&apos;s fourteen 8,000m peaks and some
            of the most celebrated trekking routes on the planet.
          </p>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 2.5rem" }} />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 flex flex-col gap-16">

          {/* ── 8,000 m Peaks ── */}
          <section>
            <p
              className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
              style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
            >
              8,000 m Peaks
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#f0ece3] mb-8"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Nepal&apos;s giants
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {MOUNTAIN_PEAKS.map((peak) => (
                <div
                  key={peak.name}
                  className="glass float-shadow flex flex-col items-center text-center p-5 rounded-2xl"
                >
                  <span className="text-3xl mb-3">{peak.icon}</span>
                  <p
                    className="text-[13px] font-semibold text-[#f0ece3] mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {peak.name}
                  </p>
                  <p
                    className="text-[11px] text-[#d4a843] font-semibold mb-1"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {peak.elevation}
                  </p>
                  <p
                    className="text-[9px] tracking-wide text-[#8a8978]"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {peak.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Trekking Routes ── */}
          <section>
            <p
              className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
              style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
            >
              Trekking Routes
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#f0ece3] mb-8"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Classic trails
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TREK_ROUTES.map((route) => (
                <Link
                  key={route.name}
                  href={route.href}
                  className="glass float-shadow card-lift flex flex-col gap-3 p-5 rounded-2xl group"
                >
                  <span className="text-2xl">{route.icon}</span>
                  <div>
                    <p
                      className="text-[13px] font-semibold text-[#f0ece3] group-hover:text-[#d4a843] transition-colors mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {route.name}
                    </p>
                    <p
                      className="text-[11px] text-[#d4a843]"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {route.duration}
                    </p>
                  </div>
                  <p
                    className="text-[10px] text-[#8a8978]"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {route.note}
                  </p>
                </Link>
              ))}
            </div>
          </section>

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
                  className="glass float-shadow card-lift flex items-center gap-4 p-5 rounded-2xl group"
                >
                  <span className="text-2xl shrink-0">{vp.icon}</span>
                  <div className="min-w-0">
                    <p
                      className="text-[13px] font-semibold text-[#f0ece3] group-hover:text-[#d4a843] transition-colors truncate"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {vp.name}
                    </p>
                    <p
                      className="text-[11px] text-[#d4a843]"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {vp.elevation}
                    </p>
                    <p
                      className="text-[10px] text-[#8a8978]"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {vp.note}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
