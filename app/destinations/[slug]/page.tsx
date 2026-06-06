import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DESTINATION_LIST } from "@/lib/data";

export function generateStaticParams() {
  return DESTINATION_LIST.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = DESTINATION_LIST.find((d) => d.slug === slug);
  if (!dest) return { title: "Not Found" };
  return {
    title: `${dest.name} — Nepal`,
    description: dest.description,
  };
}

const TYPE_STYLE: Record<string, { text: string; bg: string; icon: string }> = {
  Trek:     { text: "#5b9bd5", bg: "rgba(26,74,122,0.25)",   icon: "🎒" },
  City:     { text: "#d4834a", bg: "rgba(123,63,0,0.25)",    icon: "🏛️" },
  Culture:  { text: "#b078c8", bg: "rgba(74,35,90,0.25)",    icon: "🛕" },
  Spiritual:{ text: "#d4a843", bg: "rgba(212,168,67,0.15)",  icon: "☸️" },
  Nature:   { text: "#52c98a", bg: "rgba(30,132,73,0.25)",   icon: "🌿" },
  Wildlife: { text: "#e88a3a", bg: "rgba(140,70,10,0.25)",   icon: "🐅" },
};

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy:        "#52c98a",
  Moderate:    "#d4a843",
  Challenging: "#e88a3a",
  Expert:      "#e05a5a",
};

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = DESTINATION_LIST.find((d) => d.slug === slug);
  if (!dest) notFound();

  const type   = TYPE_STYLE[dest.type] ?? TYPE_STYLE.Trek;
  const diffColor = DIFFICULTY_COLOR[dest.difficulty] ?? "#d4a843";

  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* ── Hero image ── */}
        <div className="relative h-[55vh] min-h-[360px] overflow-hidden">
          <img
            src={dest.image}
            alt={dest.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-black/40 to-black/20" />

          {/* Back link */}
          <div className="absolute top-8 left-6 md:left-10 z-10">
            <Link
              href="/destinations"
              className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-semibold transition-colors duration-200 hover:text-[#d4a843]"
              style={{ fontFamily: "var(--font-syne)", color: "rgba(240,236,227,0.65)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              All Destinations
            </Link>
          </div>

          {/* Type badge + title */}
          <div className="absolute bottom-8 left-6 md:left-10">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold mb-4 block w-fit"
              style={{
                fontFamily: "var(--font-syne)",
                background: type.bg,
                border: `1px solid ${type.text}44`,
                color: type.text,
                backdropFilter: "blur(12px)",
              }}
            >
              {type.icon} {dest.type}
            </span>
            <h1
              className="text-5xl md:text-7xl text-[#f0ece3] leading-none"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
            >
              {dest.name}
            </h1>
            <p
              className="text-[11px] tracking-[0.35em] uppercase text-[rgba(240,236,227,0.45)] mt-2"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {dest.region}
            </p>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14">
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* Description */}
            <div className="flex-1 min-w-0">
              <p
                className="text-base text-[rgba(240,236,227,0.7)] leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-syne)", maxWidth: 680 }}
              >
                {dest.description}
              </p>

              <div
                className="flex items-center gap-2 text-[12px] text-[#6b6a5a]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {dest.stories} community stories about this destination
              </div>
            </div>

            {/* Stats panel */}
            <div className="lg:w-72 shrink-0 grid grid-cols-2 lg:grid-cols-1 gap-3">
              {[
                { label: "Elevation",   value: dest.elevation,   color: undefined },
                { label: "Duration",    value: dest.duration,    color: undefined },
                { label: "Difficulty",  value: dest.difficulty,  color: diffColor },
                { label: "Best Season", value: dest.bestSeason,  color: undefined },
              ].map((s) => (
                <div
                  key={s.label}
                  className="glass float-shadow rounded-2xl px-5 py-4"
                >
                  <p
                    className="text-[9px] tracking-[0.4em] uppercase text-[#6b6a5a] mb-1"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {s.label}
                  </p>
                  <p
                    className="text-[15px] font-semibold"
                    style={{ fontFamily: "var(--font-syne)", color: s.color ?? "#f0ece3" }}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
