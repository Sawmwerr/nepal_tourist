import Link from "next/link";

import { updateAdminBooking } from "./actions";
import {
  BOOKING_STATUSES,
  getAdminBookingStats,
  getAllowedBookingStatusTransitions,
  parseAdminBookingStatusFilter,
  type AdminBookingSummary,
  type BookingStatus,
} from "@/lib/admin/bookings";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin Bookings · Nepal",
};

type AdminDashboardPageProps = {
  searchParams?: Promise<{
    status?: string;
  }>;
};

const statusLabels: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  completed: "Completed",
  rejected: "Rejected",
};

const statusStyles: Record<BookingStatus, string> = {
  pending: "border-amber-300/30 bg-amber-400/10 text-amber-100",
  confirmed: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
  cancelled: "border-zinc-300/30 bg-zinc-400/10 text-zinc-100",
  completed: "border-sky-300/30 bg-sky-400/10 text-sky-100",
  rejected: "border-red-300/30 bg-red-400/10 text-red-100",
};

export default async function AdminDashboardPage({ searchParams }: AdminDashboardPageProps) {
  const params = await searchParams;
  const statusFilter = parseAdminBookingStatusFilter(params?.status);
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("admin_booking_summaries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const bookings = normalizeAdminBookings(data ?? []);
  const visibleBookings = statusFilter === "all" ? bookings : bookings.filter((booking) => booking.status === statusFilter);
  const stats = getAdminBookingStats(bookings);

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4a843]">Phase 4</p>
            <h2 className="mt-3 text-2xl font-bold text-white">Booking requests</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
              Review customer details, update booking status, and save internal admin notes. Showing the latest 100 bookings.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <StatusFilterLink active={statusFilter === "all"} href="/admin" label="All" />
            {BOOKING_STATUSES.map((status) => (
              <StatusFilterLink
                active={statusFilter === status}
                href={`/admin?status=${status}`}
                key={status}
                label={statusLabels[status]}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total bookings" value={stats.total.toString()} />
        <StatCard label="Pending" value={stats.pending.toString()} />
        <StatCard label="Confirmed" value={stats.confirmed.toString()} />
        <StatCard label="Active revenue" value={formatMoney(stats.activeRevenue, "USD")} />
      </div>

      {error ? (
        <div className="rounded-[2rem] border border-red-300/20 bg-red-500/10 p-6 text-red-100">
          <p className="font-semibold">Could not load bookings.</p>
          <p className="mt-2 text-sm text-red-100/75">{error.message}</p>
        </div>
      ) : null}

      {!error && visibleBookings.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center text-white/70">
          No bookings found for this filter.
        </div>
      ) : null}

      <div className="space-y-4">
        {visibleBookings.map((booking) => (
          <BookingCard booking={booking} key={booking.id} />
        ))}
      </div>
    </section>
  );
}

function StatusFilterLink({ active, href, label }: { active: boolean; href: string; label: string }) {
  return (
    <Link
      className={`rounded-full border px-4 py-2 transition ${
        active
          ? "border-[#d4a843] bg-[#d4a843] text-[#111827]"
          : "border-white/10 bg-white/[0.04] text-white/65 hover:border-white/25 hover:text-white"
      }`}
      href={href}
    >
      {label}
    </Link>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[#0b1020]/70 p-5 shadow-xl shadow-black/10">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">{label}</p>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function BookingCard({ booking }: { booking: AdminBookingSummary }) {
  const nextStatuses = getAllowedBookingStatusTransitions(booking.status);
  const statusOptions = [booking.status, ...nextStatuses];

  return (
    <article className="rounded-[2rem] border border-white/10 bg-[#0b1020]/80 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-bold text-white">{booking.reference}</h3>
            <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[booking.status]}`}>
              {statusLabels[booking.status]}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55">
              {booking.category_id}
            </span>
          </div>

          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <Detail label="Customer" value={booking.customer_name ?? "Unknown"} />
            <Detail label="Email" value={booking.customer_email ?? "Missing"} />
            <Detail label="Phone" value={booking.customer_phone ?? "Missing"} />
            <Detail label="Total" value={formatMoney(booking.computed_total, booking.currency)} />
            <Detail label="Created" value={formatDate(booking.created_at)} />
            <Detail label="Updated" value={formatDate(booking.updated_at)} />
          </dl>
        </div>

        <form action={updateAdminBooking} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
          <input name="bookingId" type="hidden" value={booking.id} />

          <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-white/45" htmlFor={`status-${booking.id}`}>
            Status
          </label>
          <select
            className="mt-2 w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none focus:border-[#d4a843]"
            defaultValue={booking.status}
            id={`status-${booking.id}`}
            name="status"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>

          <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.25em] text-white/45" htmlFor={`notes-${booking.id}`}>
            Admin notes
          </label>
          <textarea
            className="mt-2 min-h-28 w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none focus:border-[#d4a843]"
            defaultValue={booking.admin_notes ?? ""}
            id={`notes-${booking.id}`}
            name="adminNotes"
            placeholder="Internal note for the team..."
          />

          <button className="mt-4 w-full rounded-full bg-[#d4a843] px-5 py-3 text-sm font-bold text-[#111827] transition hover:bg-[#f0c75c]" type="submit">
            Save booking
          </button>
        </form>
      </div>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-white/35">{label}</dt>
      <dd className="mt-1 break-words text-white/75">{value}</dd>
    </div>
  );
}

function normalizeAdminBookings(rows: unknown[]): AdminBookingSummary[] {
  return rows.map((row) => {
    const booking = row as AdminBookingSummary & { computed_total: number | string | null };

    return {
      ...booking,
      computed_total: typeof booking.computed_total === "string" ? Number(booking.computed_total) : booking.computed_total,
    };
  });
}

function formatMoney(value: number | null, currency: string): string {
  if (value === null) {
    return "Custom quote";
  }

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
