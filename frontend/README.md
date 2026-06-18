# Nepal Tourist Frontend

Next.js tourism website, customer booking flow, admin dashboard, and Supabase-backed server actions.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

```bash
npm test
npm run lint
npm run build
npm run dev
npm run start
```

## Main routes

Customer routes:

```text
/login             Customer login
/signup            Customer signup
/booking           Protected booking wizard
/account/bookings  Protected customer booking history
```

Admin routes:

```text
/admin/login       Admin login
/admin             Protected admin bookings dashboard
```

Admin and customer login pages are separate. Admin access requires a Supabase profile row with `role = 'admin'`.

## Folder Structure

```text
frontend/
  app/                         # Next.js App Router routes only
    account/bookings/          # Customer booking history
    admin/                     # Admin login and protected dashboard
    booking/                   # Protected booking route
    login/                     # Customer login
    signup/                    # Customer signup
    actions/                   # Next.js server actions

  components/                  # Shared reusable components
    layout/                    # Navbar, Footer, site shell pieces
    providers/                 # Client providers and app-level effects
    ui/                        # Generic reusable UI/motion primitives

  features/                    # Page/domain-specific frontend modules
    home/components/           # Home-page sections
    community/components/      # Community cards/grids
    destinations/components/   # Destination-specific interactive widgets

  lib/                         # Shared business logic and server-side helpers
    admin/                     # Admin auth and booking helper logic
    booking/                   # Booking catalog, schema, pricing, DB helpers
    customer/                  # Customer auth/account booking helper logic
    notifications/             # Email/ICS notification helpers
    supabase/                  # Browser/server Supabase SSR clients

  public/                      # Static images, videos, icons
  scripts/                     # Frontend utility scripts
```

## Structure Rules

- Keep `app/` focused on routing, metadata, loading/error files, and page composition.
- Put reusable site-wide components in `components/`.
- Put page/domain-specific components in `features/<domain>/components/`.
- Put business logic, schemas, pricing, API/server helpers in `lib/`.
- Do not place large reusable components directly in `app/`.
- Do not create one giant shared components folder again; choose `layout`, `providers`, `ui`, or a feature folder.

## Environment

Copy the example file:

```bash
cp .env.local.example .env.local
```

Then fill in Supabase and Resend values.

Required Supabase variables:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Optional email variables:

```env
RESEND_API_KEY=
FROM_EMAIL=
```

Important: never commit `.env.local`.

## Supabase Auth settings

For local development, configure Supabase Authentication URL settings:

```text
Site URL: http://localhost:3000
Redirect URLs:
  http://localhost:3000/**
```

For production/preview, add the deployed domains as Site URL/Redirect URLs.

Email confirmation decision:

- Local testing: disable email confirmation or manually confirm users in Supabase Auth.
- Production: enable confirmation if the project wants verified customer emails before booking.

## Backend connection

The booking form submits through a Next.js server action:

```text
app/actions/submitBooking.ts
```

Database schema lives in:

```text
../backend/supabase/migrations/
```

Run all migrations in order before testing auth/account features.

## Manual verification checklist

1. Visit `/signup` and create a test customer.
2. Confirm the profile row has `role = 'customer'`.
3. Visit `/booking`; logged-out users should redirect to `/login?next=/booking`.
4. Submit a booking as the logged-in customer.
5. Verify `customers.user_id` is filled in Supabase.
6. Verify `bookings.customer_id` points to that customer row.
7. Visit `/account/bookings`; customer sees their own booking only.
8. Promote a trusted user to `role = 'admin'`.
9. Visit `/admin`; admin can see and update all bookings.

## PR quality gates

```bash
npm test
npm run lint
npm run build
```
