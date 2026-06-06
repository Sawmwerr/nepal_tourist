"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────
   Navigation data — add / edit links here
───────────────────────────────────────── */
type NavCol = {
  title: string;
  comingSoon?: boolean;
  items: { name: string; tag: string; icon: string; href?: string }[];
};
type NavItem = { label: string; href?: string; columns: NavCol[] };

const NAV: NavItem[] = [
  {
    label: "Destinations",
    href: "/destinations",
    columns: [
      {
        title: "Cities & Valleys",
        items: [
          { name: "Kathmandu",        tag: "Capital City",            icon: "🏛️", href: "/destinations/kathmandu" },
          { name: "Pokhara",          tag: "Adventure Hub",           icon: "🏔️", href: "/destinations/pokhara" },
          { name: "Bhaktapur",        tag: "Medieval City",           icon: "🏯", href: "/destinations/bhaktapur" },
          { name: "Lumbini",          tag: "Birthplace of Buddha",    icon: "☸️", href: "/destinations" },
          { name: "Chitwan",          tag: "Jungle Gateway",          icon: "🌿", href: "/destinations/chitwan" },
          { name: "Janakpur",         tag: "Cultural Capital",        icon: "🛕", href: "/destinations" },
        ],
      },
      {
        title: "Regions & Valleys",
        items: [
          { name: "Khumbu Region",    tag: "Everest Heartland",       icon: "⛰️", href: "/destinations" },
          { name: "Gandaki Province", tag: "Annapurna Region",        icon: "🗻", href: "/destinations" },
          { name: "Upper Mustang",    tag: "The Forbidden Kingdom",   icon: "🏜️", href: "/destinations/upper-mustang" },
          { name: "Langtang Valley",  tag: "Valley of Glaciers",      icon: "❄️", href: "/destinations/langtang-valley" },
          { name: "Karnali Province", tag: "Wild Remote West",        icon: "💧", href: "/destinations" },
          { name: "Rara Region",      tag: "Hidden Lake Country",     icon: "🏞️", href: "/destinations/rara-lake" },
        ],
      },
    ],
  },
  {
    label: "Mountains & Treks",
    href: "/mountains",
    columns: [
      {
        title: "8,000 m Peaks",
        items: [
          { name: "Everest",          tag: "8,848 m · Highest",       icon: "🏔️", href: "/mountains" },
          { name: "Annapurna I",      tag: "8,091 m · Most Deadly",   icon: "⛰️", href: "/mountains" },
          { name: "Manaslu",          tag: "8,163 m · Circuit",       icon: "🗻", href: "/mountains" },
          { name: "Dhaulagiri I",     tag: "8,167 m · White Mountain",icon: "❄️", href: "/mountains" },
          { name: "Makalu",           tag: "8,485 m · Barun Valley",  icon: "🏔️", href: "/mountains" },
          { name: "Cho Oyu",          tag: "8,188 m · Tibet Border",  icon: "⛰️", href: "/mountains" },
        ],
      },
      {
        title: "Trekking Routes",
        items: [
          { name: "Everest Base Camp",    tag: "14–18 days · Classic",    icon: "🎒", href: "/destinations/everest-base-camp" },
          { name: "Annapurna Circuit",    tag: "15–20 days · Epic Loop",  icon: "🔄", href: "/mountains" },
          { name: "Langtang Trek",        tag: "7–10 days · Near KTM",    icon: "🌿", href: "/destinations/langtang-valley" },
          { name: "Manaslu Circuit",      tag: "14–16 days · Remote",     icon: "🗺️", href: "/mountains" },
          { name: "Poon Hill Trek",       tag: "4–5 days · Best Sunrise", icon: "🌄", href: "/destinations/poon-hill" },
          { name: "Three Passes Trek",    tag: "20+ days · Advanced",     icon: "🚩", href: "/mountains" },
          { name: "Gosaikunda Trek",      tag: "4–5 days · Sacred Lake",  icon: "🙏", href: "/mountains" },
          { name: "Upper Mustang Trek",   tag: "10–14 days · Restricted", icon: "🏜️", href: "/destinations/upper-mustang" },
        ],
      },
      {
        title: "Basecamps & Viewpoints",
        items: [
          { name: "Everest Base Camp",  tag: "5,364 m",   icon: "⛺", href: "/destinations/everest-base-camp" },
          { name: "Annapurna BC",       tag: "4,130 m",   icon: "⛺", href: "/destinations/annapurna-base-camp" },
          { name: "Kala Patthar",       tag: "5,644 m",   icon: "👁️", href: "/mountains" },
          { name: "Gokyo Ri",           tag: "5,357 m",   icon: "🏞️", href: "/mountains" },
          { name: "Thorong La Pass",    tag: "5,416 m",   icon: "🚩", href: "/mountains" },
          { name: "Gorak Shep",         tag: "5,140 m",   icon: "🏕️", href: "/mountains" },
        ],
      },
    ],
  },
  {
    label: "Experiences",
    columns: [
      {
        title: "Culture",
        items: [
          { name: "Dashain & Tihar",    tag: "Nepal's Biggest Festivals",   icon: "🎉", href: "/community" },
          { name: "Boudhanath Stupa",   tag: "Buddhist Pilgrimage",         icon: "☸️", href: "/destinations/boudhanath-stupa" },
          { name: "Pashupatinath",      tag: "Sacred Hindu Temple",         icon: "🛕", href: "/destinations/pashupatinath" },
          { name: "Newari Heritage",    tag: "Living Civilisation",         icon: "🏛️", href: "/destinations" },
          { name: "Sherpa Culture",     tag: "High Altitude Life",          icon: "⛰️", href: "/community" },
          { name: "Tharu Villages",     tag: "Terai Indigenous Life",       icon: "🌾", href: "/destinations" },
        ],
      },
      {
        title: "Food & Cuisine",
        items: [
          { name: "Dal Bhat",           tag: "National Dish · Twice Daily", icon: "🍛", href: "/community" },
          { name: "Momos",              tag: "Nepal's Favourite Dumplings", icon: "🥟", href: "/community" },
          { name: "Thukpa",             tag: "Himalayan Noodle Soup",       icon: "🍜", href: "/community" },
          { name: "Sherpa Stew",        tag: "Mountain Comfort Food",       icon: "🍲", href: "/community" },
          { name: "Juju Dhau",          tag: "Bhaktapur King Curd",         icon: "🥣", href: "/community" },
          { name: "Sel Roti",           tag: "Festival Sweet Bread",        icon: "🍩", href: "/community" },
        ],
      },
      {
        title: "Adventure Sports",
        items: [
          { name: "Paragliding",        tag: "Pokhara · 30 min flight",     icon: "🪂", href: "/destinations/pokhara" },
          { name: "White Water Rafting",tag: "Trishuli & Seti Rivers",      icon: "🚣", href: "/destinations" },
          { name: "Bungee Jumping",     tag: "160 m · Bhote Koshi",        icon: "🎯", href: "/destinations" },
          { name: "Mountain Biking",    tag: "World-Class Trails",          icon: "🚵", href: "/destinations" },
          { name: "Zip-lining",         tag: "World's Steepest · Pokhara", icon: "🎢", href: "/destinations/pokhara" },
          { name: "Rock Climbing",      tag: "Nagarjun & Hattiban",        icon: "🧗", href: "/destinations" },
        ],
      },
      {
        title: "National Parks",
        items: [
          { name: "Chitwan NP",         tag: "Rhino & Tiger Safari",        icon: "🐅", href: "/destinations/chitwan" },
          { name: "Bardia NP",          tag: "Wild & Remote Jungle",        icon: "🌿", href: "/destinations" },
          { name: "Sagarmatha NP",      tag: "Everest & Snow Leopard",      icon: "🐆", href: "/destinations/everest-base-camp" },
          { name: "Langtang NP",        tag: "Glaciers & Red Pandas",       icon: "🐼", href: "/destinations/langtang-valley" },
          { name: "Shivapuri NP",       tag: "Near Kathmandu",              icon: "🦅", href: "/destinations" },
          { name: "Koshi Tappu",        tag: "Wetland & Bird Reserve",      icon: "🦜", href: "/destinations" },
        ],
      },
    ],
  },
  {
    label: "Plan a Trip",
    columns: [
      {
        title: "Getting Started",
        items: [
          { name: "Best Time to Visit", tag: "Oct–Nov & Mar–Apr ideal",  icon: "📅", href: "/community" },
          { name: "Getting to Nepal",   tag: "Flights · Kathmandu TIA",  icon: "✈️", href: "/community" },
          { name: "Visa Information",   tag: "On Arrival for most",      icon: "🛂", href: "/community" },
          { name: "Packing Guide",      tag: "Trek & City Essentials",   icon: "🎒", href: "/community" },
          { name: "Travel Insurance",   tag: "Essential for trekking",   icon: "🛡️", href: "/community" },
          { name: "Permits & Fees",     tag: "TIMS · National Park",     icon: "📋", href: "/community" },
        ],
      },
      {
        title: "Hotels & Stays",
        comingSoon: true,
        items: [
          { name: "Luxury Hotels",      tag: "Kathmandu · Pokhara",      icon: "🏨" },
          { name: "Mountain Lodges",    tag: "Trek Route Stays",         icon: "🏠" },
          { name: "Teahouses",          tag: "Trail Accommodation",      icon: "🍵" },
          { name: "Homestays",          tag: "Local Family Experience",  icon: "🏡" },
          { name: "Eco Camps",          tag: "Nature Immersion",         icon: "⛺" },
        ],
      },
      {
        title: "Restaurants",
        comingSoon: true,
        items: [
          { name: "Local Cuisine",      tag: "Authentic Dal Bhat",       icon: "🍛" },
          { name: "Rooftop Dining",     tag: "Himalaya Views",           icon: "🌇" },
          { name: "Trekking Cafés",     tag: "Trail Pit Stops",          icon: "☕" },
          { name: "Fine Dining",        tag: "Kathmandu Premium",        icon: "🍽️" },
        ],
      },
      {
        title: "Bookings",
        comingSoon: true,
        items: [
          { name: "Guided Treks",       tag: "With Certified Guide",     icon: "🧭" },
          { name: "Hotel Reservations", tag: "Partner Properties",       icon: "🛎️" },
          { name: "Activity Bookings",  tag: "Adventure Experiences",    icon: "🎫" },
          { name: "Custom Itineraries", tag: "Private Planning",         icon: "🗓️" },
        ],
      },
    ],
  },
];

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [openMenu,       setOpenMenu]       = useState<string | null>(null);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const openDropdown  = (label: string) => { clearTimeout(closeTimer.current); setOpenMenu(label); };
  const scheduleClose = ()              => { closeTimer.current = setTimeout(() => setOpenMenu(null), 160); };
  const cancelClose   = ()              => clearTimeout(closeTimer.current);

  return (
    <>
      {/* ══════════════════════════════════
          Desktop header
      ══════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled || openMenu
            ? "rgba(7,7,13,0.96)"
            : "rgba(7,7,13,0.60)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* ── Navbar row ── */}
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

          {/* Desktop mega-menu triggers */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((nav) => (
              <button
                key={nav.label}
                onMouseEnter={() => openDropdown(nav.label)}
                onMouseLeave={scheduleClose}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[11px] tracking-[0.15em] uppercase font-semibold transition-all duration-200 whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: openMenu === nav.label ? "#d4a843" : "rgba(240,236,227,0.6)",
                  background: openMenu === nav.label ? "rgba(212,168,67,0.1)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${openMenu === nav.label ? "rgba(212,168,67,0.3)" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                {nav.label}
                <svg
                  width="10" height="6" viewBox="0 0 10 6" fill="none"
                  style={{
                    transform: openMenu === nav.label ? "rotate(180deg)" : "",
                    transition: "transform 0.25s ease",
                    opacity: 0.5,
                  }}
                >
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            ))}
            <Link
              href="/community"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[11px] tracking-[0.15em] uppercase font-semibold transition-all duration-200 whitespace-nowrap"
              style={{
                fontFamily: "var(--font-syne)",
                color: "rgba(240,236,227,0.6)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              Community
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">

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
        </div>

        {/* ══════════════════════════════════
            Mega menu panels (desktop)
        ══════════════════════════════════ */}
        {NAV.map((nav) => (
          <div
            key={nav.label}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              opacity: openMenu === nav.label ? 1 : 0,
              transform: openMenu === nav.label ? "translateY(0)" : "translateY(-10px)",
              pointerEvents: openMenu === nav.label ? "auto" : "none",
              transition: "opacity 0.25s ease, transform 0.25s ease",
              background: "rgba(7,7,13,0.97)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              borderBottom: "1px solid rgba(212,168,67,0.1)",
              zIndex: -1,
            }}
          >
            <div className="max-w-[1400px] mx-auto px-10 py-8">
              {/* Column grid */}
              <div
                className="grid gap-8"
                style={{ gridTemplateColumns: `repeat(${nav.columns.length}, 1fr)` }}
              >
                {nav.columns.map((col) => (
                  <div key={col.title}>
                    {/* Column header */}
                    <div className="flex items-center gap-2 mb-4 pb-3"
                         style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span
                        className="text-[9px] tracking-[0.5em] uppercase font-semibold text-[#d4a843]"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {col.title}
                      </span>
                      {col.comingSoon && (
                        <span
                          className="text-[8px] px-2 py-0.5 rounded-full font-semibold"
                          style={{
                            fontFamily: "var(--font-syne)",
                            background: "rgba(212,168,67,0.12)",
                            color: "#d4a843",
                            border: "1px solid rgba(212,168,67,0.25)",
                          }}
                        >
                          Soon
                        </span>
                      )}
                    </div>

                    {/* Items */}
                    <ul className="flex flex-col gap-0.5">
                      {col.items.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href ?? "#"}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group"
                            style={{
                              opacity: col.comingSoon ? 0.4 : 1,
                              pointerEvents: col.comingSoon ? "none" : "auto",
                            }}
                            onMouseEnter={(e) => {
                              if (!col.comingSoon) {
                                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.background = "transparent";
                            }}
                          >
                            <span className="text-lg shrink-0 w-7 text-center">{item.icon}</span>
                            <div className="min-w-0">
                              <p
                                className="text-[12px] font-medium text-[#f0ece3] truncate transition-colors duration-200 group-hover:text-[#d4a843]"
                                style={{ fontFamily: "var(--font-syne)" }}
                              >
                                {item.name}
                              </p>
                              <p
                                className="text-[10px] text-[#6b6a5a] truncate"
                                style={{ fontFamily: "var(--font-syne)" }}
                              >
                                {item.tag}
                              </p>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
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
        <div className="px-6 py-6 flex flex-col gap-1">
          {NAV.map((nav, i) => (
            <div key={nav.label}>
              {/* Accordion trigger */}
              <button
                onClick={() => setMobileExpanded(mobileExpanded === nav.label ? null : nav.label)}
                className="w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-200"
                style={{
                  transitionDelay: mobileOpen ? `${40 + i * 50}ms` : "0ms",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateX(0)" : "translateX(-20px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease, background 0.2s",
                  background: mobileExpanded === nav.label ? "rgba(212,168,67,0.07)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${mobileExpanded === nav.label ? "rgba(212,168,67,0.2)" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                <span
                  className="text-xl font-medium"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    color: mobileExpanded === nav.label ? "#d4a843" : "#f0ece3",
                  }}
                >
                  {nav.label}
                </span>
                <svg
                  width="12" height="8" viewBox="0 0 12 8" fill="none"
                  style={{
                    transform: mobileExpanded === nav.label ? "rotate(180deg)" : "",
                    transition: "transform 0.3s ease",
                    color: "#d4a843",
                  }}
                >
                  <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Accordion panel */}
              <div
                style={{
                  maxHeight: mobileExpanded === nav.label ? "1000px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <div className="px-2 py-3 flex flex-col gap-6">
                  {nav.columns.map((col) => (
                    <div key={col.title}>
                      <div className="flex items-center gap-2 px-3 mb-2">
                        <span
                          className="text-[9px] tracking-[0.45em] uppercase text-[#d4a843] font-semibold"
                          style={{ fontFamily: "var(--font-syne)" }}
                        >
                          {col.title}
                        </span>
                        {col.comingSoon && (
                          <span
                            className="text-[8px] px-2 py-0.5 rounded-full"
                            style={{
                              fontFamily: "var(--font-syne)",
                              background: "rgba(212,168,67,0.12)",
                              color: "#d4a843",
                              border: "1px solid rgba(212,168,67,0.25)",
                            }}
                          >
                            Soon
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {col.items.map((item) => (
                          <a
                            key={item.name}
                            href={item.href ?? "#"}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200"
                            style={{
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.05)",
                              opacity: col.comingSoon ? 0.4 : 1,
                              pointerEvents: col.comingSoon ? "none" : "auto",
                            }}
                          >
                            <span className="text-base shrink-0">{item.icon}</span>
                            <div className="min-w-0">
                              <p
                                className="text-[11px] font-medium text-[#f0ece3] truncate"
                                style={{ fontFamily: "var(--font-syne)" }}
                              >
                                {item.name}
                              </p>
                              <p
                                className="text-[9px] text-[#6b6a5a] truncate"
                                style={{ fontFamily: "var(--font-syne)" }}
                              >
                                {item.tag}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom: Community + Book Now + socials */}
        <div className="mt-auto px-6 py-8 flex flex-col gap-4">
          <Link
            href="/community"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full py-4 text-[11px] tracking-[0.35em] uppercase font-bold"
            style={{
              fontFamily: "var(--font-syne)",
              background: "rgba(212,168,67,0.08)",
              border: "1px solid rgba(212,168,67,0.2)",
              color: "#d4a843",
            }}
          >
            🌏 Community
          </Link>
          <div className="flex items-center justify-center gap-8">
            {["Instagram", "YouTube", "X (Twitter)"].map((s) => (
              <a key={s} href="#"
                className="text-[10px] tracking-[0.3em] uppercase text-[#6b6a5a] hover:text-[#d4a843] transition-colors"
                style={{ fontFamily: "var(--font-syne)" }}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
