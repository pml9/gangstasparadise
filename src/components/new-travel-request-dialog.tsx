"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Loader2 } from "lucide-react"
import type { DateRange } from "react-day-picker"

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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "./date-range-picker"
import { useToast } from "@/hooks/use-toast"
import type { Manager } from "@/types/travel"

interface NewTravelRequestDialogProps {
  onSuccess?: () => void
}

export function NewTravelRequestDialog({ onSuccess }: NewTravelRequestDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [destination, setDestination] = useState("")
  const [customerProject, setCustomerProject] = useState("")
  const [luggageNeeded, setLuggageNeeded] = useState<boolean | null>(null)
  const [preferredTravelTime, setPreferredTravelTime] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [managerId, setManagerId] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingManagers, setIsLoadingManagers] = useState(false)
  const [managers, setManagers] = useState<Manager[]>([])
  const { toast } = useToast()

  // Form validation
  const isFormValid =
    title.trim() !== "" &&
    destination.trim() !== "" &&
    customerProject.trim() !== "" &&
    luggageNeeded !== null &&
    preferredTravelTime !== "" &&
    dateRange?.from &&
    dateRange?.to &&
    managerId !== ""

  // Fetch managers when dialog opens
  useEffect(() => {
    if (open) {
      fetchManagers()
    }
  }, [open])

  const fetchManagers = async () => {
    setIsLoadingManagers(true)
    try {
      const response = await fetch("/api/travel/approvingManagers")
      if (!response.ok) {
        throw new Error("Failed to fetch managers")
      }

      const data = await response.json()
      setManagers(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load approving managers. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingManagers(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/travel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          destination,
          customer_project: customerProject,
          luggage_needed: luggageNeeded,
          preferred_travel_time: preferredTravelTime,
          departure_date: format(dateRange!.from!, "yyyy-MM-dd"),
          return_date: format(dateRange!.to!, "yyyy-MM-dd"),
          manager_id: Number.parseInt(managerId),
          additional_notes: additionalNotes || undefined,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to submit travel request")
      }

      toast({
        title: "Success",
        description: "Your travel request has been submitted successfully.",
      })

      // Reset form
      setTitle("")
      setDestination("")
      setCustomerProject("")
      setLuggageNeeded(null)
      setPreferredTravelTime("")
      setDateRange(undefined)
      setManagerId("")
      setAdditionalNotes("")
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
          data-testid="new-travel-request-button"
          aria-label="Create new travel request"
        >
          + New Request
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px]"
        aria-labelledby="travel-dialog-title"
        aria-describedby="travel-dialog-description"
        data-testid="travel-request-dialog"
      >
        <DialogHeader>
          <DialogTitle id="travel-dialog-title">New Travel Request</DialogTitle>
          <DialogDescription id="travel-dialog-description">
            Fill in the details for your business trip request. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} data-testid="travel-request-form">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                Trip Title
              </Label>
              <Input
                id="title"
                placeholder="A short name for the business trip"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                data-testid="trip-title"
                aria-required="true"
                aria-invalid={title.trim() === ""}
              />
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="destination" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Destination (City, Country)
                </Label>
                <Input
                  id="destination"
                  placeholder="e.g., New York, USA"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  data-testid="destination"
                  aria-required="true"
                  aria-invalid={destination.trim() === ""}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customerProject" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Customer / Project Name
                </Label>
                <Input
                  id="customerProject"
                  placeholder="e.g., Fortune 500 Client Presentation"
                  value={customerProject}
                  onChange={(e) => setCustomerProject(e.target.value)}
                  required
                  data-testid="customer-project"
                  aria-required="true"
                  aria-invalid={customerProject.trim() === ""}
                />
              </div>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="grid gap-2">
                <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">Luggage Necessity</Label>
                <RadioGroup
                  value={luggageNeeded === null ? undefined : luggageNeeded.toString()}
                  onValueChange={(value) => setLuggageNeeded(value === "true")}
                  data-testid="luggage-necessity"
                  aria-required="true"
                  aria-invalid={luggageNeeded === null ? "true" : "false"}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="luggage-yes" />
                    <Label htmlFor="luggage-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="luggage-no" />
                    <Label htmlFor="luggage-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="preferredTravelTime" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Preferred Travel Time
                </Label>
                <Select
                  value={preferredTravelTime}
                  onValueChange={setPreferredTravelTime}
                  required
                  data-testid="preferred-travel-time"
                >
                  <SelectTrigger
                    id="preferredTravelTime"
                    aria-required="true"
                    aria-invalid={preferredTravelTime === ""}
                  >
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6am - 12pm)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                    <SelectItem value="evening">Evening (5pm - 9pm)</SelectItem>
                    <SelectItem value="night">Night (9pm - 6am)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dateRange" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                Business Trip Dates
              </Label>
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                placeholder="Select your trip dates"
                data-testid="trip-date-range"
                aria-required="true"
                aria-invalid={dateRange?.from && dateRange?.to ? "false" : "true"}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="managerId" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                Approving Manager
              </Label>
              <Select value={managerId} onValueChange={setManagerId} required data-testid="approving-manager">
                <SelectTrigger
                  id="managerId"
                  aria-required="true"
                  aria-invalid={managerId === ""}
                  aria-busy={isLoadingManagers}
                >
                  <SelectValue placeholder={isLoadingManagers ? "Loading managers..." : "Select a manager"} />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingManagers ? (
                    <div className="flex items-center justify-center p-2" aria-live="polite">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
                      <span>Loading managers...</span>
                    </div>
                  ) : managers.length > 0 ? (
                    managers.map((manager) => (
                      <SelectItem
                        key={manager.id}
                        value={manager.id.toString()}
                        data-testid={`manager-option-${manager.id}`}
                      >
                        {manager.name} ({manager.department})
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500">No managers found</div>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                placeholder="Any additional information about your trip"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={3}
                data-testid="additional-notes"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-testid="travel-cancel"
              aria-label="Cancel request"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              data-testid="travel-submit"
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
