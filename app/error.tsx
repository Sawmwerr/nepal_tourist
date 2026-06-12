"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p
        className="text-[11px] tracking-[0.55em] uppercase mb-6"
        style={{ fontFamily: "var(--font-syne)", color: "#d4a843" }}
      >
        Something went wrong
      </p>

      <h1
        className="text-gradient leading-none mb-6 select-none"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(4rem, 12vw, 9rem)",
        }}
      >
        Error
      </h1>

      <p
        className="text-sm max-w-xs leading-relaxed mb-10"
        style={{ fontFamily: "var(--font-syne)", color: "#8a8978" }}
      >
        An unexpected error occurred. Please try again — or head back to explore Nepal.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold transition-all duration-300"
          style={{
            fontFamily: "var(--font-syne)",
            background: "linear-gradient(135deg, #d4a843, #e8c547)",
            color: "#07070d",
          }}
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold transition-all duration-300"
          style={{
            fontFamily: "var(--font-syne)",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: "#f0ece3",
          }}
        >
          Back home
        </a>
      </div>
    </main>
  );
}
