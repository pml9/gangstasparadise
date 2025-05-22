"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Video, Mic, MicOff, VideoOff, MessageSquare, Users, Share2, Settings, X, Clock } from "lucide-react"

interface ActiveSessionViewProps {
  /** Title of the session */
  sessionTitle: string
  /** Name of the participant */
  participantName: string
  /** URL of the participant's image */
  participantImage: string
  /** Callback when the session is ended */
  onEndSession: () => void
  /** Test ID for testing purposes */
  testId?: string
  /** Additional accessibility attributes */
  ally?: {
    /** ARIA label for the session view */
    'aria-label'?: string
    /** ARIA role for the session view */
    role?: string
    /** ARIA live region setting */
    'aria-live'?: 'polite' | 'assertive' | 'off'
  }
}

export default function ActiveSessionView({
  sessionTitle,
  participantName,
  participantImage,
  onEndSession,
  testId = 'active-session-view',
  ally = {}
}: ActiveSessionViewProps) {
  const { 
    'aria-label': ariaLabel = 'Active session',
    role = 'region',
    'aria-live': ariaLive = 'polite'
  } = ally;
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [notes, setNotes] = useState("")

  // Timer for session duration
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <div className="bg-background-ivory rounded-xl overflow-hidden border border-neutral-taupe/10 shadow-card">
      {/* Session header */}
      <div className="bg-primary-deep-brown p-4 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-body font-semibold text-white">{sessionTitle}</h2>
          <div className="ml-4 flex items-center bg-white/10 rounded-full px-3 py-1">
            <Clock className="h-3 w-3 text-white mr-1" />
            <span className="text-caption text-white">{formatTime(elapsedTime)}</span>
          </div>
        </div>
        <Button variant="destructive" size="sm" className="bg-error-red hover:bg-error-red/90" onClick={onEndSession}>
          <X className="h-4 w-4 mr-1" />
          End Session
        </Button>
      </div>

      {/* Video area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="md:col-span-2 bg-neutral-taupe/10 rounded-lg aspect-video relative">
          {isVideoOn ? (
            <div className="w-full h-full bg-neutral-taupe/20 rounded-lg flex items-center justify-center">
              <video className="w-full h-full object-cover rounded-lg" autoPlay muted />
            </div>
          ) : (
            <div className="w-full h-full bg-neutral-taupe/20 rounded-lg flex items-center justify-center">
              <div className="bg-primary-deep-brown rounded-full p-6">
                <Users className="h-12 w-12 text-white" />
              </div>
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-caption">You</div>
        </div>

        <div className="bg-neutral-taupe/10 rounded-lg aspect-video relative">
          <div className="w-full h-full bg-neutral-taupe/20 rounded-lg flex items-center justify-center">
            <img
              src={participantImage || "/placeholder.svg"}
              alt={participantName}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-caption">
            {participantName}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 p-4 border-t border-b border-neutral-taupe/10">
        <Button
          variant={isMicOn ? "default" : "secondary"}
          size="icon"
          className={isMicOn ? "bg-primary-warm-gold hover:bg-primary-warm-gold/90" : ""}
          onClick={() => setIsMicOn(!isMicOn)}
        >
          {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        <Button
          variant={isVideoOn ? "default" : "secondary"}
          size="icon"
          className={isVideoOn ? "bg-primary-warm-gold hover:bg-primary-warm-gold/90" : ""}
          onClick={() => setIsVideoOn(!isVideoOn)}
        >
          {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        <Button variant="outline" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Tabs for chat and notes */}
      <Tabs defaultValue="notes" className="p-4">
        <TabsList className="mb-4">
          <TabsTrigger value="chat" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center">
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 14H16M8 10H16M10 18H14M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Notes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="h-48 overflow-y-auto bg-background-light rounded-lg p-4">
            <div className="flex items-start mb-4">
              <div className="bg-primary-warm-gold rounded-full w-8 h-8 flex items-center justify-center text-white font-medium mr-2">
                Y
              </div>
              <div className="bg-primary-warm-gold/10 rounded-lg p-2 max-w-[80%]">
                <p className="text-body-small">Welcome to the session! Let me know if you have any questions.</p>
                <p className="text-caption text-neutral-taupe mt-1">2:01 PM</p>
              </div>
            </div>
            <div className="flex items-start mb-4 justify-end">
              <div className="bg-background-ivory rounded-lg p-2 max-w-[80%]">
                <p className="text-body-small">Thanks! I'm excited to learn JavaScript fundamentals.</p>
                <p className="text-caption text-neutral-taupe mt-1">2:02 PM</p>
              </div>
              <div className="bg-primary-deep-brown rounded-full w-8 h-8 flex items-center justify-center text-white font-medium ml-2">
                A
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Textarea placeholder="Type your message..." className="resize-none" />
            <Button className="bg-primary-warm-gold hover:bg-primary-warm-gold/90">Send</Button>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Textarea
            placeholder="Take notes during your session..."
            className="min-h-48 resize-none"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="flex justify-end">
            <Button variant="outline">Save Notes</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
