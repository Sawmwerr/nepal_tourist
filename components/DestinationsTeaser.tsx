import Link from "next/link";
import { DESTINATION_LIST } from "@/lib/data";
import type { Destination } from "@/lib/data";
import Reveal from "./Reveal";
import ParallaxImage from "./ParallaxImage";
import ImageReveal from "./ImageReveal";

function DestCard({ d, tall, num }: { d: Destination; tall?: boolean; num: string }) {
  return (
    <Link href={`/destinations/${d.slug}`} className="block">
      <div
        className="group relative overflow-hidden cursor-pointer card-lift"
        style={{ minHeight: tall ? 600 : 280, borderRadius: 24 }}
      >
        {/* BG image — mask reveal wraps parallax; they compose on separate elements */}
        <ImageReveal>
          <ParallaxImage
            src={d.image}
            alt={d.name}
            imgClassName="w-full h-full object-cover graded"
          />
        </ImageReveal>
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Type tag */}
        <div className="absolute top-4 left-4">
          <span
            className="glass text-[9px] tracking-[0.35em] uppercase text-[#d4a843] font-semibold px-3 py-1.5"
            style={{ borderRadius: 100, fontFamily: "var(--font-syne)" }}
          >
            {d.type}
          </span>
        </div>

        {/* Number */}
        <div className="absolute top-4 right-4">
          <span
            className="text-[rgba(212,168,67,0.2)] text-sm"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {num}
          </span>
        </div>

        {/* Glass content card at bottom */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="glass-dark float-shadow p-5" style={{ borderRadius: 18 }}>
            <p
              className="text-[9px] tracking-[0.3em] uppercase text-[#8a8978] mb-1.5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {d.region}
            </p>
            <h3
              className="text-xl md:text-2xl text-[#f0ece3] leading-tight mb-2"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              {d.name}
            </h3>
            <p
              className="text-[11px] text-[rgba(240,236,227,0.5)] leading-relaxed mb-3 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-500"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {d.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="h-px w-4 bg-[#d4a843]" />
                <span
                  className="text-[10px] tracking-[0.25em] uppercase text-[#d4a843] font-semibold"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Discover →
                </span>
              </div>
              <span
                className="text-[9px] text-[#8a8978]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {d.duration}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function DestinationsTeaser() {
  const [first, ...rest] = DESTINATION_LIST.slice(0, 3);
  return (
    <section className="section-pad">
      {/* Header */}
      <Reveal className="flex items-end justify-between mb-10 md:mb-14">
        <div>
          <p
            className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
            style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
          >
            Top destinations
          </p>
          <h2
            className="text-4xl md:text-6xl text-[#f0ece3] leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            Where will you <br />
            <em className="text-gradient-gold">begin?</em>
          </h2>
        </div>
        <Link
          href="/destinations"
          className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-[#d4a843] hover:text-[#f0ece3] transition-colors duration-300 hover-line"
          style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
        >
          View all →
        </Link>
      </Reveal>

      {/* Magazine grid — cards stagger in */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="md:flex-[3]">
          <Reveal delay={0}>
            <DestCard d={first} tall num="01" />
          </Reveal>
        </div>
        <div className="md:flex-[2] flex flex-col gap-3">
          {rest.map((d, i) => (
            <Reveal key={d.slug} delay={(i + 1) * 0.08}>
              <DestCard d={d} num={String(i + 2).padStart(2, "0")} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="flex justify-center mt-8 md:hidden">
        <Link
          href="/destinations"
          className="text-[10px] tracking-[0.4em] uppercase text-[#d4a843] glass float-shadow rounded-full px-8 py-3 hover:border-[rgba(212,168,67,0.3)] transition-colors duration-300"
          style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
        >
          View all destinations →
        </Link>
      </div>
    </section>
  );
}
