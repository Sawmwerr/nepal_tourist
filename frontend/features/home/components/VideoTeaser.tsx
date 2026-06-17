import Reveal from "@/components/ui/Reveal";

export default function VideoTeaser() {
  return (
    <section className="px-3 md:px-6 pb-6">
      <div
        className="relative overflow-hidden float-shadow-lg flex items-center justify-center"
        style={{ minHeight: "82vh", borderRadius: 28 }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(150deg, #060d15 0%, #0c1e30 35%, #101828 65%, #050510 100%)",
          }}
        />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(212,168,67,0.08) 0%, transparent 65%)",
          }}
        />

        {/* Cinematic bars */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#07070d] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#07070d] to-transparent" />

        {/* Corner brackets */}
        {[
          "top-5 left-5 border-t border-l",
          "top-5 right-5 border-t border-r",
          "bottom-5 left-5 border-b border-l",
          "bottom-5 right-5 border-b border-r",
        ].map((cls) => (
          <div
            key={cls}
            className={`absolute w-8 h-8 ${cls}`}
            style={{ borderColor: "rgba(212,168,67,0.18)", borderRadius: 4 }}
          />
        ))}

        {/* Content — reveal as a unit */}
        <Reveal className="relative z-10 flex flex-col items-center text-center px-8 py-20">
          {/* ── Glass play button ── */}
          <div className="relative mb-14 cursor-pointer group">
            <div className="absolute inset-[-18px] rounded-full border border-[rgba(212,168,67,0.2)] pulse-ring" />
            <div className="absolute inset-[-9px] rounded-full border border-[rgba(212,168,67,0.15)] pulse-ring-delay" />
            <div
              className="glass float-shadow w-24 h-24 rounded-full flex items-center justify-center transition-all duration-400 group-hover:scale-105 group-hover:border-[rgba(212,168,67,0.4)]"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-400 group-hover:scale-105"
                style={{ background: "linear-gradient(135deg, #d4a843, #e8c547)" }}
              >
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" className="ml-1">
                  <path d="M0 0L14 8L0 16V0Z" fill="#07070d" />
                </svg>
              </div>
            </div>
          </div>

          {/* Eyebrow */}
          <p
            className="text-[10px] tracking-[0.6em] uppercase text-[#d4a843] mb-5"
            style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
          >
            Watch the journey
          </p>

          {/* Title */}
          <h2
            className="text-5xl md:text-7xl text-[#f0ece3] leading-[0.92] mb-5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Nepal in{" "}
            <em className="text-gradient">Motion</em>
          </h2>

          {/* Body */}
          <p
            className="text-sm text-[#8a8978] max-w-md leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            A cinematic journey through ancient peaks, sacred temples, and the warmth of a people who live closest to the sky.
          </p>

          {/* Glass pill tag */}
          <div
            className="glass float-shadow flex items-center gap-4 px-6 py-3"
            style={{ borderRadius: 100 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a843] gold-shimmer" />
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-[#8a8978]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              4 min film · Coming soon
            </span>
          </div>

          {/* View all link */}
          <a
            href="/destinations"
            className="mt-8 inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-[#d4a843] hover:text-[#f0ece3] transition-colors duration-300 hover-line"
            style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
          >
            Explore all destinations →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
