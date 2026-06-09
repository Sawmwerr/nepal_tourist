"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type PropertyType = "Hotel" | "Lodge" | "Guesthouse" | "Hostel" | "Resort" | "Teahouse";

interface Property {
  id: string;
  name: string;
  type: PropertyType;
  location: string;
  region: string;
  image: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  stars: number;
  badges: string[];
  amenities: string[];
  distance: string;
  description: string;
  featured?: boolean;
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

const PROPERTIES: Property[] = [
  {
    id: "dwaritas",
    name: "Dwarika's Hotel",
    type: "Hotel",
    location: "Battisputali, Kathmandu",
    region: "Kathmandu Valley",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    rating: 9.4,
    reviews: 1284,
    pricePerNight: 285,
    stars: 5,
    badges: ["Free cancellation", "Breakfast included"],
    amenities: ["Pool", "Spa", "Restaurant", "WiFi", "Airport shuttle"],
    distance: "4.2 km from city centre",
    description: "A living museum of Newari art and architecture. Award-winning cultural heritage hotel set in beautifully restored medieval courtyards with world-class dining.",
    featured: true,
  },
  {
    id: "yak-yeti",
    name: "The Yak & Yeti Hotel",
    type: "Hotel",
    location: "Durbar Marg, Kathmandu",
    region: "Kathmandu Valley",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    rating: 8.8,
    reviews: 2103,
    pricePerNight: 175,
    stars: 5,
    badges: ["Free cancellation", "Pool", "Spa"],
    amenities: ["Pool", "Spa", "Casino", "Restaurant", "WiFi", "Fitness centre"],
    distance: "1.1 km from city centre",
    description: "Kathmandu's iconic landmark hotel in the heart of the city. Colonial-era architecture meets modern luxury, with lush gardens and multiple award-winning restaurants.",
    featured: true,
  },
  {
    id: "fishtail-lodge",
    name: "Fishtail Lodge",
    type: "Resort",
    location: "Lakeside, Pokhara",
    region: "Gandaki Province",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",
    rating: 9.5,
    reviews: 876,
    pricePerNight: 260,
    stars: 5,
    badges: ["Free cancellation", "Breakfast included", "Lake view"],
    amenities: ["Lake access", "Restaurant", "WiFi", "Garden", "Kayaking"],
    distance: "0.4 km from Phewa Lake",
    description: "Exclusively accessible by a hand-drawn cable ferry, Fishtail Lodge sits on a wooded peninsula with breathtaking views of the Annapurna massif across Phewa Lake.",
    featured: true,
  },
  {
    id: "tiger-tops",
    name: "Tiger Tops Tharu Lodge",
    type: "Resort",
    location: "Buffer Zone, Chitwan",
    region: "Bagmati Province",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80",
    rating: 9.2,
    reviews: 542,
    pricePerNight: 320,
    stars: 5,
    badges: ["All-inclusive", "Safari included"],
    amenities: ["Safari", "Pool", "Restaurant", "Spa", "WiFi", "Nature walks"],
    distance: "12 km from Chitwan NP gate",
    description: "The original Nepal jungle lodge, legendary for big-game wildlife encounters. Immerse in the Tharu culture while spotting rhinos, Bengal tigers and gharials.",
  },
  {
    id: "temple-tree",
    name: "Temple Tree Resort & Spa",
    type: "Resort",
    location: "Lakeside, Pokhara",
    region: "Gandaki Province",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
    rating: 8.9,
    reviews: 1421,
    pricePerNight: 118,
    stars: 4,
    badges: ["Free cancellation", "Breakfast included", "Pool"],
    amenities: ["Pool", "Spa", "Restaurant", "WiFi", "Yoga deck"],
    distance: "0.8 km from Phewa Lake",
    description: "Landscaped gardens, an infinity pool and a full Ayurvedic spa with Himalayan mountain views. Perfect base for Annapurna trekking departures.",
  },
  {
    id: "hotel-tibet",
    name: "Hotel Tibet International",
    type: "Hotel",
    location: "Lazimpat, Kathmandu",
    region: "Kathmandu Valley",
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=600&q=80",
    rating: 8.4,
    reviews: 967,
    pricePerNight: 92,
    stars: 4,
    badges: ["Free cancellation", "Breakfast included"],
    amenities: ["Restaurant", "Bar", "WiFi", "Business centre", "Garden"],
    distance: "2.3 km from city centre",
    description: "Elegant Tibetan-influenced hotel in the diplomatic zone of Kathmandu. Ornate interiors, peaceful garden terraces and warm high-altitude hospitality.",
  },
  {
    id: "nagarkot-farmhouse",
    name: "Nagarkot Farmhouse",
    type: "Lodge",
    location: "Nagarkot Ridge, Bhaktapur",
    region: "Kathmandu Valley",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    rating: 8.7,
    reviews: 438,
    pricePerNight: 58,
    stars: 3,
    badges: ["Free cancellation", "Sunrise view", "Organic breakfast"],
    amenities: ["Mountain view", "Restaurant", "WiFi", "Hiking trails", "Garden"],
    distance: "3.1 km from Nagarkot village",
    description: "Perched on a ridgeline at 2,100 m with a 180° panorama of eight Himalayan ranges including Everest and Langtang. Organic farm meals sourced on site.",
  },
  {
    id: "potala-guesthouse",
    name: "Potala Guest House",
    type: "Guesthouse",
    location: "Thamel, Kathmandu",
    region: "Kathmandu Valley",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80",
    rating: 8.1,
    reviews: 2876,
    pricePerNight: 42,
    stars: 3,
    badges: ["Free cancellation", "Rooftop terrace"],
    amenities: ["WiFi", "Rooftop", "Travel desk", "Luggage storage", "Laundry"],
    distance: "0.2 km from Thamel hub",
    description: "The traveller's favourite in Thamel for over two decades. Clean rooms, rooftop breakfast terrace, legendary travel-desk and hard-to-beat location for the bazaars.",
  },
  {
    id: "lakeside-lodge",
    name: "Lakeside Lodge Pokhara",
    type: "Lodge",
    location: "Damside, Pokhara",
    region: "Gandaki Province",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    rating: 8.3,
    reviews: 714,
    pricePerNight: 62,
    stars: 3,
    badges: ["Free cancellation", "Lake view"],
    amenities: ["Lake view", "Restaurant", "WiFi", "Boat rental", "Garden"],
    distance: "0.1 km from Phewa Lake",
    description: "Charming lakeside lodge steps from the water with direct Machhapuchhre (Fishtail) mountain views. Serene garden restaurant and kayak rental on site.",
  },
  {
    id: "hotel-himalaya",
    name: "Hotel Himalaya",
    type: "Hotel",
    location: "Kupondol, Lalitpur",
    region: "Kathmandu Valley",
    image: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=600&q=80",
    rating: 8.6,
    reviews: 1103,
    pricePerNight: 88,
    stars: 4,
    badges: ["Free cancellation", "Breakfast included", "Pool"],
    amenities: ["Pool", "Spa", "Restaurant", "WiFi", "Tennis court"],
    distance: "4.5 km from Kathmandu city centre",
    description: "Full-service hotel in quiet Patan with large swimming pool and Himalayan mountain views from the terrace. Easy access to Patan Durbar Square UNESCO heritage site.",
  },
  {
    id: "namche-highland",
    name: "Namche Highland Lodge",
    type: "Lodge",
    location: "Namche Bazaar, Solukhumbu",
    region: "Koshi Province",
    image: "https://images.unsplash.com/photo-1527824404775-dce343a3c6d9?auto=format&fit=crop&w=600&q=80",
    rating: 7.9,
    reviews: 329,
    pricePerNight: 34,
    stars: 2,
    badges: ["Yak butter tea included"],
    amenities: ["WiFi", "Hot shower", "Drying room", "Hiking info"],
    distance: "3,440 m altitude · EBC trail",
    description: "Warm stone lodge at 3,440 m on the classic Everest Base Camp trail. The hub of the Khumbu region with a vibrant Saturday market visible from the dining room.",
  },
  {
    id: "base-camp-teahouse",
    name: "Gorak Shep Teahouse",
    type: "Teahouse",
    location: "Gorak Shep, Solukhumbu",
    region: "Koshi Province",
    image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=600&q=80",
    rating: 7.3,
    reviews: 218,
    pricePerNight: 16,
    stars: 1,
    badges: ["Last stop before EBC"],
    amenities: ["Meals included", "Sleeping bag hire", "Oxygen on request"],
    distance: "5,164 m altitude · 2 km from EBC",
    description: "The legendary last teahouse before Everest Base Camp at 5,164 m. Basic but iconic — a bucket-list overnight with direct views of the Khumbu Icefall.",
  },
  {
    id: "annapurna-hostel",
    name: "The Summit Hostel",
    type: "Hostel",
    location: "Lakeside, Pokhara",
    region: "Gandaki Province",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    rating: 8.5,
    reviews: 1892,
    pricePerNight: 14,
    stars: 0,
    badges: ["Free cancellation", "Social bar"],
    amenities: ["Bar", "Common kitchen", "WiFi", "Lockers", "Tours desk"],
    distance: "0.5 km from Phewa Lake",
    description: "Pokhara's liveliest backpacker hub, famous for its rooftop bar and guided adventure-trip booking. Mixed and female-only dorms plus private rooms available.",
  },
  {
    id: "upper-mustang",
    name: "Hotel Bob Marley",
    type: "Guesthouse",
    location: "Lo Manthang, Mustang",
    region: "Gandaki Province",
    image: "https://images.unsplash.com/photo-1601918774516-4acc0e866ca2?auto=format&fit=crop&w=600&q=80",
    rating: 8.0,
    reviews: 156,
    pricePerNight: 48,
    stars: 2,
    badges: ["Restricted area permit zone"],
    amenities: ["WiFi", "Hot meals", "Rooftop terrace", "Cultural tours"],
    distance: "Inside the medieval walled city",
    description: "Cosy family-run guesthouse inside the walled medieval city of Lo Manthang in Upper Mustang. Stunning Himalayan desert landscape, Tibetan Buddhist culture and incredible stargazing.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ratingColor(r: number) {
  if (r >= 9.0) return { bg: "rgba(30,132,73,0.85)",   label: "Exceptional" };
  if (r >= 8.5) return { bg: "rgba(26,100,50,0.85)",   label: "Excellent" };
  if (r >= 8.0) return { bg: "rgba(26,74,122,0.85)",   label: "Very good" };
  if (r >= 7.0) return { bg: "rgba(50,100,120,0.85)",  label: "Good" };
  return          { bg: "rgba(100,80,30,0.85)",         label: "Okay" };
}

function starRow(n: number) {
  if (n === 0) return null;
  return (
    <span className="flex items-center gap-0.5" aria-label={`${n} stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="9" height="9" viewBox="0 0 24 24" fill="#d4a843">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

type SortKey = "recommended" | "price_asc" | "price_desc" | "rating_desc";

// ─── Main page ────────────────────────────────────────────────────────────────

export default function BookingPage() {
  // Search bar state
  const [destination, setDestination] = useState("Nepal");
  const [checkIn,     setCheckIn]     = useState("");
  const [checkOut,    setCheckOut]    = useState("");
  const [adults,      setAdults]      = useState(2);
  const [rooms,       setRooms]       = useState(1);
  const [guestOpen,   setGuestOpen]   = useState(false);

  // Filter state
  const [typeFilters,   setTypeFilters]   = useState<Set<PropertyType>>(new Set());
  const [maxPrice,      setMaxPrice]      = useState(350);
  const [minRating,     setMinRating]     = useState(0);
  const [freeCancel,    setFreeCancel]    = useState(false);
  const [breakfastOnly, setBreakfastOnly] = useState(false);
  const [mobileFilter,  setMobileFilter]  = useState(false);

  // Sort
  const [sortBy, setSortBy] = useState<SortKey>("recommended");

  const toggleType = (t: PropertyType) => {
    setTypeFilters(prev => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });
  };

  const results = useMemo(() => {
    let list = PROPERTIES.filter(p => {
      if (typeFilters.size > 0 && !typeFilters.has(p.type)) return false;
      if (p.pricePerNight > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (freeCancel && !p.badges.some(b => b.toLowerCase().includes("free cancellation"))) return false;
      if (breakfastOnly && !p.badges.some(b => b.toLowerCase().includes("breakfast"))) return false;
      return true;
    });
    if (sortBy === "price_asc")    list = [...list].sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (sortBy === "price_desc")   list = [...list].sort((a, b) => b.pricePerNight - a.pricePerNight);
    if (sortBy === "rating_desc")  list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "recommended")  list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
    return list;
  }, [typeFilters, maxPrice, minRating, freeCancel, breakfastOnly, sortBy]);

  const TYPES: PropertyType[] = ["Hotel", "Resort", "Lodge", "Guesthouse", "Hostel", "Teahouse"];

  const FONT = "var(--font-syne)";
  const FONT_D = "var(--font-display)";

  // ── Shared input style ────────────────────────────────────────────────────
  const inputCls: React.CSSProperties = {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10,
    color: "#f0ece3",
    fontFamily: FONT,
    fontSize: 13,
    padding: "10px 12px",
    outline: "none",
    width: "100%",
  };

  // ── Sidebar filter section ────────────────────────────────────────────────
  const FilterPanel = (
    <aside
      className="shrink-0"
      style={{ width: 268 }}
    >
      {/* Budget */}
      <div
        className="rounded-2xl p-5 mb-3"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#d4a843] mb-4 font-semibold" style={{ fontFamily: FONT }}>
          Budget per night
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] text-[#f0ece3]" style={{ fontFamily: FONT }}>Up to ${maxPrice}</span>
          <span className="text-[11px] text-[#6b6a5a]" style={{ fontFamily: FONT }}>$5 – $350</span>
        </div>
        <input
          type="range"
          min={5} max={350} step={5}
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#d4a843]"
          style={{ accentColor: "#d4a843" }}
        />
        <div className="flex justify-between mt-2">
          {[50, 100, 200, 350].map(v => (
            <button
              key={v}
              onClick={() => setMaxPrice(v)}
              className="text-[10px] px-2 py-1 rounded-full transition-colors"
              style={{
                fontFamily: FONT,
                background: maxPrice === v ? "rgba(212,168,67,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${maxPrice === v ? "rgba(212,168,67,0.4)" : "rgba(255,255,255,0.07)"}`,
                color: maxPrice === v ? "#d4a843" : "rgba(240,236,227,0.5)",
              }}
            >
              ${v}
            </button>
          ))}
        </div>
      </div>

      {/* Property type */}
      <div
        className="rounded-2xl p-5 mb-3"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#d4a843] mb-4 font-semibold" style={{ fontFamily: FONT }}>
          Property type
        </p>
        {TYPES.map(t => {
          const active = typeFilters.has(t);
          const count = PROPERTIES.filter(p => p.type === t).length;
          return (
            <label
              key={t}
              className="flex items-center justify-between py-2 cursor-pointer group"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    background: active ? "#d4a843" : "rgba(255,255,255,0.06)",
                    border: `1px solid ${active ? "#d4a843" : "rgba(255,255,255,0.15)"}`,
                  }}
                >
                  {active && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#07070d" strokeWidth="3.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </div>
                <input type="checkbox" className="hidden" checked={active} onChange={() => toggleType(t)} />
                <span
                  className="text-[12px] transition-colors"
                  style={{ fontFamily: FONT, color: active ? "#f0ece3" : "rgba(240,236,227,0.65)" }}
                >
                  {t}
                </span>
              </div>
              <span className="text-[10px] text-[#6b6a5a]" style={{ fontFamily: FONT }}>{count}</span>
            </label>
          );
        })}
      </div>

      {/* Guest rating */}
      <div
        className="rounded-2xl p-5 mb-3"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#d4a843] mb-4 font-semibold" style={{ fontFamily: FONT }}>
          Guest rating
        </p>
        {[0, 7, 8, 8.5, 9].map(r => (
          <label key={r} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors"
              style={{
                background: minRating === r ? "#d4a843" : "rgba(255,255,255,0.06)",
                border: `2px solid ${minRating === r ? "#d4a843" : "rgba(255,255,255,0.15)"}`,
              }}
            >
              {minRating === r && <div className="w-1.5 h-1.5 rounded-full bg-[#07070d]" />}
            </div>
            <input type="radio" className="hidden" checked={minRating === r} onChange={() => setMinRating(r)} />
            <span className="text-[12px]" style={{ fontFamily: FONT, color: "rgba(240,236,227,0.65)" }}>
              {r === 0 ? "Any rating" : `${r}+ · ${ratingColor(r).label}`}
            </span>
          </label>
        ))}
      </div>

      {/* Popular filters */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#d4a843] mb-4 font-semibold" style={{ fontFamily: FONT }}>
          Popular filters
        </p>
        {[
          { label: "Free cancellation", value: freeCancel,    set: setFreeCancel },
          { label: "Breakfast included",value: breakfastOnly, set: setBreakfastOnly },
        ].map(({ label, value, set }) => (
          <label key={label} className="flex items-center gap-2.5 py-2 cursor-pointer">
            <div
              className="w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors"
              style={{
                background: value ? "#d4a843" : "rgba(255,255,255,0.06)",
                border: `1px solid ${value ? "#d4a843" : "rgba(255,255,255,0.15)"}`,
              }}
            >
              {value && (
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#07070d" strokeWidth="3.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </div>
            <input type="checkbox" className="hidden" checked={value} onChange={() => set(!value)} />
            <span className="text-[12px]" style={{ fontFamily: FONT, color: "rgba(240,236,227,0.65)" }}>{label}</span>
          </label>
        ))}
      </div>
    </aside>
  );

  return (
    <>
      <Navbar />

      <main className="pt-16 min-h-screen" style={{ background: "#07070d" }}>

        {/* ── Search Hero ─────────────────────────────────────────────────── */}
        <div
          className="sticky top-[56px] z-30 px-4 md:px-8 py-4"
          style={{
            background: "rgba(7,7,13,0.97)",
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="max-w-[1400px] mx-auto">
            {/* Row 1 — headline (hidden on scroll, visible on initial) */}
            <div className="hidden lg:flex items-baseline gap-3 mb-3">
              <h1
                className="text-2xl leading-none"
                style={{ fontFamily: FONT_D, fontWeight: 600, color: "#f0ece3" }}
              >
                Find your stay in Nepal
              </h1>
              <span className="text-[11px] text-[#6b6a5a]" style={{ fontFamily: FONT }}>
                {PROPERTIES.length} properties available
              </span>
            </div>

            {/* Row 2 — search inputs */}
            <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-end">

              {/* Destination */}
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6a5a] mb-1" style={{ fontFamily: FONT }}>
                  Destination
                </label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b6a5a" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    placeholder="Where in Nepal?"
                    style={{ ...inputCls, paddingLeft: 36 }}
                  />
                </div>
              </div>

              {/* Check-in */}
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6a5a] mb-1" style={{ fontFamily: FONT }}>
                  Check-in
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                  style={{
                    ...inputCls,
                    colorScheme: "dark",
                  }}
                />
              </div>

              {/* Check-out */}
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6a5a] mb-1" style={{ fontFamily: FONT }}>
                  Check-out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                  style={{ ...inputCls, colorScheme: "dark" }}
                />
              </div>

              {/* Guests dropdown */}
              <div className="flex-1 min-w-0 relative">
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6a5a] mb-1" style={{ fontFamily: FONT }}>
                  Guests & rooms
                </label>
                <button
                  type="button"
                  onClick={() => setGuestOpen(v => !v)}
                  style={{ ...inputCls, textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                  <span>{adults} adult{adults !== 1 ? "s" : ""} · {rooms} room{rooms !== 1 ? "s" : ""}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b6a5a" strokeWidth="2"
                    style={{ transform: guestOpen ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Guest picker dropdown */}
                {guestOpen && (
                  <div
                    className="absolute top-full left-0 right-0 mt-1 rounded-xl p-4 z-50"
                    style={{
                      background: "#0d0d18",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                    }}
                  >
                    {[
                      { label: "Adults", sub: "Ages 18+", val: adults, set: setAdults, min: 1, max: 16 },
                      { label: "Rooms",  sub: "",          val: rooms,  set: setRooms,  min: 1, max: 8 },
                    ].map(({ label, sub, val, set, min, max }) => (
                      <div key={label} className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <div>
                          <p className="text-[13px] text-[#f0ece3]" style={{ fontFamily: FONT }}>{label}</p>
                          {sub && <p className="text-[10px] text-[#6b6a5a]" style={{ fontFamily: FONT }}>{sub}</p>}
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => set((v: number) => Math.max(min, v - 1))}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-lg transition-colors"
                            style={{
                              background: val === min ? "rgba(255,255,255,0.03)" : "rgba(212,168,67,0.12)",
                              border: "1px solid rgba(212,168,67,0.25)",
                              color: val === min ? "#4b4b5a" : "#d4a843",
                            }}
                          >
                            −
                          </button>
                          <span className="text-[14px] text-[#f0ece3] w-4 text-center" style={{ fontFamily: FONT }}>{val}</span>
                          <button
                            onClick={() => set((v: number) => Math.min(max, v + 1))}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-lg transition-colors"
                            style={{
                              background: val === max ? "rgba(255,255,255,0.03)" : "rgba(212,168,67,0.12)",
                              border: "1px solid rgba(212,168,67,0.25)",
                              color: val === max ? "#4b4b5a" : "#d4a843",
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => setGuestOpen(false)}
                      className="w-full mt-3 py-2 rounded-xl text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors"
                      style={{
                        background: "rgba(212,168,67,0.12)",
                        border: "1px solid rgba(212,168,67,0.25)",
                        color: "#d4a843",
                        fontFamily: FONT,
                      }}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* Search button */}
              <button
                type="button"
                className="shrink-0 px-8 py-2.5 rounded-xl font-semibold text-[12px] tracking-[0.15em] uppercase transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #d4a843, #e8c547)",
                  color: "#07070d",
                  fontFamily: FONT,
                  minHeight: 42,
                  boxShadow: "0 4px 24px rgba(212,168,67,0.3)",
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* ── Body: filters + results ──────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">

          {/* Mobile filter toggle */}
          <button
            className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2.5 rounded-xl text-[11px] font-semibold tracking-[0.15em] uppercase"
            style={{
              background: "rgba(212,168,67,0.08)",
              border: "1px solid rgba(212,168,67,0.2)",
              color: "#d4a843",
              fontFamily: FONT,
            }}
            onClick={() => setMobileFilter(v => !v)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            Filters {typeFilters.size + (freeCancel ? 1 : 0) + (breakfastOnly ? 1 : 0) > 0 && `(${typeFilters.size + (freeCancel ? 1 : 0) + (breakfastOnly ? 1 : 0)})`}
          </button>

          {/* Mobile filter drawer */}
          {mobileFilter && (
            <div className="lg:hidden mb-4">
              {FilterPanel}
            </div>
          )}

          <div className="flex gap-6 items-start">

            {/* Desktop sidebar */}
            <div className="hidden lg:block sticky top-[140px]">
              {FilterPanel}
            </div>

            {/* Results column */}
            <div className="flex-1 min-w-0">

              {/* Sort + count bar */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-[13px] text-[rgba(240,236,227,0.6)]" style={{ fontFamily: FONT }}>
                  <span className="text-[#f0ece3] font-semibold">{results.length}</span> properties found
                  {destination && destination !== "Nepal" ? ` in ${destination}` : " in Nepal"}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b6a5a] hidden sm:block" style={{ fontFamily: FONT }}>
                    Sort by
                  </span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as SortKey)}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 10,
                      color: "#f0ece3",
                      fontFamily: FONT,
                      fontSize: 12,
                      padding: "8px 12px",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="recommended" style={{ background: "#0d0d18" }}>Recommended</option>
                    <option value="rating_desc" style={{ background: "#0d0d18" }}>Rating: High to low</option>
                    <option value="price_asc"   style={{ background: "#0d0d18" }}>Price: Low to high</option>
                    <option value="price_desc"  style={{ background: "#0d0d18" }}>Price: High to low</option>
                  </select>
                </div>
              </div>

              {/* Property cards */}
              {results.length === 0 ? (
                <div
                  className="rounded-2xl p-14 text-center"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-4xl mb-3">🏔</p>
                  <p className="text-[15px] text-[#f0ece3] mb-2" style={{ fontFamily: FONT_D }}>No properties match your filters</p>
                  <p className="text-[12px] text-[#6b6a5a]" style={{ fontFamily: FONT }}>Try adjusting your budget or removing some filters</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {results.map(p => {
                    const rc = ratingColor(p.rating);
                    return (
                      <article
                        key={p.id}
                        className="group overflow-hidden transition-all duration-300"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: p.featured ? "1px solid rgba(212,168,67,0.2)" : "1px solid rgba(255,255,255,0.07)",
                          borderRadius: 20,
                        }}
                      >
                        <div className="flex flex-col sm:flex-row">

                          {/* Image */}
                          <div
                            className="relative overflow-hidden shrink-0"
                            style={{ width: "100%", maxWidth: 260, height: 200, borderRadius: "20px 0 0 20px" }}
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              style={{ filter: "saturate(0.85) contrast(1.05)" }}
                            />
                            {/* Featured badge */}
                            {p.featured && (
                              <div
                                className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-[0.15em] uppercase"
                                style={{
                                  background: "rgba(212,168,67,0.9)",
                                  color: "#07070d",
                                  fontFamily: FONT,
                                  backdropFilter: "blur(8px)",
                                }}
                              >
                                Featured
                              </div>
                            )}
                            {/* Stars on image */}
                            {p.stars > 0 && (
                              <div className="absolute bottom-3 left-3">
                                <div
                                  className="flex items-center gap-0.5 px-2 py-1 rounded-full"
                                  style={{ background: "rgba(7,7,13,0.75)", backdropFilter: "blur(8px)" }}
                                >
                                  {starRow(p.stars)}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex flex-col flex-1 p-5 gap-3">

                            {/* Top row — name + rating */}
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                {/* Type pill */}
                                <span
                                  className="inline-block text-[9px] tracking-[0.3em] uppercase font-semibold px-2.5 py-0.5 rounded-full mb-2"
                                  style={{
                                    fontFamily: FONT,
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "rgba(240,236,227,0.5)",
                                  }}
                                >
                                  {p.type}
                                </span>
                                <h2
                                  className="text-[16px] font-semibold leading-snug transition-colors group-hover:text-[#d4a843]"
                                  style={{ fontFamily: FONT_D, color: "#f0ece3" }}
                                >
                                  {p.name}
                                </h2>
                                <p className="text-[11px] text-[#6b6a5a] mt-0.5" style={{ fontFamily: FONT }}>
                                  <svg className="inline mr-1" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                  </svg>
                                  {p.location}
                                  <span className="mx-1 opacity-40">·</span>
                                  {p.distance}
                                </p>
                              </div>

                              {/* Rating box */}
                              <div className="flex flex-col items-end gap-1 shrink-0">
                                <span className="text-[10px] text-[rgba(240,236,227,0.5)]" style={{ fontFamily: FONT }}>
                                  {rc.label}
                                </span>
                                <div
                                  className="w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-[13px]"
                                  style={{ background: rc.bg, color: "#fff", fontFamily: FONT }}
                                >
                                  {p.rating.toFixed(1)}
                                </div>
                                <span className="text-[10px] text-[#6b6a5a]" style={{ fontFamily: FONT }}>
                                  {p.reviews.toLocaleString()} reviews
                                </span>
                              </div>
                            </div>

                            {/* Description */}
                            <p
                              className="text-[11px] leading-relaxed line-clamp-2"
                              style={{ fontFamily: FONT, color: "rgba(240,236,227,0.5)" }}
                            >
                              {p.description}
                            </p>

                            {/* Amenity chips */}
                            <div className="flex flex-wrap gap-1.5">
                              {p.amenities.slice(0, 4).map(a => (
                                <span
                                  key={a}
                                  className="text-[9px] px-2.5 py-1 rounded-full"
                                  style={{
                                    fontFamily: FONT,
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.09)",
                                    color: "rgba(240,236,227,0.45)",
                                  }}
                                >
                                  {a}
                                </span>
                              ))}
                            </div>

                            {/* Bottom row — badges + price + CTA */}
                            <div className="flex items-end justify-between gap-4 mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>

                              {/* Badges */}
                              <div className="flex flex-wrap gap-1.5">
                                {p.badges.map(b => (
                                  <span
                                    key={b}
                                    className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                                    style={{
                                      fontFamily: FONT,
                                      background: b.toLowerCase().includes("free cancel") ? "rgba(30,132,73,0.15)" : "rgba(212,168,67,0.08)",
                                      border: b.toLowerCase().includes("free cancel") ? "1px solid rgba(82,201,138,0.25)" : "1px solid rgba(212,168,67,0.2)",
                                      color: b.toLowerCase().includes("free cancel") ? "#52c98a" : "#d4a843",
                                    }}
                                  >
                                    {b}
                                  </span>
                                ))}
                              </div>

                              {/* Price + CTA */}
                              <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right">
                                  <p className="text-[10px] text-[#6b6a5a]" style={{ fontFamily: FONT }}>from</p>
                                  <p className="text-[20px] font-semibold leading-none text-[#f0ece3]" style={{ fontFamily: FONT_D }}>
                                    ${p.pricePerNight}
                                  </p>
                                  <p className="text-[9px] text-[#6b6a5a]" style={{ fontFamily: FONT }}>per night</p>
                                </div>
                                <Link
                                  href={`/booking/${p.id}`}
                                  className="px-4 py-2.5 rounded-xl text-[11px] font-semibold tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-200"
                                  style={{
                                    background: "linear-gradient(135deg, #d4a843, #e8c547)",
                                    color: "#07070d",
                                    fontFamily: FONT,
                                    boxShadow: "0 4px 16px rgba(212,168,67,0.25)",
                                  }}
                                >
                                  See availability
                                </Link>
                              </div>

                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Trust strip */}
              <div
                className="mt-8 rounded-2xl p-5 flex flex-wrap gap-6 items-center justify-center"
                style={{ background: "rgba(212,168,67,0.04)", border: "1px solid rgba(212,168,67,0.1)" }}
              >
                {[
                  { icon: "🔒", text: "Secure payment" },
                  { icon: "✓",  text: "No booking fees" },
                  { icon: "📞", text: "24/7 support" },
                  { icon: "🌏", text: "Best price guarantee" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <span className="text-base">{icon}</span>
                    <span className="text-[11px] text-[rgba(240,236,227,0.55)]" style={{ fontFamily: FONT }}>{text}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
