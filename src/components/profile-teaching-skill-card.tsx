import { MoreHorizontal, Edit2, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { UserSkill } from "@/types/user"

interface ProfileTeachingSkillCardProps {
  /** The user's teaching skill data */
  skill: UserSkill
  /** Test ID for testing purposes */
  testId?: string
  /** Accessibility properties */
  ally?: {
    /** ARIA role for the skill card */
    role?: string
    /** ARIA label for the skill card */
    'aria-label'?: string
    /** ARIA live region setting */
    'aria-live'?: 'polite' | 'assertive' | 'off'
    /** ARIA atomic setting */
    'aria-atomic'?: boolean
  }
}

export default function ProfileTeachingSkillCard({ 
  skill, 
  testId = 'teaching-skill-card',
  ally = {}
}: ProfileTeachingSkillCardProps) {
  // Format level for display
  const formatLevel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase()
  }

  // Get level badge class
  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case "BEGINNER":
        return "bg-information-blue/20 text-information-blue"
      case "INTERMEDIATE":
        return "bg-warning-amber/20 text-warning-amber"
      case "ADVANCED":
        return "bg-success-green/20 text-success-green"
      case "EXPERT":
        return "bg-error-red/20 text-error-red"
      default:
        return "bg-neutral-taupe/20 text-neutral-taupe"
    }
  }

  return (
    <Card className="bg-white border-none shadow-sm overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-body font-semibold text-primary-deep-brown mb-1">{skill.name}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge
                variant="outline"
                className="bg-primary-warm-gold/10 text-primary-warm-gold border-primary-warm-gold/20"
              >
                {skill.category.name}
              </Badge>
              <Badge className={getLevelBadgeClass(skill.level || "BEGINNER")}>{formatLevel(skill.level || "BEGINNER")}</Badge>
              {skill.experienceYears && (
                <Badge variant="outline" className="border-neutral-taupe/20">
                  {skill.experienceYears} {skill.experienceYears === 1 ? "year" : "years"} experience
                </Badge>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit skill
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-error-red">
                <Trash2 className="h-4 w-4 mr-2" />
                Remove skill
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-body-small text-neutral-taupe">{skill.description}</p>
        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" size="sm" className="text-primary-warm-gold border-primary-warm-gold/20">
            View Requests
          </Button>
          <Button size="sm" className="bg-primary-warm-gold hover:bg-primary-warm-gold/90 text-white">
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
