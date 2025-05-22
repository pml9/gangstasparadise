interface SkillCardSkeletonProps {
  /** Test ID for testing purposes */
  testId?: string
  /** Additional accessibility attributes */
  ally?: {
    /** ARIA role for the skeleton */
    role?: string
    /** ARIA label for the skeleton */
    'aria-label'?: string
    /** ARIA live region setting */
    'aria-live'?: 'polite' | 'assertive' | 'off'
  }
}

export default function SkillCardSkeleton({ 
  testId = 'skill-card-skeleton',
  ally = {}
}: SkillCardSkeletonProps) {
  const { 
    role = 'status',
    'aria-label': ariaLabel = 'Loading skill card',
    'aria-live': ariaLive = 'polite'
  } = ally;
  return (
    <div 
      role={role}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      data-testid={testId}
    >
    <div className="card border border-neutral-taupe/10 animate-pulse">
      <div className="relative">
        <div className="w-full h-48 bg-neutral-taupe/20 rounded-lg"></div>
        <div className="absolute top-3 left-3 h-6 w-24 bg-neutral-taupe/20 rounded-full"></div>
        <div className="absolute top-3 right-3 h-6 w-20 bg-neutral-taupe/20 rounded-full"></div>
      </div>

      <div className="p-4">
        <div className="h-4 w-24 bg-neutral-taupe/20 rounded mb-2"></div>
        <div className="h-6 w-3/4 bg-neutral-taupe/20 rounded mb-2"></div>
        <div className="h-4 w-full bg-neutral-taupe/20 rounded mb-4"></div>

        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="w-4 h-4 bg-neutral-taupe/20 rounded-full mr-1"></div>
          ))}
          <div className="h-4 w-8 bg-neutral-taupe/20 rounded ml-1"></div>
          <div className="h-4 w-24 bg-neutral-taupe/20 rounded ml-1"></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-neutral-taupe/20 rounded-full"></div>
            <div className="h-4 w-24 bg-neutral-taupe/20 rounded"></div>
          </div>
          <div className="h-5 w-20 bg-neutral-taupe/20 rounded"></div>
        </div>
      </div>
    </div>
    </div>
  )
}
