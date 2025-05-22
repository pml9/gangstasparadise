import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  className?: string
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  siblingCount = 1,
  className = ''
}: PaginationProps) {
  const DOTS = '...';
  
  const paginationRange = () => {
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;
    
    // Case 1: If the number of pages is less than the page numbers we want to show in our
    // paginationComponent, we return the range [1..totalPages]
    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }
    
    // Calculate left and right sibling index and make sure they are within range 1 and totalPages
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    
    // We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
    
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;
    
    // Case 2: No left dots to show, but rights dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPages];
    }
    
    // Case 3: No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }
    
    // Case 4: Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    
    return [];
  };
  
  const pages = paginationRange();
  
  if (totalPages <= 1) return null;
  const handlePageChange = (page: number | string) => {
    if (page === DOTS || page === currentPage) return;
    onPageChange(Number(page));
  };

  return (
    <nav 
      className={`flex items-center justify-center gap-1 ${className}`}
      role="navigation"
      aria-label="Pagination"
      data-testid="pagination"
    >
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="border-neutral-taupe text-dark-brown hover:bg-secondary-gold-pale hover:text-primary-warm-gold hover:border-primary-warm-gold disabled:opacity-50"
        aria-label="Previous page"
        data-testid="pagination-prev"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </Button>

      <ul className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === DOTS) {
            return (
              <li key={`dots-${index}`} className="px-2 py-1">
                <MoreHorizontal className="h-4 w-4 text-neutral-taupe" aria-hidden="true" />
                <span className="sr-only">More pages</span>
              </li>
            );
          }

          const isCurrent = page === currentPage;
          return (
            <li key={page}>
              <Button
                variant={isCurrent ? "default" : "outline"}
                className={
                  isCurrent
                    ? "bg-primary-warm-gold hover:bg-secondary-gold-light text-white"
                    : "border-neutral-taupe text-dark-brown hover:bg-secondary-gold-pale hover:text-primary-warm-gold hover:border-primary-warm-gold"
                }
                size="icon"
                onClick={() => handlePageChange(page)}
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={isCurrent ? `Page ${page}, current page` : `Go to page ${page}`}
                data-testid={`pagination-page-${page}`}
              >
                {page}
              </Button>
            </li>
          );
        })}
      </ul>

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="border-neutral-taupe text-dark-brown hover:bg-secondary-gold-pale hover:text-primary-warm-gold hover:border-primary-warm-gold disabled:opacity-50"
        aria-label="Next page"
        data-testid="pagination-next"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </nav>
  )
}
