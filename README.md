# Nepal Tourist

Monorepo-style project split into frontend and backend ownership.

## Structure

```text
nepal_tourist/
  frontend/   # Next.js tourism website, booking UI, server actions
  backend/    # Supabase schema, backend docs, future admin/auth work
```

## Frontend

The current app is inside `frontend/`.

```bash
cd frontend
npm install
npm run dev
npm run lint
npm run build
```

Local URL: http://localhost:3000

## Backend

Backend setup starts in `backend/`.

Current backend pieces:

- Supabase schema: `backend/supabase/migrations/001_initial_booking_schema.sql`
- Supabase setup guide: `backend/docs/SUPABASE_SETUP.md`
- Booking server action: `frontend/app/actions/submitBooking.ts`
- Booking validation/pricing/database helpers: `frontend/lib/booking/`
- Email notification helpers: `frontend/lib/notifications/`

Why some backend code is inside `frontend/`: this is a Next.js app, so server actions and server-only helpers are part of the frontend workspace build.

## Backend quick setup

1. Create a Supabase project.
2. Run the SQL migration:

```text
backend/supabase/migrations/001_initial_booking_schema.sql
```

3. Create local env file:

```bash
cp frontend/.env.local.example frontend/.env.local
```

4. Fill in the backend variables:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
FROM_EMAIL=
```

5. Start the app and submit a test booking:

```bash
cd frontend
npm run dev
```

Open: http://localhost:3000/booking

Full setup guide: `backend/docs/SUPABASE_SETUP.md`

## Team workflow

- `main` = stable integration branch
- `al-amin` = current structure/base branch
- `backend` = Al-Amin backend implementation branch
- Friend can keep frontend work on a separate `frontend` branch

Do not commit real `.env.local` files. Use `frontend/.env.local.example` as the template.

## Next backend priorities

1. Supabase schema hardening: admin profiles, roles, status audit fields.
2. Supabase Auth admin login.
3. Admin bookings dashboard.
4. Booking status updates.
5. Spam/rate-limit protection.
6. Production deployment checklist.
