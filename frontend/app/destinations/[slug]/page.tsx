import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageReveal from "@/components/ui/ImageReveal";
import NepalMapClient from "@/features/destinations/components/NepalMapClient";
import PrayerFlagDivider from "@/components/ui/PrayerFlagDivider";
import { DESTINATION_LIST, COMMUNITY_POSTS } from "@/lib/data";

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
    title: dest.name,
    description: dest.description,
    alternates: { canonical: `/destinations/${slug}` },
    openGraph: {
      title: dest.name,
      description: dest.description,
      type: "website",
      images: [{ url: dest.image, width: 1200, height: 630, alt: dest.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: dest.name,
      description: dest.description,
      images: [dest.image],
    },
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

  const type      = TYPE_STYLE[dest.type] ?? TYPE_STYLE.Trek;
  const diffColor = DIFFICULTY_COLOR[dest.difficulty] ?? "#d4a843";

  const relatedDests = dest.relatedSlugs
    .map(s => DESTINATION_LIST.find(d => d.slug === s))
    .filter(Boolean)
    .slice(0, 3) as typeof DESTINATION_LIST;

  const communityStories = COMMUNITY_POSTS
    .filter(p => p.tags.some(t => dest.communityTags.includes(t)))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: dest.name,
    description: dest.description,
    image: dest.image,
    touristType: dest.type,
    containedInPlace: { "@type": "Country", name: "Nepal" },
    ...(dest.coordinates && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: dest.coordinates[0],
        longitude: dest.coordinates[1],
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-20">

        {/* ── Hero ── */}
        <div className="relative h-[65vh] min-h-[440px] overflow-hidden">
          <ImageReveal>
            <Image
              src={dest.image}
              alt={dest.name}
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

          {/* Book CTA — top-right hero */}
          {dest.bookingCategory && (
            <div className="absolute top-8 right-6 md:right-10 z-10">
              <Link
                href={`/booking?cat=${dest.bookingCategory}`}
                className="glass-dark px-4 py-2 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-200 hover:text-[#d4a843] hover:border-[#d4a843]"
                style={{ fontFamily: "var(--font-syne)", color: "rgba(240,236,227,0.8)" }}
              >
                Book this →
              </Link>
            </div>
          )}

          {/* Type badge + title */}
          <div className="absolute bottom-10 left-6 md:left-10 max-w-3xl">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold mb-4 w-fit"
              style={{
                fontFamily: "var(--font-syne)",
                background: type.bg,
                border: `1px solid ${type.text}44`,
                color: type.text,
                backdropFilter: "blur(12px)",
                display: "flex",
              }}
            >
              {type.icon} {dest.type}
            </span>
            <h1
              className="text-5xl md:text-7xl text-[#f0ece3] leading-none mb-1"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              {dest.name}
            </h1>
            {dest.devanagari && (
              <p
                className="text-xl md:text-2xl mt-2"
                style={{
                  fontFamily: "var(--font-devanagari)",
                  color: "#d4a843",
                  opacity: 0.8,
                  fontWeight: 400,
                }}
              >
                {dest.devanagari}
              </p>
            )}
            <p
              className="text-[11px] tracking-[0.35em] uppercase text-[rgba(240,236,227,0.45)] mt-2"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {dest.region}
            </p>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10">

          {/* ── Overview + Stats ── */}
          <section className="py-16 flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1 min-w-0">
              <p
                className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
                style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
              >
                Overview
              </p>
              <h2
                className="text-3xl text-[#f0ece3] mb-6"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                About {dest.name}
              </h2>
              <div className="flex flex-col gap-5">
                {dest.overview.map((para, i) => (
                  <p
                    key={i}
                    className="text-[15px] leading-[1.8] text-[rgba(240,236,227,0.78)]"
                    style={{ fontFamily: "var(--font-syne)", maxWidth: 680 }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div
                className="flex items-center gap-2 text-[12px] text-[#8a8978] mt-8"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {dest.stories} community stories
              </div>
            </div>

            {/* Stats */}
            <div className="lg:w-72 shrink-0 grid grid-cols-2 lg:grid-cols-1 gap-3">
              {[
                { label: "Elevation",   value: dest.elevation,   color: undefined },
                { label: "Duration",    value: dest.duration,    color: undefined },
                { label: "Difficulty",  value: dest.difficulty,  color: diffColor },
                { label: "Best Season", value: dest.bestSeason,  color: undefined },
              ].map((s) => (
                <div key={s.label} className="glass float-shadow rounded-2xl px-5 py-4">
                  <p
                    className="text-[9px] tracking-[0.4em] uppercase text-[#8a8978] mb-1"
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

              {/* Book CTA in stats panel */}
              {dest.bookingCategory && (
                <Link
                  href={`/booking?cat=${dest.bookingCategory}`}
                  className="glass-gold float-shadow-gold rounded-2xl px-5 py-4 flex items-center gap-3 group col-span-2 lg:col-span-1 transition-all duration-200 hover:scale-[1.02]"
                >
                  <span className="text-xl">🗓️</span>
                  <div>
                    <p
                      className="text-[11px] tracking-wide uppercase text-[#d4a843] font-semibold mb-0.5"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      Book this trip
                    </p>
                    <p className="text-[11px] text-[#8a8978]" style={{ fontFamily: "var(--font-syne)" }}>
                      Instant confirmation
                    </p>
                  </div>
                  <svg className="ml-auto text-[#d4a843] group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </section>

          <PrayerFlagDivider opacity={0.35} />

          {/* ── Highlights ── */}
          {dest.highlights.length > 0 && (
            <section className="py-16">
              <p
                className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
                style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
              >
                Highlights
              </p>
              <h2
                className="text-3xl md:text-4xl text-[#f0ece3] mb-3"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                Why people come here
              </h2>
              <p
                className="text-[13px] text-[rgba(240,236,227,0.6)] mb-8 max-w-lg"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                What makes {dest.name} unforgettable — in six points.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dest.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="glass float-shadow rounded-2xl p-5 flex gap-3 items-start"
                  >
                    <span
                      className="text-[#d4a843] mt-0.5 shrink-0"
                      style={{ fontSize: 16 }}
                    >
                      ✦
                    </span>
                    <p
                      className="text-[13px] leading-relaxed text-[rgba(240,236,227,0.75)]"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {h}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Photo gallery ── */}
          {dest.gallery.length > 0 && (
            <section className="py-6">
              <p
                className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-5"
                style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
              >
                Gallery
              </p>
              <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollSnapType: "x mandatory" }}>
                {dest.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="relative shrink-0 rounded-2xl overflow-hidden"
                    style={{ width: "clamp(240px, 34vw, 440px)", aspectRatio: "4/3", scrollSnapAlign: "start" }}
                  >
                    <Image
                      src={img}
                      alt={`${dest.name} photo ${i + 1}`}
                      fill
                      sizes="(min-width:1024px) 34vw, 80vw"
                      className="object-cover graded"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "2rem 0" }} />

          {/* ── Getting there + Permits ── */}
          <section className="py-10">
            <p
              className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
              style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
            >
              Practical info
            </p>
            <h2
              className="text-2xl md:text-3xl text-[#f0ece3] mb-3"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Plan your visit
            </h2>
            <p
              className="text-[13px] text-[rgba(240,236,227,0.6)] mb-6 max-w-lg"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Everything you need to know before you go.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="glass rounded-2xl p-6">
                <p className="text-[10px] tracking-[0.35em] uppercase text-[#8a8978] mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                  Getting there
                </p>
                <p className="text-[13px] leading-relaxed text-[rgba(240,236,227,0.75)]" style={{ fontFamily: "var(--font-syne)" }}>
                  {dest.gettingThere}
                </p>
              </div>

              {dest.permits && (
                <div className="glass rounded-2xl p-6">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-[#8a8978] mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                    Permits &amp; fees
                  </p>
                  <p className="text-[13px] leading-relaxed text-[rgba(240,236,227,0.75)]" style={{ fontFamily: "var(--font-syne)" }}>
                    {dest.permits}
                  </p>
                </div>
              )}

              <div className="glass rounded-2xl p-6">
                <p className="text-[10px] tracking-[0.35em] uppercase text-[#8a8978] mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                  Best time to visit
                </p>
                <p className="text-[13px] leading-relaxed text-[rgba(240,236,227,0.75)]" style={{ fontFamily: "var(--font-syne)" }}>
                  {dest.bestTime}
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* ── Interactive map ── */}
        <NepalMapClient />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10">

          {/* ── Related destinations ── */}
          {relatedDests.length > 0 && (
            <section className="py-16">
              <PrayerFlagDivider opacity={0.3} className="mb-10" />
              <p
                className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
                style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
              >
                Related Destinations
              </p>
              <h2
                className="text-3xl md:text-4xl text-[#f0ece3] mb-3"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                Explore more of Nepal
              </h2>
              <p
                className="text-[13px] text-[rgba(240,236,227,0.6)] mb-8 max-w-lg"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Destinations travellers pair with {dest.name}.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedDests.map((r) => {
                  const rt = TYPE_STYLE[r.type] ?? TYPE_STYLE.Trek;
                  return (
                    <Link
                      key={r.slug}
                      href={`/destinations/${r.slug}`}
                      className="glass card-lift rounded-2xl overflow-hidden group flex flex-col"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={r.image}
                          alt={r.name}
                          fill
                          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 50vw"
                          className="object-cover graded transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span
                            className="text-[9px] font-semibold px-2 py-1 rounded-full"
                            style={{ background: rt.bg, color: rt.text, fontFamily: "var(--font-syne)" }}
                          >
                            {rt.icon} {r.type}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <p
                          className="text-[15px] font-semibold text-[#f0ece3] group-hover:text-[#d4a843] transition-colors duration-200 mb-0.5 leading-tight"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {r.name}
                        </p>
                        {r.devanagari && (
                          <p
                            className="text-[12px] mb-2"
                            style={{ fontFamily: "var(--font-devanagari)", color: "#d4a843", opacity: 0.72 }}
                          >
                            {r.devanagari}
                          </p>
                        )}
                        <p
                          className="text-[11px] text-[rgba(240,236,227,0.6)] flex-1 mb-4"
                          style={{ fontFamily: "var(--font-syne)" }}
                        >
                          {r.region} · {r.duration}
                        </p>
                        <span
                          className="self-start text-[10px] font-semibold text-[#d4a843] tracking-wide"
                          style={{ fontFamily: "var(--font-syne)" }}
                        >
                          Explore →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Community stories ── */}
          {communityStories.length > 0 && (
            <section className="py-10 pb-16">
              <p
                className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
                style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
              >
                Community
              </p>
              <h2
                className="text-3xl md:text-4xl text-[#f0ece3] mb-3"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                Stories from the trail
              </h2>
              <p
                className="text-[13px] text-[rgba(240,236,227,0.6)] mb-8 max-w-lg"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Real accounts from travellers who have been here.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {communityStories.map((post) => (
                  <article
                    key={post.id}
                    className="glass rounded-2xl overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover graded"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                          style={{ background: post.author.color, fontFamily: "var(--font-syne)" }}
                        >
                          {post.author.initials}
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold text-[#f0ece3]" style={{ fontFamily: "var(--font-syne)" }}>
                            {post.author.name}
                          </p>
                          <p className="text-[9px] text-[#8a8978]" style={{ fontFamily: "var(--font-syne)" }}>
                            {post.author.flag} {post.author.country} · {post.readTime}
                          </p>
                        </div>
                      </div>
                      <h3
                        className="text-[14px] font-semibold text-[#f0ece3] mb-2 leading-snug"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {post.title}
                      </h3>
                      <p
                        className="text-[12px] text-[rgba(240,236,227,0.6)] line-clamp-2"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* ── Final Book CTA ── */}
          {dest.bookingCategory && (
            <section className="py-10 pb-20">
              <div
                className="glass-gold float-shadow-gold rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-6 items-center justify-between"
                style={{ border: "1px solid rgba(212,168,67,0.2)" }}
              >
                <div>
                  <p
                    className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-2"
                    style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
                  >
                    Ready to go?
                  </p>
                  <h2
                    className="text-3xl md:text-4xl text-[#f0ece3] mb-2"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                  >
                    Book {dest.name}
                  </h2>
                  {dest.devanagari && (
                    <p
                      className="text-lg text-[#d4a843] mb-3"
                      style={{ fontFamily: "var(--font-devanagari)", opacity: 0.75 }}
                    >
                      {dest.devanagari}
                    </p>
                  )}
                  <p
                    className="text-[14px] text-[#8a8978] max-w-md"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    Instant confirmation. Local expertise. Cancel with notice.
                  </p>
                </div>
                <Link
                  href={`/booking?cat=${dest.bookingCategory}`}
                  className="shrink-0 px-8 py-4 rounded-full font-semibold text-[13px] tracking-[0.15em] uppercase transition-all duration-200 hover:scale-105"
                  style={{
                    fontFamily: "var(--font-syne)",
                    background: "linear-gradient(135deg, #d4a843, #e8c547)",
                    color: "#07070d",
                  }}
                >
                  Book this trip →
                </Link>
              </div>
            </section>
          )}

        </div>

      </main>
      <Footer />
    </>
  );
}
