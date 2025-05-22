import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Skill } from "@/types/skill"
import { AgeGroup } from "@/types/common"
import StarRating from "@/components/star-rating"

interface RelatedSkillCardProps {
  /** Skill data to display */
  skill: Skill
  /** Test ID for testing purposes */
  testId?: string
  /** Additional accessibility attributes */
  ally?: {
    /** ARIA role for the card */
    role?: string
    /** ARIA label for the card */
    'aria-label'?: string
    /** ARIA live region setting */
    'aria-live'?: 'polite' | 'assertive' | 'off'
    /** Label for the link */
    linkLabel?: string
  }
}

export default function RelatedSkillCard({ 
  skill, 
  testId = 'related-skill-card',
  ally = {}
}: RelatedSkillCardProps) {
  const { 
    role = 'article',
    'aria-label': ariaLabel = `Related skill: ${skill.name}`,
    'aria-live': ariaLive = 'off',
    linkLabel = `View details for ${skill.name}`
  } = ally;
  // Map teacher level to the appropriate badge class
  const getBadgeClass = (level: AgeGroup) => {
    console.log(level)
    switch (level) {
      case AgeGroup.YOUNG_LEARNERS:
        return "badge-young"
      case AgeGroup.ESTABLISHED_ADULTS:
        return "badge-established"
      case AgeGroup.EXPERIENCED_GUIDES:
        return "badge-experienced"
      case AgeGroup.WISDOM_KEEPERS:
        return "badge-wisdom"
      default:
        return "bg-primary-warm-gold"
    }
  }

  return (
    <Link 
      href={`/skills/${skill.id}`} 
      className="block"
      aria-label={linkLabel}
      data-testid={`${testId}-link-${skill.id}`}
    >
      <div 
        className="card border border-neutral-taupe/10 h-full transition-all duration-200 hover:-translate-y-1"
        role={role}
        aria-label={ariaLabel}
        aria-live={ariaLive}
        data-testid={`${testId}-${skill.id}`}
      >
        <div className="relative">
          <Badge className={`absolute top-2 left-2 ${getBadgeClass(skill.teacher.ageGroup)}`}>
            {skill.teacher.ageGroup}
          </Badge>
          <Image
            src={skill.image || "/placeholder.svg"}
            alt={skill.name}
            width={300}
            height={200}
            className="w-full h-32 object-cover rounded-t-lg"
          />
        </div>

        <div className="p-3 relative">
          <div className="text-overline text-neutral-taupe text-xs">{skill.category.name}</div>
          <h3 className="text-body font-semibold text-primary-deep-brown line-clamp-1">{skill.name}</h3>

          <div className="flex items-center mt-2 mb-2">
            <StarRating rating={skill.averageRating!} reviewCount={skill.reviews.length} size="sm" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src={skill.teacher.image || "/placeholder.svg"} alt={skill.teacher.name} />
                <AvatarFallback className="bg-primary-warm-gold text-white text-xs">
                  {skill.teacher.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs">{skill.teacher.name}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
