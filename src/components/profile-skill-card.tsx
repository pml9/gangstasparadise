import Image from "next/image"
import { MoreHorizontal, Edit3, Calendar, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import StarRating from "@/components/star-rating"
import type { Skill } from "@/types/skill"

interface ProfileSkillCardProps {
  /** Skill data to display */
  skill: Skill
  /** Whether the user is teaching this skill */
  isTeaching: boolean
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

export default function ProfileSkillCard({ 
  skill, 
  isTeaching, 
  testId = 'skill-card',
  ally = {}
}: ProfileSkillCardProps) {
  const { 
    role = 'article',
    'aria-label': ariaLabel = `${isTeaching ? 'Teaching' : 'Learning'} skill: ${skill.name}`,
    'aria-live': ariaLive = 'off'
  } = ally;
  return (
    <div 
      role={role}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      data-testid={`${testId}-${skill.id}`}
    >
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-32 sm:h-auto sm:w-1/3">
            <Image src={skill.image || "/placeholder.svg"} alt={skill.name} fill className="object-cover" />
            <Badge
              className={`absolute top-2 left-2 ${
                isTeaching ? "bg-accent-sage text-white" : "bg-accent-teal text-white"
              }`}
            >
              {isTeaching ? "Teaching" : "Learning"}
            </Badge>
          </div>

          <div className="p-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-overline text-neutral-taupe text-xs">{skill.category.name}</div>
                <h3 className="text-body font-semibold text-primary-deep-brown">{skill.name}</h3>

                {isTeaching && (
                  <div className="mt-1 mb-2">
                    <StarRating rating={skill.averageRating!} reviewCount={skill.totalSessions} size="sm" />
                  </div>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center">
                    <Edit3 className="mr-2 h-4 w-4" />
                    <span>{isTeaching ? "Edit Skill" : "Update Progress"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{isTeaching ? "Manage Availability" : "Schedule Session"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center text-error-red">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>{isTeaching ? "Remove Skill" : "Stop Learning"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-body-small text-neutral-taupe line-clamp-2 mt-1 mb-3">{skill.description}</p>

            <div className="flex flex-wrap gap-2">
              <Button size="sm" className={isTeaching ? "btn-primary" : "btn-secondary"}>
                {isTeaching ? "Manage Sessions" : "Continue Learning"}
              </Button>
              <Button size="sm" variant="outline" className="btn-secondary">
                {isTeaching ? "View Requests" : "Find Teachers"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  )
}
