import { redirect } from "next/navigation";

import { ADMIN_HOME_PATH, sanitizeAdminRedirectPath } from "@/lib/admin/auth";
import { createSupabaseServerClient, isServerSupabaseAuthConfigured } from "@/lib/supabase/server";
import AdminLoginForm from "./AdminLoginForm";

export const metadata = {
  title: "Admin Login · Nepal",
};

export const dynamic = "force-dynamic";

interface AdminLoginPageProps {
  searchParams?: Promise<{ next?: string | string[] }>;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;
  const rawNext = Array.isArray(params?.next) ? params.next[0] : params?.next;
  const nextPath = sanitizeAdminRedirectPath(rawNext);
  const isConfigured = isServerSupabaseAuthConfigured();

  if (isConfigured) {
    const supabase = await createSupabaseServerClient();
    const { data: userResult } = await supabase.auth.getUser();

    if (userResult.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userResult.user.id)
        .maybeSingle();

      if (profile?.role === "admin") {
        redirect(ADMIN_HOME_PATH);
      }
    }
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 rounded-[2rem] border border-white/10 bg-[#0b1020]/85 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4a843]">
            Nepal Admin
          </p>
          <h1 className="text-3xl font-bold text-white">Sign in</h1>
          <p className="text-sm leading-6 text-white/65">
            Admin access is restricted to trusted staff accounts promoted in Supabase profiles.
          </p>
        </div>

        <AdminLoginForm isConfigured={isConfigured} nextPath={nextPath} />
      </div>
    </main>
  );
}
