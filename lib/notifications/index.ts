// Notification dispatcher — add new channels here without touching submitBooking.ts.

import { sendBookingConfirmation, type BookingNotification } from "./booking-confirmation";

export type { BookingNotification };

export async function notifyBookingConfirmed(b: BookingNotification): Promise<{ emailSent: boolean }> {
  let emailSent = false;
  try {
    await sendBookingConfirmation(b);
    emailSent = true;
  } catch (err) {
    console.error("[notify] Email send failed:", err);
  }
  // Future: await sendWhatsApp(b).catch(err => console.error("[notify] WhatsApp failed:", err));
  return { emailSent };
}
