const items = [
  "Himalayas", "Culture", "Traditions", "Food",
  "Adventure", "Festivals", "Trekking", "Monasteries",
  "Wildlife", "Spirituality",
];

export default function MarqueeStrip() {
  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-7 shrink-0">
      <span
        className="text-[11px] tracking-[0.42em] uppercase text-[#8a8978] hover:text-[#d4a843] transition-colors duration-300 cursor-default whitespace-nowrap"
        style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
      >
        {item}
      </span>
      <span className="text-[rgba(212,168,67,0.2)] text-[7px]">◆</span>
    </span>
  ));

  return (
    /* Glass pill strip */
    <div className="px-3 py-3">
      <div
        className="glass float-shadow w-full overflow-hidden py-3"
        style={{ borderRadius: 20 }}
      >
        <div className="marquee-track select-none">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {content}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
