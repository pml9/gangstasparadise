"use client"

import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface EmptySessionStateProps {
  /** Type of empty state to display */
  type: "upcoming" | "past" | "requests"
  /** Callback when action button is clicked */
  onAction?: () => void
  /** Test ID for testing purposes */
  testId?: string
  /** Additional accessibility attributes */
  ally?: {
    /** ARIA label for the empty state */
    'aria-label'?: string
    /** ARIA role for the empty state */
    role?: string
    /** ARIA live region setting */
    'aria-live'?: 'polite' | 'assertive' | 'off'
  }
}

export function EmptySessionState({ 
  type, 
  onAction, 
  testId = 'empty-session-state',
  ally = {}
}: EmptySessionStateProps) {
  const { 
    'aria-label': ariaLabel = 'No sessions',
    role = 'status',
    'aria-live': ariaLive = 'polite'
  } = ally;
  let title = ""
  let description = ""
  let actionText = ""

  switch (type) {
    case "upcoming":
      title = "No upcoming sessions"
      description = "You don't have any upcoming sessions scheduled."
      actionText = "Browse Skills"
      break
    case "past":
      title = "No past sessions"
      description = "You haven't completed any sessions yet."
      actionText = "Browse Skills"
      break
    case "requests":
      title = "No session requests"
      description = "You don't have any pending session requests."
      actionText = "Browse Skills"
      break
  }

  return (
    <Card 
      className="p-8 text-center"
      data-testid={testId}
      role={role}
      aria-label={ariaLabel}
      aria-live={ariaLive}
    >
      <div 
        className="mx-auto w-16 h-16 rounded-full bg-background-ivory flex items-center justify-center mb-4"
        role="img"
        aria-hidden="true"
      >
        <CalendarIcon className="h-8 w-8 text-neutral-taupe" />
      </div>
      <h3 
        className="text-h4 font-semibold text-primary-deep-brown mb-2"
        data-testid="empty-state-title"
      >
        {title}
      </h3>
      <p 
        className="text-body-small text-neutral-taupe mb-6"
        data-testid="empty-state-description"
      >
        {description}
      </p>
      <Button 
        className="bg-primary-warm-gold hover:bg-primary-warm-gold/90" 
        onClick={onAction}
        data-testid="empty-state-action"
        aria-label={actionText}
      >
        {actionText}
      </Button>
    </Card>
  )
}
