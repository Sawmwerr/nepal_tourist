import { createClient } from "@supabase/supabase-js";

export interface BookingRow {
  id?: string;
  reference: string;
  category_id: string;
  customer_id: string;
  selections: Record<string, unknown>;
  computed_subtotal: number | null;
  computed_vat: number | null;
  computed_total: number | null;
  currency: string;
  status: "pending" | "confirmed" | "cancelled";
  idempotency_key: string;
  created_at?: string;
}

export interface CustomerRow {
  id?: string;
  name: string;
  email: string;
  phone: string;
  created_at?: string;
}

/** Server-only Supabase client (service-role key — bypasses RLS, never expose to browser). */
export function createServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
  }
  // Untyped client — query result types are asserted at each call site in submitBooking.ts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createClient<any>(url, key, { auth: { persistSession: false } });
}
