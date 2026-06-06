import Link from "next/link";
import { COMMUNITY_POSTS, COMMUNITY_STATS } from "@/lib/data";
import PostCard from "./PostCard";

export default function CommunityTeaser() {
  const featured = COMMUNITY_POSTS.filter(p => p.featured).slice(0, 3);

  return (
    <section className="section-pad" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p
              className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 500 }}
            >
              Community
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#f0ece3] leading-tight"
              style={{ fontFamily: 'var(--font-playfair)', fontWeight: 600 }}
            >
              Stories from{' '}
              <em className="text-gradient-gold">real travelers</em>
            </h2>
            <p
              className="mt-4 text-[13px] text-[rgba(240,236,227,0.5)] max-w-md leading-relaxed"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {COMMUNITY_STATS.members} members from {COMMUNITY_STATS.countries} countries sharing
              trek reports, cultural experiences, and travel tips.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex gap-5 shrink-0">
            {[
              { value: COMMUNITY_STATS.members, label: 'Members' },
              { value: COMMUNITY_STATS.stories, label: 'Stories' },
              { value: COMMUNITY_STATS.countries, label: 'Countries' },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span
                  className="text-2xl font-bold text-gradient-gold"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[9px] tracking-[0.35em] uppercase text-[#6b6a5a]"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {featured.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-300 hover:opacity-90 active:scale-95"
            style={{
              fontFamily: 'var(--font-syne)',
              background: 'linear-gradient(135deg, #d4a843, #e8c547)',
              color: '#07070d',
              boxShadow: '0 4px 20px rgba(212,168,67,0.3)',
            }}
          >
            Explore all stories
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-300 hover:text-[#d4a843]"
            style={{
              fontFamily: 'var(--font-syne)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(240,236,227,0.6)',
            }}
          >
            Join the community
          </Link>
        </div>

      </div>
    </section>
  );
}
