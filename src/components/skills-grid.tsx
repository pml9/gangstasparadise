"use client"

import { useState, useEffect } from "react"
import SkillCard from "@/components/skill-card"
import SkillCardSkeleton from "@/components/skill-card-skeleton"
import EmptyState from "@/components/empty-state"
import type { Skill } from "@/types/skill"

interface SkillsGridProps {
  skills: Skill[]
  isLoading?: boolean
  isFiltered?: boolean
  onResetFilters?: () => void
  /** Test ID for testing purposes */
  testId?: string
  /** Accessibility properties */
  ally?: {
    /** ARIA role for the grid */
    role?: string
    /** ARIA label for the grid */
    'aria-label'?: string
    /** ARIA live region setting */
    'aria-live'?: 'off' | 'polite' | 'assertive'
  }
}

export default function SkillsGrid({
  skills,
  isLoading = false,
  isFiltered = false,
  onResetFilters = () => {},
  testId = 'skills-grid',
  ally = {}
}: SkillsGridProps) {
  const {
    role = 'grid',
    'aria-label': ariaLabel = 'Skills grid',
    'aria-live': ariaLive = 'off'
  } = ally;
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedSkills, setDisplayedSkills] = useState(skills)

  // Handle skills update with animation
  useEffect(() => {
    if (!isLoading) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setDisplayedSkills(skills)
        setIsAnimating(false)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [skills, isLoading])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkillCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (skills.length === 0 && isFiltered) {
    return <EmptyState onReset={onResetFilters} />
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 transition-opacity duration-200 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
      role={role}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      data-testid={testId}
    >
      {displayedSkills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  )
}
