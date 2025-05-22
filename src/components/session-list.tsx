import type { Session } from "@/types/session"
import { SessionCard } from "@/components/session-card"
import { EmptySessionState } from "./empty-session-state"

interface SessionListProps {
  /** List of sessions to display */
  sessions: Session[]
  /** ID of the current user */
  currentUserId: string
  /** Type of sessions to display */
  type: "upcoming" | "past" | "requests"
  /** Callback when join button is clicked */
  onJoin?: () => void
  /** Callback when message button is clicked */
  onMessage?: () => void
  /** Callback when review button is clicked */
  onReview?: () => void
  /** Callback when reschedule button is clicked */
  onReschedule?: () => void
  /** Callback when empty state action is triggered */
  onEmptyAction: () => void
  /** Test ID for testing purposes */
  testId?: string
  /** Additional accessibility attributes */
  ally?: {
    /** ARIA label for the list */
    'aria-label'?: string
    /** ARIA role for the list */
    role?: string
    /** ARIA live region setting */
    'aria-live'?: 'polite' | 'assertive' | 'off'
  }
}

export const SessionList = ({
  sessions,
  currentUserId,
  type,
  onJoin,
  onMessage,
  onReview,
  onReschedule,
  onEmptyAction,
  testId = 'session-list',
  ally = {}
}: SessionListProps) => {
  const { 
    'aria-label': ariaLabel = `${type} sessions`,
    role = 'list',
    'aria-live': ariaLive = 'off'
  } = ally;
  if (sessions.length === 0) {
    return <EmptySessionState type={type} onAction={onEmptyAction} />
  }

  return (
    <div 
      className="space-y-4"
      data-testid={testId}
      role={role}
      aria-label={ariaLabel}
      aria-live={ariaLive}
    >
      {sessions.map((session, index) => (
        <div 
          key={session.id}
          data-testid={`session-item-${index}`}
          aria-posinset={index + 1}
          aria-setsize={sessions.length}
          className="mb-4 last:mb-0"
        >
          <SessionCard
            session={session}
            currentUserId={currentUserId}
            onJoin={onJoin}
            onMessage={onMessage}
            onReview={onReview}
            onReschedule={onReschedule}
          />
        </div>
      ))}
    </div>
  )
}
