import type { ContactData } from "./schema";

export interface AuthenticatedBookingUser {
  id: string;
  email?: string | null;
}

export interface AuthenticatedCustomerUpsert {
  name: string;
  email: string;
  phone: string;
  user_id: string;
}

export function buildAuthenticatedCustomerUpsert(
  contact: ContactData,
  user: AuthenticatedBookingUser,
): AuthenticatedCustomerUpsert | null {
  const email = user.email?.trim().toLowerCase();

  if (!user.id || !email) {
    return null;
  }

  return {
    name: contact.name.trim(),
    email,
    phone: contact.phone.trim(),
    user_id: user.id,
  };
}
