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
    <main className="relative min-h-screen overflow-hidden bg-[#07070d]">

      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0">
        <Image
          src="/Pokhara.jpg"
          alt="Phewa Lake, Pokhara"
          fill
          className="object-cover graded"
          priority
        />
        {/* cinematic dark wash */}
        <div className="absolute inset-0 bg-[#07070d]/50" />
      </div>

      {/* ── Prayer-flag top strip ── */}
      <div className="prayer-flag-rule absolute left-0 right-0 top-0 z-50 h-[3px]">
        <span /><span /><span /><span /><span />
      </div>

      {/* ── Main layout ── */}
      <div className="relative z-10 flex min-h-screen">

        {/* Left: transparent — image bleeds through */}
        <div className="hidden flex-col p-10 lg:flex lg:w-[48%]">

          {/* Top bar */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex flex-col leading-none">
              <span className="font-display text-2xl font-bold text-[#d4a843]">नेपाल</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Nepal Tourist</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-xs text-white/65 backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:text-white"
            >
              Back to website <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Bottom: quote */}
          <div className="mt-auto">
            {/* Mountain silhouette */}
            <svg
              viewBox="0 0 120 40"
              fill="none"
              className="mb-4 h-8 w-28 text-[#d4a843]/50"
              aria-hidden
            >
              <polyline
                points="0,40 18,12 32,26 52,4 70,22 88,8 106,28 120,40"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Thin gold accent */}
            <div className="mb-4 h-px w-12 bg-[#d4a843]/60" />

            <p className="font-display text-3xl font-semibold leading-snug text-white">
              Where the Himalayas<br />Meet the Soul
            </p>
            <p className="mt-2 text-sm text-white/40">Pokhara, Nepal · 800 m</p>

            {/* Prayer-flag dots */}
            <div className="mt-6 flex items-center gap-2">
              <span className="h-[3px] w-5 rounded-full bg-[#003893]/70" />
              <span className="h-[3px] w-5 rounded-full bg-white/25" />
              <span className="h-[3px] w-5 rounded-full bg-[#c41e3a]/70" />
              <span className="h-[3px] w-5 rounded-full bg-[#1a7a4d]/70" />
              <span className="h-[3px] w-8 rounded-full bg-[#d4a843]" />
            </div>
          </div>
        </div>

        {/* Right: frosted glass panel */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden border-white/[0.07] px-8 py-16 backdrop-blur-[52px] lg:border-l lg:px-14 bg-[#07070d]/72">

          {/* Ambient glows */}
          <div
            className="pointer-events-none absolute -top-40 -right-20 h-96 w-96 rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(212,168,67,0.09) 0%, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 left-10 h-72 w-72 rounded-full blur-[80px]"
            style={{ background: "radial-gradient(circle, rgba(26,50,100,0.15) 0%, transparent 70%)" }}
          />

          {/* Form content */}
          <div className="relative z-10 w-full max-w-sm">

            {/* Mobile logo */}
            <Link href="/" className="mb-8 block lg:hidden">
              <span className="font-display text-2xl font-bold text-[#d4a843]">नेपाल</span>
            </Link>

            {/* Heading */}
            <h1 className="font-display text-4xl font-bold text-gradient">
              Welcome back
            </h1>
            <p className="mt-2 mb-8 text-sm text-white/40">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#d4a843] underline underline-offset-2 transition-colors hover:text-[#e8c547]">
                Sign up
              </Link>
            </p>

            <CustomerLoginForm isConfigured={isConfigured} nextPath={nextPath} />
          </div>
        </div>
      </div>
    </main>
  );
}
