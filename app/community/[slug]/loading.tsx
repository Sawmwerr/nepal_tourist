import Navbar from "@/components/Navbar";

export default function StoryLoading() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero skeleton */}
        <div className="relative h-[50vh] min-h-[320px] bg-[rgba(255,255,255,0.03)] animate-pulse">
          <div className="absolute bottom-8 left-6 md:left-10 right-6 md:right-10 flex flex-col gap-4">
            <div className="h-6 w-32 rounded-full bg-[rgba(255,255,255,0.06)]" />
            <div className="h-12 w-3/4 rounded-2xl bg-[rgba(255,255,255,0.05)]" />
            <div className="h-8 w-1/2 rounded-2xl bg-[rgba(255,255,255,0.04)]" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="max-w-[860px] mx-auto px-6 md:px-10 py-14">
          {/* Author row */}
          <div
            className="flex items-center justify-between gap-4 mb-10 pb-8 animate-pulse"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.06)]" />
              <div className="flex flex-col gap-2">
                <div className="h-3 w-28 rounded-full bg-[rgba(255,255,255,0.06)]" />
                <div className="h-2 w-20 rounded-full bg-[rgba(255,255,255,0.04)]" />
              </div>
            </div>
            <div className="h-3 w-16 rounded-full bg-[rgba(255,255,255,0.04)]" />
          </div>

          {/* Body */}
          <div className="flex flex-col gap-3 mb-12 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-4 rounded-full bg-[rgba(255,255,255,0.04)]"
                style={{ width: i === 4 ? "60%" : "100%" }}
              />
            ))}
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-12 animate-pulse">
            {[80, 100, 70].map((w, i) => (
              <div
                key={i}
                className="h-7 rounded-full bg-[rgba(255,255,255,0.04)]"
                style={{ width: w }}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
