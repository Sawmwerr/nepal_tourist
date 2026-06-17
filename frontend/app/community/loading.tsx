import Navbar from "@/components/layout/Navbar";

export default function CommunityLoading() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-14 pb-12">
          {/* Heading skeleton */}
          <div className="h-3 w-32 rounded-full bg-[rgba(212,168,67,0.15)] mb-4 animate-pulse" />
          <div className="h-16 w-3/4 rounded-2xl bg-[rgba(255,255,255,0.04)] mb-4 animate-pulse" />
          <div className="h-4 w-96 rounded-full bg-[rgba(255,255,255,0.03)] mb-10 animate-pulse" />

          {/* Stats skeleton */}
          <div className="flex gap-px rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)] w-fit mb-12 animate-pulse">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-36 h-16 bg-[rgba(255,255,255,0.03)]" />
            ))}
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
          {/* Filter tabs */}
          <div className="flex gap-2 mb-10">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-9 w-24 rounded-full bg-[rgba(255,255,255,0.04)] animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="glass rounded-[20px] overflow-hidden animate-pulse"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="h-48 bg-[rgba(255,255,255,0.03)]" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[rgba(255,255,255,0.06)]" />
                    <div className="h-3 w-24 rounded-full bg-[rgba(255,255,255,0.04)]" />
                  </div>
                  <div className="h-5 w-full rounded-lg bg-[rgba(255,255,255,0.04)]" />
                  <div className="h-3 w-5/6 rounded-full bg-[rgba(255,255,255,0.03)]" />
                  <div className="h-3 w-3/4 rounded-full bg-[rgba(255,255,255,0.03)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
