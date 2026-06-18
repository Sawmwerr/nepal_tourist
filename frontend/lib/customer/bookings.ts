import { normalizeBookingStatus, type BookingStatus } from "../admin/bookings";

export interface CustomerBookingSummary {
  id: string;
  reference: string;
  category_id: string;
  customer_id: string;
  computed_subtotal: number | null;
  computed_vat: number | null;
  computed_total: number | null;
  currency: string;
  status: BookingStatus;
  confirmation_sent: boolean;
  created_at: string;
  updated_at: string;
}

export interface CustomerBookingStats {
  total: number;
  active: number;
  completed: number;
}

type CustomerBookingSummaryRow = Omit<
  CustomerBookingSummary,
  "computed_subtotal" | "computed_vat" | "computed_total" | "status"
> & {
  computed_subtotal: number | string | null;
  computed_vat: number | string | null;
  computed_total: number | string | null;
  status: unknown;
};

export function normalizeCustomerBookings(rows: unknown[]): CustomerBookingSummary[] {
  return rows.map((row) => {
    const booking = row as CustomerBookingSummaryRow;

    return {
      ...booking,
      computed_subtotal: normalizeNullableNumber(booking.computed_subtotal),
      computed_vat: normalizeNullableNumber(booking.computed_vat),
      computed_total: normalizeNullableNumber(booking.computed_total),
      status: normalizeBookingStatus(booking.status),
    };
  });
}

export function getCustomerBookingStats(bookings: CustomerBookingSummary[]): CustomerBookingStats {
  return bookings.reduce<CustomerBookingStats>(
    (stats, booking) => {
      stats.total += 1;

      if (booking.status === "pending" || booking.status === "confirmed") {
        stats.active += 1;
      }

      if (booking.status === "completed") {
        stats.completed += 1;
      }

      return stats;
    },
    { total: 0, active: 0, completed: 0 },
  );
}

export function formatCustomerBookingMoney(value: number | null, currency: string): string {
  if (value === null) {
    return "Custom quote";
  }

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCustomerBookingDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function normalizeNullableNumber(value: number | string | null): number | null {
  if (value === null) {
    return null;
  }

  return typeof value === "string" ? Number(value) : value;
}
