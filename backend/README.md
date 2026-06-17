# Backend

This folder is for Al-Amin's backend work: Supabase SQL, backend setup docs, and future admin/auth/database work.

## Current backend status

The project is still a Next.js app, so the live booking server action remains in:

```text
frontend/app/actions/submitBooking.ts
```

Supporting backend logic remains with the frontend app because it is imported directly by the Next.js server action:

```text
frontend/lib/booking/
frontend/lib/notifications/
```

The Supabase database migrations live here:

```text
backend/supabase/migrations/001_initial_booking_schema.sql
backend/supabase/migrations/002_admin_profiles_and_booking_audit.sql
```

The detailed Supabase setup guide lives here:

```text
backend/docs/SUPABASE_SETUP.md
```

## Existing backend features

Already implemented:

- Booking payload validation with Zod.
- Category-specific server-side validation.
- Server-side price calculation.
- Customer upsert by email.
- Booking insert with unique idempotency key.
- Booking reference generation.
- Resend customer confirmation email support.
- Development fallback when Supabase env variables are missing.

Current database tables:

```text
customers
bookings
profiles
```

Admin-ready database helpers:

```text
public.is_admin(user_id uuid)
public.admin_booking_summaries
```

## Quick setup

1. Create a Supabase project.
2. Run these SQL migrations in Supabase Dashboard → SQL Editor:

```text
backend/supabase/migrations/001_initial_booking_schema.sql
backend/supabase/migrations/002_admin_profiles_and_booking_audit.sql
```

3. Copy the env template:

```bash
cp frontend/.env.local.example frontend/.env.local
```

4. Fill in:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
FROM_EMAIL=
```

5. Start the app:

```bash
cd frontend
npm install
npm run dev
```

6. Test the booking page:

```text
http://localhost:3000/booking
```

## Security notes

- Never commit `frontend/.env.local`.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code.
- Do not store passport/biometric/private travel documents yet.
- Current public users do not need direct Supabase table access.

## Recommended next backend phases

1. Harden the Supabase schema with admin profiles, roles, audit fields, and better booking statuses.
2. Add Supabase Auth for admin login.
3. Build an admin bookings dashboard.
4. Add booking status updates and admin notes.
5. Add spam/rate-limit protection.
6. Add production checklist and deployment verification.
