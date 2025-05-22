"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, Mic, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

interface SearchSuggestion {
  id: string
  text: string
  type: "recent" | "suggestion"
}

interface SearchAutocompleteProps {
  /** Callback when search is triggered */
  onSearch: (query: string) => void
  /** Whether the search is in progress */
  isLoading?: boolean
  /** Test ID for testing purposes */
  testId?: string
  /** Additional accessibility attributes */
  ally?: {
    /** ARIA label for the search input */
    'aria-label'?: string
    /** ARIA describedby for the search input */
    'aria-describedby'?: string
    /** ARIA controls for the dropdown */
    'aria-controls'?: string
    /** ARIA expanded state */
    'aria-expanded'?: boolean
  }
}

export default function SearchAutocomplete({ 
  onSearch, 
  isLoading = false, 
  testId = 'search-autocomplete',
  ally = {}
}: SearchAutocompleteProps) {
  const { 
    'aria-label': ariaLabel = 'Search for skills',
    'aria-describedby': ariaDescribedBy,
    'aria-controls': ariaControls = 'search-suggestions',
    'aria-expanded': ariaExpanded = false
  } = ally;
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Mock recent searches
  const recentSearches = [
    { id: "recent-1", text: "knitting", type: "recent" as const },
    { id: "recent-2", text: "cooking", type: "recent" as const },
    { id: "recent-3", text: "gardening", type: "recent" as const },
  ]

  // Mock suggestions based on query
  const getSuggestions = (q: string): SearchSuggestion[] => {
    if (!q) return recentSearches

    const suggestions = [
      "knitting",
      "cooking",
      "gardening",
      "woodworking",
      "piano",
      "spanish",
      "technology",
      "web design",
      "quilting",
    ]

    return suggestions
      .filter((s) => s.includes(q.toLowerCase()))
      .map((text, i) => ({ id: `suggestion-${i}`, text, type: "suggestion" as const }))
  }

  const suggestions = getSuggestions(query)

  useOnClickOutside(dropdownRef, () => setIsOpen(false))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (e.target.value) {
      setIsOpen(true)
    }
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text)
    setIsOpen(false)
    onSearch(suggestion.text)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
      setIsOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelectSuggestion(suggestions[selectedIndex])
        } else {
          handleSubmit(e)
        }
        break
      case "Escape":
        setIsOpen(false)
        break
    }
  }

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && dropdownRef.current) {
      const selectedElement = dropdownRef.current.querySelector(`[data-index="${selectedIndex}"]`)
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" })
      }
    }
  }, [selectedIndex])

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text

    const index = text.toLowerCase().indexOf(query.toLowerCase())
    if (index === -1) return text

    const before = text.substring(0, index)
    const match = text.substring(index, index + query.length)
    const after = text.substring(index + query.length)

    return (
      <>
        {before}
        <span className="font-medium text-primary-warm-gold">{match}</span>
        {after}
      </>
    )
  }

  return (
    <div className="relative w-full max-w-md">
      <form 
        onSubmit={handleSubmit} 
        className="relative"
        role="search"
        aria-label="Search skills and teachers"
      >
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-taupe h-4 w-4" 
          aria-hidden="true"
        />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for skills..."
          className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent focus-visible:ring-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          aria-controls={ariaControls}
          aria-expanded={isOpen}
          data-testid={`${testId}-input`}
          placeholder="Search for skills, teachers, or keywords"
          className="input-field pl-10 pr-12 py-2 w-full"
          aria-autocomplete="both"
          aria-controls="search-suggestions"
          aria-expanded={isOpen}
        />
        <div 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center"
          aria-live="polite"
          aria-atomic="true"
        >
          {isLoading ? (
            <>
              <Loader2 
                className="h-4 w-4 text-neutral-taupe animate-spin" 
                aria-hidden="true"
              />
              <span className="sr-only">Searching...</span>
            </>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0 md:hidden"
              aria-label="Voice search (coming soon)"
              disabled
              data-testid="voice-search-button"
            >
              <Mic className="h-4 w-4 text-neutral-taupe" aria-hidden="true" />
            </Button>
          )}
        </div>
      </form>

      {isOpen && (
        <div
          ref={dropdownRef}
          id={ariaControls}
          className={`absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg ${isOpen ? 'block' : 'hidden'}`}
          role="listbox"
          data-testid={`${testId}-dropdown`}
        >
          {suggestions.length === 0 ? (
            <div 
              className="p-3 text-center text-neutral-taupe"
              role="status"
              data-testid="no-suggestions"
            >
              No suggestions found for "{query}"
            </div>
          ) : (
            <ul>
              {suggestions.map((suggestion, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <li
                    key={suggestion.id}
                    id={`suggestion-${index}`}
                    data-index={index}
                    role="option"
                    aria-selected={isSelected}
                    className={`px-3 py-2 cursor-pointer flex items-center gap-2 ${
                      isSelected ? "bg-secondary-gold-pale" : "hover:bg-secondary-gold-pale/50"
                    }`}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onMouseLeave={() => setSelectedIndex(-1)}
                    data-testid={`suggestion-${suggestion.type}-${suggestion.text.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {suggestion.type === "recent" ? (
                      <>
                        <Search 
                          className="h-3.5 w-3.5 text-neutral-taupe flex-shrink-0" 
                          aria-hidden="true"
                        />
                        <span className="text-body-small">
                          <span className="sr-only">Recent search: </span>
                          {suggestion.text}
                        </span>
                      </>
                    ) : (
                      <span className="text-body-small pl-5.5">
                        <span className="sr-only">Suggestion: </span>
                        {highlightMatch(suggestion.text, query)}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
