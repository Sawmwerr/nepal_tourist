import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageReveal from "@/components/ui/ImageReveal";
import { COMMUNITY_POSTS } from "@/lib/data";

export function generateStaticParams() {
  return COMMUNITY_POSTS.map((p) => ({ slug: p.slug }));
}

const BASE = "https://project-hlg8a.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = COMMUNITY_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };

  const url = `${BASE}/community/${slug}`;
  const imageUrl = `${BASE}${post.image}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

const CATEGORY_STYLE: Record<string, { label: string; bg: string; border: string; text: string; icon: string }> = {
  "trek-report":    { label: "Trek Report",    bg: "rgba(26,74,122,0.2)",   border: "rgba(91,155,213,0.3)",  text: "#5b9bd5", icon: "🎒" },
  "cultural-story": { label: "Cultural Story", bg: "rgba(123,63,0,0.2)",    border: "rgba(212,131,74,0.3)",  text: "#d4834a", icon: "🛕" },
  "food-travel":    { label: "Food & Travel",  bg: "rgba(30,132,73,0.2)",   border: "rgba(82,201,138,0.3)",  text: "#52c98a", icon: "🍛" },
  "travel-tip":     { label: "Travel Tip",     bg: "rgba(212,168,67,0.12)", border: "rgba(212,168,67,0.3)",  text: "#d4a843", icon: "💡" },
  "photography":    { label: "Photography",    bg: "rgba(74,35,90,0.2)",    border: "rgba(176,120,200,0.3)", text: "#b078c8", icon: "📷" },
};

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = COMMUNITY_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const cat = CATEGORY_STYLE[post.category];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `${BASE}/community/${post.slug}`,
    image: `${BASE}${post.image}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Nepal Community",
      url: BASE,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-20">

        {/* ── Hero image ── */}
        <div className="relative h-[50vh] min-h-[320px] overflow-hidden">
          <ImageReveal>
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="100vw"
              priority
              className="object-cover graded"
            />
          </ImageReveal>
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-black/50 to-black/20" />

          {/* Back link */}
          <div className="absolute top-8 left-6 md:left-10 z-10">
            <Link
              href="/community"
              className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-semibold transition-colors duration-200 hover:text-[#d4a843]"
              style={{ fontFamily: "var(--font-syne)", color: "rgba(240,236,227,0.65)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Community
            </Link>
          </div>

          {/* Category + title */}
          <div className="absolute bottom-8 left-6 md:left-10 right-6 md:right-10">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold mb-4 w-fit block"
              style={{
                fontFamily: "var(--font-syne)",
                background: cat.bg,
                border: `1px solid ${cat.border}`,
                color: cat.text,
                backdropFilter: "blur(12px)",
              }}
            >
              {cat.icon} {cat.label}
            </span>
            <h1
              className="text-4xl md:text-6xl text-[#f0ece3] leading-tight max-w-3xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              {post.title}
            </h1>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="max-w-[860px] mx-auto px-6 md:px-10 py-14">

          {/* Author + meta */}
          <div
            className="flex items-center justify-between gap-4 mb-10 pb-8"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0 text-xs"
                style={{ background: post.author.color, fontFamily: "var(--font-syne)" }}
              >
                {post.author.initials}
              </div>
              <div>
                <p
                  className="text-[13px] font-semibold text-[#f0ece3]"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {post.author.name} {post.author.flag}
                </p>
                <p
                  className="text-[10px] text-[#8a8978]"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {post.author.badge} · {post.date}
                </p>
              </div>
            </div>
            <span
              className="text-[11px] text-[#8a8978] shrink-0"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {post.readTime} read
            </span>
          </div>

          {/* Body — excerpt is all the content we have */}
          <p
            className="text-lg text-[rgba(240,236,227,0.75)] leading-relaxed mb-12"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-3 py-1.5 rounded-full"
                style={{
                  fontFamily: "var(--font-syne)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "rgba(240,236,227,0.5)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div
            className="flex items-center gap-8 py-6"
            style={{
              borderTop:    "1px solid rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {[
              { label: "likes",    value: fmt(post.likes),    icon: "♥" },
              { label: "comments", value: fmt(post.comments), icon: "💬" },
              { label: "views",    value: fmt(post.views),    icon: "👁" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 text-[#8a8978]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                <span>{s.icon}</span>
                <span className="text-[13px] font-semibold text-[#f0ece3]">{s.value}</span>
                <span className="text-[11px]">{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
