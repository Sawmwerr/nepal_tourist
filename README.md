# Nepal Tourist

Monorepo-style project split into frontend and backend ownership.

## Structure

```text
nepal_tourist/
  frontend/   # Next.js tourism website and booking UI
  backend/    # Database schema, backend notes, and future API/admin work
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
- Booking server action still lives in `frontend/app/actions/submitBooking.ts` because this is currently a Next.js app.
- Shared booking validation/pricing lives in `frontend/lib/booking/`.

## Team workflow

- `main` = stable integration branch
- `al-amin` = backend / structure branch
- Friend can keep frontend work on a separate frontend branch

Do not commit real `.env.local` files. Use `frontend/.env.local.example` as the template.
