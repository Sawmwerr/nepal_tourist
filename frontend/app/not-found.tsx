import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <p
          className="text-[11px] tracking-[0.55em] uppercase mb-6"
          style={{ fontFamily: "var(--font-syne)", color: "#d4a843" }}
        >
          404 — Page not found
        </p>

        <h1
          className="text-gradient leading-none mb-6 select-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(6rem, 18vw, 14rem)",
          }}
        >
          Lost
        </h1>

        <p
          className="text-sm max-w-xs leading-relaxed mb-10"
          style={{ fontFamily: "var(--font-syne)", color: "#8a8978" }}
        >
          This page doesn't exist — or has been moved. Nepal awaits, but not here.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold transition-all duration-300"
            style={{
              fontFamily: "var(--font-syne)",
              background: "linear-gradient(135deg, #d4a843, #e8c547)",
              color: "#07070d",
            }}
          >
            Back home
          </Link>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold transition-all duration-300"
            style={{
              fontFamily: "var(--font-syne)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "#f0ece3",
            }}
          >
            Browse destinations
          </Link>
        </div>
      </main>
    </>
  );
}
