import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useState, useRef, useEffect, FormEvent } from "react"

interface SearchBarProps {
  /** Test ID for testing purposes */
  testId?: string
  /** Additional accessibility attributes */
  ally?: {
    /** ARIA role for the search container */
    role?: string
    /** ARIA label for the search input */
    'aria-label'?: string
    /** ARIA controls attribute */
    'aria-controls'?: string
    /** ARIA expanded state */
    'aria-expanded'?: boolean
  }
}

export default function SearchBar({ 
  testId = 'search-bar',
  ally = {}
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const { 
    role = 'search',
    'aria-label': ariaLabel = 'Search',
    'aria-controls': ariaControls,
  } = ally;

  // Update search query when URL changes
  useEffect(() => {
    const query = searchParams.get('q') || ''
    setSearchQuery(query)
  }, [searchParams])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    const params = new URLSearchParams()
    params.set('q', searchQuery.trim())
    router.push(`/browse?${params.toString()}`)
  }

  const handleClear = () => {
    setSearchQuery('')
    inputRef.current?.focus()
  }

  return (
    <form 
      className="relative w-full max-w-md" 
      role={role}
      data-testid={testId}
      onSubmit={handleSubmit}
    >
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-taupe h-4 w-4" 
        aria-hidden="true"
      />
      <Input 
        ref={inputRef}
        type="search"
        placeholder="Search for skills, teachers, or keywords" 
        className="input-field pl-10 pr-10 py-2 w-full"
        aria-label={ariaLabel}
        aria-controls={ariaControls}
        aria-expanded={isFocused && searchQuery.length > 0}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        data-testid={`${testId}-input`}
      />
      {searchQuery && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-taupe hover:text-neutral-700 focus:outline-none"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  )
}
