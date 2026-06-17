// Pure pricing logic — no I/O, no server-only APIs.
// Runs identically on server (authoritative price) and client (live preview).

import { CATEGORIES, DURATION_MAP, type Category } from "./catalog";

export interface PriceResult {
  items: { label: string; amount: number }[];
  subtotal: number;
  vat: number;
  total: number;
}

/** Authoritative price for a category ID + user selections (server entry point). */
export function computePrice(
  categoryId: string,
  selections: Record<string, unknown>,
): PriceResult | null {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  if (!cat) return null;
  return _compute(cat, selections);
}

/** Compute price given a resolved Category object (client convenience). */
export function computePriceFromCat(
  cat: Category,
  selections: Record<string, unknown>,
): PriceResult | null {
  return _compute(cat, selections);
}

function _compute(cat: Category, vals: Record<string, unknown>): PriceResult | null {
  const p = cat.pricing;
  if (!p) return null;

  // Base rate: override with package price if applicable
  let base = p.base;
  if (p.packageField && p.packagePrices && vals[p.packageField]) {
    const pkg = p.packagePrices[vals[p.packageField] as string];
    if (pkg != null) base = pkg;
  }

  // Quantity (first populated qtyField wins)
  let qty = 1;
  if (p.qtyFields) {
    for (const f of p.qtyFields) {
      if (vals[f]) { qty = Math.max(1, parseInt(vals[f] as string) || 1); break; }
    }
  }

  // Duration — from date range or duration select
  let dur = 1;
  if (p.dateRange) {
    const [a, b] = p.dateRange;
    if (vals[a] && vals[b]) {
      const diff = (new Date(vals[b] as string).getTime() - new Date(vals[a] as string).getTime()) / 864e5;
      if (diff > 0) dur = Math.round(diff);
    }
  } else if (p.durationField && vals[p.durationField]) {
    const dd = DURATION_MAP[vals[p.durationField] as string];
    if (dd != null) dur = dd;
  }

  // Line items
  const items: PriceResult["items"] = [];
  const mods: string[] = [];
  if (qty > 1) mods.push(`${qty} pax`);
  if (dur !== 1) mods.push(`${dur} ${p.durUnit ?? "days"}`);
  const lbl = `${cat.label} (${p.unitLabel})${mods.length ? ` · ${mods.join(" × ")}` : ""}`;
  items.push({ label: lbl, amount: base * qty * dur });

  if (p.addons) {
    for (const a of p.addons) {
      if (vals[a.field]) {
        items.push({ label: a.label, amount: a.perDay ? a.amount * dur : a.amount });
      }
    }
  }

  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const vat = subtotal * 0.13;
  return { items, subtotal, vat, total: subtotal + vat };
}

/** Starting-price for catalog display — min of all package prices, or base. */
export function startPrice(cat: Category): number | null {
  if (!cat.pricing) return null;
  const p = cat.pricing;
  return p.packagePrices ? Math.min(...Object.values(p.packagePrices)) : p.base;
}

export const RATE = { USD: 1, NPR: 133 } as const;
export const SYM  = { USD: "$", NPR: "Rs " } as const;

export function fmt(usd: number, cur: keyof typeof RATE): string {
  const v = usd * RATE[cur];
  const r = cur === "NPR" ? Math.round(v / 10) * 10 : Math.round(v);
  // Pin the locale so SSR (Node) and client (browser) format identically and
  // never produce a hydration mismatch from differing thousands separators.
  return SYM[cur] + r.toLocaleString("en-US");
}
