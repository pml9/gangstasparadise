"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
  className?: string
  onReset?: () => void
  /** Test ID for testing purposes */
  testId?: string
  /** Accessibility properties */
  ally?: {
    /** ARIA role for the empty state */
    role?: string
    /** ARIA label for the empty state */
    'aria-label'?: string
    /** ARIA live region setting */
    'aria-live'?: 'off' | 'polite' | 'assertive'
  }
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  onReset,
  testId = 'empty-state',
  ally = {}
}: EmptyStateProps) {
  const {
    role = 'status',
    'aria-label': ariaLabel = 'Empty state',
    'aria-live': ariaLive = 'polite'
  } = ally

  return (
    <div 
      className={cn("flex flex-col items-center justify-center p-8 text-center", className)}
      role={role}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      data-testid={testId}
    >
      <div className="bg-secondary-gold-pale p-4 rounded-full mb-4">
        {icon || <Search className="h-8 w-8 text-primary-warm-gold" data-testid={`${testId}-default-icon`} />}
      </div>
      <h3 className="text-h3 mb-2 text-primary-deep-brown">{title}</h3>
      <p className="text-body text-neutral-taupe max-w-md mb-6">
        {description}
      </p>
      <div className="space-y-4">
        <Button
          onClick={onReset}
          className="btn-primary"
          data-testid={`${testId}-reset-button`}
          aria-label="Reset all filters"
        >
          Reset all filters
        </Button>
        <div className="text-body-small text-neutral-taupe">
          <p>Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {["Cooking", "Gardening", "Technology", "Music", "Languages"].map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                className="border-neutral-taupe text-dark-brown hover:bg-secondary-gold-pale hover:text-primary-warm-gold hover:border-primary-warm-gold"
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
