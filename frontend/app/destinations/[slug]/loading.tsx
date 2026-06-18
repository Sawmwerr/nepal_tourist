import Navbar from "@/components/layout/Navbar";

export default function DestinationLoading() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero skeleton */}
        <div className="relative h-[55vh] min-h-[360px] bg-[rgba(255,255,255,0.03)] animate-pulse">
          <div className="absolute bottom-8 left-6 md:left-10 flex flex-col gap-3">
            <div className="h-6 w-20 rounded-full bg-[rgba(255,255,255,0.06)]" />
            <div className="h-16 w-72 rounded-2xl bg-[rgba(255,255,255,0.05)]" />
            <div className="h-3 w-32 rounded-full bg-[rgba(255,255,255,0.04)]" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Description */}
            <div className="flex-1 min-w-0 flex flex-col gap-3 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-4 rounded-full bg-[rgba(255,255,255,0.04)]"
                  style={{ width: i === 3 ? "55%" : "100%" }}
                />
              ))}
            </div>

            {/* Stats panel */}
            <div className="lg:w-72 shrink-0 grid grid-cols-2 lg:grid-cols-1 gap-3 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass rounded-2xl px-5 py-4 flex flex-col gap-2">
                  <div className="h-2 w-16 rounded-full bg-[rgba(255,255,255,0.04)]" />
                  <div className="h-5 w-24 rounded-full bg-[rgba(255,255,255,0.06)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
