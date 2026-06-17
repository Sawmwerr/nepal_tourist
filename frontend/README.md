# Nepal Tourist Frontend

Next.js tourism website and booking UI.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Environment

Copy the example file:

```bash
cp .env.local.example .env.local
```

Then fill in Supabase and Resend values.

Important: never commit `.env.local`.

## Backend connection

The booking form currently submits through a Next.js server action:

```text
app/actions/submitBooking.ts
```

Database schema lives in:

```text
../backend/supabase/migrations/001_initial_booking_schema.sql
```
