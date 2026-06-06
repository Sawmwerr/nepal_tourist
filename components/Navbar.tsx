"use client";

import { useState, useEffect } from "react";
import { useActiveSection } from "./ScrollStoryContext";

const NAV = [
  { label: "Destinations",      scrollId: "destinations" },
  { label: "Mountains & Treks", scrollId: "mountains"   },
  { label: "Experiences",       scrollId: "experiences"  },
  { label: "Plan a Trip",       scrollId: "plan"         },
  { label: "Community",         scrollId: "community"    },
] as const;

export default function Navbar() {
  const { activeSection } = useActiveSection();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ══════════════════════════════════
          Desktop header
      ══════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(7,7,13,0.96)" : "rgba(7,7,13,0.60)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-3">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0 group">
            <img
              src="/nepalflag.jpg"
              alt="Nepal Flag"
              className="shrink-0 transition-transform duration-300 group-hover:scale-110 object-contain"
              style={{ height: 32, width: "auto" }}
            />
            <span
              className="text-[#f0ece3] text-sm font-bold tracking-[0.3em] uppercase hidden sm:block"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Nepal
            </span>
          </a>

          {/* Desktop nav — five section anchors */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((nav) => {
              const isActive = activeSection === nav.scrollId;
              return (
                <a
                  key={nav.label}
                  href={`/#${nav.scrollId}`}
                  className="px-4 py-2.5 rounded-full text-[11px] tracking-[0.15em] uppercase font-semibold transition-all duration-200 whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-syne)",
                    color:      isActive ? "#d4a843" : "rgba(240,236,227,0.6)",
                    background: isActive ? "rgba(212,168,67,0.1)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isActive ? "rgba(212,168,67,0.3)" : "rgba(255,255,255,0.07)"}`,
                  }}
                >
                  {nav.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-[5px] transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span className="block h-px bg-[#d4a843] transition-all duration-300"
              style={{ width: 18, transform: mobileOpen ? "translateY(5px) rotate(45deg)" : "" }} />
            <span className="block h-px bg-[#d4a843] transition-all duration-300"
              style={{ width: mobileOpen ? 0 : 12, opacity: mobileOpen ? 0 : 1 }} />
            <span className="block h-px bg-[#d4a843] transition-all duration-300"
              style={{ width: 18, transform: mobileOpen ? "translateY(-5px) rotate(-45deg)" : "" }} />
          </button>

        </div>
      </header>

      {/* ══════════════════════════════════
          Mobile full-screen overlay
      ══════════════════════════════════ */}
      <div
        className="fixed inset-0 z-40 lg:hidden flex flex-col overflow-y-auto transition-all duration-500"
        style={{
          background: "rgba(7,7,13,0.98)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          paddingTop: 64,
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-2">
          {NAV.map((nav, i) => {
            const isActive = activeSection === nav.scrollId;
            return (
              <a
                key={nav.label}
                href={`/#${nav.scrollId}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-5 py-4 rounded-2xl"
                style={{
                  transitionDelay: mobileOpen ? `${40 + i * 50}ms` : "0ms",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateX(0)" : "translateX(-20px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease, background 0.2s",
                  background: isActive ? "rgba(212,168,67,0.07)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isActive ? "rgba(212,168,67,0.2)" : "rgba(255,255,255,0.06)"}`,
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  color: isActive ? "#d4a843" : "#f0ece3",
                }}
              >
                {nav.label}
              </a>
            );
          })}
        </div>

        {/* Social links */}
        <div className="mt-auto px-6 py-8">
          <div className="flex items-center justify-center gap-8">
            {["Instagram", "YouTube", "X (Twitter)"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[10px] tracking-[0.3em] uppercase text-[#6b6a5a] hover:text-[#d4a843] transition-colors"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
