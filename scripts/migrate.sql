-- Nepal Tourism — Booking schema
-- Paste into Supabase Dashboard > SQL Editor, or run via: supabase db push
-- Compatible with Supabase Postgres (pg 15+).

-- ── Customers ─────────────────────────────────────────────────────────────────
-- No passport / biometric PII stored here — encryption + retention policy TBD.

CREATE TABLE IF NOT EXISTS customers (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL,
  email      text        NOT NULL UNIQUE,
  phone      text        NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ── Bookings ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS bookings (
  id                uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  reference         text         NOT NULL UNIQUE,
  category_id       text         NOT NULL,
  customer_id       uuid         NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  selections        jsonb        NOT NULL DEFAULT '{}',
  computed_subtotal numeric(10,2),           -- USD; null for free-quote categories
  computed_vat      numeric(10,2),
  computed_total    numeric(10,2),
  currency          text         NOT NULL DEFAULT 'USD',
  status            text         NOT NULL DEFAULT 'pending'
                                 CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  idempotency_key   text         NOT NULL UNIQUE,   -- client UUID; prevents duplicate submissions
  created_at        timestamptz  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS bookings_customer_idx ON bookings (customer_id);
CREATE INDEX IF NOT EXISTS bookings_status_idx   ON bookings (status);
CREATE INDEX IF NOT EXISTS bookings_created_idx  ON bookings (created_at DESC);

-- ── Row-level security ────────────────────────────────────────────────────────
-- The service-role key used in server actions bypasses RLS.
-- Anon / authenticated roles have no access by default (safe for direct browser connections).

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings  ENABLE ROW LEVEL SECURITY;
