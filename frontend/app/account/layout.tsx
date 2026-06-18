import Link from "next/link";
import { redirect } from "next/navigation";

import { buildCustomerLoginRedirectPath } from "@/lib/customer/auth";
import { createSupabaseServerClient, isServerSupabaseAuthConfigured } from "@/lib/supabase/server";
import AccountSignOutButton from "./AccountSignOutButton";

export const dynamic = "force-dynamic";

export default async function AccountLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!isServerSupabaseAuthConfigured()) {
    redirect(buildCustomerLoginRedirectPath("/account/bookings"));
  }

  const supabase = await createSupabaseServerClient();
  const { data: userResult } = await supabase.auth.getUser();

  if (!userResult.user) {
    redirect(buildCustomerLoginRedirectPath("/account/bookings"));
  }

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-[#0b1020]/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4a843]">Nepal Traveller</p>
            <h1 className="mt-2 text-2xl font-bold text-white">My account</h1>
            <p className="mt-1 text-sm text-white/60">
              Signed in as {userResult.user.email ?? "customer"}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="rounded-full bg-[#d4a843] px-5 py-3 text-sm font-bold text-[#111827] transition hover:bg-[#f0c75c]"
              href="/booking"
            >
              New booking
            </Link>
            <AccountSignOutButton />
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}
