import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileLoading() {
  return (
    <div className="bg-background-light min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header Skeleton */}
        <div className="bg-background-ivory rounded-xl p-6 mb-8 border border-neutral-taupe/10 shadow-card relative">
          <Skeleton className="absolute top-4 right-4 h-8 w-8 rounded-full" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Image Skeleton */}
            <div className="flex flex-col items-center">
              <div className="relative mb-3">
                <Skeleton className="h-20 w-20 rounded-full" />
                <Skeleton className="absolute bottom-0 right-0 h-6 w-16 rounded-full" />
              </div>
            </div>

            {/* Profile Info Skeleton */}
            <div className="flex-1 text-center md:text-left">
              <Skeleton className="h-8 w-48 mb-1 mx-auto md:mx-0" />
              <Skeleton className="h-4 w-64 mb-3 mx-auto md:mx-0" />
              <Skeleton className="h-20 w-full max-w-2xl mb-4" />
              <Skeleton className="h-10 w-32 mx-auto md:mx-0" />
            </div>
          </div>

          {/* Stats Bar Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 bg-background-light p-4 rounded-lg">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-7 w-12 mx-auto mb-1" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left and Middle Columns */}
          <div className="lg:col-span-2">
            <Skeleton className="h-10 w-64 mb-6" />

            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-10 w-32" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Sessions Skeleton */}
            <div className="bg-background-ivory rounded-xl p-6 border border-neutral-taupe/10 shadow-card">
              <Skeleton className="h-7 w-48 mb-4" />

              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}

                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>

            {/* Quick Stats Skeleton */}
            <div className="bg-background-ivory rounded-xl p-6 border border-neutral-taupe/10 shadow-card">
              <Skeleton className="h-7 w-48 mb-4" />

              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
