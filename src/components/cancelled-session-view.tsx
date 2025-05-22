import { Button } from "@/components/ui/button"
import { Calendar, AlertCircle } from "lucide-react"

interface CancelledSessionViewProps {
  /** Title of the cancelled session */
  sessionTitle: string
  /** Reason for cancellation */
  cancellationReason?: string
  /** Name of the teacher */
  teacherName: string
  /** Test ID for testing purposes */
  testId?: string
  /** Additional accessibility attributes */
  ally?: {
    /** ARIA label for the cancelled session view */
    'aria-label'?: string
    /** ARIA role for the cancelled session view */
    role?: string
    /** ARIA live region setting */
    'aria-live'?: 'polite' | 'assertive' | 'off'
  }
}

export default function CancelledSessionView({
  sessionTitle,
  cancellationReason,
  teacherName,
  testId = 'cancelled-session-view',
  ally = {}
}: CancelledSessionViewProps) {
  const { 
    'aria-label': ariaLabel = 'Cancelled session',
    role = 'status',
    'aria-live': ariaLive = 'polite'
  } = ally;
  return (
    <div 
      className="bg-background-ivory rounded-xl p-6 border border-neutral-taupe/10 shadow-card"
      data-testid={testId}
      role={role}
      aria-label={ariaLabel}
      aria-live={ariaLive}
    >
      <div className="flex flex-col items-center text-center mb-6">
        <div className="bg-neutral-taupe/10 p-4 rounded-full mb-4">
          <AlertCircle className="h-12 w-12 text-neutral-taupe" />
        </div>
        <h2 className="text-h3 font-semibold text-primary-deep-brown mb-2">Session Cancelled</h2>
        <p className="text-body text-neutral-taupe mb-4">Your {sessionTitle} session has been cancelled.</p>
        {cancellationReason && (
          <div className="bg-background-light p-4 rounded-lg w-full max-w-md mb-4">
            <p className="text-body-small font-medium mb-1">Cancellation reason:</p>
            <p className="text-body-small text-neutral-taupe">{cancellationReason}</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Button className="w-full bg-primary-warm-gold hover:bg-primary-warm-gold/90 text-white">
          <Calendar className="mr-2 h-4 w-4" />
          Reschedule Session
        </Button>
        <Button variant="outline" className="w-full">
          Browse Similar Skills
        </Button>
        <Button variant="ghost" className="w-full">
          Message {teacherName}
        </Button>
      </div>
    </div>
  )
}
