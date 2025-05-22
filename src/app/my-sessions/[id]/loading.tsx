import { Skeleton } from "@/components/ui/skeleton"

export default function SessionDetailLoading() {
  return (
    <div className="bg-background-light min-h-screen pb-16">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 mx-2 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Alert */}
        <Skeleton className="h-20 w-full rounded-lg mb-6" />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="w-full lg:w-2/3">
            {/* Session header */}
            <Skeleton className="h-40 w-full rounded-xl mb-6" />

            {/* Session details */}
            <Skeleton className="h-80 w-full rounded-xl mb-6" />

            {/* Participant information */}
            <Skeleton className="h-32 w-full rounded-xl mb-6" />

            {/* Preparation materials */}
            <Skeleton className="h-64 w-full rounded-xl mb-6" />

            {/* Add to calendar */}
            <Skeleton className="h-32 w-full rounded-xl mb-6" />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
