"use client"

import { format, parseISO } from "date-fns"
import { Clock, MessageSquare, Star, CalendarIcon, MoreVertical } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SessionCardProps {
  /** Session data to display */
  session: any
  /** Current user's ID to determine if they are the teacher */
  currentUserId: string
  /** Whether the card is currently selected */
  isSelected?: boolean
  /** Callback when the card is selected */
  onSelect?: () => void
  /** Callback when join button is clicked */
  onJoin?: () => void
  /** Callback when message button is clicked */
  onMessage?: () => void
  /** Callback when review button is clicked */
  onReview?: () => void
  /** Callback when reschedule button is clicked */
  onReschedule?: () => void
  /** Additional CSS classes */
  className?: string
  /** Test ID prefix for testing */
  testId?: string
  /** ARIA label for the card */
  'aria-label'?: string
  /** Additional accessibility attributes */
  ally?: {
    /** ARIA role for the card */
    role?: string
    /** ARIA live region setting */
    'aria-live'?: 'polite' | 'assertive' | 'off'
    /** ARIA atomic setting */
    'aria-atomic'?: boolean
    /** ARIA expanded state */
    'aria-expanded'?: boolean
    /** ARIA controls */
    'aria-controls'?: string
  }
  /** Whether the card is in a loading state */
  isLoading?: boolean
}

export const SessionCard = ({
  session,
  currentUserId,
  isSelected = false,
  onSelect,
  onJoin,
  onMessage,
  onReview,
  onReschedule,
  className = '',
  testId = 'session-card',
  'aria-label': ariaLabel = `Session on ${session.topic} at ${new Date(session.startTime).toLocaleString()}`,
  isLoading = false,
  ally = {}
}: SessionCardProps) => {
  const { 
    role = 'article', 
    'aria-live': ariaLive = 'off', 
    'aria-atomic': ariaAtomic = true,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls
  } = ally;
  const router = useRouter()
  const isTeacher = session.teacher.id === currentUserId
  const participant = isTeacher ? session.learner : session.teacher
  const startDate = parseISO(session.startTime)
  const endDate = parseISO(session.endTime)

  // Handle card click to navigate to session detail
  const handleCardClick = () => {
    router.push(`/my-sessions/${session.id}`)
  }

  // Status badge
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      SCHEDULED: {
        label: 'Scheduled',
        color: 'bg-primary-warm-gold',
        ariaLabel: 'Scheduled session',
      },
      COMPLETED: {
        label: 'Completed',
        color: 'bg-success-green',
        ariaLabel: 'Completed session',
      },
      CANCELLED: {
        label: 'Cancelled',
        color: 'bg-neutral-taupe',
        ariaLabel: 'Cancelled session',
      },
      PENDING: {
        label: 'Pending',
        color: 'bg-information-blue',
        ariaLabel: 'Pending session',
      },
    } as const;

    const config = statusConfig[status as keyof typeof statusConfig] || { label: '', color: '', ariaLabel: '' };

    return (
      <div 
        className="flex items-center"
        role="status"
        aria-label={config.ariaLabel}
        data-testid={`status-badge-${status.toLowerCase()}`}
      >
        <span className={`w-2 h-2 rounded-full ${config.color} mr-2`} aria-hidden="true"></span>
        <span>{config.label}</span>
      </div>
    );
  }

  // Format badge
  const getFormatBadge = (format: string) => {
    const formatConfig = {
      VIRTUAL: {
        label: 'Virtual',
        icon: (
          <path
            d="M15 10L19.5528 7.72361C19.8343 7.58281 20 7.30279 20 7V5.5C20 4.67157 19.3284 4 18.5 4H5.5C4.67157 4 4 4.67157 4 5.5V7C4 7.30279 4.16571 7.58281 4.44721 7.72361L9 10M15 10L9 10M15 10L15 20M9 10L9 20M15 20H9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ),
      },
      IN_PERSON: {
        label: 'In-person',
        icon: (
          <>
            <path
              d="M12 12.5C13.6569 12.5 15 11.1569 15 9.5C15 7.84315 13.6569 6.5 12 6.5C10.3431 6.5 9 7.84315 9 9.5C9 11.1569 10.3431 12.5 12 12.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22C12 22 20 18 20 11.5C20 6.25329 16.4183 2 12 2C7.58172 2 4 6.25329 4 11.5C4 18 12 22 12 22Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ),
      },
      BOTH: {
        label: 'Hybrid',
        icon: (
          <path
            d="M9 20H7C5.89543 20 5 19.1046 5 18V15M9 20H15M9 20V15M15 20H17C18.1046 20 19 19.1046 19 18V15M15 20V15M5 15V9C5 7.89543 5.89543 7 7 7H17C18.1046 7 19 7.89543 19 9V15M5 15H19"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ),
      },
    } as const;

    const config = formatConfig[format as keyof typeof formatConfig];
    if (!config) return null;

    return (
      <div 
        className="flex items-center text-neutral-taupe"
        role="img"
        aria-label={`Session format: ${config.label}`}
        data-testid={`format-badge-${format.toLowerCase()}`}
      >
        <svg 
          className="w-4 h-4 mr-1" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {config.icon}
        </svg>
        <span>{config.label}</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Card 
        className={`animate-pulse ${className}`}
        data-testid={`${testId}-loading`}
        role="status"
        aria-label="Loading session..."
        aria-busy="true"
      >
        <div 
          className="h-48 bg-gray-200" 
          aria-hidden="true"
          data-testid="loading-image"
        />
        <CardContent className="p-4 space-y-4">
          <div 
            className="h-6 bg-gray-200 rounded w-3/4" 
            aria-hidden="true"
            data-testid="loading-title"
          />
          <div 
            className="h-4 bg-gray-200 rounded w-1/2" 
            aria-hidden="true"
            data-testid="loading-subtitle"
          />
          <div 
            className="h-4 bg-gray-200 rounded w-full" 
            aria-hidden="true"
            data-testid="loading-description-1"
          />
          <div 
            className="h-4 bg-gray-200 rounded w-2/3" 
            aria-hidden="true"
            data-testid="loading-description-2"
          />
          <div 
            className="h-10 bg-gray-200 rounded mt-4" 
            aria-hidden="true"
            data-testid="loading-button"
          />
        </CardContent>
        <span className="sr-only">Loading session details...</span>
      </Card>
    )
  }

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md ${isSelected ? 'ring-2 ring-primary' : ''} ${className}`}
      data-testid={`${testId}-${session.id}`}
      onClick={onSelect}
      role={role}
      aria-live={ariaLive}
      aria-atomic={ariaAtomic}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-label={ariaLabel}
    >
      <CardContent className="p-0">
        <div className="p-4 border-b border-neutral-taupe/10">
          <div className="flex items-center justify-between">
            <Link 
              href={`/my-sessions/${session.id}`}
              id={`${testId}-${session.id}-title`}
              className="text-lg font-semibold text-primary-deep-brown hover:underline"
              data-testid={`${testId}-participant-name`}
            >
              {session.title}
            </Link>
            <div 
              className="flex items-center"
              data-testid={`${testId}-status`}
              id={`${testId}-${session.id}-status`}
            >
              {getStatusBadge(session.status)}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-start">
              <div className="mr-3 text-center">
                <div className="bg-background-ivory rounded-md px-2 py-1">
                  <div className="text-caption text-neutral-taupe uppercase">{format(startDate, "MMM")}</div>
                  <div className="text-h3 font-bold text-primary-deep-brown">{format(startDate, "dd")}</div>
                  <div className="text-caption text-neutral-taupe uppercase">{format(startDate, "EEE")}</div>
                </div>
              </div>
              <div>
                <p className="text-body-small text-neutral-taupe">{session.description}</p>
              </div>
            </div>
          </div>

          <div 
            className="grid grid-cols-3 gap-4 mb-4"
            role="region"
            aria-label="Session details"
          >
            <div>
              <div className="flex items-center gap-2 text-sm text-neutral-taupe mt-1">
                <div 
                  className="flex items-center"
                  data-testid={`${testId}-datetime`}
                >
                  <CalendarIcon 
                    className="h-4 w-4 text-neutral-taupe" 
                    aria-hidden="true"
                    data-testid={`${testId}-datetime-icon`}
                  />
                  <span 
                    className="text-sm"
                    id={`${testId}-${session.id}-date`}
                    data-testid={`${testId}-datetime-text`}
                  >
                    {format(startDate, 'MMM d, yyyy')} {format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-caption text-neutral-taupe uppercase mb-1">FORMAT</div>
              {getFormatBadge(session.format)}
            </div>
            <div>
              <div className="text-caption text-neutral-taupe uppercase mb-1">SKILL CATEGORY</div>
              <div className="inline-block bg-background-ivory rounded-full px-2 py-0.5 text-body-small text-neutral-taupe">
                {session.skill.category.icon} {session.skill.category.name}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div 
              className="flex items-center"
              data-testid={`${testId}-participant-info`}
            >
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={participant.avatar} alt={participant.name} />
                <AvatarFallback>
                  {participant.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 
                  className="font-medium text-sm"
                  data-testid={`${testId}-participant-name`}
                >
                  {participant.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isTeacher ? 'Teacher' : 'Learner'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onMessage && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onMessage()
                  }}
                  data-testid={`${testId}-message-button`}
                  aria-label={`Message ${participant.name}`}
                >
                  <MessageSquare className="h-4 w-4 mr-2" aria-hidden="true" />
                  <span>Message</span>
                </Button>
              )}
              
              {session.status === 'SCHEDULED' && onJoin && (
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onJoin()
                  }}
                  data-testid={`${testId}-join-button`}
                  aria-label="Join session"
                >
                  Join Session
                </Button>
              )}

              {session.status === 'COMPLETED' && onReview && !isTeacher && (
                <Button
                  className="bg-primary-warm-gold hover:bg-primary-warm-gold/90"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onReview()
                  }}
                  data-testid={`${testId}-review-button`}
                  aria-label="Review session"
                >
                  <Star className="h-4 w-4 mr-1" />
                  Review
                </Button>
              )}

              {session.status === 'CANCELLED' && onReschedule && (
                <Button
                  className="bg-primary-warm-gold hover:bg-primary-warm-gold/90"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onReschedule()
                  }}
                  data-testid={`${testId}-reschedule-button`}
                  aria-label="Reschedule session"
                >
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  Reschedule
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
