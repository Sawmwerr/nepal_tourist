import type { Metadata } from "next";
import { Playfair_Display, Syne } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={`${playfair.variable} ${syne.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#07070d] text-[#f0ece3]">

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
