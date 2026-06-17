-- Nepal Tourism — Customer accounts and own-booking access
-- Run after 002_admin_profiles_and_booking_audit.sql.
-- Compatible with Supabase Postgres.

-- ── Profiles: customer role by default ───────────────────────────────────────

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Existing non-admin auth users were created as staff by migration 002.
-- Convert them to customer accounts before tightening the role constraint.
UPDATE public.profiles
SET role = 'customer',
    updated_at = now()
WHERE role = 'staff';

ALTER TABLE public.profiles
  ALTER COLUMN role SET DEFAULT 'customer';

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('admin', 'customer'));

-- New Supabase Auth users should become customers unless promoted later.
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
    'customer'
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
    updated_at = now();

  RETURN NEW;
END;
$$;

-- ── Customers: link booking contact rows to Supabase Auth users ──────────────

ALTER TABLE public.customers
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE UNIQUE INDEX IF NOT EXISTS customers_user_id_unique_idx
  ON public.customers (user_id)
  WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS customers_lower_email_idx
  ON public.customers (lower(email));

-- Backfill customer rows for auth users that already used the same email.
-- If multiple customer rows somehow share the same email, only the newest row is linked.
WITH ranked_customers AS (
  SELECT
    c.id,
    u.id AS auth_user_id,
    row_number() OVER (
      PARTITION BY lower(c.email)
      ORDER BY c.created_at DESC, c.id DESC
    ) AS rn
  FROM public.customers c
  JOIN auth.users u ON lower(u.email) = lower(c.email)
  WHERE c.user_id IS NULL
)
UPDATE public.customers c
SET user_id = ranked_customers.auth_user_id
FROM ranked_customers
WHERE c.id = ranked_customers.id
  AND ranked_customers.rn = 1;

-- ── RLS: customers can access their own customer row ─────────────────────────

DROP POLICY IF EXISTS "customers_select_own" ON public.customers;
CREATE POLICY "customers_select_own"
ON public.customers
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "customers_update_own" ON public.customers;
CREATE POLICY "customers_update_own"
ON public.customers
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Admin policies from migration 002 stay in place.

-- ── RLS: customers can read only their own bookings ──────────────────────────

DROP POLICY IF EXISTS "bookings_select_own" ON public.bookings;
CREATE POLICY "bookings_select_own"
ON public.bookings
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.customers c
    WHERE c.id = bookings.customer_id
      AND c.user_id = auth.uid()
  )
);

-- Admin booking select/update policies from migration 002 stay in place.
-- Booking creation remains server-controlled through the service-role server action.

-- ── Customer-safe booking dashboard view ─────────────────────────────────────

CREATE OR REPLACE VIEW public.customer_booking_summaries
WITH (security_invoker = true)
AS
SELECT
  b.id,
  b.reference,
  b.category_id,
  b.customer_id,
  b.computed_subtotal,
  b.computed_vat,
  b.computed_total,
  b.currency,
  b.status,
  b.confirmation_sent,
  b.created_at,
  b.updated_at
FROM public.bookings b
JOIN public.customers c ON c.id = b.customer_id
WHERE c.user_id = auth.uid();

GRANT SELECT ON public.customer_booking_summaries TO authenticated;
