# Supabase Backend Setup

This project uses Supabase Postgres as the booking database. The public booking form is handled by a Next.js server action in `frontend/app/actions/submitBooking.ts`.

## 1. Create Supabase project

1. Go to https://supabase.com.
2. Create a new project.
3. Save the project password somewhere safe.
4. Open the project dashboard.

## 2. Run the database schema

Open Supabase Dashboard → SQL Editor → New query.

Copy and run this SQL file:

```text
backend/supabase/migrations/001_initial_booking_schema.sql
```

Current tables created:

```text
customers
bookings
```

The migration also enables Row Level Security. The current booking server action uses the server-only service-role key, so public browser users do not need direct table access.

## 3. Create local env file

From the repo root:

```bash
cp frontend/.env.local.example frontend/.env.local
```

Then fill in these values inside `frontend/.env.local`:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=your-resend-api-key
FROM_EMAIL=booking@yourdomain.com
```

Important:

- Never commit `frontend/.env.local`.
- `SUPABASE_SERVICE_ROLE_KEY` is secret and server-only.
- Do not expose the service-role key in browser code.
- `SUPABASE_URL` should be the base project URL only, not `/rest/v1`.

## 4. Where to find Supabase keys

Supabase Dashboard → Project Settings → API:

- Project URL → use for `SUPABASE_URL`
- service_role key → use for `SUPABASE_SERVICE_ROLE_KEY`

Do not paste real keys into chat or docs.

## 5. Optional email setup

The current notification sender uses Resend.

Required variables:

```env
RESEND_API_KEY=
FROM_EMAIL=
```

For real delivery, `FROM_EMAIL` should use a verified Resend domain.

If email is not configured in development, the booking action may still return a simulated reference when Supabase is also not configured.

## 6. Local verification

Run the app from the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:3000/booking
```

Submit one test booking.

Expected result:

- The form returns a booking reference like `NPL-XXXXXXXX`.
- A row appears in Supabase `customers`.
- A row appears in Supabase `bookings`.
- If Resend is configured, the customer receives a confirmation email.

## 7. Production/Vercel env variables

In Vercel, add these environment variables for Production and Preview:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
FROM_EMAIL=
```

Security check:

- Do not add service-role key as a `NEXT_PUBLIC_*` variable.
- Do not commit `.env.local`.
- Do not put secrets in README files.

## 8. Next backend phases

After this setup works, continue with:

1. Admin profile/role schema.
2. Supabase Auth login for admins.
3. Admin bookings dashboard.
4. Booking status updates.
5. Spam/rate-limit protection.
