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
```

Current tables created/updated:

```text
customers
bookings
profiles
```

Current admin-ready database objects:

```text
public.is_admin(user_id uuid)
public.admin_booking_summaries
public.handle_new_user_profile()
```

The migrations enable Row Level Security. The public booking server action uses the server-only service-role key. Admin users will use Supabase Auth in a later phase.

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

## 6. Admin user setup

Phase 2 only prepares the database for admin users. The admin login UI is built in the next phase.

After running migration 002, create an admin user in Supabase Auth:

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

## 7. Admin login verification

After migration 002 and env setup, restart the dev server and open:

```text
http://localhost:3000/admin
```

Expected behavior:

- Without a session, `/admin` redirects to `/admin/login`.
- A non-admin Supabase user sees an access denied screen.
- A promoted `profiles.role = 'admin'` user can access the protected admin dashboard.

## 8. Local booking verification

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

SQL verification after submitting a test booking:

```sql
select reference, category_id, status, created_at, updated_at
from public.bookings
order by created_at desc
limit 5;
```

Expected: new bookings start with `status = 'pending'`.

## 9. Production/Vercel env variables

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

## 10. Next backend phases

After Phase 3 admin login works, continue with:

1. Admin bookings dashboard.
2. Booking status updates from the dashboard.
3. Spam/rate-limit protection.
4. Production deployment checklist.
