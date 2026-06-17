# Customer Login Booking Implementation Plan

> For coding agent: Execute one phase at a time. After each phase, run verification, show localhost pages for Al-Amin to test, then STOP. Do not continue until Al-Amin explicitly approves the next phase.

Goal: Change booking from guest-only to customer-account booking, so every booking belongs to a logged-in customer.

Architecture: Use Supabase Auth for customer login/signup. Keep admin auth separate but reuse the same Supabase auth clients. Link `auth.users.id` to `customers.user_id`, require login before `/booking`, and show customers only their own bookings in `/account/bookings`.

Tech stack: Next.js App Router, Supabase Auth/SSR, Supabase Postgres/RLS, TypeScript, Vitest.

Important current state:
- Branch: `backend`
- Existing admin routes: `/admin/login`, `/admin`
- Existing booking page: `frontend/app/booking/page.tsx`
- Existing booking action: `frontend/app/actions/submitBooking.ts`
- Existing schema: `customers`, `bookings`, `profiles`
- Warning: current workspace has local modified files not related to this plan. Do not overwrite them without reviewing `git status` and `git diff` first.

---

## Phase 1 — Database identity model — DONE

Status: DONE on 2026-06-17. Created migration 003, updated Supabase setup docs, and verified `npm run lint`, `npm test`, and `npm run build` pass.

Scope: Add customer identity support in Supabase schema only.

Files:
- Create: `backend/supabase/migrations/003_customer_accounts_and_own_bookings.sql`
- Modify: `backend/docs/SUPABASE_SETUP.md`

Required changes:
1. Change `profiles.role` allowed values to include `customer`.
2. Change default role from `staff` to `customer`.
3. Keep existing admins working.
4. Add `customers.user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL`.
5. Add unique index on `customers.user_id` where not null.
6. Add index on `customers.email` lower-case if needed.
7. Add RLS policies:
   - customers can select/update only their own customer row
   - admins can still select/update all customers
   - customers can select only their own bookings
   - admins can still select/update all bookings
8. Create `public.customer_booking_summaries` view for customer dashboard.
9. Grant SELECT on customer view to authenticated users.

Notes:
- Backfill `customers.user_id` by matching auth user email to customer email if possible.
- Do not expose other customers through the customer view.
- Keep service-role server action compatibility.

Verification:
```bash
cd /Users/al-amin/projects/nepal_tourist/frontend
npm run lint
npm test
npm run build
```

Manual Supabase verification:
- Run migration in Supabase SQL editor/staging project.
- Sign up a test user.
- Confirm `profiles.role = customer` for new user.
- Existing admin user must still have `role = admin`.

Stop condition:
- Show migration summary and stop for approval before touching frontend auth UI.

---

## Phase 2 — Customer login/signup pages

Scope: Add customer authentication UI separate from admin login.

Files:
- Create: `frontend/app/login/page.tsx`
- Create: `frontend/app/login/CustomerLoginForm.tsx`
- Create: `frontend/app/signup/page.tsx`
- Create: `frontend/app/signup/CustomerSignupForm.tsx`
- Create or modify: `frontend/lib/customer/auth.ts`
- Modify: `frontend/components/layout/Navbar.tsx`

Required behavior:
1. `/login` lets customer login with email/password.
2. `/signup` lets customer create account with full name, email, phone, password.
3. If logged in, visiting `/login` or `/signup` redirects to `next` or `/account/bookings`.
4. Sanitize `next` redirect path so it only allows internal paths.
5. Navbar shows:
   - logged out: `Login`, `Sign up`
   - logged in: `My bookings`, `Logout`
6. Do not mix customer login page with `/admin/login`.

Tests:
- Add tests for redirect sanitizer in `frontend/lib/customer/auth.test.ts`.

Verification:
```bash
cd /Users/al-amin/projects/nepal_tourist/frontend
npm test
npm run lint
npm run build
npm run dev
```

Manual localhost verification:
- Visit `http://localhost:3000/login`
- Visit `http://localhost:3000/signup`
- Create a test account
- Confirm redirect works after signup/login

Stop condition:
- Show localhost login/signup pages and stop for approval.

---

## Phase 3 — Protect booking route

Scope: Require customer login before using booking page.

Files:
- Modify: `frontend/app/booking/layout.tsx`
- Possibly modify: `frontend/app/booking/page.tsx`
- Possibly create: `frontend/app/booking/BookingPageClient.tsx` only if server/client split becomes necessary

Required behavior:
1. If no customer is logged in, `/booking` redirects to `/login?next=/booking`.
2. If user is logged in, `/booking` works normally.
3. Preserve existing query params like `/booking?cat=hotels`:
   - unauthenticated redirect should become `/login?next=/booking%3Fcat%3Dhotels`
   - after login, customer returns to the same booking category.
4. Do not require admin role for customer booking.

Implementation preference:
- Use `frontend/app/booking/layout.tsx` as a server component auth gate if possible.
- If search params preservation is difficult in layout, use middleware or a small server wrapper.

Verification:
```bash
cd /Users/al-amin/projects/nepal_tourist/frontend
npm run lint
npm run build
```

Manual localhost verification:
- Logged out: `http://localhost:3000/booking` redirects to login.
- Logged out: `http://localhost:3000/booking?cat=hotels` redirects to login and preserves next path.
- Logged in: booking wizard opens normally.

Stop condition:
- Show redirect behavior and stop for approval.

---

## Phase 4 — Attach bookings to logged-in customer

Scope: Update booking submission so the logged-in customer owns the booking.

Files:
- Modify: `frontend/app/actions/submitBooking.ts`
- Modify: `frontend/lib/booking/schema.ts` if contact requirements change
- Add/modify tests around booking/auth helper logic where possible

Required behavior:
1. `submitBooking` must check the current Supabase auth user before inserting.
2. If no logged-in user, return a clear auth error or redirect requirement.
3. Use logged-in user's ID to find/create/update `customers` row.
4. Store `customers.user_id = auth.users.id`.
5. Contact email should match logged-in auth email, or be read-only in UI.
6. Customer can still provide/update name and phone.
7. Booking insert must use the authenticated customer row.
8. Existing idempotency behavior must remain.
9. Admin dashboard must keep working.

Recommended approach:
- In server action, use Supabase SSR client to get `auth.getUser()`.
- Use service-role DB client only after auth is verified, for controlled server-side insert.
- Never trust a client-submitted `user_id`.

Verification:
```bash
cd /Users/al-amin/projects/nepal_tourist/frontend
npm test
npm run lint
npm run build
```

Manual localhost verification:
- Logged out cannot submit booking.
- Logged in can submit booking.
- Supabase `customers.user_id` is filled.
- Supabase `bookings.customer_id` points to that customer.
- Admin `/admin` still sees the booking.

Stop condition:
- Show one test booking connected to customer account and stop for approval.

---

## Phase 5 — Customer “My bookings” page

Scope: Let customers see their own booking history.

Files:
- Create: `frontend/app/account/layout.tsx`
- Create: `frontend/app/account/bookings/page.tsx`
- Create: `frontend/app/account/AccountSignOutButton.tsx` if needed
- Possibly create: `frontend/lib/customer/bookings.ts`

Required behavior:
1. `/account/bookings` requires login.
2. Customer sees only their own bookings.
3. Show booking reference, category, status, total, currency, created date.
4. Show admin notes only if appropriate; for MVP, hide internal admin notes from customer.
5. Empty state: “No bookings yet” with link to `/booking`.
6. Navbar `My bookings` link points here.

Verification:
```bash
cd /Users/al-amin/projects/nepal_tourist/frontend
npm run lint
npm run build
```

Manual localhost verification:
- Customer A sees only Customer A bookings.
- Customer B sees only Customer B bookings.
- Admin dashboard still sees all bookings.

Stop condition:
- Show `/account/bookings` and stop for approval.

---

## Phase 6 — Final docs, tests, and PR cleanup

Scope: Make it ready for review/merge.

Files:
- Modify: `README.md`
- Modify: `frontend/README.md`
- Modify: `backend/docs/SUPABASE_SETUP.md`
- Modify: `frontend/.env.local.example` only if new env vars are needed

Required docs updates:
1. Customer auth flow.
2. Admin auth flow remains separate.
3. How to create first admin.
4. How to test customer signup/login/booking.
5. Required Supabase settings:
   - Site URL
   - Redirect URLs
   - Email confirmation setting decision

Final verification:
```bash
cd /Users/al-amin/projects/nepal_tourist/frontend
npm test
npm run lint
npm run build
```

Git verification:
```bash
cd /Users/al-amin/projects/nepal_tourist
git status --short --branch
git diff --stat origin/backend...HEAD
```

Final stop condition:
- Do not merge automatically.
- Show final summary, commands passed, changed files, and PR-ready note.

---

## Recommended phase order

1. Phase 1 database identity model
2. Phase 2 customer login/signup UI
3. Phase 3 protect booking route
4. Phase 4 attach booking to logged-in customer
5. Phase 5 customer booking dashboard
6. Phase 6 docs and PR cleanup

## MVP decisions

Use email/password login first. Do not add Google login, OTP, payments, cancellation requests, or passport/document uploads in this phase.

Reason: customer account + booking ownership is the core problem. Keep the MVP simple and safe.

## Completion gate

Do not call this feature complete unless all are true:
- Logged-out users cannot access `/booking`.
- Customers can sign up and log in.
- Every new booking has a linked `customers.user_id`.
- Customer can see only their own bookings.
- Admin can still see and manage all bookings.
- `npm test`, `npm run lint`, and `npm run build` all pass.
