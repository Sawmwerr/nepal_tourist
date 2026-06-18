import { describe, expect, it } from "vitest";

import {
  BOOKING_STATUSES,
  canTransitionBookingStatus,
  getAdminBookingStats,
  getAllowedBookingStatusTransitions,
  normalizeAdminBookingNotes,
  normalizeBookingStatus,
  parseAdminBookingStatusFilter,
  type AdminBookingSummary,
  type BookingStatus,
} from "./bookings";

describe("admin booking status helpers", () => {
  it("normalizes unknown status values to pending", () => {
    expect(normalizeBookingStatus("confirmed")).toBe("confirmed");
    expect(normalizeBookingStatus("unknown-status")).toBe("pending");
    expect(normalizeBookingStatus(null)).toBe("pending");
  });

  it("exposes the complete backend booking status list", () => {
    expect(BOOKING_STATUSES).toEqual([
      "pending",
      "confirmed",
      "cancelled",
      "completed",
      "rejected",
    ] satisfies BookingStatus[]);
  });

  it("allows only safe admin status transitions", () => {
    expect(canTransitionBookingStatus("pending", "confirmed")).toBe(true);
    expect(canTransitionBookingStatus("pending", "rejected")).toBe(true);
    expect(canTransitionBookingStatus("confirmed", "completed")).toBe(true);
    expect(canTransitionBookingStatus("confirmed", "cancelled")).toBe(true);
    expect(canTransitionBookingStatus("completed", "pending")).toBe(false);
  });

  it("returns allowed next statuses for admin controls", () => {
    expect(getAllowedBookingStatusTransitions("pending")).toEqual(["confirmed", "rejected", "cancelled"]);
    expect(getAllowedBookingStatusTransitions("confirmed")).toEqual(["completed", "cancelled"]);
    expect(getAllowedBookingStatusTransitions("cancelled")).toEqual(["pending"]);
  });

  it("parses booking status filters safely", () => {
    expect(parseAdminBookingStatusFilter("confirmed")).toBe("confirmed");
    expect(parseAdminBookingStatusFilter("all")).toBe("all");
    expect(parseAdminBookingStatusFilter("bad-status")).toBe("all");
    expect(parseAdminBookingStatusFilter(undefined)).toBe("all");
  });

  it("normalizes admin notes before saving", () => {
    expect(normalizeAdminBookingNotes("  Call customer before confirming.  ")).toBe("Call customer before confirming.");
    expect(normalizeAdminBookingNotes("   ")).toBeNull();
    expect(normalizeAdminBookingNotes(null)).toBeNull();
  });

  it("summarizes booking totals for dashboard cards", () => {
    const bookings = [
      makeBooking({ id: "1", status: "pending", computed_total: 100 }),
      makeBooking({ id: "2", status: "confirmed", computed_total: 200 }),
      makeBooking({ id: "3", status: "completed", computed_total: 300 }),
      makeBooking({ id: "4", status: "rejected", computed_total: 400 }),
    ];

    expect(getAdminBookingStats(bookings)).toEqual({
      total: 4,
      pending: 1,
      confirmed: 1,
      completed: 1,
      cancelled: 0,
      rejected: 1,
      activeRevenue: 500,
    });
  });
});

function makeBooking(overrides: Partial<AdminBookingSummary>): AdminBookingSummary {
  return {
    id: "booking-id",
    reference: "NPL-000001",
    category_id: "trekking",
    customer_id: "customer-id",
    customer_name: "Test Customer",
    customer_email: "test@example.com",
    customer_phone: "+37060000000",
    computed_total: null,
    currency: "USD",
    status: "pending",
    confirmation_sent: false,
    admin_notes: null,
    handled_by: null,
    created_at: "2026-06-17T00:00:00.000Z",
    updated_at: "2026-06-17T00:00:00.000Z",
    ...overrides,
  };
}
