"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { CUSTOMER_LOGIN_PATH } from "@/lib/customer/auth";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

interface CustomerSignupFormProps {
  isConfigured: boolean;
  nextPath: string;
}

export default function CustomerSignupForm({ isConfigured, nextPath }: CustomerSignupFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: phone.trim(),
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (!data.session) {
        setMessage("Account created. Please check your email to confirm your account, then sign in.");
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isConfigured) {
    return (
      <div className="rounded-3xl border border-amber-300/30 bg-amber-300/10 p-6 text-sm text-amber-100">
        Customer signup is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then restart the dev server.
      </div>
    );
  }

  const loginHref = `${CUSTOMER_LOGIN_PATH}?next=${encodeURIComponent(nextPath)}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="signup-name" className="text-sm font-semibold text-white">
          Full name
        </label>
        <input
          id="signup-name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/30"
          placeholder="Your full name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="signup-phone" className="text-sm font-semibold text-white">
          Phone / WhatsApp
        </label>
        <input
          id="signup-phone"
          type="tel"
          autoComplete="tel"
          required
          minLength={5}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/30"
          placeholder="+370..."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="signup-email" className="text-sm font-semibold text-white">
          Email
        </label>
        <input
          id="signup-email"
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
        <label htmlFor="signup-password" className="text-sm font-semibold text-white">
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/30"
          placeholder="Minimum 6 characters"
        />
      </div>

      {error ? (
        <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      {message ? (
        <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[#d4a843] px-5 py-3 font-semibold text-[#07101f] transition hover:bg-[#efc85d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating account..." : "Create customer account"}
      </button>

      <p className="text-center text-sm text-white/60">
        Already have an account?{" "}
        <Link href={loginHref} className="font-semibold text-[#d4a843] hover:text-[#efc85d]">
          Sign in
        </Link>
      </p>
    </form>
  );
}
