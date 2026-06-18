import Link from "next/link";

import { CATEGORIES } from "@/lib/booking/catalog";
import {
  formatCustomerBookingDate,
  formatCustomerBookingMoney,
  getCustomerBookingStats,
  normalizeCustomerBookings,
  type CustomerBookingSummary,
} from "@/lib/customer/bookings";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "My bookings · Nepal",
};

const statusLabels: Record<CustomerBookingSummary["status"], string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  completed: "Completed",
  rejected: "Rejected",
};

const statusStyles: Record<CustomerBookingSummary["status"], string> = {
  pending: "border-amber-300/30 bg-amber-400/10 text-amber-100",
  confirmed: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
  cancelled: "border-zinc-300/30 bg-zinc-400/10 text-zinc-100",
  completed: "border-sky-300/30 bg-sky-400/10 text-sky-100",
  rejected: "border-red-300/30 bg-red-400/10 text-red-100",
};

export default async function CustomerBookingsPage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("customer_booking_summaries")
    .select("*")
    .order("created_at", { ascending: false });

  const bookings = normalizeCustomerBookings(data ?? []);
  const stats = getCustomerBookingStats(bookings);

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4a843]">Phase 5</p>
            <h2 className="mt-3 text-2xl font-bold text-white">My bookings</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
              Track your Nepal trip requests, booking status, totals, and confirmation state from one account page.
            </p>
          </div>
          <Link
            className="inline-flex rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/75 transition hover:border-[#d4a843]/50 hover:text-[#d4a843]"
            href="/booking"
          >
            Book another trip
          </Link>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Total bookings" value={stats.total.toString()} />
        <StatCard label="Active" value={stats.active.toString()} />
        <StatCard label="Completed" value={stats.completed.toString()} />
      </div>

      {error ? (
        <div className="rounded-[2rem] border border-red-300/20 bg-red-500/10 p-6 text-red-100">
          <p className="font-semibold">Could not load your bookings.</p>
          <p className="mt-2 text-sm text-red-100/75">{error.message}</p>
        </div>
      ) : null}

      {!error && bookings.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center text-white/70">
          <h3 className="text-xl font-bold text-white">No bookings yet</h3>
          <p className="mt-3 text-sm text-white/60">Start your first Nepal trip request and it will appear here after submission.</p>
          <Link
            className="mt-6 inline-flex rounded-full bg-[#d4a843] px-6 py-3 text-sm font-bold text-[#111827] transition hover:bg-[#f0c75c]"
            href="/booking"
          >
            Create booking
          </Link>
        </div>
      ) : null}

      <div className="space-y-4">
        {bookings.map((booking) => (
          <BookingCard booking={booking} key={booking.id} />
        ))}
      </div>
    </section>
  );
}

function BookingCard({ booking }: { booking: CustomerBookingSummary }) {
  const category = CATEGORIES.find((item) => item.id === booking.category_id);

  return (
    <article className="rounded-[2rem] border border-white/10 bg-[#0b1020]/80 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-bold text-white">{booking.reference}</h3>
            <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[booking.status]}`}>
              {statusLabels[booking.status]}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55">
              {category ? `${category.icon} ${category.label}` : booking.category_id}
            </span>
          </div>

          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <Detail label="Total" value={formatCustomerBookingMoney(booking.computed_total, booking.currency)} />
            <Detail label="Created" value={formatCustomerBookingDate(booking.created_at)} />
            <Detail label="Updated" value={formatCustomerBookingDate(booking.updated_at)} />
            <Detail label="Confirmation email" value={booking.confirmation_sent ? "Sent" : "Pending"} />
            <Detail label="Currency" value={booking.currency} />
            <Detail label="Category" value={category?.label ?? booking.category_id} />
          </dl>
        </div>
      </div>
    </article>
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-white/35">{label}</dt>
      <dd className="mt-1 break-words text-white/75">{value}</dd>
    </div>
  );
}
