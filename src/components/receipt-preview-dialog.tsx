"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface ReceiptPreviewDialogProps {
  receiptUrl: string
  expenseDescription: string
}

export function ReceiptPreviewDialog({ receiptUrl, expenseDescription }: ReceiptPreviewDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="h-4 w-4" />
          <span className="sr-only">View Receipt</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Receipt: {expenseDescription}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
          <Image
            src={receiptUrl || "/placeholder.svg"}
            alt={`Receipt for ${expenseDescription}`}
            fill
            className="object-cover"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
