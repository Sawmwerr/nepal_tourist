import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DESTINATION_LIST } from "@/lib/data";

export const metadata: Metadata = {
  title: "Destinations — Nepal",
  description: "Explore Nepal's most iconic destinations — from Everest Base Camp to ancient Kathmandu temples, curated by the community.",
};

const TYPE_COLORS: Record<string, { text: string; bg: string; icon: string }> = {
  Trek:     { text: '#5b9bd5', bg: 'rgba(26,74,122,0.2)',   icon: '🎒' },
  City:     { text: '#d4834a', bg: 'rgba(123,63,0,0.2)',    icon: '🏛️' },
  Culture:  { text: '#b078c8', bg: 'rgba(74,35,90,0.2)',    icon: '🛕' },
  Spiritual:{ text: '#d4a843', bg: 'rgba(212,168,67,0.12)', icon: '☸️' },
  Nature:   { text: '#52c98a', bg: 'rgba(30,132,73,0.2)',   icon: '🌿' },
  Wildlife: { text: '#e88a3a', bg: 'rgba(140,70,10,0.2)',   icon: '🐅' },
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy:        '#52c98a',
  Moderate:    '#d4a843',
  Challenging: '#e88a3a',
  Expert:      '#e05a5a',
};

export default function DestinationsPage() {
  const types = ['All', ...Array.from(new Set(DESTINATION_LIST.map(d => d.type)))];

  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-14 pb-12">
          <p
            className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-4"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 500 }}
          >
            Explore Nepal
          </p>
          <h1
            className="text-5xl md:text-7xl leading-none mb-5 fade-up"
            style={{ fontFamily: 'var(--font-playfair)', fontWeight: 600 }}
          >
            Every destination,{' '}
            <em className="text-gradient-gold">waiting</em>
          </h1>
          <p
            className="text-[14px] text-[rgba(240,236,227,0.55)] max-w-xl leading-relaxed"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            From the world's highest peaks to hidden medieval cities — Nepal's
            destinations ranked and rated by the community.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 2.5rem' }} />

        {/* Grid */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">

          {/* Type legend */}
          <div className="flex flex-wrap gap-2 mb-10">
            {types.map(t => {
              const cfg = t === 'All' ? null : TYPE_COLORS[t];
              return (
                <span
                  key={t}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    letterSpacing: '0.1em',
                    background: cfg ? cfg.bg : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${cfg ? cfg.text + '44' : 'rgba(255,255,255,0.08)'}`,
                    color: cfg ? cfg.text : 'rgba(240,236,227,0.5)',
                  }}
                >
                  {cfg && <span>{cfg.icon}</span>}
                  {t}
                </span>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {DESTINATION_LIST.map((dest, i) => {
              const cfg = TYPE_COLORS[dest.type] ?? { text: '#d4a843', bg: 'rgba(212,168,67,0.12)', icon: '📍' };
              const diffColor = dest.difficulty ? DIFFICULTY_COLORS[dest.difficulty] : '#d4a843';

              return (
                <article
                  key={dest.slug}
                  className="glass float-shadow card-lift flex flex-col overflow-hidden group"
                  style={{
                    borderRadius: 20,
                    animation: `fadeUp 0.5s ease-out ${i * 50}ms both`,
                  }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: 180 }}>
                    <img
                      src={dest.image}
                      alt={dest.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(7,7,13,0.75) 0%, transparent 55%)' }}
                    />
                    {/* Type badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-semibold"
                        style={{
                          fontFamily: 'var(--font-syne)',
                          background: cfg.bg,
                          border: `1px solid ${cfg.text}44`,
                          color: cfg.text,
                          backdropFilter: 'blur(12px)',
                        }}
                      >
                        <span>{cfg.icon}</span> {dest.type}
                      </span>
                    </div>
                    {/* Elevation */}
                    {dest.elevation && (
                      <div className="absolute bottom-3 right-3">
                        <span
                          className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            fontFamily: 'var(--font-syne)',
                            background: 'rgba(7,7,13,0.7)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            color: 'rgba(240,236,227,0.7)',
                          }}
                        >
                          {dest.elevation}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="text-[14px] font-semibold text-[#f0ece3] leading-snug transition-colors group-hover:text-[#d4a843]"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                      >
                        {dest.name}
                      </h3>
                    </div>

                    <p
                      className="text-[10px] text-[#6b6a5a]"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {dest.region}
                    </p>

                    <p
                      className="text-[11px] text-[rgba(240,236,227,0.5)] leading-relaxed line-clamp-2 flex-1"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {dest.description}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center justify-between mt-2 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <div className="flex items-center gap-3">
                        {dest.duration && (
                          <span
                            className="text-[9px] text-[#6b6a5a]"
                            style={{ fontFamily: 'var(--font-syne)' }}
                          >
                            {dest.duration}
                          </span>
                        )}
                        {dest.difficulty && (
                          <span
                            className="text-[9px] font-semibold"
                            style={{ fontFamily: 'var(--font-syne)', color: diffColor }}
                          >
                            {dest.difficulty}
                          </span>
                        )}
                      </div>
                      <span
                        className="flex items-center gap-1 text-[9px] text-[#6b6a5a]"
                        style={{ fontFamily: 'var(--font-syne)' }}
                      >
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        {dest.stories} stories
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
