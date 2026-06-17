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

export default function CustomerLoginForm({ isConfigured, nextPath }: CustomerLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      if (signInError) {
        setError(signInError.message);
        return;
      }

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
      <div className="rounded-3xl border border-amber-300/30 bg-amber-300/10 p-6 text-sm text-amber-100">
        Customer login is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then restart the dev server.
      </div>
    );
  }

  const signupHref = `${CUSTOMER_SIGNUP_PATH}?next=${encodeURIComponent(nextPath)}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="customer-email" className="text-sm font-semibold text-white">
          Email
        </label>
        <input
          id="customer-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/30"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="customer-password" className="text-sm font-semibold text-white">
          Password
        </label>
        <input
          id="customer-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/30"
          placeholder="••••••••"
        />
      </div>

      {error ? (
        <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[#d4a843] px-5 py-3 font-semibold text-[#07101f] transition hover:bg-[#efc85d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-center text-sm text-white/60">
        New to Nepal trips?{" "}
        <Link href={signupHref} className="font-semibold text-[#d4a843] hover:text-[#efc85d]">
          Create an account
        </Link>
      </p>
    </form>
  );
}
