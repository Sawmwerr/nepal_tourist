"use client";

import Link from "next/link";

const footerLinks: Record<string, { name: string; href: string }[]> = {
  Explore: [
    { name: "Himalayas",    href: "/mountains" },
    { name: "Kathmandu",   href: "/destinations/kathmandu" },
    { name: "Pokhara",     href: "/destinations/pokhara" },
    { name: "Chitwan",     href: "/destinations/chitwan" },
  ],
  Experiences: [
    { name: "Trekking",         href: "/mountains" },
    { name: "Culture Tours",    href: "/community" },
    { name: "Food Trails",      href: "/community" },
    { name: "Adventure Sports", href: "/destinations" },
  ],
  Plan: [
    { name: "Best Time to Visit", href: "/community" },
    { name: "Getting There",      href: "/community" },
    { name: "Travel Tips",        href: "/community" },
    { name: "Contact",            href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="pb-4 px-3 md:px-6">
      <div
        className="glass float-shadow-lg overflow-hidden"
        style={{ borderRadius: 28 }}
      >
        {/* ── Newsletter glass panel ── */}
        <div className="px-8 md:px-14 py-12 md:py-16 border-b border-[rgba(255,255,255,0.05)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div className="max-w-sm">
              <p
                className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-2"
                style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
              >
                Newsletter
              </p>
              <h3
                className="text-3xl text-[#f0ece3] leading-tight mb-2"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                Stay in the journey
              </h3>
              <p
                className="text-sm text-[#6b6a5a] leading-relaxed"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Travel stories, seasonal guides, and insider routes — monthly.
              </p>
            </div>

            <form
              className="flex w-full max-w-md glass float-shadow overflow-hidden"
              style={{ borderRadius: 100 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent px-6 py-4 text-sm text-[#f0ece3] placeholder:text-[#5a5848] focus:outline-none"
                style={{ fontFamily: "var(--font-syne)" }}
              />
              <button
                type="submit"
                className="text-[#07070d] text-[10px] tracking-[0.3em] uppercase font-bold px-7 rounded-full transition-all duration-300 hover:opacity-90 active:scale-95 shrink-0 float-shadow-gold"
                style={{
                  fontFamily: "var(--font-syne)",
                  background: "linear-gradient(135deg, #d4a843, #e8c547)",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* ── Link columns ── */}
        <div className="px-8 md:px-14 py-12 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <img
                  src="/nepalflag.jpg"
                  alt="Nepal Flag"
                  className="object-contain"
                  style={{ height: 28, width: "auto" }}
                />
                <span
                  className="text-[#f0ece3] text-sm font-bold tracking-[0.28em] uppercase"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Nepal
                </span>
              </div>
              <p
                className="text-sm text-[#6b6a5a] leading-relaxed max-w-[180px] mb-7"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                The roof of the world, and the warmth at its heart.
              </p>
              {/* Social */}
              <div className="flex items-center gap-2">
                {["IG", "YT", "X"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-8 h-8 rounded-xl glass flex items-center justify-center text-[10px] font-semibold text-[#6b6a5a] hover:text-[#d4a843] hover:border-[rgba(212,168,67,0.3)] transition-all duration-300"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p
                  className="text-[10px] tracking-[0.42em] uppercase text-[#d4a843] mb-5 font-semibold"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {category}
                </p>
                <ul className="flex flex-col gap-3.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#5a5848] hover:text-[#f0ece3] transition-colors duration-300 hover-line"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
          >
            <p
              className="text-[10px] tracking-[0.25em] text-[#5a5848] uppercase"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              © 2025 Nepal Tourism. All rights reserved.
            </p>
            <p
              className="text-[10px] tracking-[0.2em] text-[#3a3830] uppercase"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Crafted with care for Nepal
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
