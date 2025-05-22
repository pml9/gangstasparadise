"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { MapPin, Clock, Users, CalendarIcon, CheckCircle2 } from "lucide-react"
import type { Skill } from "@/types/skill"

interface SessionRequestModalProps {
  /** Skill data for the session request */
  skill: Skill
  /** Whether the modal is open */
  isOpen: boolean
  /** Callback when the modal is closed */
  onClose: () => void
  /** Test ID for testing purposes */
  testId?: string
  /** Additional accessibility attributes */
  ally?: {
    /** ARIA label for the modal */
    'aria-label'?: string
    /** ARIA description for the modal */
    'aria-describedby'?: string
    /** ARIA live region setting */
    'aria-live'?: 'polite' | 'assertive' | 'off'
  }
}

export default function SessionRequestModal({ 
  skill, 
  isOpen, 
  onClose, 
  testId = 'session-request-modal',
  ally = {}
}: SessionRequestModalProps) {
  const { 
    'aria-label': ariaLabel = 'Request a session',
    'aria-describedby': ariaDescribedBy = 'session-request-description',
    'aria-live': ariaLive = 'polite'
  } = ally;
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [sessionFormat, setSessionFormat] = useState("in-person")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Mock available dates (in a real app, this would come from an API)
  const today = new Date()
  const disabledDays = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15),
  ]

  // Mock available time slots (in a real app, this would come from an API based on the selected date)
  const availableTimeSlots = [
    { time: "9:00 AM", available: true },
    { time: "10:00 AM", available: false },
    { time: "11:00 AM", available: true },
    { time: "1:00 PM", available: true },
    { time: "2:00 PM", available: false },
    { time: "3:00 PM", available: true },
    { time: "4:00 PM", available: true },
    { time: "5:00 PM", available: false },
  ]

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  const handleClose = () => {
    // Reset form state when closing
    if (isSubmitted) {
      setStep(1)
      setSelectedDate(undefined)
      setSelectedTime(null)
      setSessionFormat("in-person")
      setNotes("")
      setIsSubmitted(false)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[500px] p-0 overflow-hidden"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-live={ariaLive}
        data-testid={testId}
      >
        {!isSubmitted ? (
          <>
            <DialogHeader className="px-6 pt-6 pb-4 border-b">
              <DialogTitle className="text-xl" data-testid={`${testId}-title`}>
                Request a Session
              </DialogTitle>
              <DialogDescription id={ariaDescribedBy} data-testid={`${testId}-description`}>
                Schedule a session with {skill.teacher?.name || 'the teacher'}
              </DialogDescription>
            </DialogHeader>

            <div className="px-6">
              {/* Step indicators */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center w-full">
                  <div
                    className={`rounded-full h-8 w-8 flex items-center justify-center ${
                      step >= 1 ? "bg-primary-warm-gold text-white" : "bg-neutral-taupe/20 text-neutral-taupe"
                    }`}
                  >
                    1
                  </div>
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      step >= 2 ? "bg-primary-warm-gold" : "bg-neutral-taupe/20"
                    } transition-colors duration-300`}
                  ></div>
                  <div
                    className={`rounded-full h-8 w-8 flex items-center justify-center ${
                      step >= 2 ? "bg-primary-warm-gold text-white" : "bg-neutral-taupe/20 text-neutral-taupe"
                    }`}
                  >
                    2
                  </div>
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      step >= 3 ? "bg-primary-warm-gold" : "bg-neutral-taupe/20"
                    } transition-colors duration-300`}
                  ></div>
                  <div
                    className={`rounded-full h-8 w-8 flex items-center justify-center ${
                      step >= 3 ? "bg-primary-warm-gold text-white" : "bg-neutral-taupe/20 text-neutral-taupe"
                    }`}
                  >
                    3
                  </div>
                </div>
              </div>

              {/* Step 1: Date Selection */}
              {step === 1 && (
                <div className="mb-6">
                  <div className="flex justify-center mb-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={[
                        { before: new Date() }, // Can't select dates in the past
                        ...disabledDays, // Teacher unavailable on these days
                      ]}
                      className="rounded-md border border-neutral-taupe/20"
                      classNames={{
                        day_selected: "bg-primary-warm-gold text-white hover:bg-primary-warm-gold",
                        day_today: "bg-secondary-gold-pale text-primary-warm-gold",
                        day_disabled: "text-neutral-taupe/40 line-through",
                        day_range_middle: "bg-secondary-gold-pale text-primary-warm-gold",
                        day_hidden: "invisible",
                      }}
                    />
                  </div>
                  <div className="text-center text-body-small text-neutral-taupe">
                    <p>
                      <span className="inline-block w-3 h-3 bg-primary-warm-gold rounded-full mr-1"></span>
                      Available dates
                    </p>
                    <p>
                      <span className="inline-block w-3 h-3 bg-neutral-taupe/40 rounded-full mr-1"></span>
                      Unavailable dates
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Time and Format Selection */}
              {step === 2 && (
                <div className="mb-6">
                  <h3 className="text-h4 font-semibold mb-3">Select a Time</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                    {availableTimeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        className={
                          !slot.available
                            ? "bg-neutral-taupe/10 text-neutral-taupe/50 cursor-not-allowed border-neutral-taupe/20"
                            : selectedTime === slot.time
                              ? "bg-primary-warm-gold text-white"
                              : "border-neutral-taupe hover:bg-secondary-gold-pale hover:text-primary-warm-gold hover:border-primary-warm-gold"
                        }
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>

                  <h3 className="text-h4 font-semibold mb-3">Session Format</h3>
                  <RadioGroup
                    value={sessionFormat}
                    onValueChange={setSessionFormat}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="in-person"
                        id="in-person"
                        className="border-primary-warm-gold text-primary-warm-gold"
                      />
                      <Label htmlFor="in-person" className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-primary-warm-gold" />
                        In-person ({skill.location?.city}, {skill.location?.country })
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="virtual"
                        id="virtual"
                        className="border-primary-warm-gold text-primary-warm-gold"
                      />
                      <Label htmlFor="virtual" className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-primary-warm-gold"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M15 10v5" />
                          <path d="M9 10v5" />
                          <path d="M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
                          <path d="M12 16v4" />
                          <path d="M8 20h8" />
                        </svg>
                        Virtual (Zoom)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 3: Review and Confirm */}
              {step === 3 && (
                <div className="mb-6">
                  <div className="bg-background-light rounded-lg p-4 mb-4">
                    <h3 className="text-h4 font-semibold mb-3">Session Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CalendarIcon className="h-5 w-5 text-primary-warm-gold mr-3 mt-0.5" />
                        <div>
                          <p className="text-body font-medium">
                            {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""}
                          </p>
                          <p className="text-body-small text-neutral-taupe">{selectedTime}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary-warm-gold mr-3 mt-0.5" />
                        <div>
                          <p className="text-body font-medium">
                            {sessionFormat === "in-person" ? "In-person" : "Virtual"}
                          </p>
                          <p className="text-body-small text-neutral-taupe">
                            {sessionFormat === "in-person" ? `${skill.location?.city}, ${skill.location?.country}` : "Zoom link will be provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-h4 font-semibold mb-2">Special Requests (Optional)</h3>
                  <Textarea
                    placeholder="Any special requests or questions for the teacher?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px] mb-2"
                  />
                  <p className="text-body-small text-neutral-taupe mb-4">
                    This information will be shared with {skill.teacher.name} to help prepare for your session.
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 pt-2 bg-background-ivory border-t border-neutral-taupe/10 flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={handlePrevStep} className="btn-secondary">
                  Back
                </Button>
              ) : (
                <Button variant="outline" onClick={handleClose} className="btn-secondary">
                  Cancel
                </Button>
              )}
              {step < 3 ? (
                <Button onClick={handleNextStep} disabled={step === 1 && !selectedDate} className="btn-primary">
                  Continue
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="btn-primary">
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-success-green/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-success-green" />
            </div>
            <h2 className="text-h3 font-semibold text-primary-deep-brown mb-2">Request Submitted!</h2>
            <p className="text-body text-neutral-taupe mb-6">
              Your session request has been sent to {skill.teacher.name}. You'll receive a confirmation once they accept
              your request.
            </p>
            <div className="bg-background-light rounded-lg p-4 mb-6 text-left">
              <div className="space-y-3">
                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 text-primary-warm-gold mr-3 mt-0.5" />
                  <div>
                    <p className="text-body font-medium">
                      {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""}
                    </p>
                    <p className="text-body-small text-neutral-taupe">{selectedTime}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-warm-gold mr-3 mt-0.5" />
                  <div>
                    <p className="text-body font-medium">{sessionFormat === "in-person" ? "In-person" : "Virtual"}</p>
                    <p className="text-body-small text-neutral-taupe">
                      {sessionFormat === "in-person" ? `${skill.location?.city}, ${skill.location?.country}` : "Zoom link will be provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={handleClose} className="btn-primary w-full">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
