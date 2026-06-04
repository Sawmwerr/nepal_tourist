const testimonials = [
  {
    quote: "Nepal changed something deep inside me. The mountains don't just challenge your body — they free your mind.",
    author: "Sarah K.",
    role: "Trekker · EBC Route",
    year: "2024",
  },
  {
    quote: "Kathmandu's streets are a living museum. Every corner holds a story, every face tells of centuries past.",
    author: "James L.",
    role: "Cultural Traveller · Kathmandu",
    year: "2024",
  },
  {
    quote: "I've travelled to 40 countries. Nepal is the only one that brought me back three times — and will again.",
    author: "Marie D.",
    role: "Photographer · Annapurna",
    year: "2023",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-pad">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <p
            className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
            style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
          >
            From travellers
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#f0ece3] leading-tight"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Stories told,{" "}
            <em className="text-gradient-gold">journeys remembered</em>
          </h2>
        </div>
      </div>

      {/* Glass testimonial cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="glass float-shadow card-lift flex flex-col gap-6 p-8 md:p-9"
            style={{ borderRadius: 24 }}
          >
            {/* Decorative quote */}
            <span
              className="text-[5rem] leading-[0.7] text-[rgba(212,168,67,0.12)] select-none"
              style={{ fontFamily: "var(--font-playfair)" }}
              aria-hidden
            >
              &ldquo;
            </span>

            {/* Quote */}
            <p
              className="text-[14px] text-[rgba(240,236,227,0.65)] leading-[1.8] -mt-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {t.quote}
            </p>

            {/* Divider */}
            <div className="h-px bg-[rgba(255,255,255,0.05)]" />

            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-[#07070d] float-shadow-gold"
                style={{
                  background: "linear-gradient(135deg, #d4a843, #e8c547)",
                  fontFamily: "var(--font-syne)",
                }}
              >
                {t.author[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-[12px] font-semibold text-[#f0ece3] truncate"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {t.author}
                </p>
                <p
                  className="text-[10px] tracking-[0.15em] uppercase text-[#6b6a5a] truncate"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {t.role}
                </p>
              </div>
              <span
                className="text-[10px] text-[rgba(212,168,67,0.3)] shrink-0"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {t.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
