import { redirect } from "next/navigation";

import { ADMIN_LOGIN_PATH } from "@/lib/admin/auth";
import { createSupabaseServerClient, isServerSupabaseAuthConfigured } from "@/lib/supabase/server";
import AdminSignOutButton from "./AdminSignOutButton";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!isServerSupabaseAuthConfigured()) {
    redirect(ADMIN_LOGIN_PATH);
  }

  const supabase = await createSupabaseServerClient();
  const { data: userResult } = await supabase.auth.getUser();

  if (!userResult.user) {
    redirect(`${ADMIN_LOGIN_PATH}?next=/admin`);
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("email, full_name, role")
    .eq("id", userResult.user.id)
    .maybeSingle();

  if (profileError || profile?.role !== "admin") {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-red-300/20 bg-red-500/10 p-8 text-white shadow-2xl shadow-black/30 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-200">Access denied</p>
          <h1 className="mt-3 text-3xl font-bold">This account is not an admin</h1>
          <p className="mt-4 text-white/70">
            Ask the project owner to promote your Supabase profile role to admin, then sign in again.
          </p>
          <div className="mt-6">
            <AdminSignOutButton />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-[#0b1020]/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4a843]">Nepal Admin</p>
            <h1 className="mt-2 text-2xl font-bold text-white">Backend dashboard</h1>
            <p className="mt-1 text-sm text-white/60">
              Signed in as {profile.email ?? userResult.user.email ?? "admin"}
            </p>
          </div>
          <AdminSignOutButton />
        </header>

        {children}
      </div>
    </main>
  );
}
