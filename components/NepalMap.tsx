"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

type Attraction = {
  id: number;
  name: string;
  region: string;
  type: string;
  lat: number;
  lng: number;
  description: string;
  duration: string;
  elevation: string;
  photo: string;     // local:  /places/<slug>.jpg  — add your own photo here
  photoBk: string;  // online fallback while local file is missing
  gradient: string; // final colour fallback
};

const attractions: Attraction[] = [
  /* id, name, region, type, lat, lng, desc, duration, elev, LOCAL photo path, Unsplash fallback, gradient */
  { id: 1,  name: "Everest Base Camp",     region: "Khumbu",           type: "Trek",      lat: 27.9881, lng: 86.9250, description: "The iconic trek to 5,364 m — foot of the world's tallest peak, through Sherpa villages and glacial valleys.",           duration: "14–18 days", elevation: "5,364 m", photo: "/everest-base-camp.jpg",            photoBk: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#0a1520,#1a3550)" },
  { id: 2,  name: "Kathmandu",             region: "Bagmati Province", type: "Culture",   lat: 27.7172, lng: 85.3240, description: "Ancient temples, living goddesses, and seven UNESCO World Heritage Sites packed into one extraordinary valley.",       duration: "3–5 days",   elevation: "1,400 m", photo: "/Kathmandu.jpg",                    photoBk: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#1e0e05,#5c2d0f)" },
  { id: 3,  name: "Pokhara",              region: "Gandaki Province", type: "Nature",    lat: 28.2096, lng: 83.9856, description: "Mirror lakes reflecting the Annapurna range at dawn — the adventure capital of Nepal.",                              duration: "2–4 days",   elevation: "822 m",   photo: "/Pokhara.jpg",                      photoBk: "https://images.unsplash.com/photo-1586187168491-5d47a22e3a0c?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#041508,#0f5c2e)" },
  { id: 4,  name: "Chitwan National Park", region: "Bagmati Province", type: "Wildlife",  lat: 27.5291, lng: 84.3542, description: "Home to Bengal tigers, one-horned rhinos, and elephant safaris through dense jungle and wetlands.",                  duration: "2–3 days",   elevation: "150 m",   photo: "/Chitwan National Park.jpg",        photoBk: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#0a1a05,#2a4010)" },
  { id: 5,  name: "Lumbini",              region: "Lumbini Province", type: "Spiritual", lat: 27.4833, lng: 83.2772, description: "Sacred birthplace of Siddhartha Gautama — a UNESCO World Heritage Site drawing pilgrims from across the world.",      duration: "1 day",      elevation: "150 m",   photo: "/Lumbini.jpg",                      photoBk: "https://images.unsplash.com/photo-1560984696-f010c3bdee78?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#150a28,#3a1a5c)" },
  { id: 6,  name: "Annapurna Base Camp",   region: "Gandaki Province", type: "Trek",      lat: 28.5320, lng: 83.8773, description: "A natural amphitheatre of 360° Himalayan giants at 4,130 m — one of the most dramatic landscapes on Earth.",         duration: "7–10 days",  elevation: "4,130 m", photo: "/Annapurna Base Camp.jpg",          photoBk: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#0a1520,#142d48)" },
  { id: 7,  name: "Poon Hill",            region: "Gandaki Province", type: "Trek",      lat: 28.4024, lng: 83.6913, description: "Nepal's most famous sunrise viewpoint — golden light flooding across the Annapurna and Dhaulagiri ranges.",            duration: "4–5 days",   elevation: "3,210 m", photo: "/Poon Hill.jpg",                    photoBk: "https://images.unsplash.com/photo-1535614928640-c02ae23abe81?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#1a0a04,#5c2a08)" },
  { id: 8,  name: "Upper Mustang",        region: "Gandaki Province", type: "Culture",   lat: 28.9984, lng: 83.8584, description: "The forbidden kingdom — ancient cave dwellings, Buddhist monasteries and Tibetan culture in a high-altitude desert.", duration: "10–14 days", elevation: "3,840 m", photo: "/Upper Mustang.jpg",                photoBk: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#1e0e05,#4a2209)" },
  { id: 9,  name: "Rara Lake",            region: "Karnali Province", type: "Nature",    lat: 29.5264, lng: 82.0879, description: "Nepal's largest lake — pristine turquoise water nestled amid cedar forests, rarely visited and utterly serene.",       duration: "7–10 days",  elevation: "2,990 m", photo: "/Rara Lake.jpg",                    photoBk: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#041510,#0c4828)" },
  { id: 10, name: "Langtang Valley",      region: "Bagmati Province", type: "Trek",      lat: 28.2143, lng: 85.5150, description: "The valley of glaciers — a high-altitude trek just hours from Kathmandu, through rhododendron and yak pastures.",    duration: "7–10 days",  elevation: "3,430 m", photo: "/Langtang Valley.jpg",              photoBk: "https://images.unsplash.com/photo-1544785349-c4a5301826fd?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#0a1828,#14305a)" },
  { id: 11, name: "Bardia National Park", region: "Lumbini Province", type: "Wildlife",  lat: 28.3167, lng: 81.4500, description: "Nepal's wildest park — Bengal tigers, gangetic dolphins, wild elephants and gharials in untouched wilderness.",       duration: "2–3 days",   elevation: "200 m",   photo: "/Bardia National Park.jpg",         photoBk: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#081a08,#184018)" },
  { id: 12, name: "Pashupatinath Temple", region: "Kathmandu",        type: "Spiritual", lat: 27.7105, lng: 85.3486, description: "Nepal's most sacred Hindu temple on the Bagmati river, with burning ghats, ash-covered sadhus, and ancient ritual.", duration: "Half day",   elevation: "1,300 m", photo: "/Pashupatinath Temple.jpg",         photoBk: "https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#1a0818,#4a1848)" },
  { id: 13, name: "Boudhanath Stupa",     region: "Kathmandu",        type: "Spiritual", lat: 27.7215, lng: 85.3620, description: "One of the world's largest stupas, encircled by Tibetan monasteries and the hum of spinning prayer wheels.",          duration: "Half day",   elevation: "1,400 m", photo: "/Boudhanath Stupa.jpg",             photoBk: "https://images.unsplash.com/photo-1595761584799-8d785e59551b?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#140a1e,#3a1858)" },
  { id: 14, name: "Bhaktapur",            region: "Bagmati Province", type: "Culture",   lat: 27.6727, lng: 85.4280, description: "A medieval city frozen in time — Newari woodwork, pottery squares, and the remarkable Bhaktapur Durbar Square.",      duration: "1 day",      elevation: "1,400 m", photo: "/Bhaktapur.jpg",                    photoBk: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#1e0c04,#5c2a0a)" },
  { id: 15, name: "Phewa Lake",           region: "Pokhara",          type: "Nature",    lat: 28.2167, lng: 83.9667, description: "Row a wooden boat across Phewa Lake with Machhapuchhre — the Fishtail mountain — perfectly reflected at sunrise.",    duration: "Half day",   elevation: "742 m",   photo: "/Phewa Lake.jpg",                   photoBk: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#041510,#0c3820)" },
  { id: 16, name: "Swayambhunath",        region: "Kathmandu",        type: "Spiritual", lat: 27.7149, lng: 85.2904, description: "The Monkey Temple atop a forested hill — sweeping views over Kathmandu Valley and an all-seeing golden spire.",        duration: "Half day",   elevation: "1,400 m", photo: "/Swayambhunath.jpg",                photoBk: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#18081c,#481858)" },
  { id: 17, name: "Namche Bazaar",        region: "Khumbu",           type: "Trek",      lat: 27.8056, lng: 86.7139, description: "The Sherpa capital and gateway to Everest — a vibrant mountain town with bakeries, gear shops and Himalayan views.",  duration: "On trek",    elevation: "3,440 m", photo: "/Namche Bazaar.jpg",                photoBk: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#0a1828,#1a3a5c)" },
  { id: 18, name: "Manang",              region: "Gandaki Province", type: "Trek",      lat: 28.6667, lng: 84.0167, description: "A high-altitude acclimatisation stop on the Annapurna Circuit — stone houses, yaks, and electric blue skies.",        duration: "On circuit", elevation: "3,519 m", photo: "/Manang.jpg",                       photoBk: "https://images.unsplash.com/photo-1439853949212-36089f89f248?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#0a1020,#182840)" },

  /* ── Basecamps ── */
  { id: 19, name: "Everest Base Camp S.", region: "Khumbu",           type: "Basecamp",  lat: 27.9881, lng: 86.9250, description: "The South Base Camp at 5,364 m — climbers' staging ground on the Khumbu Glacier, beneath the Khumbu Icefall.",        duration: "14–18 days", elevation: "5,364 m", photo: "/Everest BC South.jpg",             photoBk: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#0a1828,#1a3550)" },
  { id: 20, name: "Annapurna BC",        region: "Gandaki Province", type: "Basecamp",  lat: 28.5320, lng: 83.8773, description: "Encircled by 13 peaks above 7,000 m — the most dramatic amphitheatre in the Himalayas at 4,130 m.",                  duration: "7–10 days",  elevation: "4,130 m", photo: "/Annapurna BC.jpg",                 photoBk: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#0a1520,#142d48)" },
  { id: 21, name: "Gorak Shep",          region: "Khumbu",           type: "Basecamp",  lat: 27.9802, lng: 86.8317, description: "The last settlement before Everest BC at 5,140 m — a frozen plateau serving as the final rest stop for climbers.",    duration: "On trek",    elevation: "5,140 m", photo: "/Gorak Shep.jpg",                   photoBk: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#0a1020,#1a2840)" },
  { id: 22, name: "Machhapuchhre BC",    region: "Gandaki Province", type: "Basecamp",  lat: 28.4879, lng: 83.8762, description: "Below the sacred Fishtail peak — a scenic rest camp on the approach to Annapurna Sanctuary at 3,700 m.",             duration: "6–8 days",   elevation: "3,700 m", photo: "/Machhapuchhre BC.jpg",             photoBk: "https://images.unsplash.com/photo-1535614928640-c02ae23abe81?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#041510,#0c3820)" },
  { id: 23, name: "Manaslu Base Camp",   region: "Gandaki Province", type: "Basecamp",  lat: 28.5466, lng: 84.5629, description: "Base camp for the world's 8th highest mountain — remote and raw, on the spectacular Manaslu Circuit.",                 duration: "14–16 days", elevation: "4,800 m", photo: "/Manaslu Base Camp.jpg",            photoBk: "https://images.unsplash.com/photo-1544785349-c4a5301826fd?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#0a1828,#14305a)" },
  { id: 24, name: "Dhaulagiri BC",       region: "Gandaki Province", type: "Basecamp",  lat: 28.6961, lng: 83.5011, description: "A challenging approach to Dhaulagiri I — the world's 7th highest — through a remote glacier at 4,750 m.",             duration: "12–14 days", elevation: "4,750 m", photo: "/Dhaulagiri BC.jpg",                photoBk: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#100720,#2e1060)" },
  { id: 25, name: "Makalu Base Camp",    region: "Khumbu",           type: "Basecamp",  lat: 27.9000, lng: 87.0900, description: "Wild and seldom visited base camp of the world's 5th highest peak in the Barun Valley at 4,870 m.",                   duration: "14–18 days", elevation: "4,870 m", photo: "/Makalu Base Camp.jpg",             photoBk: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#0a1520,#1c3050)" },
  { id: 26, name: "Island Peak BC",      region: "Khumbu",           type: "Basecamp",  lat: 27.9264, lng: 86.9278, description: "The base for climbing Island Peak (Imja Tse) at 6,189 m — one of Nepal's most popular trekking peaks.",               duration: "18–20 days", elevation: "5,100 m", photo: "/Island Peak BC.jpg",               photoBk: "https://images.unsplash.com/photo-1544785349-c4a5301826fd?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#071428,#102040)" },
  { id: 27, name: "Mera Peak BC",        region: "Khumbu",           type: "Basecamp",  lat: 27.7033, lng: 86.8769, description: "Base for Mera Peak (6,476 m) — the highest trekking peak in Nepal, with jaw-dropping views of five 8,000ers.",         duration: "18–22 days", elevation: "5,300 m", photo: "/Mera Peak BC.jpg",                 photoBk: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#0a1828,#1a3550)" },

  /* ── Trekking sites & high passes ── */
  { id: 28, name: "Kala Patthar",        region: "Khumbu",           type: "Trek",      lat: 28.0043, lng: 86.8227, description: "The iconic 5,644 m viewpoint — the closest most trekkers will ever stand to Everest's summit.",                       duration: "16–18 days", elevation: "5,644 m", photo: "/Kala Patthar.jpg",                 photoBk: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#0a1520,#1a3550)" },
  { id: 29, name: "Gokyo Lakes",         region: "Khumbu",           type: "Nature",    lat: 27.9623, lng: 86.6829, description: "Six glacial lakes at 4,750 m, sacred to Hindus and Buddhists — turquoise water amid a stark Himalayan landscape.",    duration: "14–16 days", elevation: "4,750 m", photo: "/Gokyo Lakes.jpg",                  photoBk: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#041a12,#0c4030)" },
  { id: 30, name: "Gokyo Ri",            region: "Khumbu",           type: "Trek",      lat: 27.9668, lng: 86.6883, description: "A 5,357 m summit offering one of the finest Himalayan panoramas — four 8,000ers visible from a single point.",          duration: "14–16 days", elevation: "5,357 m", photo: "/Gokyo Ri.jpg",                     photoBk: "https://images.unsplash.com/photo-1535614928640-c02ae23abe81?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#0a1828,#1a3250)" },
  { id: 31, name: "Thorong La Pass",     region: "Gandaki Province", type: "Trek",      lat: 28.7974, lng: 83.9334, description: "The highest mountain pass on the Annapurna Circuit at 5,416 m — a legendary crossing between valleys.",                 duration: "On circuit", elevation: "5,416 m", photo: "/Thorong La Pass.jpg",              photoBk: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#0a1020,#182838)" },
  { id: 32, name: "Tengboche Monastery", region: "Khumbu",           type: "Spiritual", lat: 27.8363, lng: 86.7634, description: "Nepal's most famous monastery at 3,867 m — a sacred meditation between two giant white peaks, rebuilt after earthquake.",duration: "On trek",    elevation: "3,867 m", photo: "/Tengboche Monastery.jpg",          photoBk: "https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#140a1e,#3a1858)" },
  { id: 33, name: "Gosaikunda Lake",     region: "Bagmati Province", type: "Spiritual", lat: 28.0843, lng: 85.4174, description: "A sacred glacial lake at 4,380 m — thousands of Hindu pilgrims climb here every year for the Janai Purnima festival.", duration: "4–5 days",   elevation: "4,380 m", photo: "/Gosaikunda Lake.jpg",              photoBk: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#150a28,#3a1a5c)" },
  { id: 34, name: "Tilicho Lake",        region: "Gandaki Province", type: "Nature",    lat: 28.6833, lng: 83.8333, description: "One of the highest lakes in the world at 4,919 m — a gem on the Annapurna Circuit requiring a challenging side trek.", duration: "On circuit", elevation: "4,919 m", photo: "/Tilicho Lake.jpg",                 photoBk: "https://images.unsplash.com/photo-1586187168491-5d47a22e3a0c?w=800&h=420&fit=crop&q=80", gradient: "linear-gradient(135deg,#041510,#0c3820)" },
];

const TYPE_META: Record<string, { color: string; icon: string }> = {
  Trek:      { color: "#60a5fa", icon: "⛰️" },
  Basecamp:  { color: "#f87171", icon: "⛺" },
  Nature:    { color: "#4ade80", icon: "🌿" },
  Culture:   { color: "#d4a843", icon: "🏛️" },
  Wildlife:  { color: "#fb923c", icon: "🐅" },
  Spiritual: { color: "#c084fc", icon: "☸️" },
};
const TYPES = Object.keys(TYPE_META);

/* ── Tile layers ── */
const TILES = {
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    opts: { subdomains: "abcd", maxZoom: 19, attribution: '© <a href="https://openstreetmap.org">OSM</a> © <a href="https://carto.com">CARTO</a>' },
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    opts: { maxZoom: 18, attribution: "Tiles © Esri" },
  },
};

export default function NepalMap() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const mapRef         = useRef<any>(null);
  const markersRef     = useRef<any[]>([]);
  const tileLayerRef   = useRef<{ current: any; dark: any; satellite: any }>({ current: null, dark: null, satellite: null });

  const [selected,   setSelected]   = useState<Attraction>(attractions[0]);
  const [filter,     setFilter]     = useState<string | null>(null);
  const [satellite,  setSatellite]  = useState(false);
  const [mapReady,   setMapReady]   = useState(false);
  const [imgSrc,     setImgSrc]     = useState(attractions[0].photo);
  const [imgFailed,  setImgFailed]  = useState(false);

  /* ── Marker HTML factory ── */
  const markerHtml = useCallback((color: string, active = false) => {
    const s = active ? 26 : 18;
    return `
      <div style="position:relative;width:${s}px;height:${s}px;">
        <div style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:0.35;animation:mapPulse 2.5s ease-out infinite;"></div>
        <div style="position:absolute;inset:${active ? 5 : 3}px;border-radius:50%;background:${color};border:${active ? 2 : 1.5}px solid rgba(255,255,255,${active ? 0.85 : 0.55});box-shadow:0 0 ${active ? 14 : 7}px ${color}bb;"></div>
      </div>`;
  }, []);

  /* ── Update active marker size ── */
  const updateMarkers = useCallback((selectedId: number, L: any) => {
    markersRef.current.forEach((m) => {
      const a: Attraction = m._attr;
      const { color } = TYPE_META[a.type] ?? TYPE_META.Culture;
      const active = a.id === selectedId;
      const s = active ? 26 : 18;
      m.setIcon(L.divIcon({ className: "", html: markerHtml(color, active), iconSize: [s, s], iconAnchor: [s / 2, s / 2] }));
    });
  }, [markerHtml]);

  /* ── Init Leaflet ── */
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    import("leaflet").then((mod) => {
      if (cancelled || !containerRef.current || mapRef.current) return;
      const L = mod.default ?? mod;

      const map = L.map(containerRef.current!, {
        center: [28.0, 84.1],
        zoom: 7, minZoom: 6, maxZoom: 16,
        zoomControl: false,
        attributionControl: true,
      });
      mapRef.current = map;

      /* Tile layers */
      const darkLayer = L.tileLayer(TILES.dark.url, TILES.dark.opts).addTo(map);
      const satLayer  = L.tileLayer(TILES.satellite.url, TILES.satellite.opts);
      tileLayerRef.current = { current: darkLayer, dark: darkLayer, satellite: satLayer };

      L.control.zoom({ position: "topright" }).addTo(map);

      /* Markers */
      attractions.forEach((attr) => {
        const { color } = TYPE_META[attr.type] ?? TYPE_META.Culture;
        const active = attr.id === attractions[0].id;
        const s = active ? 26 : 18;
        const icon = L.divIcon({ className: "", html: markerHtml(color, active), iconSize: [s, s], iconAnchor: [s / 2, s / 2] });

        const marker = L.marker([attr.lat, attr.lng], { icon }).addTo(map);
        (marker as any)._attr = attr;

        /* Tooltip on hover — name + short description + elevation */
        const shortDesc = attr.description.length > 72
          ? attr.description.slice(0, 72).trimEnd() + "…"
          : attr.description;
        marker.bindTooltip(
          `<div style="font-family:var(--font-syne);">
            <div style="display:flex;align-items:center;gap:5px;margin-bottom:5px;">
              <span style="font-size:13px;">${TYPE_META[attr.type]?.icon}</span>
              <span style="font-size:12px;font-weight:700;color:${color};letter-spacing:0.02em;">${attr.name}</span>
            </div>
            <p style="font-size:10.5px;color:rgba(240,236,227,0.58);line-height:1.55;margin:0 0 6px 0;">${shortDesc}</p>
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:10px;font-weight:600;color:#d4a843;">↑ ${attr.elevation}</span>
              <span style="font-size:9px;color:rgba(240,236,227,0.28);">· ${attr.region}</span>
            </div>
          </div>`,
          { permanent: false, direction: "top", className: "nepal-tooltip", offset: [0, -10] }
        );

        /* Click → select */
        marker.on("click", () => {
          setSelected(attr);
          setImgSrc(attr.photo);
          setImgFailed(false);
          updateMarkers(attr.id, L);
          map.flyTo([attr.lat, attr.lng], 11, { duration: 1.1, easeLinearity: 0.25 });
        });

        markersRef.current.push(marker);
      });

      setMapReady(true);
    });

    return () => {
      cancelled = true;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
      markersRef.current = [];
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Filter opacity ── */
  useEffect(() => {
    if (!mapReady) return;
    markersRef.current.forEach((m) => {
      const el = m.getElement();
      if (el) el.style.opacity = (!filter || m._attr.type === filter) ? "1" : "0.1";
    });
  }, [filter, mapReady]);

  /* ── Satellite toggle ── */
  const toggleSatellite = useCallback(() => {
    const { current, dark, satellite: sat } = tileLayerRef.current;
    if (!mapRef.current || !dark || !sat) return;
    setSatellite((prev) => {
      if (prev) {
        sat.remove();
        dark.addTo(mapRef.current);
        tileLayerRef.current.current = dark;
      } else {
        dark.remove();
        sat.addTo(mapRef.current);
        tileLayerRef.current.current = sat;
      }
      return !prev;
    });
  }, []);

  const { color: selColor } = TYPE_META[selected.type] ?? TYPE_META.Culture;

  return (
    <section className="section-pad">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-3"
             style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}>
            Interactive Map
          </p>
          <h2 className="text-4xl md:text-6xl text-[#f0ece3] leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Discover <em className="text-gradient">Nepal</em>
          </h2>
          <p className="text-sm text-[#8a8978] mt-3"
             style={{ fontFamily: "var(--font-syne)" }}>
            {attractions.length} attractions · Click any marker to explore
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setFilter(null)}
            className="text-[10px] tracking-[0.18em] uppercase font-semibold px-4 py-2 rounded-full transition-all duration-200"
            style={{ fontFamily: "var(--font-syne)",
              background: !filter ? "rgba(240,236,227,0.1)" : "rgba(255,255,255,0.04)",
              border: !filter ? "1px solid rgba(240,236,227,0.18)" : "1px solid rgba(255,255,255,0.06)",
              color: !filter ? "#f0ece3" : "#8a8978" }}>
            All
          </button>
          {TYPES.map((type) => {
            const { color, icon } = TYPE_META[type];
            const active = filter === type;
            return (
              <button key={type} onClick={() => setFilter(active ? null : type)}
                className="text-[10px] tracking-[0.15em] uppercase font-semibold px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5"
                style={{ fontFamily: "var(--font-syne)",
                  background: active ? `${color}20` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${active ? color + "50" : "rgba(255,255,255,0.06)"}`,
                  color: active ? color : "#8a8978" }}>
                <span>{icon}</span>{type}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Map + detail panel ── */}
      <div className="flex flex-col lg:flex-row gap-4" style={{ minHeight: 640 }}>

        {/* Map container */}
        <div className="relative flex-1 float-shadow-lg overflow-hidden"
             style={{ minHeight: 420, borderRadius: 24, border: "1px solid rgba(255,255,255,0.07)" }}>

          <div ref={containerRef} className="w-full h-full" style={{ minHeight: 420, background: "#07070d" }} />

          {/* ── Satellite toggle — floating inside map ── */}
          <button
            onClick={toggleSatellite}
            className="absolute top-3 left-3 z-[1000] flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[0.97] active:scale-95"
            style={{
              fontFamily: "var(--font-syne)",
              background: satellite ? "rgba(212,168,67,0.18)" : "rgba(7,7,13,0.82)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: satellite ? "1px solid rgba(212,168,67,0.4)" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: "8px 14px",
              color: satellite ? "#d4a843" : "#f0ece3",
            }}
          >
            <span>{satellite ? "🗺️" : "🛰️"}</span>
            {satellite ? "Map view" : "Satellite"}
          </button>
        </div>

        {/* ── Detail panel ── */}
        <div className="lg:w-[340px] glass float-shadow flex flex-col overflow-hidden shrink-0"
             style={{ borderRadius: 24, maxHeight: 680 }}>

          {/* Photo — local first → Unsplash fallback → gradient */}
          <div className="relative h-48 shrink-0 overflow-hidden" style={{ borderRadius: "24px 24px 0 0" }}>
            {!imgFailed ? (
              <Image
                key={selected.id}
                src={imgSrc}
                alt={selected.name}
                fill
                sizes="340px"
                className="object-cover transition-all duration-500 graded"
                onError={() => {
                  if (imgSrc === selected.photo && selected.photoBk) {
                    setImgSrc(selected.photoBk); // try Unsplash
                  } else {
                    setImgFailed(true);           // show gradient
                  }
                }}
              />
            ) : (
              <div className="w-full h-full" style={{ background: selected.gradient }} />
            )}
            {/* Gradient overlay on photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Type badge on photo */}
            <div className="absolute top-3 left-3">
              <span
                className="text-[9px] tracking-[0.3em] uppercase font-semibold px-3 py-1.5"
                style={{
                  fontFamily: "var(--font-syne)", borderRadius: 100,
                  color: selColor, background: `${selColor}22`, border: `1px solid ${selColor}44`,
                  backdropFilter: "blur(12px)",
                }}
              >
                {TYPE_META[selected.type]?.icon} {selected.type}
              </span>
            </div>

            {/* Name on photo */}
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[rgba(240,236,227,0.5)] mb-0.5"
                 style={{ fontFamily: "var(--font-syne)" }}>
                {selected.region}
              </p>
              <h3 className="text-xl text-[#f0ece3] leading-tight"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                {selected.name}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-6 gap-4 overflow-y-auto">

            {/* Description */}
            <p className="text-[13px] text-[rgba(240,236,227,0.55)] leading-relaxed"
               style={{ fontFamily: "var(--font-syne)" }}>
              {selected.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2.5">
              {[{ label: "Duration", value: selected.duration },
                { label: "Elevation", value: selected.elevation }].map((s) => (
                <div key={s.label} className="glass-dark rounded-2xl p-3.5">
                  <p className="text-[9px] tracking-[0.35em] uppercase text-[#8a8978] mb-1"
                     style={{ fontFamily: "var(--font-syne)" }}>
                    {s.label}
                  </p>
                  <p className="text-sm font-semibold text-[#f0ece3]"
                     style={{ fontFamily: "var(--font-syne)" }}>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Coordinates */}
            <div className="glass-dark rounded-2xl px-4 py-3 flex items-center justify-between">
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#8a8978]"
                    style={{ fontFamily: "var(--font-syne)" }}>
                Coordinates
              </span>
              <span className="text-[11px] font-semibold text-[#d4a843]"
                    style={{ fontFamily: "var(--font-syne)" }}>
                {selected.lat.toFixed(3)}°N {selected.lng.toFixed(3)}°E
              </span>
            </div>
          </div>

          {/* ── Scrollable attraction list ── */}
          <div className="border-t px-3 py-3 overflow-y-auto shrink-0"
               style={{ borderColor: "rgba(255,255,255,0.05)", maxHeight: 200 }}>
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#8a8978] px-2 pb-2"
               style={{ fontFamily: "var(--font-syne)" }}>
              All attractions
            </p>
            {attractions
              .filter((a) => !filter || a.type === filter)
              .map((attr) => {
                const { color } = TYPE_META[attr.type] ?? TYPE_META.Culture;
                const active = attr.id === selected.id;
                return (
                  <button key={attr.id}
                    onClick={() => {
                      setSelected(attr);
                      setImgSrc(attr.photo);
                      setImgFailed(false);
                      import("leaflet").then((mod) => {
                        const L = mod.default ?? mod;
                        updateMarkers(attr.id, L);
                        mapRef.current?.flyTo([attr.lat, attr.lng], 11, { duration: 1.1 });
                      });
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-200 w-full"
                    style={{
                      background: active ? "rgba(255,255,255,0.06)" : "transparent",
                      border: active ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0 mt-0.5"
                          style={{ background: color, boxShadow: `0 0 5px ${color}88` }} />
                    <span className="flex flex-col min-w-0 flex-1">
                      <span className="text-[11px] truncate"
                            style={{ fontFamily: "var(--font-syne)",
                              color: active ? "#f0ece3" : "#9a9880",
                              fontWeight: active ? 600 : 500 }}>
                        {attr.name}
                      </span>
                      <span className="text-[10px] truncate"
                            style={{ fontFamily: "var(--font-syne)",
                              color: "rgba(107,106,90,0.7)",
                              lineHeight: 1.4 }}>
                        {attr.elevation} · {attr.region}
                      </span>
                    </span>
                    <span className="shrink-0 text-[11px]">{TYPE_META[attr.type]?.icon}</span>
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* Screen-reader / keyboard fallback for the Leaflet map */}
      <details className="mt-6" style={{ fontFamily: "var(--font-syne)" }}>
        <summary
          className="cursor-pointer text-[11px] tracking-[0.25em] uppercase text-[#8a8978] hover:text-[#d4a843] transition-colors duration-200 select-none"
        >
          View all {attractions.length} attractions as text list
        </summary>
        <ul
          className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2"
          style={{ listStyle: "none" }}
        >
          {attractions.map((a) => (
            <li
              key={a.id}
              className="glass-dark rounded-xl px-4 py-3 flex flex-col gap-0.5"
            >
              <span className="text-[13px] font-semibold text-[#f0ece3]">
                {TYPE_META[a.type]?.icon} {a.name}
              </span>
              <span className="text-[11px] text-[#8a8978]">
                {a.type} · {a.region} · {a.elevation}
              </span>
              <span className="text-[11px] text-[rgba(240,236,227,0.5)] leading-relaxed mt-0.5">
                {a.description}
              </span>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
