# Supabase Backend Setup

This project uses Supabase Postgres as the booking database. The public booking form is handled by a Next.js server action in `frontend/app/actions/submitBooking.ts`.

## 1. Create Supabase project

1. Go to https://supabase.com.
2. Create a new project.
3. Save the project password somewhere safe.
4. Open the project dashboard.

## 2. Run the database schema

Open Supabase Dashboard → SQL Editor → New query.

Run the migrations in this order:

```text
backend/supabase/migrations/001_initial_booking_schema.sql
backend/supabase/migrations/002_admin_profiles_and_booking_audit.sql
backend/supabase/migrations/003_customer_accounts_and_own_bookings.sql
```

Current tables created/updated:

```text
customers
bookings
profiles
```

Current admin/customer-ready database objects:

```text
public.is_admin(user_id uuid)
public.admin_booking_summaries
public.customer_booking_summaries
public.handle_new_user_profile()
```

The migrations enable Row Level Security. The public booking server action uses the server-only service-role key. Admin and customer users authenticate with Supabase Auth.

## 3. Create local env file

From the repo root:

```bash
cp frontend/.env.local.example frontend/.env.local
```

Then fill in these values inside `frontend/.env.local`:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=your-resend-api-key
FROM_EMAIL=booking@yourdomain.com
```

Important:

- Never commit `frontend/.env.local`.
- `SUPABASE_SERVICE_ROLE_KEY` is secret and server-only.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is used for browser login and is safe to expose.
- Do not expose the service-role key in browser code.
- `SUPABASE_URL` should be the base project URL only, not `/rest/v1`.

## 4. Where to find Supabase keys

Supabase Dashboard → Project Settings → API:

- Project URL → use for `SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_URL`
- anon/public key → use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
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

## 6. Supabase Auth URL settings

Open Supabase Dashboard → Authentication → URL Configuration.

For local development:

```text
Site URL: http://localhost:3000
Redirect URLs: http://localhost:3000/**
```

For production/preview deployments, add the deployed domains too, for example:

```text
https://your-production-domain.com/**
https://your-preview-domain.vercel.app/**
```

Email confirmation decision:

- Local development: disable email confirmation temporarily, or manually confirm test users in Supabase Dashboard → Authentication → Users.
- Production: enable email confirmation if customers must verify email ownership before booking.

## 7. Admin user setup

After running migrations 002 and 003, create an admin user in Supabase Auth:

Supabase Dashboard → Authentication → Users → Add user

Then promote the trusted account by email in SQL Editor:

```sql
update public.profiles
set role = 'admin'
where email = 'your-admin-email@example.com';
```

If the user existed before the trigger was created and no profile row exists, run this safer setup instead:

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

Verify admin promotion:

```sql
select id, email, role
from public.profiles
where email = 'your-admin-email@example.com';
```

Expected: one row with `role = 'admin'`.

## 8. Admin login verification

After migration 002 and env setup, restart the dev server and open:

```text
http://localhost:3000/admin
```

Expected behavior:

- Without a session, `/admin` redirects to `/admin/login`.
- A non-admin Supabase user sees an access denied screen.
- A promoted `profiles.role = 'admin'` user can access the protected admin dashboard.

## 9. Customer account database verification

After migration 003, new Supabase Auth users become customer profiles by default.

Create a test customer in Supabase Auth, then verify:

```sql
select id, email, role
from public.profiles
where email = 'test-customer@example.com';
```

Expected: one row with `role = 'customer'`.

If a customer already submitted guest bookings with the same email before migration 003, the migration attempts to link the newest matching `customers` row to that auth user.

Verify customer-owned booking visibility:

```sql
select reference, category_id, status, created_at
from public.customer_booking_summaries
order by created_at desc
limit 5;
```

Expected: when run as an authenticated customer through the app/API, only that customer's bookings are visible.

## 10. Local customer booking verification

Run the app from the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Open the customer auth and booking pages:

```text
http://localhost:3000/signup
http://localhost:3000/login
http://localhost:3000/booking
http://localhost:3000/account/bookings
```

Expected customer behavior:

- Logged-out `/booking` redirects to `/login?next=%2Fbooking`.
- Logged-out `/account/bookings` redirects to `/login?next=%2Faccount%2Fbookings`.
- A customer can sign up or log in.
- A logged-in customer can submit a booking and receive a reference like `NPL-XXXXXXXX`.
- `/account/bookings` shows that customer's booking.
- Another customer account does not see the first customer's booking.

Expected database result:

- A row appears in Supabase `customers`.
- `customers.user_id` is filled with the logged-in `auth.users.id`.
- A row appears in Supabase `bookings`.
- `bookings.customer_id` points to that customer row.
- If Resend is configured, the customer receives a confirmation email.

SQL verification after submitting a test booking:

```sql
select
  b.reference,
  b.category_id,
  b.status,
  c.email,
  c.user_id,
  b.created_at
from public.bookings b
join public.customers c on c.id = b.customer_id
order by b.created_at desc
limit 5;
```

Expected: new bookings start with `status = 'pending'`.

## 11. Production/Vercel env variables

In Vercel, add these environment variables for Production and Preview:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
FROM_EMAIL=
```

Security check:

- Do not add service-role key as a `NEXT_PUBLIC_*` variable.
- Do not commit `.env.local`.
- Do not put secrets in README files.

## 12. Next backend priorities

This customer login/booking MVP is ready for PR review after local verification passes. Future backend work:

1. Apply migrations in a real Supabase project and test end-to-end with customer/admin accounts.
2. Add spam/rate-limit protection.
3. Add production deployment checklist and monitoring.
4. Add customer cancellation/request-change workflow if needed.
