"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FilterChip {
  id: string
  label: string
  category: string
}

interface FilterChipsProps {
  /** Array of filter chips to display */
  filters: FilterChip[]
  /** Callback when a filter is removed */
  onRemove: (id: string) => void
  /** Callback when all filters are cleared */
  onClearAll: () => void
  /** Number of results matching the current filters */
  resultCount: number
  /** Test ID for testing purposes */
  testId?: string
  /** Accessibility properties */
  ally?: {
    /** ARIA role for the filter chips container */
    role?: string
    /** ARIA label for the filter chips container */
    'aria-label'?: string
    /** ARIA live region setting */
    'aria-live'?: 'polite' | 'assertive' | 'off'
  }
}

export default function FilterChips({ 
  filters, 
  onRemove, 
  onClearAll, 
  resultCount, 
  testId = 'filter-chips',
  ally = {}
}: FilterChipsProps) {
  if (filters.length === 0) return null

  return (
    <div 
      className="mb-4"
      data-testid={testId}
      role={ally.role || 'region'}
      aria-label={ally['aria-label'] || 'Applied filters'}
      aria-live={ally['aria-live']}
    >
      <div 
        className="flex flex-wrap items-center gap-2 mb-2"
        role="list"
        aria-label="Filter list"
      >
        {filters.map((filter) => (
          <div
            key={filter.id}
            className="flex items-center gap-1 px-2 py-1 bg-secondary-gold-pale text-primary-warm-gold rounded-full text-body-small"
            role="listitem"
            data-testid={`filter-chip-${filter.id}`}
          >
            <span className="text-caption text-neutral-taupe">{filter.category}:</span>
            <span>{filter.label}</span>
            <button
              onClick={() => onRemove(filter.id)}
              className="ml-1 text-neutral-taupe hover:text-primary-warm-gold focus:outline-none"
              aria-label={`Remove ${filter.label} filter`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-primary-warm-gold hover:bg-secondary-gold-pale text-body-small font-medium"
          data-testid="clear-all-filters"
          aria-label="Clear all filters"
        >
          Clear all
        </Button>
      </div>
      <p 
        className="text-body-small text-neutral-taupe"
        data-testid="result-count"
        aria-live="polite"
      >
        Showing <span className="font-medium text-dark-brown">{resultCount}</span> results
      </p>
    </div>
  )
}
