"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  className?: string
  "data-testid"?: string
  "aria-required"?: "true" | "false"
  "aria-invalid"?: "true" | "false"
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Pick a date range",
  className,
  "data-testid": testId,
  "aria-required": ariaRequired,
  "aria-invalid": ariaInvalid,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(value)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setDate(value)
  }, [value])

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range)
    onChange?.(range)
    if (range?.from && range?.to) {
      setOpen(false)
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              ariaInvalid === "true" && "border-red-500",
            )}
            data-testid={testId}
            aria-required={ariaRequired}
            aria-invalid={ariaInvalid}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="date-range-calendar"
          >
            <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            id="date-range-calendar"
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={(date) => date < new Date()}
            data-testid="date-range-calendar"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
