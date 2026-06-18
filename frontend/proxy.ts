import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { buildCustomerLoginRedirectPath } from "@/lib/customer/auth";

export async function proxy(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const redirectToLogin = () => {
    const loginUrl = new URL(
      buildCustomerLoginRedirectPath(request.nextUrl.pathname, request.nextUrl.search),
      request.url,
    );
    return NextResponse.redirect(loginUrl);
  };

  if (!supabaseUrl || !supabaseAnonKey) {
    return redirectToLogin();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return redirectToLogin();
  }

  return response;
}

export const config = {
  matcher: ["/booking/:path*", "/account/:path*"],
};
