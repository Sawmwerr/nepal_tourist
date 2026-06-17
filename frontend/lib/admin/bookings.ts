export const BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
  "rejected",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export type AdminRole = "admin" | "staff";

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
