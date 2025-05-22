import { MoreHorizontal, Edit2, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { UserSkill } from "@/types/user"

interface ProfileLearningSkillCardProps {
  /** Skill data to display */
  skill: UserSkill
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
  }
}

export default function ProfileLearningSkillCard({ 
  skill, 
  testId = 'learning-skill-card',
  ally = {}
}: ProfileLearningSkillCardProps) {
  const { 
    role = 'article',
    'aria-label': ariaLabel = `Learning skill: ${skill.name}`,
    'aria-live': ariaLive = 'off'
  } = ally;
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

  // Get progress value based on level
  const getProgressValue = (level: string) => {
    switch (level) {
      case "BEGINNER":
        return 25
      case "INTERMEDIATE":
        return 50
      case "ADVANCED":
        return 75
      case "EXPERT":
        return 100
      default:
        return 0
    }
  }

  return (
    <div 
      role={role}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      data-testid={`${testId}-${skill.id}`}
    >
    <Card className="bg-white border-none shadow-sm overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-body font-semibold text-primary-deep-brown mb-1">{skill.name}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline" className="bg-accent-teal/10 text-accent-teal border-accent-teal/20">
                {skill.category.name}
              </Badge>
              <Badge className={getLevelBadgeClass(skill.level || "BEGINNER")}>{formatLevel(skill.level || "BEGINNER")}</Badge>
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
                Update progress
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-error-red">
                <Trash2 className="h-4 w-4 mr-2" />
                Remove skill
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-body-small text-neutral-taupe">{skill.description}</p>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between items-center text-caption">
            <span className="text-neutral-taupe">Progress</span>
            <span className="font-medium">{formatLevel(skill.level || "BEGINNER")}</span>
          </div>
          <Progress value={getProgressValue(skill.level || "BEGINNER")} className="h-2" />
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" size="sm" className="text-accent-teal border-accent-teal/20">
            Find Teachers
          </Button>
          <Button size="sm" className="bg-accent-teal hover:bg-accent-teal/90 text-white" data-testid="continue-learning-button">
            Continue Learning
          </Button>
        </div>
      </CardContent>
      </Card>
    </div>
  )
}
