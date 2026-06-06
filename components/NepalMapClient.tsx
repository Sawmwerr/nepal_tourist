"use client";

import dynamic from "next/dynamic";

const NepalMapDynamic = dynamic(() => import("./NepalMap"), {
  ssr: false,
  loading: () => (
    <section className="section-pad">
      <div
        className="glass rounded-[28px] overflow-hidden flex items-center justify-center"
        style={{ minHeight: 500 }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-10 h-10 rounded-full border-2 border-[#d4a843] border-t-transparent animate-spin"
          />
          <p
            className="text-[11px] tracking-[0.3em] uppercase text-[#6b6a5a]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Loading map…
          </p>
        </div>
      </div>
    </section>
  ),
});

export default function NepalMapClient() {
  return <NepalMapDynamic />;
}
