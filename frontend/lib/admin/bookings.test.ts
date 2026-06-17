import { describe, expect, it } from "vitest";

import {
  BOOKING_STATUSES,
  canTransitionBookingStatus,
  getAllowedBookingStatusTransitions,
  normalizeBookingStatus,
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
});
