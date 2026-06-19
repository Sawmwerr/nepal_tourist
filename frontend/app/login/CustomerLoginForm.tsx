"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { CUSTOMER_SIGNUP_PATH } from "@/lib/customer/auth";

interface CustomerLoginFormProps {
  isConfigured: boolean;
  nextPath: string;
}

function EyeOpen() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeClosed() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

const INPUT_CLASS =
  "w-full rounded-2xl border border-white/[0.12] bg-white/[0.07] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:border-[#d4a843]/60 focus:bg-white/[0.11] focus:ring-2 focus:ring-[#d4a843]/20 hover:border-white/20";

export default function CustomerLoginForm({ isConfigured, nextPath }: CustomerLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (signInError) { setError(signInError.message); return; }
      router.replace(nextPath);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isConfigured) {
    return (
      <div className="rounded-2xl border border-amber-300/25 bg-amber-300/[0.08] p-5 text-sm text-amber-200/80">
        Customer login is not configured yet. Add{" "}
        <code className="rounded bg-white/10 px-1 py-0.5 text-xs">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
        <code className="rounded bg-white/10 px-1 py-0.5 text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
        to .env.local, then restart the dev server.
      </div>
    );
  }

  const signupHref = `${CUSTOMER_SIGNUP_PATH}?next=${encodeURIComponent(nextPath)}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Email */}
      <input
        id="customer-email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={INPUT_CLASS}
        placeholder="Email address"
        aria-label="Email address"
      />

      {/* Password */}
      <div className="relative">
        <input
          id="customer-password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${INPUT_CLASS} pr-11`}
          placeholder="Password"
          aria-label="Password"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 transition-colors hover:text-white/55"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOpen /> : <EyeClosed />}
        </button>
      </div>

      {error && (
        <p className="rounded-2xl border border-red-400/20 bg-red-500/[0.08] px-4 py-3 text-sm text-red-300/90">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative mt-2 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#c9943c] via-[#d4a843] to-[#e8c547] px-5 py-3.5 text-sm font-semibold text-[#07070d] shadow-lg shadow-[#d4a843]/15 transition-all duration-200 hover:shadow-[#d4a843]/25 hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {/* shimmer overlay */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative">{isSubmitting ? "Signing in…" : "Sign in"}</span>
      </button>

      {/* Divider */}
      <div className="relative py-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.08]" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 text-[11px] uppercase tracking-widest text-white/25">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          className="flex items-center justify-center gap-2.5 rounded-2xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white/55 transition-all hover:border-white/[0.18] hover:bg-white/[0.09] hover:text-white/80"
        >
          <GoogleIcon /> Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2.5 rounded-2xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white/55 transition-all hover:border-white/[0.18] hover:bg-white/[0.09] hover:text-white/80"
        >
          <AppleIcon /> Apple
        </button>
      </div>

      <p className="pt-1 text-center text-[11px] text-white/30">
        New here?{" "}
        <Link href={signupHref} className="text-[#d4a843]/80 transition-colors hover:text-[#d4a843]">
          Create an account
        </Link>
      </p>
    </form>
  );
}
