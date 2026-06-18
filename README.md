# Nepal Tourist

Monorepo-style project split into frontend and backend ownership.

## Structure

```text
nepal_tourist/
  frontend/   # Next.js tourism website, booking UI, auth pages, server actions
  backend/    # Supabase schema, backend docs, database/auth setup
```

## Frontend

The current app is inside `frontend/`.

```bash
cd frontend
npm install
npm run dev
npm test
npm run lint
npm run build
```

Local URL: http://localhost:3000

## Implemented MVP features

Customer flow:

- `/signup` — customer creates an account with Supabase Auth.
- `/login` — customer login.
- `/booking` — protected booking wizard; logged-out users redirect to `/login?next=/booking`.
- `/account/bookings` — protected customer booking history.
- New bookings are linked to the logged-in Supabase user through `customers.user_id = auth.users.id`.
- Customers can only see their own bookings through `customer_booking_summaries` and RLS.

Admin flow:

- `/admin/login` — separate admin login page.
- `/admin` — protected admin bookings dashboard.
- Admin access requires `profiles.role = 'admin'`.
- Admins can view all bookings, update statuses, and save internal notes.

## Backend

Current backend pieces:

- Supabase migrations:
  - `backend/supabase/migrations/001_initial_booking_schema.sql`
  - `backend/supabase/migrations/002_admin_profiles_and_booking_audit.sql`
  - `backend/supabase/migrations/003_customer_accounts_and_own_bookings.sql`
- Supabase setup guide: `backend/docs/SUPABASE_SETUP.md`
- Booking server action: `frontend/app/actions/submitBooking.ts`
- Booking validation/pricing/database helpers: `frontend/lib/booking/`
- Customer auth/account helpers: `frontend/lib/customer/`
- Admin auth/booking helpers: `frontend/lib/admin/`
- Email notification helpers: `frontend/lib/notifications/`

Why some backend code is inside `frontend/`: this is a Next.js app, so server actions and server-only helpers are part of the frontend workspace build.

## Backend quick setup

1. Create a Supabase project.
2. In Supabase Authentication settings, configure:
   - Site URL: `http://localhost:3000` for local development, production domain for production.
   - Redirect URLs: `http://localhost:3000/**`, plus production/preview domains.
   - Email confirmation: for easiest local testing, disable confirmation or manually confirm test users.
3. Run the SQL migrations in order:

```text
backend/supabase/migrations/001_initial_booking_schema.sql
backend/supabase/migrations/002_admin_profiles_and_booking_audit.sql
backend/supabase/migrations/003_customer_accounts_and_own_bookings.sql
```

4. Create local env file:

```bash
cp frontend/.env.local.example frontend/.env.local
```

5. Fill in:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
FROM_EMAIL=
```

6. Start the app:

```bash
cd frontend
npm run dev
```

7. Test the customer flow:

```text
http://localhost:3000/signup
http://localhost:3000/login
http://localhost:3000/booking
http://localhost:3000/account/bookings
```

Full setup guide: `backend/docs/SUPABASE_SETUP.md`

## Team workflow

- `main` = stable integration branch
- `backend` = Al-Amin backend/database/auth implementation branch
- Friend can keep frontend work on a separate `frontend` branch

Do not commit real `.env.local` files. Use `frontend/.env.local.example` as the template.

## Quality gates

Run before PR/merge:

```bash
cd frontend
npm test
npm run lint
npm run build
```

## Future priorities

1. Apply migrations in Supabase and test with real customer/admin accounts.
2. Add spam/rate-limit protection for booking submission.
3. Add production deployment checklist and monitoring.
4. Add customer booking cancellation/request changes if needed.
