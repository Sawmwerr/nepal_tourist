// Booking catalog — shared between client wizard UI and server pricing/validation.
// No server-only APIs here; safe to import from both "use client" and "use server" modules.

export type Currency = "USD" | "NPR";

export interface CatField {
  label: string;
  type: "text" | "select" | "date" | "number" | "toggle" | "textarea" | "multi";
  options?: string[];
  req?: boolean;
  min?: number;
}

export interface Addon {
  field: string;
  label: string;
  amount: number;
  perDay?: boolean;
}

export interface Pricing {
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

export interface Category {
  id: string;
  icon: string;
  label: string;
  desc: string;
  fields: CatField[];
  included: string[];
  pricing: Pricing | null;
}

// Duration label → number-of-days lookup used by pricing
export const DURATION_MAP: Record<string, number> = {
  "4-5 days": 5, "7-10 days": 10, "14-18 days": 18, "20+ days": 21,
  "Half Day": 0.5, "Full Day": 1, "2 Days + Camping": 2, "2 Days + Lodge": 2,
  "3 Days": 3, "3 Days Package": 3,
};

export const CATEGORY_IDS = [
  "hotels", "trekking", "paragliding", "zipline", "rafting",
  "bungee", "safari", "bus", "taxi", "motorbike", "custom",
] as const;

export type CategoryId = typeof CATEGORY_IDS[number];

export const CATEGORIES: Category[] = [
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
    pricing: {
      base: 45, unitLabel: "per night", durUnit: "nights",
      dateRange: ["Check-in Date","Check-out Date"],
      packageField: "Room Type",
      packagePrices: { Standard: 45, Deluxe: 70, "Mountain View Suite": 110, Luxury: 160 },
    },
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
    pricing: {
      base: 75, unitLabel: "per person / day", durUnit: "days",
      durationField: "Duration", qtyFields: ["Group Size"],
      addons: [
        { field: "Guide Required", label: "Licensed guide", amount: 25, perDay: true },
        { field: "Porter Required", label: "Porter", amount: 18, perDay: true },
      ],
    },
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
    pricing: {
      base: 80, unitLabel: "per flight", qtyFields: ["Number of Flyers"],
      packageField: "Package",
      packagePrices: { "30 min Standard": 80, "45 min Premium": 110, "60 min Sunrise Special": 150, "Video + Photo Package": 175 },
    },
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
    pricing: {
      base: 50, unitLabel: "per person / day", durUnit: "days",
      durationField: "Duration", qtyFields: ["Group Size"],
    },
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
    pricing: {
      base: 70, unitLabel: "per person / day", durUnit: "days",
      durationField: "Duration", qtyFields: ["Group Size"],
    },
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
    pricing: {
      base: 15, unitLabel: "per seat", qtyFields: ["Passengers"],
      packageField: "Bus Class",
      packagePrices: { "Local Bus (Budget)": 8, "Tourist Bus (AC)": 15, "Deluxe AC Coach": 22, "Night Bus (Sleeper)": 25, "Micro / Hiace Van": 18 },
    },
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
    pricing: {
      base: 18, unitLabel: "per trip",
      packageField: "Vehicle Type",
      packagePrices: { "Sedan (1–4 pax)": 18, "SUV / Jeep (1–6 pax)": 30, "Microvan (5–8 pax)": 40, "Minibus (8–15 pax)": 70, "Luxury Car": 90 },
    },
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
    pricing: {
      base: 18, unitLabel: "per day", durUnit: "days",
      dateRange: ["Rental Start","Rental End"],
      packageField: "Bike Type",
      packagePrices: { "Scooter / Scooty (125cc)": 15, "Semi-Sport (150–200cc)": 22, "Sports Bike (250cc+)": 35, "Dirt Bike / Off-road (200–450cc)": 45, "Royal Enfield (350–500cc)": 40, "Electric Scooter": 18 },
      addons: [
        { field: "Helmet & Gear", label: "Helmet & gear", amount: 5, perDay: true },
        { field: "With GPS Device?", label: "GPS device", amount: 3, perDay: true },
      ],
    },
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
