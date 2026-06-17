import { describe, expect, it } from "vitest";

import {
  CUSTOMER_BOOKINGS_PATH,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_SIGNUP_PATH,
  sanitizeCustomerRedirectPath,
} from "./auth";

describe("sanitizeCustomerRedirectPath", () => {
  it("allows safe internal customer redirect paths", () => {
    expect(sanitizeCustomerRedirectPath("/booking")).toBe("/booking");
    expect(sanitizeCustomerRedirectPath("/booking?cat=hotels")).toBe("/booking?cat=hotels");
    expect(sanitizeCustomerRedirectPath("/account/bookings")).toBe("/account/bookings");
  });

  it("falls back for empty, admin, auth, and external paths", () => {
    expect(sanitizeCustomerRedirectPath(undefined)).toBe(CUSTOMER_BOOKINGS_PATH);
    expect(sanitizeCustomerRedirectPath("")).toBe(CUSTOMER_BOOKINGS_PATH);
    expect(sanitizeCustomerRedirectPath("/admin")).toBe(CUSTOMER_BOOKINGS_PATH);
    expect(sanitizeCustomerRedirectPath(CUSTOMER_LOGIN_PATH)).toBe(CUSTOMER_BOOKINGS_PATH);
    expect(sanitizeCustomerRedirectPath(CUSTOMER_SIGNUP_PATH)).toBe(CUSTOMER_BOOKINGS_PATH);
    expect(sanitizeCustomerRedirectPath("https://evil.example/booking")).toBe(CUSTOMER_BOOKINGS_PATH);
    expect(sanitizeCustomerRedirectPath("//evil.example/booking")).toBe(CUSTOMER_BOOKINGS_PATH);
  });
});
