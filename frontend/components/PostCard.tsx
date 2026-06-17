import Link from "next/link";
import type { CommunityPost, PostCategory } from "@/lib/data";
import ParallaxImage from "./ParallaxImage";
import ImageReveal from "./ImageReveal";

const CATEGORY: Record<PostCategory, { label: string; bg: string; border: string; text: string; icon: string }> = {
  'trek-report':    { label: 'Trek Report',    bg: 'rgba(26,74,122,0.2)',    border: 'rgba(91,155,213,0.3)',  text: '#5b9bd5', icon: '🎒' },
  'cultural-story': { label: 'Cultural Story', bg: 'rgba(123,63,0,0.2)',     border: 'rgba(212,131,74,0.3)', text: '#d4834a', icon: '🛕' },
  'food-travel':    { label: 'Food & Travel',  bg: 'rgba(30,132,73,0.2)',    border: 'rgba(82,201,138,0.3)', text: '#52c98a', icon: '🍛' },
  'travel-tip':     { label: 'Travel Tip',     bg: 'rgba(212,168,67,0.12)',  border: 'rgba(212,168,67,0.3)', text: '#d4a843', icon: '💡' },
  'photography':    { label: 'Photography',    bg: 'rgba(74,35,90,0.2)',     border: 'rgba(176,120,200,0.3)',text: '#b078c8', icon: '📷' },
};

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export default function PostCard({ post, size = 'normal' }: { post: CommunityPost; size?: 'normal' | 'large' }) {
  const cat = CATEGORY[post.category];
  const isLarge = size === 'large';

  return (
    <Link href={`/community/${post.slug}`} className="block">
    <article
      className="glass float-shadow card-lift flex flex-col overflow-hidden group"
      style={{ borderRadius: 20 }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden shrink-0"
        style={{ height: isLarge ? 280 : 200 }}
      >
        <ImageReveal>
          <ParallaxImage
            src={post.image}
            alt={post.title}
            imgClassName="w-full h-full object-cover graded"
          />
        </ImageReveal>
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(7,7,13,0.7) 0%, transparent 60%)' }}
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide"
            style={{
              fontFamily: 'var(--font-syne)',
              background: cat.bg,
              border: `1px solid ${cat.border}`,
              color: cat.text,
              backdropFilter: 'blur(12px)',
            }}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Author row */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-white"
            style={{ background: post.author.color, fontFamily: 'var(--font-syne)' }}
          >
            {post.author.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-[11px] font-semibold text-[#f0ece3] truncate"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {post.author.name}
              <span className="ml-1.5 opacity-60">{post.author.flag}</span>
            </p>
            <p
              className="text-[9px] tracking-wide text-[#8a8978] truncate"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {post.author.badge}
            </p>
          </div>
          <span
            className="text-[9px] text-[#8a8978] shrink-0"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`text-[#f0ece3] leading-snug font-semibold transition-colors duration-200 group-hover:text-[#d4a843] ${isLarge ? 'text-[17px]' : 'text-[14px]'}`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className="text-[12px] text-[rgba(240,236,227,0.55)] leading-relaxed line-clamp-2 flex-1"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-[9px] px-2 py-0.5 rounded-full"
              style={{
                fontFamily: 'var(--font-syne)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(240,236,227,0.4)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[10px] text-[#8a8978]" style={{ fontFamily: 'var(--font-syne)' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {formatCount(post.likes)}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-[#8a8978]" style={{ fontFamily: 'var(--font-syne)' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              {formatCount(post.comments)}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-[#8a8978]" style={{ fontFamily: 'var(--font-syne)' }}>
              <svg width="11" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              {formatCount(post.views)}
            </span>
          </div>
          <span
            className="text-[9px] text-[#8a8978]"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {post.date}
          </span>
        </div>
      </div>
    </article>
    </Link>
  );
}
