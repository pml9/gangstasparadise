"use client"

import type * as React from "react"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DateRangePicker } from "./date-range-picker"
import { useToast } from "@/hooks/use-toast"

interface NewSickLeaveDialogProps {
  onSuccess?: () => void
}

export function NewSickLeaveDialog({ onSuccess }: NewSickLeaveDialogProps) {
  const [open, setOpen] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Add validation state
  const isFormValid = dateRange?.from && dateRange?.to && reason.trim().length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: "Error",
        description: "Please select a date range for your sick leave.",
        variant: "destructive",
      })
      return
    }

    if (!reason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for your sick leave.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/sick-leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_date: format(dateRange.from, "yyyy-MM-dd"),
          end_date: format(dateRange.to, "yyyy-MM-dd"),
          reason,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to submit request")
      }

      toast({
        title: "Success",
        description: "Your sick leave request has been submitted successfully.",
      })

      // Reset form
      setDateRange(undefined)
      setReason("")
      setOpen(false)
      onSuccess?.()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit request",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          data-testid="new-sick-leave-button"
          aria-label="Create new sick leave request"
        >
          + New Request
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-labelledby="sick-leave-dialog-title"
        aria-describedby="sick-leave-dialog-description"
        data-testid="sick-leave-dialog"
      >
        <DialogHeader>
          <DialogTitle id="sick-leave-dialog-title">New Sick Leave Request</DialogTitle>
          <DialogDescription id="sick-leave-dialog-description">
            Please select the dates for your sick leave and provide a reason. All fields are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} data-testid="sick-leave-form">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="dateRange" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                Leave Period
              </Label>
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                placeholder="Select your leave dates"
                data-testid="sick-leave-date-range"
                aria-required="true"
                aria-invalid={dateRange?.from && dateRange?.to ? "false" : "true"}
              />
              {!dateRange?.from && !dateRange?.to && (
                <div className="text-xs text-red-500" aria-live="polite" id="dateRange-error">
                  Please select a date range
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                Reason
              </Label>
              <Textarea
                id="reason"
                placeholder="Please provide a reason for your sick leave..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                required
                data-testid="sick-leave-reason"
                aria-required="true"
                aria-invalid={reason.trim().length > 0 ? "false" : "true"}
                aria-describedby="reason-error"
              />
              {!reason.trim() && (
                <div className="text-xs text-red-500" aria-live="polite" id="reason-error">
                  Please provide a reason
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-testid="sick-leave-cancel"
              aria-label="Cancel request"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              data-testid="sick-leave-submit"
              aria-busy={isSubmitting}
              aria-disabled={!isFormValid}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
              Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
