"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { format, differenceInMinutes, isPast } from "date-fns"
import { Calendar, Clock, MapPin, Video, Copy, ChevronRight, AlertCircle, Info } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Session } from "@/types/session"
import { ApiResponse } from "@/types"
import SessionDetailLoading from "./loading"

export default function SessionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [session, setSession] = useState<Session | undefined>(undefined)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isSessionInPast, setIsSessionInPast] = useState(false)
  const [joinEnabled, setJoinEnabled] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch session data based on ID
  useEffect(() => {
    const fetchSession = async () => {
      if (!params.id) return
      
      setIsLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`/api/sessions/${params.id}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            router.push("/my-sessions")
            return
          }
          throw new Error('Failed to fetch session')
        }
        
        const data: ApiResponse<Session> = await response.json()
        setSession(data.data)
      } catch (error) {
        console.error("Error fetching session:", error)
        setError(error instanceof Error ? error.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSession()
  }, [params.id, router])

  // Calculate time left until session starts
  useEffect(() => {
    if (!session) return

    const calculateTimeLeft = () => {
      const startTime = new Date(session.startTime)
      const now = new Date()
      const difference = startTime.getTime() - now.getTime()

      if (difference <= 0) {
        // Session is in the past
        setIsSessionInPast(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      // Enable join button 5 minutes before session starts
      if (difference <= 5 * 60 * 1000) {
        setJoinEnabled(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [session])

  const formatSessionTime = (dateString: string) => {
    return format(new Date(dateString), "h:mm a")
  }

  const formatSessionDate = (dateString: string) => {
    return format(new Date(dateString), "EEEE, MMMM d, yyyy")
  }

  const calculateDuration = () => {
    if (!session) return ""

    const start = new Date(session.startTime)
    const end = new Date(session.endTime)
    const durationMinutes = differenceInMinutes(end, start)
    return `${durationMinutes} minutes`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <SessionDetailLoading />
    )
  }

  if (!session) {
    return (
      <div className="bg-background-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-error-red mx-auto mb-4" />
          <h2 className="text-h3 font-bold text-primary-deep-brown mb-2">Session not found</h2>
          <p className="text-body text-neutral-taupe mb-6">
            The session you're looking for doesn't exist or has been removed.
          </p>
          <Button
            className="bg-primary-warm-gold hover:bg-primary-warm-gold/90"
            onClick={() => router.push("/my-sessions")}
          >
            Back to My Sessions
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background-light min-h-screen pb-16">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-body-small text-neutral-taupe mb-6">
          <Link href="/my-sessions" className="hover:text-primary-warm-gold transition-colors">
            My Sessions
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-primary-deep-brown">{session.skill?.name || session.title}</span>
        </div>

        {/* Session status alerts */}
        {session.status === "CANCELLED" ? (
          <div className="bg-error-red/10 border border-error-red/30 rounded-lg p-4 mb-6 flex items-center">
            <div className="bg-error-red rounded-full p-2 mr-4">
              <AlertCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-body font-semibold text-error-red">This session has been cancelled</h3>
              <p className="text-body-small text-neutral-taupe">
                This session is no longer available. Please check your other sessions or schedule a new one.
              </p>
            </div>
          </div>
        ) : isSessionInPast ? (
          <div className="bg-neutral-taupe/10 border border-neutral-taupe/30 rounded-lg p-4 mb-6 flex items-center">
            <div className="bg-neutral-taupe rounded-full p-2 mr-4">
              <Info className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-body font-semibold text-neutral-taupe">This session has ended</h3>
              <p className="text-body-small text-neutral-taupe">
                This session took place on {formatSessionDate(session.startTime)}. We hope it was valuable!
              </p>
            </div>
          </div>
        ) : (
          session.status === "SCHEDULED" && (
            <div className="bg-secondary-gold-pale border border-primary-warm-gold/30 rounded-lg p-4 mb-6 flex items-center">
              <div className="bg-primary-warm-gold rounded-full p-2 mr-4">
                <Info className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-body font-semibold text-primary-deep-brown">Your session is starting soon!</h3>
                <p className="text-body-small text-neutral-taupe">
                  Starts in: {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes
                </p>
              </div>
            </div>
          )
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="w-full lg:w-2/3">
            {/* Session header */}
            <div className="bg-background-ivory rounded-xl p-6 mb-6 border border-neutral-taupe/10 shadow-card">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col items-center md:items-start">
                  <div className="bg-secondary-gold-pale rounded-lg p-2 mb-2">
                    <div className="text-overline text-primary-warm-gold">
                      {session.skill?.category?.name || "Skill"}
                    </div>
                    <div className="text-h2 font-bold">
                      <span className="text-primary-deep-brown">{format(new Date(session.startTime), "dd")}</span>
                    </div>
                    <div className="text-caption text-neutral-taupe uppercase">
                      {format(new Date(session.startTime), "EEE")}
                    </div>
                  </div>
                  <Badge
                    className={`${
                      session.format === "VIRTUAL"
                        ? "bg-information-blue/10 text-information-blue"
                        : session.format === "IN_PERSON"
                          ? "bg-success-green/10 text-success-green"
                          : "bg-warning-amber/10 text-warning-amber"
                    }`}
                  >
                    {session.format === "VIRTUAL" ? (
                      <>
                        <Video className="h-3 w-3 mr-1" /> Virtual
                      </>
                    ) : session.format === "IN_PERSON" ? (
                      <>
                        <MapPin className="h-3 w-3 mr-1" /> In-person
                      </>
                    ) : (
                      <>
                        <div className="flex">
                          <Video className="h-3 w-3 mr-1" />
                          <MapPin className="h-3 w-3 mr-1" />
                        </div>
                        Hybrid
                      </>
                    )}
                  </Badge>
                </div>

                <div className="flex-1">
                  <h1 className="text-h3 font-bold text-primary-deep-brown mb-2">{session.title}</h1>
                  <p className="text-body text-neutral-taupe mb-4">{session.description}</p>
                </div>
              </div>
            </div>

            {/* Session details */}
            <div className="bg-background-ivory rounded-xl p-6 mb-6 border border-neutral-taupe/10 shadow-card">
              <h2 className="text-h4 font-semibold text-primary-deep-brown mb-4">DATE & TIME</h2>
              <div className="flex items-start mb-4">
                <Calendar className="h-5 w-5 text-primary-warm-gold mr-3 mt-0.5" />
                <div>
                  <p className="text-body font-medium">{formatSessionDate(session.startTime)}</p>
                </div>
              </div>
              <div className="flex items-start mb-6">
                <Clock className="h-5 w-5 text-primary-warm-gold mr-3 mt-0.5" />
                <div>
                  <p className="text-body font-medium">
                    {formatSessionTime(session.startTime)} - {formatSessionTime(session.endTime)} ({calculateDuration()}
                    )
                  </p>
                </div>
              </div>

              {session.format === "VIRTUAL" && (
                <>
                  <h2 className="text-h4 font-semibold text-primary-deep-brown mb-4">MEETING INFORMATION</h2>
                  <div className="flex items-center mb-4">
                    <Video className="h-5 w-5 text-primary-warm-gold mr-3" />
                    <p className="text-body font-medium">Zoom Meeting</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto"
                      disabled={!joinEnabled}
                      onClick={() => window.open(session.meetingLink, "_blank")}
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Join Meeting
                    </Button>
                  </div>
                  <p className="text-body-small text-neutral-taupe mb-4">
                    The meeting link will be active 5 minutes before the session starts.
                  </p>
                  <div className="bg-background-light rounded-lg p-4 mb-2">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-body-small text-neutral-taupe">Meeting ID:</p>
                      <div className="flex items-center">
                        <p className="text-body font-medium mr-2">{session.meetingLink || "835 2469 913"}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard(session.meetingLink || "835 2469 913")}
                        >
                          <Copy className="h-4 w-4 text-primary-warm-gold" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {copied && <p className="text-caption text-success-green mt-1">Copied to clipboard successfully!</p>}
                </>
              )}

              {session.format === "IN_PERSON" && session.location && (
                <>
                  <h2 className="text-h4 font-semibold text-primary-deep-brown mb-4">LOCATION</h2>
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-primary-warm-gold mr-3 mt-0.5" />
                    <div>
                      <p className="text-body font-medium">{session.location.address}</p>
                      <p className="text-body-small text-neutral-taupe">
                        Please arrive 10 minutes before the session starts.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden h-48 mb-4">
                    <Image
                      src="/berlin-city-map.png"
                      alt="Location map"
                      width={800}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </>
              )}
            </div>

            {/* Participant information */}
            <div className="bg-background-ivory rounded-xl p-6 mb-6 border border-neutral-taupe/10 shadow-card">
              <h2 className="text-h4 font-semibold text-primary-deep-brown mb-4">PARTICIPANT</h2>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage
                    src={session.learner?.image || "/placeholder.svg"}
                    alt={session.learner?.name || "Participant"}
                  />
                  <AvatarFallback>{session.learner?.name?.charAt(0) || "P"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-body font-medium">{session.learner?.name || "Participant"}</p>
                  <div className="flex items-center">
                    <Badge className="bg-accent-sage/20 text-accent-sage mr-2">Learner</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Add to calendar */}
            <div className="bg-background-ivory rounded-xl p-6 mb-6 border border-neutral-taupe/10 shadow-card">
              <h2 className="text-h4 font-semibold text-primary-deep-brown mb-4">Add to Calendar</h2>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6 4.5V7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 4.5V7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 9.5H3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.5 5.25H4.5C3.67157 5.25 3 5.92157 3 6.75V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V6.75C21 5.92157 20.3284 5.25 19.5 5.25Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Google Calendar
                </Button>
                <Button variant="outline" className="flex items-center">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16.5 2H7.5C6.67157 2 6 2.67157 6 3.5V20.5C6 21.3284 6.67157 22 7.5 22H16.5C17.3284 22 18 21.3284 18 20.5V3.5C18 2.67157 17.3284 2 16.5 2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M12 18H12.01"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Apple Calendar
                </Button>
                <Button variant="outline" className="flex items-center">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M16.5 7.5H7.5V16.5H16.5V7.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5 10.5H16.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5 7.5V16.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Outlook
                </Button>
                <Button variant="outline" className="flex items-center">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.5 3.75H4.5C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M16.5 2.25V5.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5 2.25V5.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.75 8.25H20.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Other Calendar
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-background-ivory rounded-xl p-6 border border-neutral-taupe/10 shadow-card sticky top-6">
              <h2 className="text-h4 font-semibold text-primary-deep-brown text-center mb-2">
                {session.status === "CANCELLED" 
                  ? "Session Cancelled" 
                  : isSessionInPast 
                    ? "Session Completed" 
                    : "Countdown to Session"}
              </h2>
              <p className="text-body-small text-neutral-taupe text-center mb-6">
                {formatSessionDate(session.startTime)} at {formatSessionTime(session.startTime)}
                {isSessionInPast && (
                  <span className="block text-sm text-neutral-taupe/80 mt-1">
                    Duration: {calculateDuration()}
                  </span>
                )}
              </p>

              <div className="grid grid-cols-4 gap-2 mb-6">
                {session.status === "CANCELLED" ? (
                  <div className="col-span-4 py-8 text-center">
                    <div className="text-h4 font-bold text-error-red mb-2">Cancelled</div>
                    <p className="text-sm text-neutral-taupe">This session is no longer available</p>
                  </div>
                ) : isSessionInPast ? (
                  <div className="col-span-4 py-8 text-center">
                    <div className="text-h4 font-bold text-primary-deep-brown mb-2">Session Completed</div>
                    <p className="text-sm text-neutral-taupe">
                      Thank you for participating!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <div className="bg-background-light rounded-lg p-3 w-full text-center mb-1">
                        <span className="text-h3 font-bold text-primary-warm-gold">
                          {timeLeft.days.toString().padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-caption text-neutral-taupe">Days</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-background-light rounded-lg p-3 w-full text-center mb-1">
                        <span className="text-h3 font-bold text-primary-warm-gold">
                          {timeLeft.hours.toString().padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-caption text-neutral-taupe">Hours</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-background-light rounded-lg p-3 w-full text-center mb-1">
                        <span className="text-h3 font-bold text-primary-warm-gold">
                          {timeLeft.minutes.toString().padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-caption text-neutral-taupe">Minutes</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-background-light rounded-lg p-3 w-full text-center mb-1">
                        <span className="text-h3 font-bold text-primary-warm-gold">
                          {timeLeft.seconds.toString().padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-caption text-neutral-taupe">Seconds</span>
                    </div>
                  </>
                )}
              </div>

              {session.status === "CANCELLED" ? (
                <Button
                  className="w-full bg-neutral-300 text-neutral-500 cursor-not-allowed mb-4"
                  disabled
                >
                  Session Cancelled
                </Button>
              ) : isSessionInPast ? (
                <Button
                  className="w-full bg-neutral-200 text-neutral-600 hover:bg-neutral-200 mb-4"
                  variant="outline"
                >
                  <Video className="mr-2 h-4 w-4" />
                  Session Ended
                </Button>
              ) : (
                <>
                  <Button
                    className="w-full bg-primary-warm-gold hover:bg-primary-warm-gold/90 text-white mb-4"
                    disabled={!joinEnabled}
                    onClick={() => session.meetingLink && window.open(session.meetingLink, "_blank")}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    {joinEnabled ? 'Join Session' : 'Session Starting Soon'}
                  </Button>
                  {!joinEnabled && (
                    <p className="text-caption text-neutral-taupe text-center mb-6">
                      The join button will be enabled 5 minutes before the session starts.
                    </p>
                  )}
                </>
              )}

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="#">
                    <Calendar className="mr-2 h-4 w-4 text-primary-warm-gold" />
                    Reschedule
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="#">
                    <svg
                      className="mr-2 h-4 w-4 text-primary-warm-gold"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.625 9C8.625 8.17157 9.29657 7.5 10.125 7.5H13.875C14.7034 7.5 15.375 8.17157 15.375 9V9.75C15.375 10.5784 14.7034 11.25 13.875 11.25H10.125C9.29657 11.25 8.625 11.9216 8.625 12.75V13.5C8.625 14.3284 9.29657 15 10.125 15H13.875C14.7034 15 15.375 14.3284 15.375 13.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 5.25V7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 15V17.25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Message Participant
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                {session.status === "CANCELLED" ? (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-neutral-500 border-neutral-300 hover:bg-neutral-100 cursor-not-allowed"
                    disabled
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 8V12M12 16H12.01"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Session Cancelled
                  </Button>
                ) : isSessionInPast ? (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-neutral-500 border-neutral-300 hover:bg-neutral-100"
                    onClick={() => {
                      // TODO: Implement session feedback
                      alert('Redirecting to feedback form...')
                    }}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 12L12 12L12 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 16L12 12L8 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Leave Feedback
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-error-red border-error-red hover:bg-error-red/10"
                    onClick={() => {
                      // TODO: Implement session cancellation
                      if (confirm('Are you sure you want to cancel this session?')) {
                        alert('Session cancellation requested. This feature will be implemented soon.')
                      }
                    }}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Cancel Session
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
