"use client";

import { useState } from "react";
import type { CommunityPost, PostCategory, TopContributor } from "@/lib/data";
import PostCard from "./PostCard";

type FilterType = PostCategory | 'all';

const FILTERS: { id: FilterType; label: string; icon: string }[] = [
  { id: 'all',            label: 'All Stories',    icon: '🌏' },
  { id: 'trek-report',   label: 'Trek Reports',   icon: '🎒' },
  { id: 'cultural-story',label: 'Culture',        icon: '🛕' },
  { id: 'food-travel',   label: 'Food & Travel',  icon: '🍛' },
  { id: 'travel-tip',    label: 'Travel Tips',    icon: '💡' },
  { id: 'photography',   label: 'Photography',    icon: '📷' },
];

export default function CommunityGrid({
  posts,
  contributors,
}: {
  posts: CommunityPost[];
  contributors: TopContributor[];
}) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filtered = activeFilter === 'all'
    ? posts
    : posts.filter(p => p.category === activeFilter);

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {FILTERS.map(f => {
          const active = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 shrink-0"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                background: active ? 'linear-gradient(135deg, #d4a843, #e8c547)' : 'rgba(255,255,255,0.04)',
                color: active ? '#07070d' : 'rgba(240,236,227,0.5)',
                border: active ? 'none' : '1px solid rgba(255,255,255,0.07)',
                boxShadow: active ? '0 4px 16px rgba(212,168,67,0.25)' : 'none',
              }}
            >
              <span>{f.icon}</span>
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-10 items-start">

        {/* Main grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="glass rounded-3xl p-16 text-center">
              <p className="text-[14px] text-[#8a8978]" style={{ fontFamily: 'var(--font-syne)' }}>
                No stories yet in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((post, i) => (
                <div
                  key={post.id}
                  style={{
                    animation: `fadeUp 0.5s ease-out ${i * 60}ms both`,
                  }}
                >
                  <PostCard post={post} size={i === 0 && activeFilter === 'all' ? 'large' : 'normal'} />
                </div>
              ))}
            </div>
          )}

          {/* Count */}
          <p
            className="mt-8 text-center text-[11px] text-[#8a8978]"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Showing {filtered.length} of {posts.length} stories
          </p>
        </div>

        {/* Sidebar — desktop only */}
        <aside className="hidden xl:flex flex-col gap-5 w-64 shrink-0 sticky top-24">

          {/* Top Contributors */}
          <div className="glass float-shadow p-5 flex flex-col gap-4" style={{ borderRadius: 20 }}>
            <p
              className="text-[9px] tracking-[0.45em] uppercase text-[#d4a843] font-semibold"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Top Contributors
            </p>
            {contributors.map((c, i) => (
              <div key={c.name} className="flex items-center gap-3">
                <span
                  className="text-[10px] text-[#8a8978] w-4 shrink-0"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {i + 1}
                </span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                  style={{ background: c.color, fontFamily: 'var(--font-syne)' }}
                >
                  {c.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[11px] font-semibold text-[#f0ece3] truncate"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {c.name} <span className="opacity-60">{c.flag}</span>
                  </p>
                  <p
                    className="text-[9px] text-[#8a8978]"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {c.posts} stories · {(c.likes / 1000).toFixed(1)}k likes
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Popular tags */}
          <div className="glass float-shadow p-5 flex flex-col gap-3" style={{ borderRadius: 20 }}>
            <p
              className="text-[9px] tracking-[0.45em] uppercase text-[#d4a843] font-semibold"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Popular Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['EBC', 'Annapurna', 'Kathmandu', 'Solo Trek', 'Budget', 'Wildlife', 'Culture', 'Photography', 'Poon Hill', 'Spiritual', 'Mustang', 'Food'].map(tag => (
                <span
                  key={tag}
                  className="text-[9px] px-2.5 py-1 rounded-full cursor-pointer transition-all duration-200 hover:border-[rgba(212,168,67,0.4)] hover:text-[#d4a843]"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: 'rgba(240,236,227,0.45)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Join CTA */}
          <div
            className="p-5 flex flex-col gap-3"
            style={{
              borderRadius: 20,
              background: 'rgba(212,168,67,0.07)',
              border: '1px solid rgba(212,168,67,0.18)',
            }}
          >
            <p
              className="text-[13px] font-semibold text-[#f0ece3]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Share your Nepal story
            </p>
            <p
              className="text-[10px] text-[rgba(240,236,227,0.5)] leading-relaxed"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Join 18,400+ travelers documenting their journeys across Nepal.
            </p>
            <button
              className="w-full py-2.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-200 hover:opacity-90"
              style={{
                fontFamily: 'var(--font-syne)',
                background: 'linear-gradient(135deg, #d4a843, #e8c547)',
                color: '#07070d',
              }}
            >
              Write a Story
            </button>
          </div>

        </aside>
      </div>
    </div>
  );
}
