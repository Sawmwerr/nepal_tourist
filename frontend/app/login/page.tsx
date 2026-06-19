import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { CUSTOMER_BOOKINGS_PATH, sanitizeCustomerRedirectPath } from "@/lib/customer/auth";
import { createSupabaseServerClient, isServerSupabaseAuthConfigured } from "@/lib/supabase/server";
import CustomerLoginForm from "./CustomerLoginForm";

export const metadata = {
  title: "Sign in · Nepal",
};

export const dynamic = "force-dynamic";

interface CustomerLoginPageProps {
  searchParams?: Promise<{ next?: string | string[] }>;
}

export default async function CustomerLoginPage({ searchParams }: CustomerLoginPageProps) {
  const params = await searchParams;
  const rawNext = Array.isArray(params?.next) ? params.next[0] : params?.next;
  const nextPath = sanitizeCustomerRedirectPath(rawNext);
  const isConfigured = isServerSupabaseAuthConfigured();

  if (isConfigured) {
    const supabase = await createSupabaseServerClient();
    const { data: userResult } = await supabase.auth.getUser();
    if (userResult.user) redirect(nextPath || CUSTOMER_BOOKINGS_PATH);
  }

  return (
    <main className="min-h-screen flex bg-[#07070d]">
      {/* ── Left: Nepal scenery panel ── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col overflow-hidden rounded-r-[2rem]">
        <div className="absolute inset-0">
          <Image
            src="/Pokhara.jpg"
            alt="Phewa Lake, Pokhara — Nepal"
            fill
            className="object-cover graded"
            priority
          />
          {/* Bottom-to-top fade into page bg */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-[#07070d]/30 to-transparent" />
          {/* Right-edge feather into form panel */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#07070d]/40" />
        </div>

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between p-8">
          <Link href="/" className="font-display text-xl font-bold text-[#d4a843] tracking-tight">
            नेपाल
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm px-4 py-2 text-xs text-white/70 hover:border-white/40 hover:text-white transition-all duration-200"
          >
            Back to website <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10 mt-auto p-8 pb-10">
          <p className="font-display text-2xl font-semibold text-white leading-snug">
            Where the Himalayas<br />Meet the Soul
          </p>
          <p className="mt-2 text-sm text-white/40">Pokhara, Nepal</p>
          <div className="mt-5 flex gap-2">
            <span className="h-[3px] w-6 rounded-full bg-white/25" />
            <span className="h-[3px] w-6 rounded-full bg-white/25" />
            <span className="h-[3px] w-10 rounded-full bg-[#d4a843]" />
          </div>
        </div>
      </div>

      {/* ── Right: form panel ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="mb-8 block font-display text-xl font-bold text-[#d4a843] lg:hidden">
            नेपाल
          </Link>

          <h1 className="font-display text-4xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 mb-8 text-sm text-white/45">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#d4a843] hover:text-[#e8c547] underline underline-offset-2 transition-colors">
              Sign up
            </Link>
          </p>

          <CustomerLoginForm isConfigured={isConfigured} nextPath={nextPath} />
        </div>
      </div>
    </main>
  );
}
