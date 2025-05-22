import { Skeleton } from "@/components/ui/skeleton"

export default function SkillDetailLoading() {
  return (
    <div className="bg-background-light min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="w-full lg:w-2/3">
            {/* Hero section */}
            <div className="bg-background-ivory rounded-xl p-6 mb-8 border border-neutral-taupe/10 shadow-card">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Teacher profile */}
                <div className="flex flex-col items-center text-center md:w-1/4">
                  <div className="relative mb-3">
                    <Skeleton className="w-32 h-32 rounded-full" />
                    <Skeleton className="absolute bottom-0 right-0 h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-32 mb-1" />
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-4 w-20" />
                </div>

                {/* Skill info */}
                <div className="md:w-3/4">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-8 w-64 mb-2" />
                    </div>
                    <div className="flex items-start mt-2 md:mt-0">
                      <Skeleton className="h-5 w-32" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-28 rounded-full" />
                  </div>

                  <div className="relative">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            </div>

            {/* Session details */}
            <div className="bg-background-ivory rounded-xl p-6 mb-8 border border-neutral-taupe/10 shadow-card">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start">
                    <Skeleton className="h-9 w-9 rounded-full mr-3" />
                    <div>
                      <Skeleton className="h-6 w-24 mb-1" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div>
                  <Skeleton className="h-6 w-16 mb-2" />
                  <Skeleton className="h-8 w-24 mb-1" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-10 w-40 rounded-lg" />
              </div>
            </div>

            {/* Reviews section */}
            <div className="bg-background-ivory rounded-xl p-6 mb-8 border border-neutral-taupe/10 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-7 w-48" />
              </div>

              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border-b border-neutral-taupe/10 pb-6 last:border-0">
                    <div className="flex items-start">
                      <Skeleton className="h-10 w-10 rounded-full mr-3" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <Skeleton className="h-5 w-32 mb-1" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-4 w-full mt-2" />
                        <Skeleton className="h-4 w-5/6 mt-1" />
                        <Skeleton className="h-4 w-4/6 mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Skeleton className="h-10 w-full mt-6 rounded-lg" />
            </div>

            {/* Related skills */}
            <div>
              <Skeleton className="h-7 w-48 mb-4" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="card border border-neutral-taupe/10">
                    <div className="relative">
                      <Skeleton className="w-full h-32 rounded-t-lg" />
                      <Skeleton className="absolute top-2 left-2 h-6 w-24 rounded-full" />
                    </div>

                    <div className="p-3">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-5 w-3/4 mb-2" />

                      <div className="flex items-center mt-2 mb-2">
                        <Skeleton className="h-3 w-24 mr-1" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Skeleton className="h-6 w-6 rounded-full" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-background-ivory rounded-xl p-6 border border-neutral-taupe/10 shadow-card sticky top-8">
              <Skeleton className="h-7 w-48 mb-4" />

              <Skeleton className="h-5 w-48 mb-4" />

              <div className="space-y-3 mb-6">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-40" />
              </div>

              <div className="mb-6">
                <Skeleton className="h-8 w-24 mb-1" />
                <Skeleton className="h-4 w-32" />
              </div>

              <Skeleton className="h-10 w-full mb-3 rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky booking button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background-ivory border-t border-neutral-taupe/20 p-4 flex items-center justify-between">
        <div>
          <Skeleton className="h-7 w-20" />
        </div>
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>
    </div>
  )
}
