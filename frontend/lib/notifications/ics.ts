// Pure ICS generator — no I/O, no server-only APIs.
// Imported by both the server email sender and the client "Add to Calendar" button.

import { CATEGORIES, DURATION_MAP } from "@/lib/booking/catalog";

export interface ICSParams {
  reference: string;
  categoryId: string;
  categoryLabel: string;
  selections: Record<string, unknown>;
}

export function generateICS({ reference, categoryId, categoryLabel, selections }: ICSParams): string {
  const cat = CATEGORIES.find(c => c.id === categoryId);

  let startStr: string | null = null;
  let endStr: string | null = null;

  if (cat?.pricing?.dateRange) {
    const [sf, ef] = cat.pricing.dateRange;
    const s = selections[sf];
    const e = selections[ef];
    if (typeof s === "string" && s) startStr = s;
    if (typeof e === "string" && e) endStr = e;
  }

  if (!startStr && cat) {
    const df = cat.fields.find(f => f.type === "date");
    if (df) {
      const d = selections[df.label];
      if (typeof d === "string" && d) startStr = d;
    }
  }

  const parsedStart = startStr ? new Date(startStr) : null;
  if (!startStr || !parsedStart || isNaN(parsedStart.getTime())) {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    startStr = t.toISOString().slice(0, 10);
  }

  if (!endStr) {
    const start = new Date(startStr!);
    let dur = 1;
    if (cat?.pricing?.durationField) {
      const dv = selections[cat.pricing.durationField];
      if (typeof dv === "string") dur = DURATION_MAP[dv] ?? 1;
    }
    start.setDate(start.getDate() + Math.max(1, Math.ceil(dur)));
    endStr = start.toISOString().slice(0, 10);
  }

  const parsedEnd = new Date(endStr);
  if (isNaN(parsedEnd.getTime()) || parsedEnd <= new Date(startStr!)) {
    const fallback = new Date(startStr!);
    fallback.setDate(fallback.getDate() + 1);
    endStr = fallback.toISOString().slice(0, 10);
  }

  const dtStart = startStr!.replace(/-/g, "");
  const dtEnd = endStr.replace(/-/g, "");
  const dtStamp = new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";

  const descParts = [`Reference: ${reference}`, `Activity: ${categoryLabel}`];
  for (const [k, v] of Object.entries(selections)) {
    if (v === undefined || v === "" || v === null || v === false) continue;
    const val = Array.isArray(v) ? (v as string[]).join(", ") : String(v);
    descParts.push(`${k}: ${val}`);
  }

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Nepal Tourism//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${reference}@nepal-tourism`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;VALUE=DATE:${dtStart}`,
    `DTEND;VALUE=DATE:${dtEnd}`,
    `SUMMARY:Nepal Tourism - ${categoryLabel} (${reference})`,
    `DESCRIPTION:${descParts.join("\\n")}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Nepal booking reminder",
    "TRIGGER:-P1D",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
