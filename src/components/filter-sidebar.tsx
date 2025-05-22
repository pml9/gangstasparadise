"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FilterSidebarProps {
  onFilterChange?: (filters: Record<string, string[]>) => void;
  initialFilters?: Record<string, string[]>;
}

export default function FilterSidebar({ 
  onFilterChange = () => {}, 
  initialFilters = {} 
}: FilterSidebarProps) {
  const [filters, setFilters] = useState<Record<string, string[]>>(initialFilters);

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    setFilters(prev => {
      const categoryFilters = prev[category] || [];
      const newFilters = {
        ...prev,
        [category]: checked
          ? [...categoryFilters, value]
          : categoryFilters.filter(v => v !== value)
      };
      
      // Clean up empty categories
      if (!checked && (newFilters[category]?.length === 0)) {
        delete newFilters[category];
      }
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleReset = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div 
      className="bg-background-ivory p-6 rounded-xl border border-neutral-taupe/10 shadow-card"
      role="region"
      aria-label="Filter options"
      data-testid="filter-sidebar"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-h4 font-semibold text-primary-deep-brown">Filters</h2>
        <button 
          onClick={handleReset}
          className="text-sm text-primary-warm-gold hover:underline focus:outline-none focus:ring-2 focus:ring-primary-warm-gold focus:ring-offset-2 rounded"
          data-testid="reset-filters"
        >
          Reset all
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 
            id="categories-heading" 
            className="text-overline text-neutral-taupe mb-3"
          >
            CATEGORIES
          </h3>
          <div 
            className="space-y-2" 
            role="group" 
            aria-labelledby="categories-heading"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                id="arts"
                checked={filters['category']?.includes('arts') || false}
                onCheckedChange={(checked) => 
                  handleFilterChange('category', 'arts', checked === true)
                }
                className="border-neutral-taupe data-[state=checked]:bg-primary-warm-gold data-[state=checked]:border-primary-warm-gold"
                data-testid="category-arts"
              />
              <Label htmlFor="arts" className="text-body-small">
                Arts & Crafts
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cooking"
                className="border-neutral-taupe data-[state=checked]:bg-primary-warm-gold data-[state=checked]:border-primary-warm-gold"
              />
              <Label htmlFor="cooking" className="text-body-small">
                Cooking
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="technology"
                className="border-neutral-taupe data-[state=checked]:bg-primary-warm-gold data-[state=checked]:border-primary-warm-gold"
              />
              <Label htmlFor="technology" className="text-body-small">
                Technology
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="music"
                className="border-neutral-taupe data-[state=checked]:bg-primary-warm-gold data-[state=checked]:border-primary-warm-gold"
              />
              <Label htmlFor="music" className="text-body-small">
                Music
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="languages"
                className="border-neutral-taupe data-[state=checked]:bg-primary-warm-gold data-[state=checked]:border-primary-warm-gold"
              />
              <Label htmlFor="languages" className="text-body-small">
                Languages
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="diy"
                className="border-neutral-taupe data-[state=checked]:bg-primary-warm-gold data-[state=checked]:border-primary-warm-gold"
              />
              <Label htmlFor="diy" className="text-body-small">
                DIY & Home
              </Label>
            </div>
            <div className="text-primary-warm-gold text-body-small cursor-pointer mt-1 hover:text-secondary-gold-light transition-colors">
              + Show more
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-overline text-neutral-taupe mb-3">TEACHER AGE GROUP</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="young"
                className="border-neutral-taupe data-[state=checked]:bg-accent-sage data-[state=checked]:border-accent-sage"
              />
              <Label htmlFor="young" className="text-body-small">
                Young Learners (18-29)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="established"
                className="border-neutral-taupe data-[state=checked]:bg-accent-teal data-[state=checked]:border-accent-teal"
              />
              <Label htmlFor="established" className="text-body-small">
                Established Adults (30-49)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="experienced"
                className="border-neutral-taupe data-[state=checked]:bg-accent-terracotta data-[state=checked]:border-accent-terracotta"
              />
              <Label htmlFor="experienced" className="text-body-small">
                Experienced Guides (50-64)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="wisdom"
                className="border-neutral-taupe data-[state=checked]:bg-accent-mauve data-[state=checked]:border-accent-mauve"
              />
              <Label htmlFor="wisdom" className="text-body-small">
                Wisdom Keepers (65+)
              </Label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-overline text-neutral-taupe mb-3">SESSION FORMAT</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-person"
                className="border-neutral-taupe data-[state=checked]:bg-primary-warm-gold data-[state=checked]:border-primary-warm-gold"
              />
              <Label htmlFor="in-person" className="text-body-small">
                In-person
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="virtual"
                className="border-neutral-taupe data-[state=checked]:bg-primary-warm-gold data-[state=checked]:border-primary-warm-gold"
              />
              <Label htmlFor="virtual" className="text-body-small">
                Virtual
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hybrid"
                className="border-neutral-taupe data-[state=checked]:bg-primary-warm-gold data-[state=checked]:border-primary-warm-gold"
              />
              <Label htmlFor="hybrid" className="text-body-small">
                Hybrid
              </Label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-overline text-neutral-taupe mb-3">MINIMUM RATING</h3>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-5 h-5 text-warning-amber" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-body-small ml-1">(3+)</span>
          </div>
        </div>

        <div>
          <h3 className="text-overline text-neutral-taupe mb-3">LOCATION</h3>
          <Input placeholder="Enter zip code or city" className="input-field mb-2" />
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="within5"
                className="border-neutral-taupe data-[state=checked]:bg-primary-warm-gold data-[state=checked]:border-primary-warm-gold"
              />
              <Label htmlFor="within5" className="text-body-small">
                Within 5 miles
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="within15"
                className="border-neutral-taupe data-[state=checked]:bg-primary-warm-gold data-[state=checked]:border-primary-warm-gold"
              />
              <Label htmlFor="within15" className="text-body-small">
                Within 15 miles
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="within30"
                className="border-neutral-taupe data-[state=checked]:bg-primary-warm-gold data-[state=checked]:border-primary-warm-gold"
              />
              <Label htmlFor="within30" className="text-body-small">
                Within 30 miles
              </Label>
            </div>
          </div>
        </div>

        <div 
          className="flex gap-2"
          role="group"
          aria-label="Filter actions"
        >
          <Button 
            className="btn-primary w-full"
            onClick={() => onFilterChange(filters)}
            data-testid="apply-filters"
          >
            Apply
          </Button>
          <Button 
            variant="outline" 
            className="btn-secondary w-full"
            onClick={handleReset}
            data-testid="reset-filters"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
