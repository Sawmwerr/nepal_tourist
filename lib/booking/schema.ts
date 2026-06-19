import { z } from "zod";
import { CATEGORY_IDS } from "./catalog";

// ── Contact ───────────────────────────────────────────────────────────────────
// No passport / biometric PII — encryption + retention policy TBD in a later step.

export const ContactSchema = z.object({
  name:  z.string().min(2,  "Full name is required").max(100, "Name must be 100 characters or fewer"),
  email: z.string().email(  "Valid email address required").max(200, "Email must be 200 characters or fewer"),
  phone: z.string().min(5,  "Phone or WhatsApp number required").max(30, "Phone must be 30 characters or fewer"),
});

// ── Booking payload ───────────────────────────────────────────────────────────
// Price is NOT accepted from the client — computed server-side from categoryId + selections.

export const BookingPayloadSchema = z.object({
  categoryId:      z.enum(CATEGORY_IDS, { message: "Unknown booking category" }),
  selections:      z.record(z.string(), z.unknown()).default({}),
  currency:        z.enum(["USD", "NPR"]),
  contact:         ContactSchema,
  idempotencyKey:  z.string().uuid("Invalid idempotency key"),
});

export type BookingPayload = z.infer<typeof BookingPayloadSchema>;
export type ContactData    = z.infer<typeof ContactSchema>;
