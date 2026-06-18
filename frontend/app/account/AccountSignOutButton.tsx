"use client";

import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient, isBrowserSupabaseConfigured } from "@/lib/supabase/client";

export default function AccountSignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    if (!isBrowserSupabaseConfigured()) return;

    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/70 transition hover:border-white/25 hover:text-white"
      onClick={handleSignOut}
      type="button"
    >
      Logout
    </button>
  );
}
