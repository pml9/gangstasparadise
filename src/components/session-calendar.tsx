"use client"

import { useState } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns"
import { type Session } from "@/types/session"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

type SessionStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'PENDING'

interface SessionCalendarProps {
  /** List of sessions to display on the calendar */
  sessions: Session[]
  /** ID of the current user */
  currentUserId: string
  /** Callback when a date is selected */
  onSelectDate: (date: Date, sessions: Session[]) => void
  /** Test ID for testing purposes */
  testId?: string
  /** Additional class names */
  className?: string
  /** Accessibility properties */
  ally?: {
    /** ARIA role for the calendar */
    role?: string
    /** ARIA label for the calendar */
    'aria-label'?: string
    /** ARIA live region setting */
    'aria-live'?: 'polite' | 'assertive' | 'off'
    /** ARIA controls ID for the calendar */
    'aria-controls'?: string
  }
}

export default function SessionCalendar({ 
  sessions, 
  currentUserId, 
  onSelectDate, 
  testId = 'session-calendar',
  className = '',
  ally = {}
}: SessionCalendarProps) {
  const { 
    role = 'application',
    'aria-label': ariaLabel = 'Session calendar',
    'aria-live': ariaLive = 'polite',
    'aria-controls': ariaControls
  } = ally;
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  const getSessionsForDate = (date: Date) => {
    return sessions.filter((session) => {
      const sessionDate = new Date(session.startTime)
      return isSameDay(sessionDate, date)
    })
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    const sessionsForDate = getSessionsForDate(date)
    onSelectDate(date, sessionsForDate)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return "bg-primary-warm-gold"
      case 'COMPLETED': return "bg-success-green"
      case 'CANCELLED': return "bg-neutral-taupe"
      case 'PENDING': return "bg-information-blue"
      default: return "bg-neutral-taupe"
    }
  }

  return (
    <Card 
      className={`p-4 ${className}`}
      data-testid={testId}
      aria-label={ariaLabel}
      role="application"
      aria-roledescription="Calendar"
      aria-live="polite"
      aria-atomic="true"
    >
      <div 
        className="flex items-center justify-between mb-4"
        role="navigation"
        aria-label="Calendar navigation"
      >
        <h2 
          className="text-h4 font-semibold text-primary-deep-brown"
          id="current-month-year"
          aria-live="polite"
          aria-atomic="true"
        >
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevMonth}
            aria-label="Previous month"
            data-testid="prev-month-button"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextMonth}
            aria-label="Next month"
            data-testid="next-month-button"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div 
        className="grid grid-cols-7 gap-1 mb-2"
        role="row"
        aria-label="Weekday headers"
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => {
          const fullDayNames: Record<string, string> = {
            "Sun": "Sunday",
            "Mon": "Monday",
            "Tue": "Tuesday",
            "Wed": "Wednesday",
            "Thu": "Thursday",
            "Fri": "Friday",
            "Sat": "Saturday"
          }
          
          return (
            <div 
              key={day} 
              className="text-center text-body-small text-neutral-taupe font-medium"
              role="columnheader"
              aria-label={fullDayNames[day]}
              data-testid={`weekday-${day.toLowerCase()}`}
            >
              {day}
            </div>
          )
        })}
      </div>

      <div 
        className="grid grid-cols-7 gap-1"
        role="grid"
        aria-label="Monthly calendar"
        aria-labelledby="current-month-year"
      >
        {monthDays.map((day) => {
          const sessionsForDay = getSessionsForDate(day)
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isSelected = selectedDate && isSameDay(day, selectedDate)
          const isToday = isSameDay(day, new Date())
          const dayFormatted = format(day, 'yyyy-MM-dd')
          const dayLabel = format(day, "EEEE, MMMM d, yyyy")
          const dayNumber = format(day, "d")
          const sessionCount = sessionsForDay.length
          const sessionLabel = sessionCount > 0 
            ? `, ${sessionCount} session${sessionCount > 1 ? 's' : ''}` 
            : ''
          const isDisabled = !isCurrentMonth

          return (
            <div
              key={dayFormatted}
              className={`
                min-h-[60px] p-1 rounded-md border border-neutral-taupe/10
                ${!isCurrentMonth ? "opacity-30" : ""}
                ${isSelected ? "border-primary-warm-gold border-2" : ""}
                ${isToday ? "bg-secondary-gold-pale/30" : ""}
                hover:bg-background-light transition-colors
                ${isCurrentMonth ? 'cursor-pointer' : 'cursor-default'}
              `}
              onClick={() => isCurrentMonth && handleDateClick(day)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  isCurrentMonth && handleDateClick(day)
                }
              }}
              role="button"
              tabIndex={isCurrentMonth ? 0 : -1}
              aria-disabled={!isCurrentMonth}
              aria-selected={isSelected || undefined}
              aria-label={`${dayLabel}${sessionCount > 0 ? `, ${sessionCount} session${sessionCount > 1 ? 's' : ''} scheduled` : ', No sessions'}`}
              data-testid={`day-${dayFormatted}`}
              data-today={isToday}
              data-selected={isSelected || undefined}
              data-has-sessions={sessionCount > 0}
              data-current-month={isCurrentMonth}
              data-day-number={dayNumber}
            >
              <div 
                className="text-right text-body-small font-medium"
                data-testid="day-number"
                aria-hidden="true"
              >
                {dayNumber}
                {isToday && (
                  <span 
                    className="sr-only"
                    data-testid="today-indicator"
                  >
                    , today
                  </span>
                )}
              </div>

              <div 
                className="mt-1 flex flex-wrap gap-1"
                role="list"
                aria-label="Session indicators"
              >
                {sessionsForDay.slice(0, 3).map((session) => (
                  <div
                    key={session.id}
                    className={`w-2 h-2 rounded-full ${getStatusColor(session.status)}`}
                    title={`${session.title} - ${session.status}`}
                    role="listitem"
                    aria-label={`${session.status} session`}
                    data-testid={`session-indicator-${session.id}`}
                    data-session-status={session.status.toLowerCase()}
                  />
                ))}
                {sessionCount > 3 && (
                  <div 
                    className="text-caption text-neutral-taupe"
                    data-testid="additional-sessions-count"
                    role="listitem"
                    aria-label={`${sessionCount - 3} more sessions`}
                  >
                    +{sessionCount - 3}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
