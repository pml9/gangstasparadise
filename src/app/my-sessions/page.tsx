"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from "date-fns"
import { CalendarIcon, List, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { SessionCard } from "@/components/session-card"
import { EmptySessionState } from "@/components/empty-session-state"
import type { Session } from "@/types/session"
import type { ApiResponse } from "@/types/api"
import { SessionStatus } from "@/types/common"
import MySessionsLoading from "./loading"

// We'll get the current user ID from the session or auth context
const CURRENT_USER_ID = "current-user-id" // TODO: Replace with actual user ID from auth context

export default function MySessionsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 4)) // May 2025
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([])
  const [pastSessions, setPastSessions] = useState<Session[]>([])
  const [cancelledSessions, setCancelledSessions] = useState<Session[]>([])
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch sessions data from API
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch('/api/sessions')
        if (!response.ok) {
          throw new Error('Failed to fetch sessions')
        }
        
        const responseData: ApiResponse<Session[]> = await response.json()
        const data = responseData.data!
        
        // Filter sessions based on their status and date
        const now = new Date()
        const upcoming = data.filter(session => 
          new Date(session.startTime) > now && session.status === 'SCHEDULED'
        )
        const past = data.filter(session => 
          new Date(session.startTime) <= now && session.status === 'COMPLETED'
        )
        const cancelled = data.filter(session => 
          session.status === SessionStatus.CANCELLED
        )
        
        setUpcomingSessions(upcoming)
        setPastSessions(past)
        setCancelledSessions(cancelled)
        
        // Set the first upcoming session as selected by default, or first pending if no upcoming
        if (upcoming.length > 0) {
          setSelectedSession(upcoming[0])
        } else if (past.length > 0) {
          setSelectedSession(past[0])
        } else if (cancelled.length > 0) {
          setSelectedSession(cancelled[0])
        }
      } catch (err) {
        console.error('Error fetching sessions:', err)
        setError('Failed to load sessions. Please try again later.')
        toast({
          title: 'Error',
          description: 'Failed to load sessions. Please try again later.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchSessions()
  }, [])

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Set the first session of the selected tab as selected
    if (value === "upcoming" && upcomingSessions.length > 0) {
      setSelectedSession(upcomingSessions[0])
    } else if (value === "past" && pastSessions.length > 0) {
      setSelectedSession(pastSessions[0])
    } else if (value === "requests" && cancelledSessions.length > 0) {
      setSelectedSession(cancelledSessions[0])
    } else {
      setSelectedSession(null)
    }
  }

  // Handle session selection
  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session)
  }

  // Handle join session
  const handleJoinSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/sessions/${sessionId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to join session')
      }

      const { meetingUrl } = await response.json()
      
      // Redirect to the meeting URL or open in a new tab
      window.open(meetingUrl, '_blank')
      
      toast({
        title: "Joining session",
        description: "You're being redirected to the virtual session...",
      })
    } catch (error) {
      console.error('Error joining session:', error)
      toast({
        title: "Error",
        description: "Failed to join the session. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle message
  const handleMessage = (participantId: string) => {
    toast({
      title: "Message",
      description: "Opening message thread...",
    })
  }

  // Handle review
  const handleReview = (sessionId: string) => {
    toast({
      title: "Review",
      description: "Opening review form...",
    })
  }

  // Handle reschedule
  const handleReschedule = (sessionId: string) => {
    toast({
      title: "Reschedule",
      description: "Opening reschedule form...",
    })
  }

  // Handle browse skills action
  const handleBrowseSkills = () => {
    router.push("/browse")
  }

  // Generate calendar days
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Previous month days to fill the first row
  const prevMonthDays = []
  const firstDayOfMonth = monthStart.getDay()
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const date = new Date(monthStart)
    date.setDate(date.getDate() - (i + 1))
    prevMonthDays.push(date)
  }

  // Next month days to fill the last row
  const nextMonthDays = []
  const lastDayOfMonth = monthEnd.getDay()
  for (let i = 1; i < 7 - lastDayOfMonth; i++) {
    const date = new Date(monthEnd)
    date.setDate(date.getDate() + i)
    nextMonthDays.push(date)
  }

  // All calendar days
  const calendarDays = [...prevMonthDays, ...monthDays, ...nextMonthDays]

  // Check if a day has sessions
  const getSessionsForDay = (day: Date) => {
    const allSessions = [...upcomingSessions, ...pastSessions, ...cancelledSessions]
    return allSessions.filter((session) => {
      const sessionDate = parseISO(session.startTime)
      return isSameDay(sessionDate, day)
    })
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-primary-warm-gold"
      case "COMPLETED":
        return "bg-success-green"
      case "CANCELLED":
        return "bg-neutral-taupe"
      default:
        return "bg-neutral-taupe"
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <MySessionsLoading />
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-background-light min-h-screen pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
                <div className="mt-2">
                  <button
                    onClick={() => window.location.reload()}
                    className="text-sm font-medium text-red-700 hover:text-red-600"
                  >
                    Try again <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background-light min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-h2 font-bold text-primary-deep-brown mb-1">My Sessions</h1>
          <p className="text-body text-neutral-taupe">Manage your upcoming and past learning sessions</p>
        </div>

        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={handleTabChange}>
          <div className="border-b border-neutral-taupe/10 mb-6">
            <TabsList className="bg-transparent p-0 h-auto">
              <TabsTrigger
                value="upcoming"
                className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary-warm-gold data-[state=active]:text-primary-warm-gold rounded-none"
              >
                Upcoming
                {upcomingSessions.length > 0 && (
                  <span className="ml-2 text-caption bg-primary-warm-gold/10 text-primary-warm-gold rounded-full px-2">
                    {upcomingSessions.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary-warm-gold data-[state=active]:text-primary-warm-gold rounded-none"
              >
                Past
                {pastSessions.length > 0 && (
                  <span className="ml-2 text-caption bg-neutral-taupe/10 text-neutral-taupe rounded-full px-2">
                    {pastSessions.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary-warm-gold data-[state=active]:text-primary-warm-gold rounded-none"
              >
                Cancelled
                {cancelledSessions.length > 0 && (
                  <span className="ml-2 text-caption bg-information-blue/10 text-information-blue rounded-full px-2">
                    {cancelledSessions.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "calendar" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("calendar")}
                className={viewMode === "calendar" ? "bg-primary-warm-gold text-white" : ""}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Calendar
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-primary-warm-gold text-white" : ""}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 6H21M3 12H21M3 18H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Sort
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar view */}
            {viewMode === "calendar" && (
              <div className="lg:col-span-1">
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-h4 font-semibold text-primary-deep-brown">May 2025</h3>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M15 18L9 12L15 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M9 18L15 12L9 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="text-center text-caption text-neutral-taupe font-medium">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((day, index) => {
                        const sessionsForDay = getSessionsForDay(day)
                        const isCurrentMonth = isSameMonth(day, currentMonth)
                        const isToday = isSameDay(day, new Date(2025, 4, 25)) // Assuming May 25, 2025 is "today"
                        const hasSession = sessionsForDay.length > 0
                        const isSelected = selectedSession && isSameDay(parseISO(selectedSession.startTime), day)

                        return (
                          <div
                            key={index}
                            className={`
                              p-1 text-center rounded-md cursor-pointer
                              ${!isCurrentMonth ? "text-neutral-taupe/40" : ""}
                              ${isToday ? "bg-primary-warm-gold/10" : ""}
                              ${isSelected ? "border-2 border-primary-warm-gold" : ""}
                              ${hasSession && !isSelected ? "border border-neutral-taupe/20" : ""}
                              hover:bg-background-ivory transition-colors
                            `}
                            onClick={() => {
                              if (hasSession) {
                                handleSessionSelect(sessionsForDay[0])
                              }
                            }}
                          >
                            <div className="text-body-small font-medium">{format(day, "d")}</div>
                            <div className="flex justify-center mt-1 space-x-1">
                              {sessionsForDay.slice(0, 3).map((session, idx) => (
                                <div
                                  key={idx}
                                  className={`w-2 h-2 rounded-full ${getStatusColor(session.status)}`}
                                  title={session.title}
                                />
                              ))}
                              {sessionsForDay.length > 3 && (
                                <span className="text-caption text-neutral-taupe">+{sessionsForDay.length - 3}</span>
                              )}
                            </div>
                            {hasSession && sessionsForDay[0].skill && (
                              <div className="mt-1 text-caption text-neutral-taupe truncate">
                                {sessionsForDay[0].skill.name.split(" ")[0]}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    <div className="flex items-center justify-center mt-4 space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-primary-warm-gold mr-2"></div>
                        <span className="text-caption text-neutral-taupe">Scheduled</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-success-green mr-2"></div>
                        <span className="text-caption text-neutral-taupe">Completed</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-neutral-taupe mr-2"></div>
                        <span className="text-caption text-neutral-taupe">Cancelled</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Session details */}
            <div className={viewMode === "calendar" ? "lg:col-span-2" : "lg:col-span-3"}>
              <TabsContent value="upcoming" className="mt-0 space-y-4">
                {upcomingSessions.length > 0 ? (
                  upcomingSessions.map((session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      currentUserId={CURRENT_USER_ID}
                      isSelected={selectedSession?.id === session.id}
                      onSelect={() => handleSessionSelect(session)}
                      onJoin={() => handleJoinSession(session.id)}
                      onMessage={() =>
                        handleMessage(session.teacher.id !== CURRENT_USER_ID ? session.teacher.id : session.learner.id)
                      }
                    />
                  ))
                ) : (
                  <EmptySessionState type="upcoming" onAction={handleBrowseSkills} />
                )}
              </TabsContent>

              <TabsContent value="past" className="mt-0 space-y-4">
                {pastSessions.length > 0 ? (
                  pastSessions.map((session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      currentUserId={CURRENT_USER_ID}
                      isSelected={selectedSession?.id === session.id}
                      onSelect={() => handleSessionSelect(session)}
                      onMessage={() =>
                        handleMessage(session.teacher.id !== CURRENT_USER_ID ? session.teacher.id : session.learner.id)
                      }
                      onReview={() => handleReview(session.id)}
                    />
                  ))
                ) : (
                  <EmptySessionState type="past" onAction={handleBrowseSkills} />
                )}
              </TabsContent>

              <TabsContent value="cancelled" className="mt-0 space-y-4">
                {cancelledSessions.length > 0 ? (
                  cancelledSessions.map((session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      currentUserId={CURRENT_USER_ID}
                      isSelected={selectedSession?.id === session.id}
                      onSelect={() => handleSessionSelect(session)}
                      onMessage={() =>
                        handleMessage(session.teacher.id !== CURRENT_USER_ID ? session.teacher.id : session.learner.id)
                      }
                    />
                  ))
                ) : (
                  <EmptySessionState type="cancelled" onAction={handleBrowseSkills} />
                )}
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
