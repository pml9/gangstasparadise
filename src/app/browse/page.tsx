"use client"

import { useState, useEffect } from "react"
import SkillsGrid from "@/components/skills-grid"
import FilterSidebar from "@/components/filter-sidebar"
import SearchAutocomplete from "@/components/search-autocomplete"
import CategoryTabs from "@/components/category-tabs"
import SortDropdown from "@/components/sort-dropdown"
import Pagination from "@/components/pagination"
import FilterChips from "@/components/filter-chips"
import type { Skill } from "@/types/skill"
import { toast } from "sonner"
import { ApiResponse } from "@/types/api"
import EmptyState from "@/components/empty-state"

export default function BrowseSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [allSkills, setAllSkills] = useState<Skill[]>([]) // Store all skills for client-side filtering
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<Array<{ id: string; label: string; category: string }>>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8 // Number of items to show per page

  // Fetch skills from API
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/skills')
        if (!response.ok) {
          throw new Error('Failed to fetch skills')
        }
        const data = await response.json() as ApiResponse<Skill[]>
        console.log(data)
        setAllSkills(data.data || [])
        setError(null)
        
        // Set initial paginated data
        const paginatedData = data.data?.slice(0, itemsPerPage) || []
        setSkills(paginatedData)
      } catch (err) {
        console.error('Error fetching skills:', err)
        setError('Failed to load skills. Please try again later.')
        toast.error('Failed to load skills')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSkills()
  }, [])

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1) // Reset to first page on new search
    
    if (query) {
      const queryLower = query.toLowerCase()
      // Filter from allSkills instead of current skills to avoid compounding filters
      const filtered = allSkills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(queryLower) ||
          skill.description.toLowerCase().includes(queryLower) ||
          skill.category.name.toLowerCase().includes(queryLower) ||
          skill.teacher.name.toLowerCase().includes(queryLower)
      )
      
      // Update paginated results
      const paginatedData = filtered.slice(0, itemsPerPage)
      setSkills(paginatedData)
      
      // Add search as a filter chip if not already present
      if (!activeFilters.some((f) => f.label.toLowerCase() === queryLower)) {
        setActiveFilters((prev) => [
          ...prev.filter(f => f.category !== 'Search'), // Remove other search filters
          {
            id: `search-${Date.now()}`,
            label: query,
            category: "Search",
          },
        ])
      }
    } else {
      // Reset to all skills with pagination
      const paginatedData = allSkills.slice(0, itemsPerPage)
      setSkills(paginatedData)
      // Remove any search filters
      setActiveFilters((prev) => prev.filter((f) => f.category !== "Search"))
    }
  }

  const handleRemoveFilter = (id: string) => {
    const filter = activeFilters.find((f) => f.id === id)
    const newFilters = activeFilters.filter((f) => f.id !== id)
    setActiveFilters(newFilters)

    if (filter?.category === "Search") {
      setSearchQuery("")
    }

    // Reload results with remaining filters
    setIsLoading(true)
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        // Apply remaining filters
        let filteredData = [...data]
        newFilters.forEach(filter => {
          if (filter.category === 'Category') {
            filteredData = filteredData.filter(skill => 
              skill.category.name.toLowerCase().includes(filter.label.toLowerCase())
            )
          }
        })
        setSkills(filteredData)
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }

  const handleClearAllFilters = () => {
    setActiveFilters([])
    setSearchQuery("")
    setCurrentPage(1)

    // Reset to first page of all skills
    const paginatedData = allSkills.slice(0, itemsPerPage)
    setSkills(paginatedData)
  }

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    
    // Apply all active filters to allSkills
    let filteredData = [...allSkills]
    
    // Apply search filter
    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase()
      filteredData = filteredData.filter(
        skill =>
          skill.name.toLowerCase().includes(queryLower) ||
          skill.description.toLowerCase().includes(queryLower) ||
          skill.category.name.toLowerCase().includes(queryLower) ||
          skill.teacher.name.toLowerCase().includes(queryLower)
      )
    }
    
    // Apply category filters
    const categoryFilters = activeFilters.filter(f => f.category === 'Category')
    if (categoryFilters.length > 0) {
      const categoryNames = categoryFilters.map(f => f.label.toLowerCase())
      filteredData = filteredData.filter(skill => 
        categoryNames.includes(skill.category.name.toLowerCase())
      )
    }
    
    // Apply other filters here if needed
    
    // Update paginated results
    const paginatedData = filteredData.slice(startIndex, endIndex)
    setSkills(paginatedData)
    
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Add a category filter (simulated)
  const handleCategorySelect = (category: string) => {
    setCurrentPage(1) // Reset to first page on category change
    
    if (category === "All Categories") {
      // Remove all category filters
      const newFilters = activeFilters.filter((f) => f.category !== "Category")
      setActiveFilters(newFilters)
      
      // Show first page of all skills
      const paginatedData = allSkills.slice(0, itemsPerPage)
      setSkills(paginatedData)
      return
    }

    // Add or update category filter
    const newFilters = [
      ...activeFilters.filter(f => f.category !== 'Category'), // Remove other category filters
      {
        id: `category-${Date.now()}`,
        label: category,
        category: "Category",
      },
    ]
    setActiveFilters(newFilters)
    
    // Filter skills by category and apply pagination
    const filtered = allSkills.filter(skill => 
      skill.category.name.toLowerCase() === category.toLowerCase()
    )
    const paginatedData = filtered.slice(0, itemsPerPage)
    setSkills(paginatedData)
  }

  return (
    <div className="bg-background-light min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-h2 font-bold mb-2 text-primary-deep-brown">Browse Skills</h1>
          <p className="text-body text-neutral-taupe">
            Find and connect with people sharing knowledge across generations
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <FilterSidebar />
          </div>

          <div className="w-full md:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <SearchAutocomplete onSearch={handleSearch} isLoading={isLoading && searchQuery !== ""} />
              <SortDropdown />
            </div>

            <FilterChips
              filters={activeFilters}
              onRemove={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
              resultCount={skills.length}
            />

            <div className="mb-6">
              <CategoryTabs onCategorySelect={handleCategorySelect} />
            </div>

            {error ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary-deep-brown text-white rounded hover:bg-primary-dark-brown transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : skills.length > 0 || isLoading ? (<SkillsGrid
                skills={skills}
                isLoading={isLoading}
                isFiltered={activeFilters.length > 0}
                onResetFilters={handleClearAllFilters}
              />
            ) : (
              <EmptyState onReset={handleClearAllFilters} title="No results found" description="Try adjusting your search or filter to find what you\'re looking for." />
            )}

            {!isLoading && allSkills.length > itemsPerPage && (
              <div className="mt-8">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={Math.ceil(
                    searchQuery || activeFilters.length > 0 
                      ? skills.length / itemsPerPage 
                      : allSkills.length / itemsPerPage
                  )} 
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
