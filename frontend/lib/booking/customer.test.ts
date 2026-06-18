import { describe, expect, it } from "vitest";

import { buildAuthenticatedCustomerUpsert } from "./customer";

describe("buildAuthenticatedCustomerUpsert", () => {
  it("links the customer row to the authenticated Supabase user", () => {
    expect(
      buildAuthenticatedCustomerUpsert(
        {
          name: "  Al Amin  ",
          email: "contact@example.com",
          phone: "  +37060000000  ",
        },
        {
          id: "auth-user-id",
          email: "  AL.AMIN@example.com  ",
        },
      ),
    ).toEqual({
      name: "Al Amin",
      email: "al.amin@example.com",
      phone: "+37060000000",
      user_id: "auth-user-id",
    });
  });

  it("rejects authenticated users without an email because customers.email is required", () => {
    expect(
      buildAuthenticatedCustomerUpsert(
        {
          name: "Al Amin",
          email: "contact@example.com",
          phone: "+37060000000",
        },
        {
          id: "auth-user-id",
          email: null,
        },
      ),
    ).toBeNull();
  });
});
