import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface SessionRequestModalLoadingProps {
  /** Whether the modal is open */
  isOpen: boolean
  /** Test ID for testing purposes */
  testId?: string
  /** Additional accessibility attributes */
  ally?: {
    /** ARIA role for the loading modal */
    role?: string
    /** ARIA label for the loading modal */
    'aria-label'?: string
    /** ARIA live region setting */
    'aria-live'?: 'polite' | 'assertive' | 'off'
    /** ARIA busy state */
    'aria-busy'?: boolean
  }
}

export default function SessionRequestModalLoading({ 
  isOpen, 
  testId = 'session-request-modal-loading',
  ally = {}
}: SessionRequestModalLoadingProps) {
  const { 
    role = 'alert',
    'aria-label': ariaLabel = 'Loading session request form',
    'aria-live': ariaLive = 'polite',
    'aria-busy': ariaBusy = true
  } = ally;
  return (
    <Dialog 
      open={isOpen}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      aria-busy={ariaBusy}
      data-testid={testId}
    >
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden" role="alert" aria-label="Loading session request form">
        <div className="p-6 pb-2">
          <Skeleton className="h-7 w-48 mb-2" role="status" />
          <Skeleton className="h-5 w-64" role="status" />
        </div>

        <div className="px-6">
          {/* Step indicators */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center w-full">
              <Skeleton className="rounded-full h-8 w-8" />
              <Skeleton className="h-1 flex-1 mx-2" />
              <Skeleton className="rounded-full h-8 w-8" />
              <Skeleton className="h-1 flex-1 mx-2" />
              <Skeleton className="rounded-full h-8 w-8" />
            </div>
          </div>

          {/* Calendar */}
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <Skeleton className="h-64 w-full max-w-sm rounded-md" />
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Skeleton className="h-4 w-4 rounded-full mr-1" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center justify-center mt-1">
                <Skeleton className="h-4 w-4 rounded-full mr-1" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 pt-2 bg-background-ivory border-t border-neutral-taupe/10 flex justify-between">
          <Skeleton className="h-10 w-24 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
