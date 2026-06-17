export const CUSTOMER_LOGIN_PATH = "/login";
export const CUSTOMER_SIGNUP_PATH = "/signup";
export const CUSTOMER_BOOKINGS_PATH = "/account/bookings";

const BLOCKED_CUSTOMER_REDIRECT_PREFIXES = [
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_SIGNUP_PATH,
  "/admin",
] as const;

export function sanitizeCustomerRedirectPath(rawPath: string | null | undefined): string {
  if (!rawPath) return CUSTOMER_BOOKINGS_PATH;

  let decodedPath = rawPath.trim();

  try {
    decodedPath = decodeURIComponent(decodedPath);
  } catch {
    return CUSTOMER_BOOKINGS_PATH;
  }

  if (!decodedPath.startsWith("/") || decodedPath.startsWith("//")) {
    return CUSTOMER_BOOKINGS_PATH;
  }

  if (BLOCKED_CUSTOMER_REDIRECT_PREFIXES.some((prefix) => decodedPath === prefix || decodedPath.startsWith(`${prefix}/`) || decodedPath.startsWith(`${prefix}?`))) {
    return CUSTOMER_BOOKINGS_PATH;
  }

  return decodedPath;
}
