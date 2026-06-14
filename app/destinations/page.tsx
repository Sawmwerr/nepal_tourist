import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import PrayerFlagDivider from "@/components/PrayerFlagDivider";
import { DESTINATION_LIST } from "@/lib/data";

export const metadata: Metadata = {
  title: "Destinations — Nepal",
  description: "Explore Nepal's most iconic destinations — from Everest Base Camp to ancient Kathmandu temples, curated by the community.",
};

const TYPE_COLORS: Record<string, { text: string; bg: string; icon: string }> = {
  Trek:     { text: '#5b9bd5', bg: 'rgba(26,74,122,0.22)',   icon: '🎒' },
  City:     { text: '#d4834a', bg: 'rgba(123,63,0,0.22)',    icon: '🏛️' },
  Culture:  { text: '#b078c8', bg: 'rgba(74,35,90,0.22)',    icon: '🛕' },
  Spiritual:{ text: '#d4a843', bg: 'rgba(212,168,67,0.14)',  icon: '☸️' },
  Nature:   { text: '#52c98a', bg: 'rgba(30,132,73,0.22)',   icon: '🌿' },
  Wildlife: { text: '#e88a3a', bg: 'rgba(140,70,10,0.22)',   icon: '🐅' },
};

export default function DestinationsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* ── Hero ── */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-14 pb-10">
          <Reveal>
            <p
              className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-4"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 500 }}
            >
              Explore Nepal · नेपाल अन्वेषण
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              className="text-5xl md:text-7xl leading-none mb-5"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              Every destination,{' '}
              <em className="text-gradient-gold">waiting</em>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p
              className="text-[14px] text-[rgba(240,236,227,0.6)] max-w-xl leading-relaxed"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              From the world&apos;s highest peaks to hidden medieval cities — twelve destinations
              ranked and explored by the community.
            </p>
          </Reveal>
        </div>

        <PrayerFlagDivider className="mx-6 md:mx-10" opacity={0.4} />

        {/* ── Destination grid ── */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">

          {/* Type legend — visual reference only, not interactive filters */}
          <Reveal className="flex flex-wrap gap-2 mb-10">
            {Object.entries(TYPE_COLORS).map(([type, cfg]) => (
              <span
                key={type}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-semibold tracking-wider uppercase"
                style={{
                  fontFamily: 'var(--font-syne)',
                  background: cfg.bg,
                  color: cfg.text,
                }}
              >
                <span aria-hidden="true">{cfg.icon}</span>
                {type}
              </span>
            ))}
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {DESTINATION_LIST.map((dest, i) => {
              const cfg = TYPE_COLORS[dest.type] ?? { text: '#d4a843', bg: 'rgba(212,168,67,0.12)', icon: '📍' };

              return (
                <Reveal key={dest.slug} delay={Math.min(i, 7) * 0.05}>
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="glass card-lift rounded-2xl overflow-hidden group flex flex-col"
                  >
                    {/* 4:3 photo */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 50vw"
                        className="object-cover graded transition-transform duration-600 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />

                      {/* Type badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-semibold"
                          style={{
                            fontFamily: 'var(--font-syne)',
                            background: cfg.bg,
                            color: cfg.text,
                            backdropFilter: 'blur(12px)',
                          }}
                        >
                          <span aria-hidden="true">{cfg.icon}</span>
                          {dest.type}
                        </span>
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="p-5 flex flex-col flex-1">
                      <p
                        className="text-[15px] font-semibold text-[#f0ece3] group-hover:text-[#d4a843] transition-colors duration-200 mb-0.5 leading-tight"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {dest.name}
                      </p>
                      {dest.devanagari && (
                        <p
                          className="text-[12px] mb-2"
                          style={{ fontFamily: 'var(--font-devanagari)', color: '#d4a843', opacity: 0.72 }}
                        >
                          {dest.devanagari}
                        </p>
                      )}
                      {/* Single calm metadata line */}
                      <p
                        className="text-[11px] text-[rgba(240,236,227,0.6)] flex-1 mb-4"
                        style={{ fontFamily: 'var(--font-syne)' }}
                      >
                        {dest.region} · {dest.duration}
                      </p>
                      <span
                        className="self-start text-[10px] font-semibold text-[#d4a843] tracking-wide"
                        style={{ fontFamily: 'var(--font-syne)' }}
                      >
                        Explore →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
