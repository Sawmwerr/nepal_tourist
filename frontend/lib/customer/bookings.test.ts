import { describe, expect, it } from "vitest";

import { formatCustomerBookingMoney, getCustomerBookingStats, normalizeCustomerBookings } from "./bookings";

describe("normalizeCustomerBookings", () => {
  it("normalizes database rows from the customer booking summary view", () => {
    expect(
      normalizeCustomerBookings([
        {
          id: "booking-id",
          reference: "NPL-12345678",
          category_id: "hotels",
          customer_id: "customer-id",
          computed_subtotal: "100.50",
          computed_vat: "21.10",
          computed_total: "121.60",
          currency: "USD",
          status: "confirmed",
          confirmation_sent: true,
          created_at: "2026-06-18T10:00:00.000Z",
          updated_at: "2026-06-18T11:00:00.000Z",
        },
      ]),
    ).toEqual([
      {
        id: "booking-id",
        reference: "NPL-12345678",
        category_id: "hotels",
        customer_id: "customer-id",
        computed_subtotal: 100.5,
        computed_vat: 21.1,
        computed_total: 121.6,
        currency: "USD",
        status: "confirmed",
        confirmation_sent: true,
        created_at: "2026-06-18T10:00:00.000Z",
        updated_at: "2026-06-18T11:00:00.000Z",
      },
    ]);
  });

  it("falls back to pending for unknown statuses", () => {
    const [booking] = normalizeCustomerBookings([
      {
        id: "booking-id",
        reference: "NPL-12345678",
        category_id: "hotels",
        customer_id: "customer-id",
        computed_subtotal: null,
        computed_vat: null,
        computed_total: null,
        currency: "USD",
        status: "not-real",
        confirmation_sent: false,
        created_at: "2026-06-18T10:00:00.000Z",
        updated_at: "2026-06-18T11:00:00.000Z",
      },
    ]);

    expect(booking.status).toBe("pending");
  });
});

describe("getCustomerBookingStats", () => {
  it("counts active and completed bookings", () => {
    expect(
      getCustomerBookingStats([
        booking("pending"),
        booking("confirmed"),
        booking("completed"),
        booking("cancelled"),
      ]),
    ).toEqual({ total: 4, active: 2, completed: 1 });
  });
});

describe("formatCustomerBookingMoney", () => {
  it("formats money and custom quote values", () => {
    expect(formatCustomerBookingMoney(1250, "USD")).toBe("$1,250");
    expect(formatCustomerBookingMoney(null, "USD")).toBe("Custom quote");
  });
});

function booking(status: "pending" | "confirmed" | "cancelled" | "completed" | "rejected") {
  return {
    id: status,
    reference: `NPL-${status}`,
    category_id: "hotels",
    customer_id: "customer-id",
    computed_subtotal: null,
    computed_vat: null,
    computed_total: null,
    currency: "USD",
    status,
    confirmation_sent: false,
    created_at: "2026-06-18T10:00:00.000Z",
    updated_at: "2026-06-18T11:00:00.000Z",
  };
}
