import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Skill } from "@/types/skill"
import StarRating from "@/components/star-rating"

interface SkillCardProps {
  /** The skill data to display */
  skill: Skill
  /** Additional CSS classes to apply to the card */
  className?: string
  /** Test ID prefix for testing */
  testId?: string
  /** ARIA label for the card (defaults to skill name and teacher) */
  'aria-label'?: string
  /** Whether the card is in a loading state */
  isLoading?: boolean
  /** Additional accessibility attributes */
  ally?: {
    /** ARIA role for the card */
    role?: string
    /** ARIA live region setting */
    'aria-live'?: 'polite' | 'assertive' | 'off'
    /** ARIA atomic setting */
    'aria-atomic'?: boolean
  }
}

export default function SkillCard({ 
  skill, 
  className = '',
  testId = 'skill-card',
  'aria-label': ariaLabel = `${skill.name} by ${skill.teacher?.name || 'Unknown Teacher'}`,
  isLoading = false,
  ally = {}
}: SkillCardProps) {
  const { 
    role = 'article', 
    'aria-live': ariaLive = 'off', 
    'aria-atomic': ariaAtomic = true 
  } = ally;
  if (isLoading) {
    return (
      <div 
        className={`card border border-neutral-taupe/10 animate-pulse ${className}`}
        data-testid={`${testId}-loading`}
        role="status"
        aria-label="Loading skill card..."
        aria-busy="true"
      >
        <div 
          className="w-full h-48 bg-gray-200 rounded-lg" 
          aria-hidden="true"
          data-testid={`${testId}-loading-image`}
        />
        <div className="p-4 space-y-4">
          <div 
            className="h-4 bg-gray-200 rounded w-1/4" 
            aria-hidden="true"
            data-testid={`${testId}-loading-category`}
          />
          <div 
            className="h-6 bg-gray-200 rounded w-3/4" 
            aria-hidden="true"
            data-testid={`${testId}-loading-title`}
          />
          <div 
            className="h-16 bg-gray-200 rounded" 
            aria-hidden="true"
            data-testid={`${testId}-loading-description`}
          />
          <div className="flex items-center gap-2">
            <div 
              className="h-8 w-8 rounded-full bg-gray-200" 
              aria-hidden="true"
              data-testid={`${testId}-loading-avatar`}
            />
            <div 
              className="h-4 bg-gray-200 rounded w-1/3" 
              aria-hidden="true"
              data-testid={`${testId}-loading-name`}
            />
          </div>
        </div>
        <span className="sr-only">Loading skill card...</span>
      </div>
    )
  }
  // Map teacher level to the appropriate badge class
  const getBadgeClass = (level: string) => {
    switch (level) {
      case "YOUNG LEARNER":
        return "badge-young"
      case "ESTABLISHED ADULT":
        return "badge-established"
      case "EXPERIENCED GUIDE":
        return "badge-experienced"
      case "WISDOM KEEPER":
        return "badge-wisdom"
      default:
        return "bg-primary-warm-gold"
    }
  }

  const cardAriaLabel = ariaLabel || `View details for ${skill.name} skill by ${skill.teacher.name}. ${skill.description}. ${skill.averageRating ? `Rated ${skill.averageRating.toFixed(1)} out of 5` : 'Not yet rated'}.`
  
  return (
    <Link 
      href={`/skills/${skill.id}`} 
      className={`block ${className}`}
      data-testid={`${testId}-${skill.id}`}
      aria-label={cardAriaLabel}
      role="article"
      aria-labelledby={`${testId}-${skill.id}-title`}
      aria-describedby={`${testId}-${skill.id}-description ${testId}-${skill.id}-teacher`}
    >
      <article 
        className="card border border-neutral-taupe/10 transition-all duration-200 hover:-translate-y-1"
        aria-labelledby={`skill-${skill.id}-title`}
      >
        <div 
          className="relative"
          data-testid={`${testId}-image-container`}
        >
          <Image
            src={skill.image || "/placeholder.svg"}
            alt=""
            width={600}
            height={400}
            className="w-full h-48 object-cover rounded-lg"
            aria-hidden="true"
            data-testid="skill-image"
          />
          <Badge 
            className="absolute top-3 right-3 bg-dark-brown/80 text-white"
            data-testid={`${testId}-session-format`}
            aria-label={`Session format: ${skill.sessionFormat}`}
          >
            {skill.sessionFormat}
          </Badge>
        </div>

        <div 
          className="p-4"
          data-testid={`${testId}-content`}
        >
          <div 
            className="text-overline text-neutral-taupe mb-1"
            data-testid={`${testId}-category`}
            aria-label={`Category: ${skill.category.name}`}
          >
            {skill.category.name}
          </div>
          <h3 
            className="text-h4 mb-1 text-primary-deep-brown"
            data-testid={`${testId}-name`}
            id={`${testId}-${skill.id}-title`}
          >
            {skill.name}
          </h3>
          <p 
            className="text-body-small text-neutral-taupe mb-4"
            data-testid={`${testId}-description`}
            id={`${testId}-${skill.id}-description`}
          >
            {skill.description}
          </p>

          <div 
            className="mb-4"
            data-testid={`${testId}-rating`}
            aria-label={`Rating: ${skill.averageRating?.toFixed(1) || 'No rating'} out of 5 from ${skill.totalSessions || 'no'} ${skill.totalSessions === 1 ? 'session' : 'sessions'}`}
          >
            <StarRating 
              rating={skill.averageRating!} 
              reviewCount={skill.totalSessions}
              ariaHidden={true}
            />
          </div>

          <div 
            className="flex items-center justify-between"
            role="region"
            aria-label="Teacher information"
          >
            <div className="flex items-center gap-2">
              <Avatar 
                className="h-8 w-8" 
                data-testid={`${testId}-teacher-avatar`}
                role="img"
                aria-label={`${skill.teacher.name}'s profile picture`}
                id={`${testId}-${skill.id}-teacher`}
              >
                <AvatarImage 
                  src={skill.teacher.image || "/placeholder.svg"} 
                  alt=""
                  aria-hidden="true"
                />
                <AvatarFallback 
                  className="bg-primary-warm-gold text-white"
                  data-testid={`${testId}-teacher-avatar-fallback`}
                >
                  {skill.teacher.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span 
                className="text-body-small font-medium"
                data-testid={`${testId}-teacher-name`}
              >
                {skill.teacher.name}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
