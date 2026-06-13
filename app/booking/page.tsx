"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Currency = "USD" | "NPR";

interface CatField {
  label: string;
  type: "text" | "select" | "date" | "number" | "toggle" | "textarea" | "multi";
  options?: string[];
  req?: boolean;
  min?: number;
}

interface Addon { field: string; label: string; amount: number; perDay?: boolean; }

interface Pricing {
  base: number;
  unitLabel: string;
  durUnit?: string;
  dateRange?: [string, string];
  durationField?: string;
  qtyFields?: string[];
  packageField?: string;
  packagePrices?: Record<string, number>;
  addons?: Addon[];
}

interface Category {
  id: string;
  icon: string;
  label: string;
  desc: string;
  fields: CatField[];
  included: string[];
  pricing: Pricing | null;
}

interface PriceResult {
  items: { label: string; amount: number }[];
  subtotal: number;
  vat: number;
  total: number;
}

interface WizardState {
  cat: Category;
  step: number;
  steps: string[];
  values: Record<string, unknown>;
  ref: string | null;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DUR: Record<string, number> = {
  "4-5 days": 5, "7-10 days": 10, "14-18 days": 18, "20+ days": 21,
  "Half Day": 0.5, "Full Day": 1, "2 Days + Camping": 2, "2 Days + Lodge": 2,
  "3 Days": 3, "3 Days Package": 3,
};

const CATS: Category[] = [
  {
    id: "hotels", icon: "🏨", label: "Hotels & Stays", desc: "Hotels, lodges & homestays",
    fields: [
      { label: "Destination", type: "select", options: ["Kathmandu","Pokhara","Chitwan","Bhaktapur","Lumbini"], req: true },
      { label: "Check-in Date", type: "date", req: true },
      { label: "Check-out Date", type: "date", req: true },
      { label: "Room Type", type: "select", options: ["Standard","Deluxe","Mountain View Suite","Luxury"], req: true },
      { label: "Guests", type: "number", min: 1 },
    ],
    included: ["Free cancellation up to 48h","Breakfast included","Best-price guarantee"],
    pricing: { base: 45, unitLabel: "per night", durUnit: "nights", dateRange: ["Check-in Date","Check-out Date"], packageField: "Room Type", packagePrices: { Standard: 45, Deluxe: 70, "Mountain View Suite": 110, Luxury: 160 } },
  },
  {
    id: "trekking", icon: "🎒", label: "Trekking", desc: "Poon Hill to Everest Base Camp",
    fields: [
      { label: "Trek Route", type: "select", options: ["Poon Hill","Langtang","Annapurna Base Camp","Everest Base Camp","Annapurna Circuit","Manaslu Circuit"], req: true },
      { label: "Start Date", type: "date", req: true },
      { label: "Duration", type: "select", options: ["4-5 days","7-10 days","14-18 days","20+ days"], req: true },
      { label: "Group Size", type: "number", min: 1 },
      { label: "Guide Required", type: "toggle" },
      { label: "Porter Required", type: "toggle" },
    ],
    included: ["Certified guide & permits","Teahouse accommodation","Day-by-day itinerary"],
    pricing: { base: 75, unitLabel: "per person / day", durUnit: "days", durationField: "Duration", qtyFields: ["Group Size"], addons: [{ field: "Guide Required", label: "Licensed guide", amount: 25, perDay: true }, { field: "Porter Required", label: "Porter", amount: 18, perDay: true }] },
  },
  {
    id: "paragliding", icon: "🪂", label: "Paragliding", desc: "Tandem flights over Pokhara",
    fields: [
      { label: "Location", type: "select", options: ["Pokhara (Sarangkot)","Pokhara (Lakeside)"], req: true },
      { label: "Package", type: "select", options: ["30 min Standard","45 min Premium","60 min Sunrise Special","Video + Photo Package"], req: true },
      { label: "Date", type: "date", req: true },
      { label: "Time Slot", type: "select", options: ["6:00 AM","7:00 AM","8:00 AM","10:00 AM","12:00 PM","2:00 PM"] },
      { label: "Number of Flyers", type: "number", min: 1 },
    ],
    included: ["Certified pilot","All safety gear","Free pickup from lakeside"],
    pricing: { base: 80, unitLabel: "per flight", qtyFields: ["Number of Flyers"], packageField: "Package", packagePrices: { "30 min Standard": 80, "45 min Premium": 110, "60 min Sunrise Special": 150, "Video + Photo Package": 175 } },
  },
  {
    id: "zipline", icon: "🎢", label: "Zip-lining", desc: "World's steepest, above Pokhara",
    fields: [
      { label: "Zipline", type: "select", options: ["Zipflyer Pokhara (World's Steepest)","Hemja Zipline","Sarangkot Line"], req: true },
      { label: "Date", type: "date", req: true },
      { label: "Time Slot", type: "select", options: ["8:00 AM","10:00 AM","12:00 PM","2:00 PM","4:00 PM"] },
      { label: "Number of Riders", type: "number", min: 1 },
    ],
    included: ["Full harness & briefing","100 km/h, 600m drop","Photos available"],
    pricing: { base: 65, unitLabel: "per ride", qtyFields: ["Number of Riders"] },
  },
  {
    id: "rafting", icon: "🚣", label: "White Water Rafting", desc: "Grade 3–5 rapids",
    fields: [
      { label: "River", type: "select", options: ["Trishuli (Grade 3-4)","Seti River (Grade 3)","Bhote Koshi (Grade 4-5)","Kali Gandaki (Grade 4-5)"], req: true },
      { label: "Duration", type: "select", options: ["Half Day","Full Day","2 Days + Camping","3 Days"], req: true },
      { label: "Date", type: "date", req: true },
      { label: "Group Size", type: "number", min: 1 },
      { label: "Experience Level", type: "select", options: ["Beginner","Intermediate","Advanced"] },
    ],
    included: ["Certified guide","All gear + safety kayak","Riverside lunch"],
    pricing: { base: 50, unitLabel: "per person / day", durUnit: "days", durationField: "Duration", qtyFields: ["Group Size"] },
  },
  {
    id: "bungee", icon: "🎯", label: "Bungee Jumping", desc: "160m freefall at Bhote Koshi",
    fields: [
      { label: "Location", type: "select", options: ["Bhote Koshi (160m)","The Last Resort","Pokhara Bungee"], req: true },
      { label: "Date", type: "date", req: true },
      { label: "Time Slot", type: "select", options: ["9:00 AM","11:00 AM","1:00 PM","3:00 PM"] },
      { label: "Number of Jumpers", type: "number", min: 1 },
    ],
    included: ["Pro jump masters","Digital jump certificate","Transport from KTM option"],
    pricing: { base: 90, unitLabel: "per jump", qtyFields: ["Number of Jumpers"] },
  },
  {
    id: "safari", icon: "🐅", label: "Jungle Safari", desc: "Jeep & elephant safaris",
    fields: [
      { label: "National Park", type: "select", options: ["Chitwan National Park","Bardia National Park","Shivapuri NP"], req: true },
      { label: "Safari Type", type: "select", options: ["Jeep Safari","Walking Safari","Bird Watching","Canoe Safari"], req: true },
      { label: "Duration", type: "select", options: ["Half Day","Full Day","2 Days + Lodge","3 Days Package"], req: true },
      { label: "Date", type: "date", req: true },
      { label: "Group Size", type: "number", min: 1 },
    ],
    included: ["Naturalist guide","Park entry permits","Wildlife spotting log"],
    pricing: { base: 70, unitLabel: "per person / day", durUnit: "days", durationField: "Duration", qtyFields: ["Group Size"] },
  },
  {
    id: "bus", icon: "🚌", label: "Bus Booking", desc: "Tourist & local buses",
    fields: [
      { label: "From", type: "select", options: ["Kathmandu","Pokhara","Chitwan","Lumbini","Bhaktapur"], req: true },
      { label: "To", type: "select", options: ["Pokhara","Chitwan (Sauraha)","Lumbini","Kathmandu","Sunauli Border"], req: true },
      { label: "Travel Date", type: "date", req: true },
      { label: "Bus Class", type: "select", options: ["Local Bus (Budget)","Tourist Bus (AC)","Deluxe AC Coach","Night Bus (Sleeper)","Micro / Hiace Van"], req: true },
      { label: "Passengers", type: "number", min: 1 },
      { label: "Return Trip?", type: "toggle" },
    ],
    included: ["Reserved seats","Hotel pickup option","Live departure updates"],
    pricing: { base: 15, unitLabel: "per seat", qtyFields: ["Passengers"], packageField: "Bus Class", packagePrices: { "Local Bus (Budget)": 8, "Tourist Bus (AC)": 15, "Deluxe AC Coach": 22, "Night Bus (Sleeper)": 25, "Micro / Hiace Van": 18 } },
  },
  {
    id: "taxi", icon: "🚕", label: "Taxi & Private Car", desc: "Airport transfers & drivers",
    fields: [
      { label: "Ride Type", type: "select", options: ["Airport Transfer","City Transfer","Full Day Hire","Intercity Trip"], req: true },
      { label: "Pickup Location", type: "text", req: true },
      { label: "Drop Location", type: "text", req: true },
      { label: "Date", type: "date", req: true },
      { label: "Vehicle Type", type: "select", options: ["Sedan (1–4 pax)","SUV / Jeep (1–6 pax)","Microvan (5–8 pax)","Minibus (8–15 pax)","Luxury Car"], req: true },
    ],
    included: ["Fixed fare, no surprises","English-speaking driver option","Flight tracking on transfers"],
    pricing: { base: 18, unitLabel: "per trip", packageField: "Vehicle Type", packagePrices: { "Sedan (1–4 pax)": 18, "SUV / Jeep (1–6 pax)": 30, "Microvan (5–8 pax)": 40, "Minibus (8–15 pax)": 70, "Luxury Car": 90 } },
  },
  {
    id: "motorbike", icon: "🏍️", label: "Motorbike Rental", desc: "Scooters, sports & dirt bikes",
    fields: [
      { label: "Pickup City", type: "select", options: ["Kathmandu","Pokhara","Chitwan","Bhaktapur","Nagarkot"], req: true },
      { label: "Bike Type", type: "select", options: ["Scooter / Scooty (125cc)","Semi-Sport (150–200cc)","Sports Bike (250cc+)","Dirt Bike / Off-road (200–450cc)","Royal Enfield (350–500cc)","Electric Scooter"], req: true },
      { label: "Rental Start", type: "date", req: true },
      { label: "Rental End", type: "date", req: true },
      { label: "Helmet & Gear", type: "toggle" },
      { label: "With GPS Device?", type: "toggle" },
    ],
    included: ["Well-maintained bikes","Roadside assistance","Route suggestions"],
    pricing: { base: 18, unitLabel: "per day", durUnit: "days", dateRange: ["Rental Start","Rental End"], packageField: "Bike Type", packagePrices: { "Scooter / Scooty (125cc)": 15, "Semi-Sport (150–200cc)": 22, "Sports Bike (250cc+)": 35, "Dirt Bike / Off-road (200–450cc)": 45, "Royal Enfield (350–500cc)": 40, "Electric Scooter": 18 }, addons: [{ field: "Helmet & Gear", label: "Helmet & gear", amount: 5, perDay: true }, { field: "With GPS Device?", label: "GPS device", amount: 3, perDay: true }] },
  },
  {
    id: "custom", icon: "🗓️", label: "Custom Itinerary", desc: "A trip planned just for you",
    fields: [
      { label: "Trip Duration", type: "select", options: ["3-5 days","1 week","2 weeks","3+ weeks"], req: true },
      { label: "Budget per person", type: "select", options: ["Budget (<$50/day)","Mid-range ($50-150)","Luxury ($150+)"], req: true },
      { label: "Interests", type: "multi", options: ["Trekking","Culture","Wildlife","Adventure Sports","Spiritual","Photography","Food"] },
      { label: "Travel Style", type: "select", options: ["Solo","Couple","Family","Group","Honeymoon"] },
      { label: "Anything else?", type: "textarea" },
    ],
    included: ["Built by a local expert","Reply within 24 hours","No obligation quote"],
    pricing: null,
  },
];

const DESTS = [
  { name: "Kathmandu",     sub: "Temples & old-town energy",   e: "🛕",  grad: "linear-gradient(150deg,#f6a93c,#b14a6e)", opt: "Kathmandu" },
  { name: "Pokhara",       sub: "Lakeside adventure hub",       e: "🪂",  grad: "linear-gradient(150deg,#39d2c0,#1466d8)", opt: "Pokhara" },
  { name: "Chitwan",       sub: "Jungle safaris & rhinos",      e: "🦏",  grad: "linear-gradient(150deg,#5fbf7e,#1a7a4d)", opt: "Chitwan" },
  { name: "Everest Region",sub: "The ultimate trek",            e: "🏔️", grad: "linear-gradient(150deg,#9fd0ff,#3a6fb0)", opt: null },
  { name: "Bhaktapur",     sub: "A living medieval city",       e: "🏺",  grad: "linear-gradient(150deg,#ffcf6b,#c97b2d)", opt: "Bhaktapur" },
  { name: "Lumbini",       sub: "Birthplace of Buddha",         e: "☸️",  grad: "linear-gradient(150deg,#b69bff,#5a3a9e)", opt: "Lumbini" },
  { name: "Upper Mustang", sub: "The forbidden kingdom",        e: "🏜️", grad: "linear-gradient(150deg,#ffb86b,#b1582d)", opt: null },
  { name: "Nagarkot",      sub: "Sunrise over the Himalayas",   e: "🌅",  grad: "linear-gradient(150deg,#ffb3c8,#d4763a)", opt: null },
];

const GRADS: Record<string, string> = {
  hotels: "linear-gradient(135deg,#f6b73c,#e0792d)", trekking: "linear-gradient(135deg,#3fc47e,#1a7a4d)",
  paragliding: "linear-gradient(135deg,#39d2c0,#1466d8)", zipline: "linear-gradient(135deg,#ff9a44,#e0532a)",
  rafting: "linear-gradient(135deg,#36cfd6,#1a8c9e)", bungee: "linear-gradient(135deg,#ff6fae,#9b2d7a)",
  safari: "linear-gradient(135deg,#a9ca4d,#5a7a2e)", bus: "linear-gradient(135deg,#ffb24d,#d45c00)",
  taxi: "linear-gradient(135deg,#ffd34d,#c4a000)", motorbike: "linear-gradient(135deg,#ff7a7a,#b02020)",
  custom: "linear-gradient(135deg,#b89bff,#6b4fa0)",
};

const TABS = [
  { id: "stays",     label: "Stays",       e: "🛏️" },
  { id: "treks",     label: "Treks",       e: "🥾" },
  { id: "adventure", label: "Adventure",   e: "🪂" },
  { id: "transport", label: "Transport",   e: "🚌" },
  { id: "custom",    label: "Custom trip", e: "🗓️" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const RATE = { USD: 1, NPR: 133 };
const SYM  = { USD: "$", NPR: "Rs " };

function fmt(usd: number, cur: Currency) {
  const v = usd * RATE[cur];
  const r = cur === "NPR" ? Math.round(v / 10) * 10 : Math.round(v);
  return SYM[cur] + r.toLocaleString();
}

function startPrice(cat: Category) {
  if (!cat.pricing) return null;
  const p = cat.pricing;
  return p.packagePrices ? Math.min(...Object.values(p.packagePrices)) : p.base;
}

function calcPrice(cat: Category, vals: Record<string, unknown>): PriceResult | null {
  const p = cat.pricing;
  if (!p) return null;
  let base = p.base;
  if (p.packageField && p.packagePrices && vals[p.packageField]) {
    const pkg = p.packagePrices[vals[p.packageField] as string];
    if (pkg != null) base = pkg;
  }
  let qty = 1;
  if (p.qtyFields) for (const f of p.qtyFields) { if (vals[f]) { qty = Math.max(1, parseInt(vals[f] as string) || 1); break; } }
  let dur = 1;
  if (p.dateRange) {
    const [a, b] = p.dateRange;
    if (vals[a] && vals[b]) { const d = (new Date(vals[b] as string).getTime() - new Date(vals[a] as string).getTime()) / 864e5; if (d > 0) dur = Math.round(d); }
  } else if (p.durationField && vals[p.durationField]) {
    const dd = DUR[vals[p.durationField] as string];
    if (dd != null) dur = dd;
  }
  const items: { label: string; amount: number }[] = [];
  let lbl = `${cat.label} (${p.unitLabel})`;
  const m: string[] = [];
  if (qty > 1) m.push(`${qty} pax`);
  if (dur !== 1) m.push(`${dur} ${p.durUnit || "days"}`);
  if (m.length) lbl += ` · ${m.join(" × ")}`;
  items.push({ label: lbl, amount: base * qty * dur });
  if (p.addons) for (const a of p.addons) { if (vals[a.field]) items.push({ label: a.label, amount: a.perDay ? a.amount * dur : a.amount }); }
  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const vat = subtotal * 0.13;
  return { items, subtotal, vat, total: subtotal + vat };
}

// ─── Mountain SVG ─────────────────────────────────────────────────────────────

const MT = (
  <svg viewBox="0 0 400 120" preserveAspectRatio="none">
    <path d="M0,120 L0,75 L70,40 L130,75 L200,30 L270,72 L340,42 L400,72 L400,120 Z" fill="rgba(255,255,255,.55)" />
  </svg>
);

// ─── Field renderer ───────────────────────────────────────────────────────────

function Field({
  f, val, invalid, onChange,
}: {
  f: CatField;
  val: unknown;
  invalid: boolean;
  onChange: (label: string, v: unknown) => void;
}) {
  const str = (val as string) ?? "";
  const cls = `field${invalid ? " invalid" : ""}`;
  const today = new Date().toISOString().slice(0, 10);

  if (f.type === "select") return (
    <div className={cls}>
      <label>{f.label}{f.req ? " *" : ""}</label>
      <select value={str} onChange={e => onChange(f.label, e.target.value)}>
        <option value="" disabled>Select…</option>
        {f.options?.map(o => <option key={o}>{o}</option>)}
      </select>
      <div className="err">Please choose an option</div>
    </div>
  );

  if (f.type === "date") return (
    <div className={cls}>
      <label>{f.label}{f.req ? " *" : ""}</label>
      <input type="date" min={today} value={str} onChange={e => onChange(f.label, e.target.value)} />
      <div className="err">Required</div>
    </div>
  );

  if (f.type === "number") return (
    <div className="field">
      <label>{f.label}</label>
      <input type="number" min={f.min ?? 1} value={str || String(f.min ?? 1)} onChange={e => onChange(f.label, e.target.value)} />
    </div>
  );

  if (f.type === "toggle") return (
    <div className="field">
      <div className="toggle-row">
        <span>{f.label}</span>
        <label className="sw">
          <input type="checkbox" checked={!!val} onChange={e => onChange(f.label, e.target.checked)} />
          <span className="track" />
        </label>
      </div>
    </div>
  );

  if (f.type === "textarea") return (
    <div className="field">
      <label>{f.label}</label>
      <textarea value={str} placeholder="Optional…" onChange={e => onChange(f.label, e.target.value)} />
    </div>
  );

  if (f.type === "multi") {
    const arr = Array.isArray(val) ? (val as string[]) : [];
    const toggle = (opt: string) => onChange(f.label, arr.includes(opt) ? arr.filter(x => x !== opt) : [...arr, opt]);
    return (
      <div className="field">
        <label>{f.label}</label>
        <div className="chips">
          {f.options?.map(o => (
            <button
              key={o}
              type="button"
              className={`chip${arr.includes(o) ? " sel" : ""}`}
              aria-pressed={arr.includes(o)}
              onClick={() => toggle(o)}
            >{o}</button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cls}>
      <label>{f.label}{f.req ? " *" : ""}</label>
      <input type="text" value={str} placeholder="Type here…" onChange={e => onChange(f.label, e.target.value)} />
      <div className="err">Required</div>
    </div>
  );
}

// ─── Price rows ───────────────────────────────────────────────────────────────

function PriceRows({ price, cur }: { price: PriceResult; cur: Currency }) {
  return (
    <div className="price-rows">
      {price.items.map(i => (
        <div key={i.label} className="pr"><span>{i.label}</span><span>{fmt(i.amount, cur)}</span></div>
      ))}
      <div className="pr"><span>VAT (13%)</span><span>{fmt(price.vat, cur)}</span></div>
      <div className="pr tot"><span>Total</span><b>{fmt(price.total, cur)}</b></div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function BookingPage() {
  const [cur,       setCur]       = useState<Currency>("USD");
  const [tab,       setTab]       = useState("stays");
  const [occ,       setOcc]       = useState({ adults: 2, children: 0, rooms: 1 });
  const [occOpen,   setOccOpen]   = useState(false);
  const [wizard,    setWizard]    = useState<WizardState | null>(null);
  const [invalid,   setInvalid]   = useState<Set<string>>(new Set());

  // Search bar field values
  const [sfDest,   setSfDest]   = useState("");
  const [sfIn,     setSfIn]     = useState("");
  const [sfOut,    setSfOut]    = useState("");
  const [sfGroup,  setSfGroup]  = useState("2");
  const [sfRoute,  setSfRoute]  = useState("");
  const [sfAct,    setSfAct]    = useState("");
  const [sfTtype,  setSfTtype]  = useState("");
  const [sfDream,  setSfDream]  = useState("");

  const occRef    = useRef<HTMLDivElement>(null);
  const sheetRef  = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const today = new Date().toISOString().slice(0, 10);

  // Override body styles for the light booking theme
  useEffect(() => {
    const prev = { bg: document.body.style.background, color: document.body.style.color };
    document.body.style.background = "#ffffff";
    document.body.style.color = "#3d4255";
    return () => { document.body.style.background = prev.bg; document.body.style.color = prev.color; };
  }, []);

  // Close occupancy popover on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => { if (occRef.current && !occRef.current.contains(e.target as Node)) setOccOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Close wizard on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape" && wizard) closeWizard(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [wizard]);

  // Focus trap + initial focus when wizard is open
  useEffect(() => {
    if (!wizard || !sheetRef.current) return;
    const el = sheetRef.current;
    const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const nodes = () => Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
    // focus first focusable element on open / step change
    nodes()[0]?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const all = nodes();
      if (!all.length) return;
      const first = all[0], last = all[all.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    el.addEventListener("keydown", trap);
    return () => el.removeEventListener("keydown", trap);
  }, [wizard]);

  // ── Wizard ────────────────────────────────────────────────────────────────

  function openWizard(id: string, prefill: Record<string, unknown> = {}) {
    triggerRef.current = document.activeElement;
    const cat = CATS.find(c => c.id === id);
    if (!cat) return;
    const steps = cat.pricing
      ? ["Configure", "Review", "Your details", "Payment", "Confirmed"]
      : ["Your trip", "Your details", "Submitted"];
    const values: Record<string, unknown> = {};
    cat.fields.forEach(f => { if (f.type === "number") values[f.label] = f.min ?? 1; });
    Object.assign(values, prefill);
    setWizard({ cat, step: 0, steps, values, ref: null });
    setInvalid(new Set());
    document.body.style.overflow = "hidden";
  }

  function closeWizard() {
    setWizard(null);
    document.body.style.overflow = "";
    document.body.style.background = "#ffffff";
    requestAnimationFrame(() => {
      (triggerRef.current as HTMLElement | null)?.focus();
      triggerRef.current = null;
    });
  }

  function setVal(label: string, v: unknown) {
    setWizard(prev => prev ? { ...prev, values: { ...prev.values, [label]: v } } : prev);
    setInvalid(prev => { const n = new Set(prev); n.delete(label); return n; });
  }

  function wizardNext() {
    if (!wizard) return;
    const stepName = wizard.steps[wizard.step];
    const bad = new Set<string>();

    if (stepName === "Configure" || stepName === "Your trip") {
      wizard.cat.fields.filter(f => f.req).forEach(f => {
        const v = wizard.values[f.label];
        if (v === undefined || v === "" || v === null) bad.add(f.label);
      });
    } else if (stepName === "Your details") {
      ["Full name", "Email", "Phone / WhatsApp"].forEach(lbl => {
        const v = wizard.values[lbl];
        if (!v || (typeof v === "string" && !v.trim())) bad.add(lbl);
      });
    }

    if (bad.size > 0) { setInvalid(bad); return; }

    const isLastBeforeDone = stepName === "Payment" || (stepName === "Your details" && !wizard.cat.pricing);
    const newRef = isLastBeforeDone ? "NPL-" + Math.random().toString(36).slice(2, 8).toUpperCase() : wizard.ref;
    setWizard(prev => prev ? { ...prev, step: prev.step + 1, ref: newRef ?? prev.ref } : prev);
    setInvalid(new Set());
  }

  function wizardBack() {
    setWizard(prev => prev ? { ...prev, step: prev.step - 1 } : prev);
    setInvalid(new Set());
  }

  // ── Search ────────────────────────────────────────────────────────────────

  function doSearch(catKey: string) {
    let catId = catKey;
    const prefill: Record<string, unknown> = {};

    if (catKey === "__act") {
      const m: Record<string, string> = { Paragliding: "paragliding", "Zip-lining": "zipline", "White Water Rafting": "rafting", "Bungee Jumping": "bungee", "Jungle Safari": "safari" };
      catId = m[sfAct] || "paragliding";
    }
    if (catKey === "__transport") {
      const m: Record<string, string> = { Bus: "bus", "Taxi / Private Car": "taxi", "Motorbike Rental": "motorbike" };
      catId = m[sfTtype] || "bus";
    }

    if (tab === "stays") {
      if (sfDest) prefill["Destination"] = sfDest;
      if (sfIn)   prefill["Check-in Date"] = sfIn;
      if (sfOut)  prefill["Check-out Date"] = sfOut;
      prefill["Guests"] = occ.adults + occ.children;
    } else if (tab === "treks") {
      if (sfRoute) prefill["Trek Route"] = sfRoute;
      if (sfIn)    prefill["Start Date"] = sfIn;
      if (sfGroup) prefill["Group Size"] = sfGroup;
    } else if (tab === "adventure" || tab === "transport") {
      const cat = CATS.find(c => c.id === catId);
      if (cat) {
        const df = cat.fields.find(f => f.type === "date");
        if (df && sfIn) prefill[df.label] = sfIn;
        const nf = cat.fields.find(f => f.type === "number");
        if (nf && sfGroup) prefill[nf.label] = sfGroup;
      }
    }

    openWizard(catId, prefill);
  }

  // ── Render ────────────────────────────────────────────────────────────────

  const price = wizard ? calcPrice(wizard.cat, wizard.values) : null;

  const renderStep = () => {
    if (!wizard) return null;
    const stepName = wizard.steps[wizard.step];

    if (stepName === "Configure" || stepName === "Your trip") return (
      <>
        {wizard.cat.fields.map(f => (
          <Field key={f.label} f={f} val={wizard.values[f.label]} invalid={invalid.has(f.label)} onChange={setVal} />
        ))}
        <div className="included">
          <div className="h">What&apos;s included</div>
          {wizard.cat.included.map(i => (
            <div key={i} className="it"><span className="c">✓</span><span>{i}</span></div>
          ))}
        </div>
      </>
    );

    if (stepName === "Review") return (
      <>
        {wizard.cat.fields
          .filter(f => { const v = wizard.values[f.label]; return v !== undefined && v !== "" && !(Array.isArray(v) && !v.length) && !(f.type === "toggle" && !v); })
          .map(f => {
            let v: unknown = wizard.values[f.label];
            if (f.type === "toggle") v = "Yes";
            if (Array.isArray(v)) v = (v as string[]).join(", ");
            return <div key={f.label} className="sumrow"><span className="k">{f.label}</span><span className="v">{v as string}</span></div>;
          })}
        {price && <PriceRows price={price} cur={cur} />}
      </>
    );

    if (stepName === "Your details") return (
      <>
        <p style={{ color: "var(--bk-muted)", fontSize: ".9rem", marginBottom: 13 }}>We&apos;ll send your confirmation here.</p>
        {["Full name","Email","Phone / WhatsApp","Passport number"].map(lbl => {
          const isReq = lbl !== "Passport number";
          const v = (wizard.values[lbl] as string) ?? "";
          return (
            <div key={lbl} className={`field${invalid.has(lbl) ? " invalid" : ""}`}>
              <label>{lbl}{isReq ? " *" : ""}</label>
              <input type="text" value={v} placeholder="Type here…" onChange={e => setVal(lbl, e.target.value)} />
              <div className="err">Required</div>
            </div>
          );
        })}
      </>
    );

    if (stepName === "Payment") return (
      <>
        {price && <PriceRows price={price} cur={cur} />}
        <div style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--ink)", margin: "18px 0 9px" }}>Payment method</div>
        <div className="pm">
          {[
            { name: "💳 International card", sub: "Visa / Mastercard — for travellers abroad" },
            { name: "📱 eSewa",              sub: "Pay with your eSewa wallet (Nepal)" },
            { name: "📱 Khalti",             sub: "Pay with Khalti (Nepal)" },
          ].map((pm, i) => (
            <label key={pm.name}>
              <input type="radio" name="pm" defaultChecked={i === 0} />
              <div><div className="pm-name">{pm.name}</div><div className="pm-sub">{pm.sub}</div></div>
            </label>
          ))}
        </div>
        <div className="demo-note"><b>Demo mode.</b> No real payment is taken — this is where your live gateway connects once the backend is added.</div>
      </>
    );

    const isCustom = stepName === "Submitted";
    return (
      <div className="done">
        <div className="check">✓</div>
        <h3>{isCustom ? "Request submitted!" : "Booking confirmed!"}</h3>
        <p>{isCustom ? "Our local experts will reply within 24 hours with your custom itinerary and pricing." : "Your booking is confirmed. Check your email for the full itinerary and details."}</p>
        <div className="ref"><small>Reference</small>{wizard.ref}</div>
      </div>
    );
  };

  return (
    <div className="booking-root">

      {/* ── Top bar ── */}
      <div className="topbar">
        <div className="topbar-inner">
          <a href="/" className="logo"><span className="m">▲</span>Nepal</a>
          <div className="top-right">
            <div className="cur">
              {(["USD","NPR"] as Currency[]).map(c => (
                <button key={c} className={cur === c ? "on" : ""} onClick={() => setCur(c)}>{c}</button>
              ))}
            </div>
            <button className="icon-btn" title="Help">?</button>
            <a href="#" className="lnk">List your business</a>
            <button className="btn-outline-w">Sign in</button>
          </div>
        </div>
      </div>

      <main>

      {/* ── Hero ── */}
      <div className="hero">
        <svg className="mts" viewBox="0 0 1440 240" preserveAspectRatio="none">
          <path d="M0,240 L0,150 L160,70 L300,130 L460,50 L620,120 L820,40 L1010,120 L1200,60 L1440,130 L1440,240 Z" fill="#ffffff" />
          <path d="M460,50 L500,95 L482,95 L462,78 L440,100 L418,92 Z" fill="#cfe0ff" />
          <path d="M820,40 L862,90 L842,90 L824,72 L800,96 L778,86 Z" fill="#cfe0ff" />
        </svg>
        <div className="hero-inner">
          <div className="tabs">
            {TABS.map(t => (
              <button key={t.id} className={`tab${tab === t.id ? " on" : ""}`} onClick={() => setTab(t.id)}>
                <span className="e">{t.e}</span>{t.label}
              </button>
            ))}
          </div>
          <h1>Find your next adventure in Nepal</h1>
          <p className="hero-sub">Stays, treks, adrenaline and everything between — book it all in one place.</p>

          {/* Search bar */}
          <div className="searchbar">
            {tab === "stays" && (<>
              <div className="sf">
                <span className="si" aria-hidden="true">📍</span>
                <select aria-label="Destination" value={sfDest} onChange={e => setSfDest(e.target.value)}>
                  <option value="" disabled>Where in Nepal?</option>
                  {["Kathmandu","Pokhara","Chitwan","Bhaktapur","Lumbini"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="sf stacked">
                <span className="si" aria-hidden="true">📅</span>
                <div className="lbl" aria-hidden="true">Check-in</div>
                <input type="date" aria-label="Check-in date" min={today} value={sfIn} onChange={e => setSfIn(e.target.value)} />
              </div>
              <div className="sf stacked">
                <span className="si" aria-hidden="true">📅</span>
                <div className="lbl" aria-hidden="true">Check-out</div>
                <input type="date" aria-label="Check-out date" min={today} value={sfOut} onChange={e => setSfOut(e.target.value)} />
              </div>
              <div className="sf occ-field" ref={occRef} onClick={() => setOccOpen(v => !v)}>
                <span className="si">👤</span>
                <span className="occ-val">{occ.adults} adults · {occ.children} children · {occ.rooms} room{occ.rooms > 1 ? "s" : ""}</span>
                {occOpen && (
                  <div className="occ-pop" onClick={e => e.stopPropagation()}>
                    {([["Adults","adults",1],["Children","children",0],["Rooms","rooms",1]] as [string, keyof typeof occ, number][]).map(([label, key, min]) => (
                      <div key={key} className="occ-row">
                        <span className="name">{label}</span>
                        <span className="stepper">
                          <button type="button" disabled={occ[key] <= min} onClick={() => setOcc(p => ({ ...p, [key]: Math.max(min, p[key] - 1) }))}>−</button>
                          <span className="n">{occ[key]}</span>
                          <button type="button" onClick={() => setOcc(p => ({ ...p, [key]: p[key] + 1 }))}>+</button>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button className="btn-search" type="button" onClick={() => doSearch("hotels")}>Search</button>
            </>)}

            {tab === "treks" && (<>
              <div className="sf">
                <span className="si" aria-hidden="true">🎒</span>
                <select aria-label="Trek route" value={sfRoute} onChange={e => setSfRoute(e.target.value)}>
                  <option value="" disabled>Which trek?</option>
                  {["Poon Hill","Langtang","Annapurna Base Camp","Everest Base Camp","Annapurna Circuit","Manaslu Circuit"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="sf">
                <span className="si" aria-hidden="true">📅</span>
                <input type="date" aria-label="Start date" min={today} value={sfIn} onChange={e => setSfIn(e.target.value)} />
              </div>
              <div className="sf">
                <span className="si" aria-hidden="true">👥</span>
                <input type="number" aria-label="Group size" min={1} value={sfGroup} onChange={e => setSfGroup(e.target.value)} />
              </div>
              <button className="btn-search" type="button" onClick={() => doSearch("trekking")}>Search</button>
            </>)}

            {tab === "adventure" && (<>
              <div className="sf">
                <span className="si" aria-hidden="true">🪂</span>
                <select aria-label="Activity" value={sfAct} onChange={e => setSfAct(e.target.value)}>
                  <option value="" disabled>Pick an activity</option>
                  {["Paragliding","Zip-lining","White Water Rafting","Bungee Jumping","Jungle Safari"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="sf">
                <span className="si" aria-hidden="true">📅</span>
                <input type="date" aria-label="Date" min={today} value={sfIn} onChange={e => setSfIn(e.target.value)} />
              </div>
              <div className="sf">
                <span className="si" aria-hidden="true">👥</span>
                <input type="number" aria-label="Group size" min={1} value={sfGroup} onChange={e => setSfGroup(e.target.value)} />
              </div>
              <button className="btn-search" type="button" onClick={() => doSearch("__act")}>Search</button>
            </>)}

            {tab === "transport" && (<>
              <div className="sf">
                <span className="si" aria-hidden="true">🚌</span>
                <select aria-label="Transport type" value={sfTtype} onChange={e => setSfTtype(e.target.value)}>
                  <option value="" disabled>How will you travel?</option>
                  {["Bus","Taxi / Private Car","Motorbike Rental"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="sf">
                <span className="si" aria-hidden="true">📅</span>
                <input type="date" aria-label="Travel date" min={today} value={sfIn} onChange={e => setSfIn(e.target.value)} />
              </div>
              <button className="btn-search" type="button" onClick={() => doSearch("__transport")}>Search</button>
            </>)}

            {tab === "custom" && (<>
              <div className="sf">
                <span className="si" aria-hidden="true">✨</span>
                <input type="text" aria-label="Describe your dream trip" value={sfDream} placeholder="Tell us your dream Nepal trip…" onChange={e => setSfDream(e.target.value)} />
              </div>
              <button className="btn-search" type="button" onClick={() => doSearch("custom")}>Plan my trip</button>
            </>)}
          </div>
        </div>
      </div>

      {/* ── Offers ── */}
      <section className="sec-first">
        <div className="wrap">
          <h2>Offers</h2>
          <p className="sec-sub">Promotions, deals and special offers for your trip</p>
          <div className="promo">
            <div className="txt">
              <div className="eyebrow">Escape to the mountains with our Himalaya Deals</div>
              <h3>No catch. Just adventures.</h3>
              <p>At least 15% off selected stays and treks across Nepal — just book and go.</p>
              <button className="btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Save with a Himalaya Deal
              </button>
            </div>
            <div className="pic">🏔️
              <svg viewBox="0 0 240 120" preserveAspectRatio="none">
                <path d="M0,120 L0,80 L60,40 L110,80 L160,30 L210,75 L240,45 L240,120 Z" fill="rgba(255,255,255,.5)" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Catalog ── */}
      <section>
        <div className="wrap">
          <h2>Browse by experience</h2>
          <p className="sec-sub">Pick what kind of trip you&apos;re after</p>
          <div className="grid">
            {CATS.map(c => {
              const fp = startPrice(c);
              return (
                <div
                  key={c.id}
                  className="card"
                  role="button"
                  tabIndex={0}
                  aria-label={`${c.label}: ${fp != null ? `from ${fmt(fp, cur)}` : "free quote"}. ${c.pricing ? "Book →" : "Enquire →"}`}
                  onClick={() => openWizard(c.id)}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openWizard(c.id); } }}
                >
                  <div className="top" style={{ background: GRADS[c.id] }}>
                    <span className="e" aria-hidden="true">{c.icon}</span>{MT}
                  </div>
                  <div className="info" aria-hidden="true">
                    <h3>{c.label}</h3>
                    <div className="row">
                      <span className="from">{fp != null ? <>from <b>{fmt(fp, cur)}</b></> : <b>Free quote</b>}</span>
                      <span className="go">{c.pricing ? "Book →" : "Enquire →"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Destinations ── */}
      <section>
        <div className="wrap">
          <h2>Explore Nepal</h2>
          <p className="sec-sub">These places should be on your list</p>
          <div className="dgrid">
            {DESTS.map(d => (
              <div
                key={d.name}
                className="dcard"
                role="button"
                tabIndex={0}
                aria-label={`${d.name} — ${d.sub}`}
                onClick={() => openWizard("hotels", d.opt ? { Destination: d.opt } : {})}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openWizard("hotels", d.opt ? { Destination: d.opt } : {}); } }}
              >
                <div className="bg" style={{ background: d.grad }}>{MT}</div>
                <span className="e" aria-hidden="true">{d.e}</span>
                <div className="dlbl" aria-hidden="true"><h3>{d.name}</h3><span>{d.sub}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust ── */}
      <section className="trust-sec">
        <div className="wrap">
          <div className="trust-grid">
            {[
              { ti: "🛡️", h: "Govt-registered operator", p: "Licensed & insured for every activity" },
              { ti: "💸", h: "Best-price guarantee",     p: "Found it cheaper? We'll match it" },
              { ti: "🧭", h: "Local experts",             p: "Trips built by people who live here" },
              { ti: "💬", h: "24/7 WhatsApp support",    p: "Real humans, anytime you need" },
            ].map(t => (
              <div key={t.h} className="tr">
                <div className="ti" aria-hidden="true">{t.ti}</div>
                <div><h3>{t.h}</h3><p>{t.p}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      </main>

      {/* ── Footer ── */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="logo"><span className="m" style={{ color: "var(--blue)" }}>▲</span>Nepal</div>
              <p>Your one stop to book stays, treks, adventures and transport across Nepal.</p>
            </div>
            <div className="foot-col"><h4>Explore</h4><a href="#">Stays</a><a href="#">Treks</a><a href="#">Adventure</a><a href="#">Transport</a></div>
            <div className="foot-col"><h4>Destinations</h4><a href="#">Kathmandu</a><a href="#">Pokhara</a><a href="#">Chitwan</a><a href="#">Everest region</a></div>
            <div className="foot-col"><h4>Support</h4><a href="#">Help center</a><a href="#">Cancellation</a><a href="#">Contact us</a><a href="#">List your business</a></div>
          </div>
        </div>
        <div className="foot-bottom"><span>© 2026 · Nepal — booking</span><span>नमस्ते · Namaste</span></div>
      </footer>

      {/* ── WhatsApp ── */}
      <a className="wa" href="https://wa.me/9779800000000" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M.06 24l1.68-6.16A11.9 11.9 0 010 11.93C0 5.35 5.4 0 12.05 0a11.9 11.9 0 018.46 3.5 11.8 11.8 0 013.5 8.43c0 6.58-5.4 11.93-12.05 11.93a12.1 12.1 0 01-5.76-1.46L.06 24zM6.6 20.2c1.66.98 3.25 1.57 5.43 1.57 5.52 0 10.02-4.44 10.02-9.9 0-5.45-4.5-9.9-10-9.9-5.55 0-10.04 4.45-10.04 9.9 0 2.24.66 3.92 1.76 5.68l-1 3.64 3.83-1zm11.4-5.46c-.07-.12-.27-.2-.57-.35-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.36.45-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42z"/>
        </svg>
        Need help?
      </a>

      {/* ── Wizard ── */}
      {wizard && (
        <div className="overlay" onClick={e => { if (e.target === e.currentTarget) closeWizard(); }}>
          <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="wizard-title" ref={sheetRef}>
            <div className="sheet-head">
              <div className="cat">
                <span className="e" aria-hidden="true">{wizard.cat.icon}</span>
                <div><h2 id="wizard-title">{wizard.cat.label}</h2><small>{wizard.cat.desc}</small></div>
              </div>
              <button className="x" onClick={closeWizard} aria-label="Close dialog">✕</button>
            </div>

            {(() => {
              const sn = wizard.steps[wizard.step];
              const done = sn === "Confirmed" || sn === "Submitted";
              return !done && (
                <div className="progress">
                  <div className="bar"><i style={{ width: `${((wizard.step + 1) / wizard.steps.length) * 100}%` }} /></div>
                  <div className="steplbl">
                    <span className="cur-step">Step {wizard.step + 1} of {wizard.steps.length} — {sn}</span>
                    <span>{wizard.steps[wizard.steps.length - 1] === "Confirmed" ? "Booking" : "Request"}</span>
                  </div>
                </div>
              );
            })()}

            <div className="sheet-body">{renderStep()}</div>

            {(() => {
              const sn = wizard.steps[wizard.step];
              const done = sn === "Confirmed" || sn === "Submitted";
              if (done) return (
                <div className="sheet-foot" style={{ justifyContent: "center" }}>
                  <button className="btn btn-blue" onClick={closeWizard}>Done</button>
                </div>
              );
              const nextLabel = sn === "Payment" ? "Confirm booking" : (sn === "Your details" && !wizard.cat.pricing ? "Submit request" : "Continue");
              return (
                <div className="sheet-foot">
                  <div className="liveprice">
                    {price ? <>Estimated total<b>{fmt(price.total, cur)}</b></> : <>No payment now<b>Free quote</b></>}
                  </div>
                  <div className="btns">
                    {wizard.step > 0 && <button className="btn btn-ghost" onClick={wizardBack}>Back</button>}
                    <button className="btn btn-blue" onClick={wizardNext}>{nextLabel} →</button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
