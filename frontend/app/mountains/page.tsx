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

// ─── Shared card tokens ───────────────────────────────────────────────────────
// aspect-[4/3] image · rounded-2xl · p-5 · card-lift · one metadata line

function SectionIntro({
  eyebrow,
  heading,
  standfirst,
}: {
  eyebrow: string;
  heading: React.ReactNode;
  standfirst: string;
}) {
  return (
    <div className="mb-10">
      <p
        className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
        style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-3xl md:text-4xl text-[#f0ece3] mb-3"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
      >
        {heading}
      </h2>
      <p
        className="text-[13px] text-[rgba(240,236,227,0.6)] max-w-lg leading-relaxed"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {standfirst}
      </p>
    </div>
  );
}

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
            className="text-[14px] text-[rgba(240,236,227,0.6)] max-w-xl leading-relaxed fade-up"
            style={{ fontFamily: "var(--font-syne)", animationDelay: "160ms" }}
          >
            Nepal holds eight of the world&apos;s fourteen 8,000 m peaks and some
            of the most celebrated trekking routes on the planet.
          </p>
        </div>

        <PrayerFlagDivider className="mx-6 md:mx-10" opacity={0.4} />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 flex flex-col gap-24">

          {/* ── 8,000 m Peaks ── */}
          <section>
            <SectionIntro
              eyebrow="8,000 m Peaks · ८,०००+ मिटर"
              heading="Nepal's giants"
              standfirst="Eight of the fourteen highest summits on Earth — all rising from Nepal's borders."
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {MOUNTAIN_PEAKS.map((peak) => (
                <Link
                  key={peak.name}
                  href="/booking?cat=trekking"
                  className="glass card-lift rounded-2xl overflow-hidden group flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={peak.photo}
                      alt={peak.name}
                      fill
                      sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 50vw"
                      className="object-cover graded transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <div className="absolute top-3 right-3 text-base opacity-60" aria-hidden="true">
                      {peak.icon}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <p
                      className="text-[15px] font-semibold text-[#f0ece3] group-hover:text-[#d4a843] transition-colors duration-200 mb-0.5 leading-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {peak.name}
                    </p>
                    <p
                      className="text-[12px] mb-2"
                      style={{ fontFamily: "var(--font-devanagari)", color: "#d4a843", opacity: 0.72 }}
                    >
                      {peak.devanagari}
                    </p>
                    <p
                      className="text-[11px] text-[rgba(240,236,227,0.6)] flex-1 mb-4"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {peak.elevation} · {peak.note}
                    </p>
                    <span
                      className="self-start text-[10px] font-semibold text-[#d4a843] tracking-wide"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      Book trek →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
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

          {/* ── Trekking Routes ── */}
          <section>
            <SectionIntro
              eyebrow="Trekking Routes · ट्रेकिङ मार्गहरू"
              heading="Classic trails"
              standfirst="From a 4-day introduction to a 20-day expedition — a route for every ambition."
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {TREK_ROUTES.map((route) => {
                const isBookingLink = route.href.startsWith("/booking");
                return (
                  <Link
                    key={route.name}
                    href={route.href}
                    className="glass card-lift rounded-2xl overflow-hidden group flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={route.photo}
                        alt={route.name}
                        fill
                        sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 50vw"
                        className="object-cover graded transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                      <div className="absolute top-3 right-3 text-base opacity-60" aria-hidden="true">
                        {route.icon}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <p
                        className="text-[15px] font-semibold text-[#f0ece3] group-hover:text-[#d4a843] transition-colors duration-200 mb-2 leading-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {route.name}
                      </p>
                      <p
                        className="text-[11px] text-[rgba(240,236,227,0.6)] flex-1 mb-4"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {route.duration} · {route.difficulty} · {route.season}
                      </p>
                      <span
                        className="self-start text-[10px] font-semibold text-[#d4a843] tracking-wide"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {isBookingLink ? "Book trek →" : "Explore →"}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <PrayerFlagDivider opacity={0.25} />

          {/* ── Basecamps & Viewpoints ── */}
          <section>
            <SectionIntro
              eyebrow="Basecamps & Viewpoints"
              heading="High-altitude landmarks"
              standfirst="The world's greatest high-altitude vantage points — all accessible on foot."
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {VIEWPOINTS.map((vp) => (
                <Link
                  key={vp.name}
                  href={vp.href}
                  className="glass card-lift rounded-2xl overflow-hidden group flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={vp.photo}
                      alt={vp.name}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 33vw, 50vw"
                      className="object-cover graded transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <p
                      className="text-[15px] font-semibold text-[#f0ece3] group-hover:text-[#d4a843] transition-colors duration-200 mb-2 leading-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {vp.icon} {vp.name}
                    </p>
                    <p
                      className="text-[11px] text-[rgba(240,236,227,0.6)] flex-1 mb-4"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {vp.elevation} · {vp.note}
                    </p>
                    <span
                      className="self-start text-[10px] font-semibold text-[#d4a843] tracking-wide"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      Explore →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Book CTA ── */}
          <section className="pb-4">
            <div
              className="glass-gold rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-6 items-center justify-between"
              style={{ border: "1px solid rgba(212,168,67,0.18)" }}
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
                  style={{ fontFamily: "var(--font-devanagari)", opacity: 0.72 }}
                >
                  तपाईंको ट्रेक बुक गर्नुहोस्
                </p>
                <p
                  className="text-[13px] text-[rgba(240,236,227,0.6)] max-w-md"
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
