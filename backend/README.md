# Backend

This folder is for Al-Amin's backend work.

## Current backend status

The project is still a Next.js app, so the live booking server action remains in:

```text
frontend/app/actions/submitBooking.ts
```

Supporting backend logic remains with the frontend app for now because it is imported by the Next.js server action:

```text
frontend/lib/booking/
frontend/lib/notifications/
```

The database schema has been separated here:

```text
backend/supabase/migrations/001_initial_booking_schema.sql
```

## Supabase setup

1. Create a Supabase project.
2. Open Supabase Dashboard → SQL Editor.
3. Run:

```text
backend/supabase/migrations/001_initial_booking_schema.sql
```

4. Copy `frontend/.env.local.example` to `frontend/.env.local`.
5. Fill in:

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
FROM_EMAIL=
```

## Recommended next backend work

1. Add an admin bookings page/API.
2. Protect admin access.
3. Add booking status updates: pending, confirmed, cancelled.
4. Add rate limiting/spam protection for booking submit.
5. Add proper backend tests for booking validation and pricing.
