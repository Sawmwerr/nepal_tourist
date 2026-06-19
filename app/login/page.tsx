import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import PrayerFlagDivider from "@/components/PrayerFlagDivider";

export const metadata: Metadata = {
  title: "Sign in — Nepal",
  description: "Sign in to your Nepal account to manage bookings, community stories and more.",
};

// ─── Social provider icons ────────────────────────────────────────────────────

const GoogleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="16" height="17" viewBox="0 0 814 1000" fill="currentColor" aria-hidden="true">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.3-165-39.3c-76.5 0-103.7 40.8-165.9 40.8s-105.2-56.7-155.5-127.4C46 389.4 32 208.3 31.5 201.4c0-27.3 17.3-63 72.7-68.9 27.8-2.9 55.8-4.2 83.9-4.1 45.3 0 93.4 10.1 124.8 10.1 52.8 0 106.9-21.5 167-21.5 144 0 209.5 82.3 214.2 83.5l-15 20.5zM423.5 45.5c13-19.2 43.5-46 88.5-46 3.2 0 4.5 3.5.4 7.8-29.5 28.3-50.5 72.4-54.7 111.4-.5 4.2-3.5 5.5-6.3 5.4-2.2 0-4.5-.3-6.3-.9C423.2 118 408.5 67.6 423.5 45.5z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.338c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#07070d]">

      {/* ── Background photo — Boudhanath Stupa ── */}
      <Image
        src="/Boudhanath Stupa.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", filter: "brightness(.82) saturate(.75)", zIndex: 0 }}
      />

      {/* Dark scrim — heavier on left where headline text sits */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(110deg, rgba(7,7,13,.82) 0%, rgba(7,7,13,.55) 45%, rgba(7,7,13,.35) 100%)",
        }}
      />

      {/* Nepal-flag grade — diagonal blue → crimson, multiply */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(135deg, #003893 0%, #dc143c 100%)",
          opacity: 0.3,
          mixBlendMode: "multiply",
        }}
      />

      {/* Gold ambient blob — top-right accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", zIndex: 1,
          top: "10%", right: "8%",
          width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,168,67,.13) 0%, transparent 65%)",
          filter: "blur(72px)",
        }}
      />

      <Navbar />

      {/* ── Main content ── */}
      <main
        className="relative flex-1 flex items-center py-16"
        style={{ zIndex: 10, paddingTop: 100 }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: headline ── */}
          <div className="flex flex-col lg:order-1 order-2">
            <p
              className="text-[10px] tracking-[0.5em] uppercase text-[#d4a843] mb-5"
              style={{ fontFamily: "var(--font-syne)", fontWeight: 500 }}
            >
              Welcome back · स्वागत छ
            </p>
            <h1
              className="text-5xl md:text-6xl leading-none mb-3"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "#f0ece3" }}
            >
              Sign back into{" "}
              <em className="text-gradient-gold">Nepal</em>
            </h1>
            <p
              className="text-2xl mt-2 mb-6"
              style={{ fontFamily: "var(--font-devanagari)", color: "#d4a843", opacity: 0.78, fontWeight: 400 }}
            >
              नेपालमा फेरि स्वागत छ
            </p>
            <p
              className="text-[14px] leading-relaxed mb-10 max-w-sm"
              style={{ fontFamily: "var(--font-syne)", color: "rgba(240,236,227,.62)" }}
            >
              Your bookings, community stories, and Himalayan adventures — all waiting for you.
            </p>
            <PrayerFlagDivider style={{ maxWidth: 140 }} opacity={0.65} />

            {/* Decorative stats */}
            <div className="flex items-center gap-8 mt-10">
              {[
                { n: "18,400+", l: "Community members" },
                { n: "3,200+", l: "Stories shared" },
                { n: "94", l: "Countries" },
              ].map((s) => (
                <div key={s.l}>
                  <p
                    className="text-[22px] font-bold text-[#d4a843]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.n}
                  </p>
                  <p
                    className="text-[10px] text-[rgba(240,236,227,.45)] tracking-wide"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: glass form card ── */}
          <div
            className="glass-dark rounded-3xl p-8 md:p-10 lg:order-2 order-1"
            style={{ border: "1px solid rgba(255,255,255,.09)" }}
          >
            <h2
              className="text-[24px] font-semibold mb-1"
              style={{ fontFamily: "var(--font-display)", color: "#f0ece3" }}
            >
              Sign in
            </h2>
            <p
              className="text-[13px] mb-8"
              style={{ fontFamily: "var(--font-syne)", color: "rgba(240,236,227,.45)" }}
            >
              New to Nepal?{" "}
              <Link href="/signup" className="text-[#d4a843] hover:underline font-semibold">
                Create an account →
              </Link>
            </p>

            <form className="flex flex-col gap-5">

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="login-email"
                  className="text-[10px] tracking-[0.35em] uppercase"
                  style={{ fontFamily: "var(--font-syne)", color: "rgba(240,236,227,.45)" }}
                >
                  Email address
                </label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="auth-input"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="text-[10px] tracking-[0.35em] uppercase"
                    style={{ fontFamily: "var(--font-syne)", color: "rgba(240,236,227,.45)" }}
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-[11px] text-[#d4a843] hover:underline"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="auth-input"
                />
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" className="auth-checkbox" />
                <span
                  className="text-[13px]"
                  style={{ fontFamily: "var(--font-syne)", color: "rgba(240,236,227,.62)" }}
                >
                  Remember me
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-bold text-[13px] tracking-[0.15em] uppercase text-[#07070d] transition-all duration-200 hover:scale-[1.02] mt-1"
                style={{
                  fontFamily: "var(--font-syne)",
                  background: "linear-gradient(135deg, #d4a843, #e8c547)",
                  boxShadow: "0 8px 28px rgba(212,168,67,.28)",
                }}
              >
                Sign in
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-7">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,.07)" }} />
              <span
                className="text-[11px] shrink-0"
                style={{ fontFamily: "var(--font-syne)", color: "rgba(240,236,227,.32)" }}
              >
                or continue with
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,.07)" }} />
            </div>

            {/* Social */}
            <div className="grid grid-cols-3 gap-3">
              <button className="auth-social-btn" type="button">
                <GoogleIcon /> Google
              </button>
              <button className="auth-social-btn" type="button">
                <AppleIcon /> Apple
              </button>
              <button className="auth-social-btn" type="button">
                <GitHubIcon /> GitHub
              </button>
            </div>

            {/* Footer note */}
            <p
              className="text-[11px] text-center mt-7"
              style={{ fontFamily: "var(--font-syne)", color: "rgba(240,236,227,.28)" }}
            >
              By signing in you agree to our{" "}
              <a href="#" className="hover:text-[#d4a843] transition-colors">Terms</a>
              {" "}and{" "}
              <a href="#" className="hover:text-[#d4a843] transition-colors">Privacy Policy</a>.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
