"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ADMIN_LOGIN_PATH } from "@/lib/admin/auth";
import {
  canTransitionBookingStatus,
  normalizeAdminBookingNotes,
  normalizeBookingStatus,
} from "@/lib/admin/bookings";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updateAdminBooking(formData: FormData) {
  const bookingId = formData.get("bookingId");
  const requestedStatus = normalizeBookingStatus(formData.get("status"));
  const adminNotes = normalizeAdminBookingNotes(formData.get("adminNotes"));

  if (typeof bookingId !== "string" || bookingId.length === 0) {
    throw new Error("Missing booking id.");
  }

  const supabase = await createSupabaseServerClient();
  const { data: userResult } = await supabase.auth.getUser();

  if (!userResult.user) {
    redirect(`${ADMIN_LOGIN_PATH}?next=/admin`);
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userResult.user.id)
    .maybeSingle();

  if (profileError || profile?.role !== "admin") {
    throw new Error("Only admin users can update bookings.");
  }

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select("status")
    .eq("id", bookingId)
    .maybeSingle();

  if (bookingError || !booking) {
    throw new Error("Booking not found.");
  }

  const currentStatus = normalizeBookingStatus(booking.status);

  if (requestedStatus !== currentStatus && !canTransitionBookingStatus(currentStatus, requestedStatus)) {
    throw new Error(`Cannot move booking from ${currentStatus} to ${requestedStatus}.`);
  }

  const { error: updateError } = await supabase
    .from("bookings")
    .update({
      status: requestedStatus,
      admin_notes: adminNotes,
      handled_by: userResult.user.id,
    })
    .eq("id", bookingId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  revalidatePath("/admin");
}
