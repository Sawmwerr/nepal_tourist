import type { Metadata } from "next";
import localFont from "next/font/local";
import { Syne } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import IntroLoader from "@/components/IntroLoader";
import LenisProvider from "@/components/LenisProvider";
import PageTransition from "@/components/PageTransition";

// Clash Display — self-hosted from app/fonts/ (ITF Free Font License via Fontshare).
// Variable font covers 200–700 in one file; Medium + Bold kept as explicit fallbacks.
const clashDisplay = localFont({
  src: [
    { path: "./fonts/ClashDisplay-Variable.woff2", weight: "200 700", style: "normal" },
    { path: "./fonts/ClashDisplay-Medium.woff2",   weight: "500",      style: "normal" },
    { path: "./fonts/ClashDisplay-Bold.woff2",     weight: "700",      style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nepal — Discover the Roof of the World",
  description:
    "Experience the Himalayas, ancient culture, sacred traditions, and raw adventure. Nepal awaits.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${clashDisplay.variable} ${syne.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#07070d] text-[#f0ece3]">
        {/*
          Runs before hydration — adds `intro-skip` to <html> for returning visitors
          and reduced-motion users so CSS hides #intro-overlay with zero flash.
          beforeInteractive injects this into the server-rendered HTML head.
        */}
        <Script
          id="intro-skip-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html:
            `try{if(sessionStorage.getItem('introSeen')||window.matchMedia('(prefers-reduced-motion:reduce)').matches)document.documentElement.classList.add('intro-skip')}catch(e){}`
          }}
        />
        <LenisProvider />
        <IntroLoader />
        <PageTransition />

        {/* ── Fixed ambient blobs — give glass something to blur against ── */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
          {/* Top-left gold */}
          <div style={{
            position: "absolute", top: "-10%", left: "5%",
            width: 700, height: 700, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,168,67,0.10) 0%, transparent 65%)",
            filter: "blur(90px)",
          }} />
          {/* Top-right blue */}
          <div style={{
            position: "absolute", top: "5%", right: "-5%",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(26,50,100,0.18) 0%, transparent 65%)",
            filter: "blur(100px)",
          }} />
          {/* Mid gold */}
          <div style={{
            position: "absolute", top: "45%", left: "38%",
            width: 500, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 65%)",
            filter: "blur(80px)",
          }} />
          {/* Bottom-left blue-purple */}
          <div style={{
            position: "absolute", bottom: "10%", left: "-5%",
            width: 550, height: 550, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(50,30,90,0.2) 0%, transparent 65%)",
            filter: "blur(90px)",
          }} />
          {/* Bottom-right gold */}
          <div style={{
            position: "absolute", bottom: "-5%", right: "10%",
            width: 450, height: 450, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,168,67,0.07) 0%, transparent 65%)",
            filter: "blur(80px)",
          }} />
        </div>

        {children}
      </body>
    </html>
  );
}
