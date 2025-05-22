import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Review } from "@/types/review"
import StarRating from "@/components/star-rating"

interface ReviewCardProps {
  /** The review data to display */
  review: Review
  /** Additional CSS classes */
  className?: string
  /** Test ID prefix for testing */
  testId?: string
  /** Whether the review is in a loading state */
  isLoading?: boolean
  /** Accessibility properties */
  ally?: {
    /** ARIA role for the review card */
    role?: string
    /** ARIA label for the review card */
    'aria-label'?: string
    /** ARIA live region setting */
    'aria-live'?: 'polite' | 'assertive' | 'off'
    /** ARIA atomic setting */
    'aria-atomic'?: boolean
  }
}

export default function ReviewCard({ 
  review, 
  className = '',
  testId = 'review',
  isLoading = false,
  ally = {}
}: ReviewCardProps) {
  
  if (isLoading) {
    return (
      <div 
        className={`border-b border-neutral-taupe/10 pb-6 last:border-0 animate-pulse ${className}`}
        data-testid={`${testId}-loading`}
        role="status"
        aria-label="Loading review..."
        aria-busy="true"
      >
        <div className="flex items-start">
          <div 
            className="h-10 w-10 rounded-full bg-gray-200 mr-3" 
            aria-hidden="true"
            data-testid={`${testId}-loading-avatar`}
          />
          <div className="flex-1 space-y-2">
            <div 
              className="h-4 bg-gray-200 rounded w-1/4" 
              aria-hidden="true"
              data-testid={`${testId}-loading-name`}
            />
            <div 
              className="h-3 bg-gray-200 rounded w-1/2" 
              aria-hidden="true"
              data-testid={`${testId}-loading-rating`}
            />
            <div 
              className="h-3 bg-gray-200 rounded" 
              aria-hidden="true"
              data-testid={`${testId}-loading-comment-1`}
            />
            <div 
              className="h-3 bg-gray-200 rounded w-3/4" 
              aria-hidden="true"
              data-testid={`${testId}-loading-comment-2`}
            />
          </div>
        </div>
        <span className="sr-only">Loading review content...</span>
      </div>
    )
  }
  return (
    <article 
      className={`border-b border-neutral-taupe/10 pb-6 last:border-0 ${className}`}
      data-testid={`${testId}-${review.id}`}
      aria-labelledby={`${testId}-${review.id}-title`}
      role="article"
      aria-describedby={`${testId}-${review.id}-date ${testId}-${review.id}-rating ${testId}-${review.id}-comment`}
      itemScope
      itemType="https://schema.org/Review"
      data-review-id={review.id}
    >
      <div className="flex items-start">
        <Avatar 
          className="h-10 w-10 mr-3"
          data-testid={`${testId}-avatar`}
          role="img"
          aria-label={`${review.userName}'s profile picture`}
        >
          <AvatarImage 
            src={review.userImage || "/placeholder.svg"} 
            alt=""
            aria-hidden="true"
            data-testid={`${testId}-avatar-image`}
          />
          <AvatarFallback 
            className="bg-primary-warm-gold text-white"
            data-testid={`${testId}-avatar-fallback`}
          >
            {review.userName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 
                className="text-body font-semibold"
                id={`${testId}-${review.id}-title`}
                data-testid={`${testId}-name`}
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <span itemProp="name">{review.userName}</span>
              </h4>
              <div 
                className="mt-1"
                role="img"
                aria-label={`${review.rating} out of 5 stars`}
                data-testid={`${testId}-rating`}
                id={`${testId}-${review.id}-rating`}
                itemProp="reviewRating"
                itemScope
                itemType="https://schema.org/Rating"
              >
                <meta itemProp="ratingValue" content={review.rating.toString()} />
                <meta itemProp="bestRating" content="5" />
                <StarRating rating={review.rating} showValue={false} />
              </div>
            </div>
            <time 
              className="text-caption text-neutral-taupe"
              dateTime={review.date}
              data-testid={`${testId}-date`}
              id={`${testId}-${review.id}-date`}
            >
              {review.date}
            </time>
          </div>
          <p 
            className="mt-2 text-body"
            data-testid={`${testId}-comment`}
            id={`${testId}-${review.id}-comment`}
            itemProp="reviewBody"
          >
            {review.comment}
          </p>
        </div>
      </div>
    </article>
  )
}
