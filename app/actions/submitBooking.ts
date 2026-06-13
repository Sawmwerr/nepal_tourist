"use server";

import { CATEGORIES } from "@/lib/booking/catalog";
import { computePrice } from "@/lib/booking/pricing";
import { BookingPayloadSchema } from "@/lib/booking/schema";
import { createServerClient } from "@/lib/booking/db";

export type SubmitResult =
  | { ok: true;  reference: string }
  | { ok: false; errors: Record<string, string> };

export async function submitBooking(rawPayload: unknown): Promise<SubmitResult> {
  // ── 1. Base schema parse ──────────────────────────────────────────────────
  const parsed = BookingPayloadSchema.safeParse(rawPayload);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");
      if (!errors[path]) errors[path] = issue.message;
    }
    return { ok: false, errors };
  }

  const { categoryId, selections, currency, contact, idempotencyKey } = parsed.data;
  const cat = CATEGORIES.find(c => c.id === categoryId)!;

  // ── 2. Category-specific field validation ─────────────────────────────────
  const fieldErrors: Record<string, string> = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const field of cat.fields) {
    const raw = selections[field.label];
    const missing = raw === undefined || raw === "" || raw === null;

    if (field.req && missing) {
      fieldErrors[field.label] = `${field.label} is required`;
      continue;
    }
    if (missing) continue; // optional field — skip further checks

    if (field.type === "date" && typeof raw === "string") {
      const d = new Date(raw);
      if (isNaN(d.getTime())) {
        fieldErrors[field.label] = "Invalid date";
      } else if (d < today) {
        fieldErrors[field.label] = "Date cannot be in the past";
      }
    }

    if (field.type === "select" && typeof raw === "string" && field.options) {
      if (!field.options.includes(raw)) {
        fieldErrors[field.label] = `Invalid option for ${field.label}`;
      }
    }

    if (field.type === "number") {
      const n = Number(raw);
      const min = field.min ?? 1;
      if (!Number.isFinite(n) || !Number.isInteger(n) || n < min || n > 200) {
        fieldErrors[field.label] = `${field.label} must be a whole number between ${min} and 200`;
      }
    }

    if (field.type === "multi" && Array.isArray(raw) && field.options) {
      const invalid = (raw as unknown[]).find(v => !field.options!.includes(v as string));
      if (invalid) fieldErrors[field.label] = `Invalid selection in ${field.label}`;
    }
  }

  // Contact validation (belt-and-suspenders — Zod already checked these)
  if (contact.name.trim().length < 2)              fieldErrors["contact.name"]  = "Full name is required";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email)) fieldErrors["contact.email"] = "Valid email address required";
  if (contact.phone.trim().length < 5)             fieldErrors["contact.phone"] = "Phone or WhatsApp number required";

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, errors: fieldErrors };
  }

  // ── 3. Server-side price computation (never trust client price) ───────────
  const priceResult = computePrice(categoryId, selections);

  // ── 4. Booking reference ──────────────────────────────────────────────────
  const reference = `NPL-${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;

  // ── 5. Sanitize selections — keep only fields declared in the catalog ─────
  const allowedLabels = new Set(cat.fields.map(f => f.label));
  const safeSelections: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(selections)) {
    if (allowedLabels.has(k)) safeSelections[k] = v;
  }

  // ── 6. Persist (with graceful dev fallback when DB not configured) ────────
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[submitBooking] Supabase env vars not set — returning simulated reference");
      return { ok: true, reference };
    }
    throw new Error("Database not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  const db = createServerClient();

  try {
    // Idempotency: return existing booking for a repeated key (network retry)
    const { data: existing } = await db
      .from("bookings")
      .select("reference")
      .eq("idempotency_key", idempotencyKey)
      .maybeSingle();

    if (existing?.reference) {
      return { ok: true, reference: existing.reference };
    }

    // Upsert customer — idempotent on email so repeat bookings reuse the same row
    const { data: customer, error: custErr } = await db
      .from("customers")
      .upsert(
        { name: contact.name, email: contact.email, phone: contact.phone },
        { onConflict: "email", ignoreDuplicates: false },
      )
      .select("id")
      .single();

    if (custErr) throw custErr;

    // Insert booking — idempotency_key has a UNIQUE constraint so a race
    // between the SELECT above and this INSERT is caught as a 23505 error.
    const { error: bookErr } = await db.from("bookings").insert({
      reference,
      category_id:       categoryId,
      customer_id:       customer.id,
      selections:        safeSelections,
      computed_subtotal: priceResult?.subtotal ?? null,
      computed_vat:      priceResult?.vat      ?? null,
      computed_total:    priceResult?.total    ?? null,
      currency,
      status:            "pending",
      idempotency_key:   idempotencyKey,
    });

    if (bookErr) {
      if (bookErr.code === "23505") {
        // Lost the race — fetch the winner's reference
        const { data: retry } = await db
          .from("bookings")
          .select("reference")
          .eq("idempotency_key", idempotencyKey)
          .single();
        if (retry?.reference) return { ok: true, reference: retry.reference };
      }
      throw bookErr;
    }

    return { ok: true, reference };
  } catch (err) {
    console.error("[submitBooking] DB error:", err);
    throw err;
  }
}
