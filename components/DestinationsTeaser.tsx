const destinations = [
  {
    id: "everest",
    number: "01",
    name: "Everest Base Camp",
    region: "Khumbu Region",
    description: "Trek through ancient rhododendron forests and glacial valleys to the foot of the world's highest peak.",
    photo: "/everest-base-camp.jpg",
    gradient: "linear-gradient(200deg, #0a1828 0%, #142d48 50%, #071019 100%)",
    tag: "Trekking",
    duration: "14–18 days",
  },
  {
    id: "kathmandu",
    number: "02",
    name: "Kathmandu Valley",
    region: "Bagmati Province",
    description: "Ancient temples, living goddesses, and centuries of Newari civilisation woven into every alley.",
    photo: "/Kathmandu.jpg",
    gradient: "linear-gradient(200deg, #1a0c04 0%, #4a2209 50%, #180a02 100%)",
    tag: "Culture",
    duration: "3–5 days",
  },
  {
    id: "pokhara",
    number: "03",
    name: "Pokhara",
    region: "Gandaki Province",
    description: "Mirror lakes reflecting the Annapurna range at dawn — serenity at its most cinematic.",
    photo: "/Pokhara.jpg",
    gradient: "linear-gradient(200deg, #04140a 0%, #0c4824 50%, #031008 100%)",
    tag: "Nature",
    duration: "2–4 days",
  },
];

function DestCard({ d, tall }: { d: (typeof destinations)[0]; tall?: boolean }) {
  return (
    <div
      className="group relative overflow-hidden cursor-pointer card-lift"
      style={{ minHeight: tall ? 600 : 280, borderRadius: 24 }}
    >
      {/* BG — real photo with gradient fallback */}
      {d.photo ? (
        <img
          src={d.photo}
          alt={d.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.05]"
          style={{ background: d.gradient }}
        />
      )}
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Tag */}
      <div className="absolute top-4 left-4">
        <span
          className="glass text-[9px] tracking-[0.35em] uppercase text-[#d4a843] font-semibold px-3 py-1.5"
          style={{ borderRadius: 100, fontFamily: "var(--font-syne)" }}
        >
          {d.tag}
        </span>
      </div>

      {/* Number */}
      <div className="absolute top-4 right-4">
        <span
          className="text-[rgba(212,168,67,0.2)] text-sm"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {d.number}
        </span>
      </div>

      {/* Glass content card at bottom */}
      <div className="absolute bottom-4 left-4 right-4">
        <div
          className="glass-dark float-shadow p-5"
          style={{ borderRadius: 18 }}
        >
          <p
            className="text-[9px] tracking-[0.3em] uppercase text-[#6b6a5a] mb-1.5"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {d.region}
          </p>
          <h3
            className="text-xl md:text-2xl text-[#f0ece3] leading-tight mb-2"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            {d.name}
          </h3>
          {/* Description — reveal on hover */}
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
              className="text-[9px] text-[rgba(107,106,90,0.5)]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {d.duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DestinationsTeaser() {
  const [first, ...rest] = destinations;
  return (
    <section className="section-pad">
      {/* Header */}
      <div className="flex items-end justify-between mb-10 md:mb-14">
        <div>
          <p
            className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
            style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
          >
            Top destinations
          </p>
          <h2
            className="text-4xl md:text-6xl text-[#f0ece3] leading-tight"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Where will you <br />
            <em className="text-gradient-gold">begin?</em>
          </h2>
        </div>
        <a
          href="#"
          className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-[#d4a843] hover:text-[#f0ece3] transition-colors duration-300 hover-line"
          style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
        >
          View all →
        </a>
      </div>

      {/* Magazine grid */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="md:flex-[3]"><DestCard d={first} tall /></div>
        <div className="md:flex-[2] flex flex-col gap-3">
          {rest.map((d) => <DestCard key={d.id} d={d} />)}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="flex justify-center mt-8 md:hidden">
        <a
          href="#"
          className="text-[10px] tracking-[0.4em] uppercase text-[#d4a843] glass float-shadow rounded-full px-8 py-3 hover:border-[rgba(212,168,67,0.3)] transition-colors duration-300"
          style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
        >
          View all destinations →
        </a>
      </div>
    </section>
  );
}
