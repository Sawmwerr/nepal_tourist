export const ADMIN_HOME_PATH = "/admin";
export const ADMIN_LOGIN_PATH = "/admin/login";

export function sanitizeAdminRedirectPath(value: string | null | undefined): string {
  if (!value) return ADMIN_HOME_PATH;
  if (!value.startsWith("/") || value.startsWith("//")) return ADMIN_HOME_PATH;
  if (!value.startsWith("/admin")) return ADMIN_HOME_PATH;
  if (value.startsWith(ADMIN_LOGIN_PATH)) return ADMIN_HOME_PATH;
  return value;
}
