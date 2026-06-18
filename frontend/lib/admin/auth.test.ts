import { describe, expect, it } from "vitest";

import { ADMIN_HOME_PATH, sanitizeAdminRedirectPath } from "./auth";

describe("admin auth helpers", () => {
  it("keeps safe internal admin redirect paths", () => {
    expect(sanitizeAdminRedirectPath("/admin/bookings")).toBe("/admin/bookings");
    expect(sanitizeAdminRedirectPath("/admin?tab=overview")).toBe("/admin?tab=overview");
  });

  it("falls back to admin home for unsafe or irrelevant paths", () => {
    expect(sanitizeAdminRedirectPath(null)).toBe(ADMIN_HOME_PATH);
    expect(sanitizeAdminRedirectPath("https://evil.example/admin")).toBe(ADMIN_HOME_PATH);
    expect(sanitizeAdminRedirectPath("//evil.example/admin")).toBe(ADMIN_HOME_PATH);
    expect(sanitizeAdminRedirectPath("/booking")).toBe(ADMIN_HOME_PATH);
  });
});
