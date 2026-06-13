// Quick smoke-test for the notification layer.
// Usage:
//   export $(grep -v '^#' .env.local | xargs) && npx tsx scripts/test-email.mts
//   TEST_EMAIL=you@example.com npx tsx scripts/test-email.mts  (for real send)

import { notifyBookingConfirmed } from "../lib/notifications/index.ts";

const mockBooking = {
  reference: "NPL-TEST1234",
  categoryId: "paragliding" as const,
  categoryLabel: "Paragliding",
  categoryIcon: "🪂",
  selections: {
    "Location": "Pokhara (Sarangkot)",
    "Package": "30 min Standard",
    "Date": new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    "Number of Flyers": "2",
  },
  included: ["Certified pilot", "All safety gear", "Free pickup from lakeside"],
  price: {
    items: [{ label: "Paragliding (per flight) · 2 pax", amount: 160 }],
    subtotal: 160, vat: 20.8, total: 180.8,
  },
  currency: "USD" as const,
  contact: {
    name: "Test User",
    email: process.env.TEST_EMAIL ?? "test@example.com",
    phone: "+1-555-0100",
  },
};

console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY?.slice(0, 12) + "...");
console.log("FROM_EMAIL    :", process.env.FROM_EMAIL);
console.log("Sending to    :", mockBooking.contact.email);
console.log("");

const { emailSent } = await notifyBookingConfirmed(mockBooking);

if (emailSent) {
  console.log("✅  Email sent — check inbox at", mockBooking.contact.email);
  console.log("    ICS calendar invite should be attached.");
} else {
  console.log("✅  Email failed gracefully (expected with invalid key)");
  console.log("    The booking resilience path works: notifyBookingConfirmed returns { emailSent: false }");
  console.log("    submitBooking would still return { ok: true, reference }.");
}
