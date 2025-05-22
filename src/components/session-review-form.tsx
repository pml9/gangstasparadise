"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface SessionReviewFormProps {
  /** ID of the session being reviewed */
  sessionId: string
  /** Name of the teacher being reviewed */
  teacherName: string
  /** Name of the skill being reviewed */
  skillName: string
  /** Callback when the form is submitted */
  onSubmit: (data: { rating: number; comment: string; learningOutcomes: string[] }) => void
  /** Test ID for testing purposes */
  testId?: string
  /** Additional accessibility attributes */
  ally?: {
    /** ARIA role for the form */
    role?: string
    /** ARIA label for the form */
    'aria-label'?: string
    /** ARIA description for the form */
    'aria-describedby'?: string
  }
}

export default function SessionReviewForm({ 
  sessionId, 
  teacherName, 
  skillName, 
  onSubmit, 
  testId = 'session-review-form',
  ally = {}
}: SessionReviewFormProps) {
  const { 
    role = 'form',
    'aria-label': ariaLabel = `Review session with ${teacherName}`,
    'aria-describedby': ariaDescribedBy = 'session-review-description'
  } = ally;
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>([])

  const learningOutcomeOptions = [
    "I learned new concepts",
    "I improved my existing skills",
    "I gained practical experience",
    "I feel more confident in this skill",
    "I can apply what I learned in real-world situations",
  ]

  const handleOutcomeChange = (outcome: string) => {
    setLearningOutcomes((prev) =>
      prev.includes(outcome) ? prev.filter((item) => item !== outcome) : [...prev, outcome],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ rating, comment, learningOutcomes })
  }

  return (
    <div 
      role={role}
      aria-label={ariaLabel}
      data-testid={testId}
      className="bg-background-ivory rounded-xl p-6 border border-neutral-taupe/10 shadow-card"
    >
      <h2 className="text-h4 font-semibold text-primary-deep-brown mb-4">How was your session with {teacherName}?</h2>
      <p id={ariaDescribedBy} className="text-body-small text-neutral-taupe mb-6">
        Your feedback helps {teacherName} improve and helps other learners find great teachers.
      </p>

      <form onSubmit={handleSubmit} data-testid={`${testId}-form`}>
        <div className="mb-6">
          <label className="block text-body font-medium mb-2">Rate your experience</label>
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((value) => (
                <button key={value} type="button" className="p-1 focus:outline-none" onClick={() => setRating(value)}>
                  <svg
                    className={`w-8 h-8 ${
                      value <= rating ? "text-warning-amber fill-warning-amber" : "text-neutral-taupe/30"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            {rating > 0 && <span className="ml-2 text-body">{rating}/5</span>}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="comment" className="block text-body font-medium mb-2">
            Share your experience
          </label>
          <Textarea
            id="comment"
            placeholder={`What did you like about the ${skillName} session? What could be improved?`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-32"
          />
        </div>

        <div className="mb-6">
          <label className="block text-body font-medium mb-2">What did you achieve?</label>
          <div className="space-y-2">
            {learningOutcomeOptions.map((outcome) => (
              <div key={outcome} className="flex items-center">
                <Checkbox
                  id={`outcome-${outcome}`}
                  checked={learningOutcomes.includes(outcome)}
                  onCheckedChange={() => handleOutcomeChange(outcome)}
                />
                <label htmlFor={`outcome-${outcome}`} className="ml-2 text-body-small">
                  {outcome}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-primary-warm-gold hover:bg-primary-warm-gold/90 text-white">
            Submit Review
          </Button>
        </div>
      </form>
    </div>
  )
}
