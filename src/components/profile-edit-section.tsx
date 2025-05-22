"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProfileEditSectionProps {
  title: string
  children: React.ReactNode
  onSave: () => Promise<void>
  onCancel: () => void
  isEditing: boolean
  className?: string
  /** Test ID for testing purposes */
  testId?: string
  /** Accessibility properties */
  ally?: {
    /** ARIA role for the section */
    role?: string
    /** ARIA label for the section */
    'aria-label'?: string
    /** ARIA live region setting */
    'aria-live'?: 'off' | 'polite' | 'assertive'
    /** ARIA busy state when saving */
    'aria-busy'?: boolean
  }
}

export function ProfileEditSection({
  title,
  children,
  onSave,
  onCancel,
  isEditing,
  className,
  testId = 'profile-edit-section',
  ally = {}
}: ProfileEditSectionProps) {
  const {
    role = 'region',
    'aria-label': ariaLabel = 'Profile edit section',
    'aria-live': ariaLive = 'off',
    'aria-busy': ariaBusy = false
  } = ally;
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave()
    } catch (error) {
      console.error("Error saving:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div 
      className={cn("relative transition-all duration-200", className)}
      role={role}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      aria-busy={ariaBusy || isSaving}
      data-testid={testId}
    >
      {isEditing && (
        <div className="absolute -top-3 right-0 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-2 text-neutral-taupe hover:text-error-red hover:border-error-red"
            onClick={onCancel}
            disabled={isSaving}
            data-testid={`${testId}-cancel-button`}
            aria-label="Cancel editing"
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button
            size="sm"
            className="h-8 px-2 bg-success-green hover:bg-success-green/90 text-white"
            onClick={handleSave}
            disabled={isSaving}
            data-testid={`${testId}-save-button`}
            aria-label="Save changes"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-1" />
                Save
              </>
            )}
          </Button>
        </div>
      )}

      {isEditing ? (
        <div 
          className="bg-background-light p-4 rounded-lg border border-primary-warm-gold/30 shadow-md animate-in fade-in-50 duration-200"
          data-testid={`${testId}-editing`}
        >
          <h3 className="text-body font-medium text-primary-deep-brown mb-3">{title}</h3>
          <div className="space-y-4">{children}</div>
        </div>
      ) : (
        <div 
          data-testid={`${testId}-viewing`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

interface EditableFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: "text" | "email" | "textarea"
  placeholder?: string
  required?: boolean
  maxLength?: number
  autoSave?: boolean
}

export function EditableField({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  required = false,
  maxLength,
  autoSave = false,
}: EditableFieldProps) {
  const [localValue, setLocalValue] = useState(value)
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [showCharCount, setShowCharCount] = useState(false)
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    setShowCharCount(true)

    if (autoSave) {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current)
      }

      setIsAutoSaving(true)
      autoSaveTimerRef.current = setTimeout(() => {
        onChange(newValue)
        setIsAutoSaving(false)
        setTimeout(() => setShowCharCount(false), 2000)
      }, 1000)
    } else {
      onChange(newValue)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-body-small text-neutral-taupe">
          {label}
          {required && <span className="text-error-red ml-1">*</span>}
        </label>
        {autoSave && (
          <div className="flex items-center text-caption">
            {isAutoSaving ? (
              <span className="text-information-blue flex items-center">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Saving...
              </span>
            ) : showCharCount && maxLength ? (
              <span className={`${localValue.length > maxLength * 0.8 ? "text-warning-amber" : "text-neutral-taupe"}`}>
                {localValue.length}/{maxLength}
              </span>
            ) : null}
          </div>
        )}
      </div>

      {type === "textarea" ? (
        <Textarea
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn("resize-none min-h-[100px]", error ? "border-error-red focus-visible:border-error-red" : "")}
          maxLength={maxLength}
        />
      ) : (
        <Input
          type={type}
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={error ? "border-error-red focus-visible:border-error-red" : ""}
          maxLength={maxLength}
        />
      )}

      {error && <p className="text-error-red text-caption animate-in slide-in-from-top-1">{error}</p>}
    </div>
  )
}
