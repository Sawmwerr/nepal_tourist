import Reveal from "./Reveal";

const stats = [
  { value: "8,848", unit: "m", label: "World's Highest Peak", sub: "Mount Everest" },
  { value: "8",     unit: "",  label: "Eight-thousanders",    sub: "Of 14 in the world" },
  { value: "1,400+",unit: "",  label: "Trekking Routes",      sub: "Across all regions" },
  { value: "56",    unit: "",  label: "Ethnic Groups",        sub: "Living traditions" },
];

export default function StatsSection() {
  return (
    <section className="section-pad">
      {/* Eyebrow */}
      <Reveal className="flex items-center gap-3 mb-12">
        <div className="h-px w-8 bg-[rgba(212,168,67,0.3)]" />
        <span
          className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843]"
          style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
        >
          Nepal in numbers
        </span>
      </Reveal>

      {/* Glass stat cards — stagger in */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div
              className="glass-gold float-shadow-gold card-lift flex flex-col p-6 md:p-8"
              style={{ borderRadius: 24 }}
            >
              <div className="flex items-end gap-1 mb-4">
                <span
                  className="text-gradient text-4xl md:text-5xl leading-none font-bold"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {s.value}
                </span>
                {s.unit && (
                  <span
                    className="text-[rgba(212,168,67,0.45)] text-lg mb-0.5"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {s.unit}
                  </span>
                )}
              </div>
              <p
                className="text-[11px] tracking-[0.2em] uppercase text-[#f0ece3] mb-1 font-semibold"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {s.label}
              </p>
              <p
                className="text-[11px] text-[#6b6a5a]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {s.sub}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
