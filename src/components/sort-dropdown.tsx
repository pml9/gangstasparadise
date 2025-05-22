import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SortDropdown() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-body-small text-neutral-taupe">Sort by:</span>
      <Select defaultValue="newest">
        <SelectTrigger className="w-[120px] border-neutral-taupe focus:ring-primary-warm-gold focus:border-primary-warm-gold">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-background-ivory border-neutral-taupe/20">
          <SelectItem value="newest" className="focus:bg-secondary-gold-pale focus:text-primary-warm-gold">
            Newest
          </SelectItem>
          <SelectItem value="rating" className="focus:bg-secondary-gold-pale focus:text-primary-warm-gold">
            Highest Rated
          </SelectItem>
          <SelectItem value="price-low" className="focus:bg-secondary-gold-pale focus:text-primary-warm-gold">
            Price: Low to High
          </SelectItem>
          <SelectItem value="price-high" className="focus:bg-secondary-gold-pale focus:text-primary-warm-gold">
            Price: High to Low
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
