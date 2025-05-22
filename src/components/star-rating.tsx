interface StarRatingProps {
  /** The current rating value (0-5) */
  rating: number
  /** Maximum rating (default: 5) */
  maxRating?: number
  /** Size of the stars */
  size?: "sm" | "md" | "lg"
  /** Whether to show the numeric rating value */
  showValue?: boolean
  /** Number of reviews for this rating */
  reviewCount?: number
  /** Whether to hide the rating from screen readers */
  ariaHidden?: boolean
  /** Test ID for testing purposes */
  testId?: string
  /** ARIA label for accessibility */
  'aria-label'?: string
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = true,
  reviewCount,
  ariaHidden = false,
}: StarRatingProps) {
  // Calculate the whole and decimal parts
  const wholeStars = Math.floor(rating)
  const decimalPart = rating - wholeStars

  // Determine size classes
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-body-small",
    lg: "text-body",
  }

  const starClass = sizeClasses[size]
  const textClass = textSizeClasses[size]

  return (
    <div 
      className="flex items-center"
      aria-hidden={ariaHidden}
      aria-label={ariaHidden ? undefined : `Rating: ${rating} out of ${maxRating}`}
    >
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, index) => {
          const starNumber = index + 1

          // Determine if this star should be full, partial, or empty
          if (starNumber <= wholeStars) {
            // Full star
            return (
              <svg key={index} className={`${starClass} text-warning-amber`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )
          } else if (starNumber === wholeStars + 1 && decimalPart > 0) {
            // Partial star
            return (
              <div key={index} className="relative">
                {/* Empty star background */}
                <svg className={`${starClass} text-neutral-taupe/30`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                {/* Filled portion */}
                <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${decimalPart * 100}%` }}>
                  <svg className={`${starClass} text-warning-amber`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            )
          } else {
            // Empty star
            return (
              <svg key={index} className={`${starClass} text-neutral-taupe/30`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )
          }
        })}
      </div>

      {showValue && <span className={`${textClass} ml-1 font-medium`}>{rating.toFixed(1)}</span>}

      {reviewCount !== undefined && (
        <span className="text-caption text-neutral-taupe ml-1">({reviewCount} reviews)</span>
      )}
    </div>
  )
}
