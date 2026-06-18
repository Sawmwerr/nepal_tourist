# Backend

This folder is for Al-Amin's backend work: Supabase SQL, backend setup docs, database hardening, and auth/account setup.

## Current backend status

The project is still a Next.js app, so live server-side runtime code remains in the frontend workspace:

```text
frontend/app/actions/submitBooking.ts
frontend/lib/booking/
frontend/lib/customer/
frontend/lib/admin/
frontend/lib/supabase/
frontend/lib/notifications/
```

Those files are server/client helpers imported by Next.js routes and server actions, so they must stay under `frontend/` until the project has a separate backend service.

Supabase database migrations live here:

```text
backend/supabase/migrations/001_initial_booking_schema.sql
backend/supabase/migrations/002_admin_profiles_and_booking_audit.sql
backend/supabase/migrations/003_customer_accounts_and_own_bookings.sql
```

Detailed setup guide:

```text
backend/docs/SUPABASE_SETUP.md
```

## Implemented backend features

Booking flow:

- Booking payload validation with Zod.
- Category-specific server-side validation.
- Server-side price calculation.
- Booking reference generation.
- Unique idempotency key support.
- Service-role controlled booking insert.
- Customer confirmation email support through Resend.

Customer account flow:

- Supabase Auth email/password signup/login.
- New auth users get `profiles.role = 'customer'` by default.
- `customers.user_id` links booking contact rows to `auth.users.id`.
- `/booking` requires customer login.
- `/account/bookings` reads from `customer_booking_summaries` so customers see only their own bookings.

Admin flow:

- Separate `/admin/login` route.
- Admin dashboard at `/admin`.
- Admin access requires `profiles.role = 'admin'`.
- Admin dashboard reads `admin_booking_summaries` and can update status/internal notes.

Current database tables:

```text
customers
bookings
profiles
```

Current database helpers/views:

```text
public.is_admin(user_id uuid)
public.admin_booking_summaries
public.customer_booking_summaries
public.handle_new_user_profile()
```

## Quick setup

1. Create a Supabase project.
2. Configure Supabase Authentication URL settings:

```text
Site URL: http://localhost:3000
Redirect URLs: http://localhost:3000/**
```

For production/preview, add the deployed domains too.

3. Decide email confirmation behavior:

- Local testing: disable email confirmation or manually confirm test users.
- Production: enable confirmation if verified customer emails are required.

4. Run migrations in Supabase Dashboard → SQL Editor:

```text
backend/supabase/migrations/001_initial_booking_schema.sql
backend/supabase/migrations/002_admin_profiles_and_booking_audit.sql
backend/supabase/migrations/003_customer_accounts_and_own_bookings.sql
```

5. Copy the env template:

```bash
cp frontend/.env.local.example frontend/.env.local
```

6. Fill in:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
FROM_EMAIL=
```

7. Start the app:

```bash
cd frontend
npm install
npm run dev
```

8. Test routes:

```text
http://localhost:3000/signup
http://localhost:3000/login
http://localhost:3000/booking
http://localhost:3000/account/bookings
http://localhost:3000/admin/login
http://localhost:3000/admin
```

## First admin setup

Create a trusted Supabase Auth user, then promote it:

```sql
update public.profiles
set role = 'admin', updated_at = now()
where email = 'your-admin-email@example.com';
```

If no profile row exists yet:

```sql
insert into public.profiles (id, email, full_name, role)
select id, email, raw_user_meta_data ->> 'full_name', 'admin'
from auth.users
where email = 'your-admin-email@example.com'
on conflict (id) do update
set role = 'admin',
    email = excluded.email,
    updated_at = now();
```

## Security notes

- Never commit `frontend/.env.local`.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code.
- Keep `NEXT_PUBLIC_SUPABASE_ANON_KEY` separate from the service-role key.
- Do not store passport/biometric/private travel documents yet.
- Customer-facing reads should go through RLS-safe objects like `customer_booking_summaries`.
- Admin-only operations must re-check auth/profile role server-side.

## Final verification

```bash
cd frontend
npm test
npm run lint
npm run build
```

## Future backend priorities

1. Apply migrations in a real Supabase project and test end-to-end with customer/admin accounts.
2. Add spam/rate-limit protection.
3. Add production deployment checklist and monitoring.
4. Add customer cancellation/request-change workflow if needed.
