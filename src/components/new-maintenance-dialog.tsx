"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { Device, IssueType } from "@/types/maintenance"

interface NewMaintenanceDialogProps {
  onSuccess?: () => void
}

export function NewMaintenanceDialog({ onSuccess }: NewMaintenanceDialogProps) {
  const [open, setOpen] = useState(false)
  const [deviceId, setDeviceId] = useState("")
  const [issueType, setIssueType] = useState<IssueType | "">("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [devices, setDevices] = useState<Device[]>([])
  const { toast } = useToast()

  // Form validation
  const isFormValid = deviceId !== "" && issueType !== "" && description.trim().length > 0

  // Fetch devices when dialog opens
  useEffect(() => {
    if (open) {
      fetchDevices()
    }
  }, [open])

  const fetchDevices = async () => {
    setIsLoading(true)
    try {
      // In a real app, we would include the current user's ID
      const response = await fetch("/api/maintenance/devices?status=active")
      if (!response.ok) {
        throw new Error("Failed to fetch devices")
      }

      const data = await response.json()
      setDevices(data.devices)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your devices. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!deviceId || !issueType || !description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Find the selected device to get its serial number
      const selectedDevice = devices.find((device) => device.id.toString() === deviceId)

      if (!selectedDevice) {
        throw new Error("Selected device not found")
      }

      const response = await fetch("/api/maintenance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device_serial_number: selectedDevice.serial_number,
          issue_type: issueType,
          description,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to submit maintenance request")
      }

      toast({
        title: "Success",
        description: "Your maintenance request has been submitted successfully.",
      })

      // Reset form
      setDeviceId("")
      setIssueType("")
      setDescription("")
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
          className="bg-red-600 hover:bg-red-700"
          data-testid="new-maintenance-button"
          aria-label="Create new maintenance request"
        >
          + New Request
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-labelledby="maintenance-dialog-title"
        aria-describedby="maintenance-dialog-description"
        data-testid="maintenance-dialog"
      >
        <DialogHeader>
          <DialogTitle id="maintenance-dialog-title">New Maintenance Request</DialogTitle>
          <DialogDescription id="maintenance-dialog-description">
            Report a facility or equipment issue that needs attention.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} data-testid="maintenance-form">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="deviceType" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                Device
              </Label>
              <Select value={deviceId} onValueChange={setDeviceId} required data-testid="device-select">
                <SelectTrigger
                  id="deviceType"
                  aria-required="true"
                  aria-invalid={deviceId ? "false" : "true"}
                  aria-busy={isLoading}
                >
                  <SelectValue placeholder={isLoading ? "Loading devices..." : "Select a device"} />
                </SelectTrigger>
                <SelectContent>
                  {isLoading ? (
                    <div
                      className="flex items-center justify-center p-2"
                      data-testid="devices-loading"
                      aria-live="polite"
                    >
                      <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
                      <span>Loading devices...</span>
                    </div>
                  ) : devices.length > 0 ? (
                    devices.map((device) => (
                      <SelectItem
                        key={device.id}
                        value={device.id.toString()}
                        data-testid={`device-option-${device.id}`}
                      >
                        {device.type} - {device.model} ({device.location})
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500" data-testid="no-devices" role="status">
                      No devices found
                    </div>
                  )}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500" id="device-help">
                Showing devices assigned to you
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="issueType" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                Issue Type
              </Label>
              <Select
                value={issueType}
                onValueChange={(value) => setIssueType(value as IssueType)}
                required
                data-testid="issue-type-select"
              >
                <SelectTrigger id="issueType" aria-required="true" aria-invalid={issueType ? "false" : "true"}>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values({
                    "IT Equipment": "IT Equipment",
                    "Office Equipment": "Office Equipment",
                    HVAC: "HVAC",
                    Electrical: "Electrical",
                    Plumbing: "Plumbing",
                    Security: "Security",
                    Facilities: "Facilities",
                    Other: "Other",
                  } as Record<string, IssueType>).map((type) => (
                    <SelectItem
                      key={type}
                      value={type}
                      data-testid={`issue-type-option-${type.replace(/\s+/g, "-").toLowerCase()}`}
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                Issue Description
              </Label>
              <Textarea
                id="description"
                placeholder="Please describe the issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
                data-testid="issue-description"
                aria-required="true"
                aria-invalid={description.trim().length > 0 ? "false" : "true"}
                aria-describedby="description-help"
              />
              <p className="text-xs text-gray-500" id="description-help">
                Include relevant details like error messages, when the issue started, etc.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-testid="maintenance-cancel"
              aria-label="Cancel request"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              data-testid="maintenance-submit"
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
