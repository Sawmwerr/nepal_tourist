-- Nepal Tourism — Admin profiles and booking audit hardening
-- Run after 001_initial_booking_schema.sql.
-- Compatible with Supabase Postgres.

-- ── Extensions ───────────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ── Shared updated_at trigger helper ─────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ── Admin profiles ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
  id         uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      text,
  full_name  text,
  role       text        NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS profiles_role_idx ON public.profiles (role);
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles (lower(email));

DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
CREATE TRIGGER profiles_set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Create/refresh a profile row when a Supabase Auth user is created.
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    'staff'
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
    updated_at = now();

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_create_profile ON auth.users;
CREATE TRIGGER on_auth_user_created_create_profile
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_profile();

-- Helper used by RLS policies. Avoid querying profiles directly in every policy.
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = user_id
      AND role = 'admin'
  );
$$;

-- ── Booking status and audit fields ──────────────────────────────────────────

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS admin_notes text,
  ADD COLUMN IF NOT EXISTS handled_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL;

-- The original 001 migration created this check constraint inline.
ALTER TABLE public.bookings
  DROP CONSTRAINT IF EXISTS bookings_status_check;

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_status_check
  CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'rejected'));

CREATE INDEX IF NOT EXISTS bookings_handled_by_idx ON public.bookings (handled_by);
CREATE INDEX IF NOT EXISTS bookings_updated_idx    ON public.bookings (updated_at DESC);

DROP TRIGGER IF EXISTS bookings_set_updated_at ON public.bookings;
CREATE TRIGGER bookings_set_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- ── Row-level security policies ──────────────────────────────────────────────

ALTER TABLE public.profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings  ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read their own row; admins can read/update all profiles.
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

DROP POLICY IF EXISTS "profiles_select_admin" ON public.profiles;
CREATE POLICY "profiles_select_admin"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "profiles_update_admin" ON public.profiles;
CREATE POLICY "profiles_update_admin"
ON public.profiles
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Customers: admins can read/update customer contact info for booking handling.
DROP POLICY IF EXISTS "customers_select_admin" ON public.customers;
CREATE POLICY "customers_select_admin"
ON public.customers
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "customers_update_admin" ON public.customers;
CREATE POLICY "customers_update_admin"
ON public.customers
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Bookings: admins can read and update booking status/notes.
DROP POLICY IF EXISTS "bookings_select_admin" ON public.bookings;
CREATE POLICY "bookings_select_admin"
ON public.bookings
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "bookings_update_admin" ON public.bookings;
CREATE POLICY "bookings_update_admin"
ON public.bookings
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Helpful read model for the future admin dashboard.
CREATE OR REPLACE VIEW public.admin_booking_summaries AS
SELECT
  b.id,
  b.reference,
  b.category_id,
  b.customer_id,
  c.name  AS customer_name,
  c.email AS customer_email,
  c.phone AS customer_phone,
  b.computed_subtotal,
  b.computed_vat,
  b.computed_total,
  b.currency,
  b.status,
  b.confirmation_sent,
  b.admin_notes,
  b.handled_by,
  b.created_at,
  b.updated_at
FROM public.bookings b
JOIN public.customers c ON c.id = b.customer_id;

GRANT SELECT ON public.admin_booking_summaries TO authenticated;
