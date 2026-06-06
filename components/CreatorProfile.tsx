/* ─────────────────────────────────────────────
   Edit the values below to update your profile
───────────────────────────────────────────── */
const PROFILE = {
  photo:      "/pexels-sherine-197682976-37122910.jpg",  // swap with your photo
  name:       "Nayem Hasan",
  handle:     "@nayemhasan",
  tagline:    "Nepal travel creator · documenting the world's rooftop one trek at a time.",
  posts:      "48",
  followers:  "12.4K",
  following:  "310",
  instagram:  "https://instagram.com/",    // paste your Instagram URL
  youtube:    "https://youtube.com/",      // paste your YouTube URL
  twitter:    "https://x.com/",            // paste your X / Twitter URL
  email:      "nayemhasan75907@gmail.com",
};

/* Instagram icon */
const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

/* YouTube icon */
const YtIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

/* X (Twitter) icon */
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

/* Email icon */
const EmailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);

export default function CreatorProfile() {
  return (
    <section className="section-pad">
      {/* Eyebrow */}
      <div className="flex items-center gap-3 mb-12">
        <div className="h-px w-8 bg-[rgba(212,168,67,0.3)]" />
        <span className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843]"
              style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}>
          The creator
        </span>
      </div>

      {/* ── Main card ── */}
      <div className="glass float-shadow-lg max-w-4xl mx-auto overflow-hidden"
           style={{ borderRadius: 28 }}>

        {/* Gold top accent */}
        <div className="h-1" style={{ background: "linear-gradient(to right, #d4a843, #e8c547, transparent)" }} />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 md:p-12">

          {/* ── Left: photo + follow ── */}
          <div className="flex flex-col items-center gap-5 shrink-0">

            {/* Profile photo ring */}
            <div className="relative">
              {/* Gradient ring */}
              <div className="absolute -inset-[3px] rounded-full"
                   style={{ background: "linear-gradient(135deg, #d4a843, #e8c547, #d4a843)" }} />
              <div className="absolute -inset-[5px] rounded-full opacity-30"
                   style={{ background: "linear-gradient(135deg, #d4a843, transparent)" }} />
              <img
                src={PROFILE.photo}
                alt={PROFILE.name}
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover graded"
                style={{ border: "3px solid #07070d" }}
              />
              {/* Online dot */}
              <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full float-shadow-gold"
                   style={{ background: "linear-gradient(135deg,#d4a843,#e8c547)", border: "2px solid #07070d" }} />
            </div>

            {/* Follow button */}
            <a href={PROFILE.instagram} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 px-8 py-3 rounded-full text-[11px] tracking-[0.25em] uppercase font-bold transition-all duration-300 hover:scale-[0.97] active:scale-95"
               style={{ fontFamily: "var(--font-syne)",
                 background: "linear-gradient(135deg, #d4a843, #e8c547)",
                 color: "#07070d",
                 boxShadow: "0 4px 20px rgba(212,168,67,0.35)" }}>
              <IgIcon />
              Follow
            </a>

            {/* Email button */}
            <a href={`mailto:${PROFILE.email}`}
               className="flex items-center gap-2 px-7 py-2.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:border-[rgba(212,168,67,0.4)] hover:text-[#f0ece3]"
               style={{ fontFamily: "var(--font-syne)", color: "#6b6a5a",
                 border: "1px solid rgba(255,255,255,0.07)" }}>
              <EmailIcon />
              Email me
            </a>
          </div>

          {/* ── Right: info ── */}
          <div className="flex flex-col flex-1 min-w-0 text-center md:text-left">

            {/* Name + handle */}
            <h2 className="text-3xl md:text-4xl text-[#f0ece3] leading-tight mb-1"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
              {PROFILE.name}
            </h2>
            <p className="text-[13px] text-[#d4a843] mb-4 font-medium"
               style={{ fontFamily: "var(--font-syne)" }}>
              {PROFILE.handle}
            </p>

            {/* Tagline */}
            <p className="text-sm text-[rgba(240,236,227,0.55)] leading-relaxed mb-8 max-w-md"
               style={{ fontFamily: "var(--font-syne)" }}>
              {PROFILE.tagline}
            </p>

            {/* ── Stats ── */}
            <div className="flex items-center justify-center md:justify-start gap-0 mb-8">
              {[
                { label: "Posts",     value: PROFILE.posts },
                { label: "Followers", value: PROFILE.followers },
                { label: "Following", value: PROFILE.following },
              ].map((s, i) => (
                <div key={s.label}
                     className={`flex flex-col items-center md:items-start px-6 ${i > 0 ? "border-l border-[rgba(255,255,255,0.06)]" : ""} ${i === 0 ? "pl-0" : ""}`}>
                  <span className="text-2xl font-bold text-[#f0ece3] leading-none mb-1"
                        style={{ fontFamily: "var(--font-syne)" }}>
                    {s.value}
                  </span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#6b6a5a]"
                        style={{ fontFamily: "var(--font-syne)" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Social links ── */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">

              {/* Instagram */}
              <a href={PROFILE.instagram} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2.5 px-5 py-3 rounded-2xl text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 group"
                 style={{ fontFamily: "var(--font-syne)",
                   background: "rgba(225,48,108,0.1)",
                   border: "1px solid rgba(225,48,108,0.2)",
                   color: "#e1306c" }}>
                <IgIcon />
                Instagram
              </a>

              {/* YouTube */}
              <a href={PROFILE.youtube} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2.5 px-5 py-3 rounded-2xl text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-300"
                 style={{ fontFamily: "var(--font-syne)",
                   background: "rgba(255,0,0,0.08)",
                   border: "1px solid rgba(255,0,0,0.18)",
                   color: "#ff4444" }}>
                <YtIcon />
                YouTube
              </a>

              {/* X / Twitter */}
              <a href={PROFILE.twitter} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2.5 px-5 py-3 rounded-2xl text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-300"
                 style={{ fontFamily: "var(--font-syne)",
                   background: "rgba(255,255,255,0.05)",
                   border: "1px solid rgba(255,255,255,0.1)",
                   color: "#f0ece3" }}>
                <XIcon />
                Follow
              </a>

              {/* Email copy */}
              <a href={`mailto:${PROFILE.email}`}
                 className="flex items-center gap-2.5 px-5 py-3 rounded-2xl text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-300"
                 style={{ fontFamily: "var(--font-syne)",
                   background: "rgba(212,168,67,0.08)",
                   border: "1px solid rgba(212,168,67,0.18)",
                   color: "#d4a843" }}>
                <EmailIcon />
                {PROFILE.email}
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom CTA banner ── */}
        <div className="border-t px-8 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4"
             style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <p className="text-sm text-[rgba(240,236,227,0.45)] text-center md:text-left"
             style={{ fontFamily: "var(--font-syne)" }}>
            Follow for trekking routes, camp guides & hidden Nepal spots you won&apos;t find elsewhere.
          </p>
          <a href={PROFILE.instagram} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] tracking-[0.3em] uppercase font-bold shrink-0 transition-all duration-300 hover:opacity-90"
             style={{ fontFamily: "var(--font-syne)",
               background: "linear-gradient(135deg,#d4a843,#e8c547)", color: "#07070d" }}>
            <IgIcon />
            @{PROFILE.handle.replace("@", "")}
          </a>
        </div>
      </div>
    </section>
  );
}
