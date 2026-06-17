export default function QuoteBlock() {
  return (
    <section className="section-pad">
      {/* Floating glass quote card */}
      <div
        className="glass float-shadow-lg max-w-4xl mx-auto relative overflow-hidden p-12 md:p-20"
        style={{ borderRadius: 28 }}
      >
        {/* Ambient inner glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,168,67,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Giant decorative quotes */}
        <div
          className="absolute -top-8 left-6 md:left-10 text-[12rem] md:text-[18rem] leading-none select-none pointer-events-none"
          style={{ fontFamily: "var(--font-display)", color: "#d4a843", opacity: 0.04 }}
          aria-hidden
        >
          &ldquo;
        </div>
        <div
          className="absolute -bottom-14 right-6 md:right-10 text-[12rem] md:text-[18rem] leading-none select-none pointer-events-none"
          style={{ fontFamily: "var(--font-display)", color: "#d4a843", opacity: 0.04 }}
          aria-hidden
        >
          &rdquo;
        </div>

        {/* Content */}
        <div className="relative text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-10 bg-[rgba(212,168,67,0.25)]" />
            <span
              className="text-[9px] tracking-[0.6em] uppercase text-[#d4a843]"
              style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
            >
              ◆ Nepal ◆
            </span>
            <div className="h-px w-10 bg-[rgba(212,168,67,0.25)]" />
          </div>

          {/* Quote */}
          <blockquote
            className="text-3xl md:text-[2.8rem] text-[#f0ece3] leading-[1.3] mb-12"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            &ldquo;Not all those who wander are lost —
            <br />
            <em className="text-gradient">some are finding Nepal.</em>&rdquo;
          </blockquote>

          {/* Stat pills — glass */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              "1,400+ trekking routes",
              "8 of the 14 highest peaks",
              "Ancient living culture",
            ].map((item) => (
              <span
                key={item}
                className="glass text-[10px] tracking-[0.22em] uppercase text-[#8a8978] px-5 py-2.5"
                style={{ borderRadius: 100, fontFamily: "var(--font-syne)" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
