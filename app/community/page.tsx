import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunityGrid from "@/components/CommunityGrid";
import { COMMUNITY_POSTS, COMMUNITY_STATS, TOP_CONTRIBUTORS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Community — Nepal Travelers",
  description: "Stories, trek reports, cultural experiences, and travel tips from 18,400+ travelers exploring Nepal.",
};

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-14 pb-12">

          {/* Eyebrow */}
          <p
            className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-4 fade-up"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 500 }}
          >
            Nepal Travelers Community
          </p>

          {/* Heading */}
          <h1
            className="text-5xl md:text-7xl leading-none mb-6 fade-up"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 600,
              animationDelay: '80ms',
            }}
          >
            Real stories,{' '}
            <em className="text-gradient-gold">real journeys</em>
          </h1>

          <p
            className="text-[14px] text-[rgba(240,236,227,0.55)] max-w-xl leading-relaxed mb-10 fade-up"
            style={{ fontFamily: 'var(--font-syne)', animationDelay: '160ms' }}
          >
            Trek reports, cultural insights, food diaries, and photography from travelers
            who've walked Nepal's trails — written by the community, for the community.
          </p>

          {/* Stats bar */}
          <div
            className="inline-flex flex-wrap gap-0 fade-up"
            style={{
              animationDelay: '220ms',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16,
            }}
          >
            {[
              { value: COMMUNITY_STATS.members, label: 'Members', icon: '👥' },
              { value: COMMUNITY_STATS.stories, label: 'Stories', icon: '📖' },
              { value: COMMUNITY_STATS.countries, label: 'Countries', icon: '🌍' },
              { value: COMMUNITY_STATS.treks, label: 'Treks Covered', icon: '🗺️' },
            ].map((s, i, arr) => (
              <div
                key={s.label}
                className="flex items-center gap-3 px-6 py-4"
                style={{
                  borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}
              >
                <span className="text-lg">{s.icon}</span>
                <div>
                  <p
                    className="text-[16px] font-bold text-[#d4a843]"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {s.value}
                  </p>
                  <p
                    className="text-[9px] tracking-[0.3em] uppercase text-[#6b6a5a]"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 2.5rem' }} />

        {/* Posts grid with filters — client component */}
        <div className="pt-10">
          <CommunityGrid posts={COMMUNITY_POSTS} contributors={TOP_CONTRIBUTORS} />
        </div>

      </main>
      <Footer />
    </>
  );
}
