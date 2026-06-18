export const BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
  "rejected",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export type AdminRole = "admin" | "staff";
export type AdminBookingStatusFilter = BookingStatus | "all";

export interface AdminProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: AdminRole;
  created_at: string;
  updated_at: string;
}

export interface AdminBookingSummary {
  id: string;
  reference: string;
  category_id: string;
  customer_id: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  computed_total: number | null;
  currency: string;
  status: BookingStatus;
  confirmation_sent: boolean;
  admin_notes: string | null;
  handled_by: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_SET = new Set<string>(BOOKING_STATUSES);

const ALLOWED_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  pending: ["confirmed", "rejected", "cancelled"],
  confirmed: ["completed", "cancelled"],
  cancelled: ["pending"],
  completed: [],
  rejected: ["pending"],
};

export function normalizeBookingStatus(value: unknown): BookingStatus {
  return typeof value === "string" && STATUS_SET.has(value)
    ? (value as BookingStatus)
    : "pending";
}

export function getAllowedBookingStatusTransitions(status: BookingStatus): BookingStatus[] {
  return [...ALLOWED_TRANSITIONS[status]];
}

export function canTransitionBookingStatus(from: BookingStatus, to: BookingStatus): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}

export function parseAdminBookingStatusFilter(value: unknown): AdminBookingStatusFilter {
  if (value === "all" || value === undefined || value === null || value === "") {
    return "all";
  }

  return typeof value === "string" && STATUS_SET.has(value) ? (value as BookingStatus) : "all";
}

export function normalizeAdminBookingNotes(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export interface AdminBookingStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  rejected: number;
  activeRevenue: number;
}

export function getAdminBookingStats(bookings: AdminBookingSummary[]): AdminBookingStats {
  return bookings.reduce<AdminBookingStats>(
    (stats, booking) => {
      stats.total += 1;
      stats[booking.status] += 1;

      if ((booking.status === "confirmed" || booking.status === "completed") && booking.computed_total) {
        stats.activeRevenue += booking.computed_total;
      }

      return stats;
    },
    {
      total: 0,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      rejected: 0,
      activeRevenue: 0,
    },
  );
}
