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

## Folder Structure

```text
frontend/
  app/                         # Next.js App Router routes only
    page.tsx                   # Home route composition
    booking/                   # Booking route
    community/                 # Community list/detail routes
    destinations/              # Destination list/detail routes
    mountains/                 # Mountains route
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
    booking/                   # Booking catalog, schema, pricing, Supabase client
    notifications/             # Email/ICS notification helpers

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
