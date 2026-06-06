import Link from "next/link";
import Reveal from "./Reveal";

const CARDS = [
  {
    icon: "📅",
    title: "Best Time to Visit",
    body: "Peak seasons: Oct–Nov (post-monsoon, crystal views) and Mar–Apr (spring blossoms). Avoid Jun–Sep monsoons for treks.",
    tag: "Seasons",
  },
  {
    icon: "✈️",
    title: "Getting to Nepal",
    body: "Fly into Tribhuvan International Airport (KTM), Kathmandu. Daily connections from Dubai, Delhi, Doha, Bangkok, and Singapore.",
    tag: "Arrival",
  },
  {
    icon: "📋",
    title: "Permits & Fees",
    body: "Most treks require a TIMS card (~$20) plus national park entry. Restricted areas like Upper Mustang need special permits.",
    tag: "Paperwork",
  },
  {
    icon: "🎒",
    title: "Essential Gear",
    body: "Layer system for altitude, broken-in boots, down jacket, water purification, and altitude sickness medication (Diamox).",
    tag: "Packing",
  },
];

export default function PlanTeaser() {
  return (
    <section
      className="section-pad"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="max-w-[1400px] mx-auto">

        {/* ── Header ── */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p
              className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
              style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
            >
              Plan a Trip
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#f0ece3] leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Everything you need to{" "}
              <em className="text-gradient-gold">start</em>
            </h2>
            <p
              className="mt-4 text-[13px] text-[rgba(240,236,227,0.5)] max-w-lg leading-relaxed"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Visas on arrival for most nationalities, no prior trekking
              experience required for most routes, and permits are
              straightforward. Nepal is more accessible than you think.
            </p>
          </div>
        </Reveal>

        {/* ── Info cards — stagger ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <div
                className="glass float-shadow card-lift flex flex-col gap-4 p-6"
                style={{ borderRadius: 20 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{card.icon}</span>
                  <span
                    className="text-[8px] tracking-[0.4em] uppercase px-2.5 py-1 rounded-full"
                    style={{
                      fontFamily: "var(--font-syne)",
                      background: "rgba(212,168,67,0.1)",
                      border: "1px solid rgba(212,168,67,0.2)",
                      color: "#d4a843",
                    }}
                  >
                    {card.tag}
                  </span>
                </div>
                <p
                  className="text-[14px] font-semibold text-[#f0ece3] leading-snug"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {card.title}
                </p>
                <p
                  className="text-[12px] text-[rgba(240,236,227,0.5)] leading-relaxed flex-1"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {card.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Quick facts strip ── */}
        <Reveal>
          <div
            className="glass float-shadow flex flex-wrap items-center justify-center gap-0 mb-12"
            style={{ borderRadius: 16 }}
          >
            {[
              { label: "Visa on Arrival", value: "110+ countries" },
              { label: "Trek Difficulty",  value: "Easy → Expert" },
              { label: "Currency",         value: "Nepalese Rupee" },
              { label: "Language",         value: "Nepali + English" },
            ].map((fact, i, arr) => (
              <div
                key={fact.label}
                className="flex flex-col items-center px-8 py-5"
                style={{
                  borderRight:
                    i < arr.length - 1
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                }}
              >
                <span
                  className="text-[14px] font-bold text-[#f0ece3] mb-1"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {fact.value}
                </span>
                <span
                  className="text-[9px] tracking-[0.35em] uppercase text-[#6b6a5a]"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {fact.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── CTA ── */}
        <Reveal className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-300 hover:opacity-90 active:scale-95"
            style={{
              fontFamily: "var(--font-syne)",
              background: "linear-gradient(135deg, #d4a843, #e8c547)",
              color: "#07070d",
              boxShadow: "0 4px 24px rgba(212,168,67,0.3)",
            }}
          >
            Start planning
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-300 hover:text-[#d4a843]"
            style={{
              fontFamily: "var(--font-syne)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(240,236,227,0.6)",
            }}
          >
            Read trip reports
          </Link>
        </Reveal>

      </div>
    </section>
  );
}
