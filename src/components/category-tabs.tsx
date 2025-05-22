"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

export type Category = 
  | 'All Categories' 
  | 'Arts & Crafts' 
  | 'Cooking' 
  | 'Technology' 
  | 'Music' 
  | 'Languages' 
  | 'DIY & Home' 
  | 'Gardening';

interface CategoryTabsProps {
  /** Currently selected category */
  value?: Category;
  /** Callback when a category is selected */
  onCategorySelect?: (category: Category) => void;
  /** Optional class name for the container */
  className?: string;
  /** Test ID for testing purposes */
  testId?: string;
  /** Whether to show scroll indicators */
  showScrollIndicators?: boolean;
  /** Accessibility properties */
  ally?: {
    /** ARIA role for the tabs container */
    role?: string;
    /** ARIA label for the tabs container */
    'aria-label'?: string;
    /** ARIA live region setting */
    'aria-live'?: 'polite' | 'assertive' | 'off';
    /** ARIA controls ID for the content that this tab panel controls */
    'aria-controls'?: string;
  };
}

const ALL_CATEGORIES: Category[] = [
  'All Categories',
  'Arts & Crafts',
  'Cooking',
  'Technology',
  'Music',
  'Languages',
  'DIY & Home',
  'Gardening',
];

export default function CategoryTabs({ 
  value = 'All Categories',
  onCategorySelect = () => {},
  className = '',
  testId = 'category-tabs',
  showScrollIndicators = false,
  ally = {}
}: CategoryTabsProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(value);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [showRightIndicator, setShowRightIndicator] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Update selected category when value prop changes
  useEffect(() => {
    setSelectedCategory(value);
  }, [value]);

  // Check scroll position to show/hide indicators
  const updateScrollIndicators = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftIndicator(scrollLeft > 0);
    setShowRightIndicator(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Set up scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    updateScrollIndicators();
    container.addEventListener('scroll', updateScrollIndicators);
    
    // Handle window resize
    const handleResize = () => updateScrollIndicators();
    window.addEventListener('resize', handleResize);
    
    return () => {
      container.removeEventListener('scroll', updateScrollIndicators);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
    
    // Optional: Scroll to center the selected tab
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const tab = container.querySelector(`[data-category="${category}"]`) as HTMLElement;
      if (tab) {
        const containerWidth = container.clientWidth;
        const tabLeft = tab.offsetLeft;
        const tabWidth = tab.offsetWidth;
        const scrollLeft = tabLeft + tabWidth / 2 - containerWidth / 2;
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div 
      className={`relative ${className}`}
      data-testid={testId}
      role="navigation"
      aria-label="Filter by category"
    >
      {showScrollIndicators && showLeftIndicator && (
        <div 
          className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background-ivory to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
      )}
      
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div 
          className="flex space-x-2 min-w-max" 
          role="tablist"
          aria-orientation="horizontal"
        >
          {ALL_CATEGORIES.map((category) => {
            const isSelected = category === selectedCategory;
            return (
              <Button
                key={category}
                id={`${testId}-${category.toLowerCase().replace(/\s+/g, '-')}`}
                variant={isSelected ? "default" : "outline"}
                className={
                  isSelected
                    ? "bg-primary-warm-gold hover:bg-secondary-gold-light text-white"
                    : "border-neutral-taupe text-dark-brown hover:bg-secondary-gold-pale hover:text-primary-warm-gold hover:border-primary-warm-gold"
                }
                onClick={() => handleCategoryClick(category)}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`${testId}-panel-${category.toLowerCase().replace(/\s+/g, '-')}`}
                tabIndex={isSelected ? 0 : -1}
                data-category={category}
                data-testid={`${testId}-tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </Button>
            );
          })}
        </div>
      </div>
      
      {showScrollIndicators && showRightIndicator && (
        <div 
          className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background-ivory to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
      )}
      
      {/* Add a hidden element to announce category changes to screen readers */}
      <div 
        className="sr-only" 
        aria-live="polite"
        aria-atomic="true"
      >
        {selectedCategory} category selected
      </div>
    </div>
  )
}
