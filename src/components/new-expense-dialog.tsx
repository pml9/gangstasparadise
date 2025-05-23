"use client"

import type * as React from "react"
import { useState, useRef } from "react"
import { Loader2, Upload, Check, AlertCircle, ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import type { OCRData, ExpenseCategory } from "@/types/expense"

interface NewExpenseDialogProps {
  onSuccess?: () => void
}

export function NewExpenseDialog({ onSuccess }: NewExpenseDialogProps) {
  const [open, setOpen] = useState(false)

  // Multi-step form state
  const [step, setStep] = useState<"upload" | "review" | "submit">("upload")

  // Form fields
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [currency, setCurrency] = useState("USD")

  // File and processing state
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [ocrData, setOcrData] = useState<OCRData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const resetForm = () => {
    setAmount("")
    setCategory("")
    setDescription("")
    setCurrency("USD")
    setReceiptFile(null)
    setPreviewUrl(null)
    setOcrData(null)
    setUploadError(null)
    setStep("upload")

    // Also reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null)

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Basic validation
      if (!file.type.startsWith("image/")) {
        setUploadError("Please upload an image file (JPEG, PNG, etc.)")
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setUploadError("File size must be less than 5MB")
        return
      }

      setReceiptFile(file)

      // Create a preview URL
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      // Clean up the preview URL when component unmounts
      return () => URL.revokeObjectURL(objectUrl)
    }
  }

  const processReceipt = async () => {
    if (!receiptFile) {
      setUploadError("Please select a receipt to upload")
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      const formData = new FormData()
      formData.append("file", receiptFile)

      const response = await fetch("/api/expenses/upload-receipt", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to process receipt")
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Receipt processing failed")
      }

      // Set the OCR data and populate the form fields
      setOcrData(data.ocr_data)
      if (data.ocr_data.detected_amount) {
        setAmount(data.ocr_data.detected_amount.toString())
      }
      if (data.ocr_data.suggested_category) {
        setCategory(data.ocr_data.suggested_category)
      }
      if (data.ocr_data.merchant_name) {
        setDescription(`${data.ocr_data.merchant_name} - ${data.ocr_data.transaction_date || "Purchase"}`)
      }

      // Move to the review step
      setStep("review")

      toast({
        title: "Receipt processed",
        description: "We've extracted the information from your receipt. Please verify the details.",
      })
    } catch (error) {
      console.error("Receipt processing error:", error)
      setUploadError(error instanceof Error ? error.message : "Failed to process receipt")

      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "Failed to process receipt",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || !category || !description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number.parseFloat(amount),
          currency,
          category,
          description,
          receipt_url: previewUrl || "",
          ocr_data: ocrData,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to submit expense")
      }

      toast({
        title: "Success",
        description: "Your expense has been submitted successfully.",
      })

      resetForm()
      setOpen(false)
      onSuccess?.()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit expense",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    resetForm()
    setOpen(false)
  }

  // Render different content based on the current step
  const renderStepContent = () => {
    switch (step) {
      case "upload":
        return (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="receipt">Upload Receipt</Label>
              <div
                className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-md bg-gray-50"
                data-testid="receipt-upload-area"
                role="region"
                aria-labelledby="receipt-upload-label"
              >
                <span id="receipt-upload-label" className="sr-only">
                  Receipt upload area
                </span>
                {previewUrl ? (
                  <div className="w-full mb-4">
                    <div className="relative aspect-[3/4] max-w-xs mx-auto overflow-hidden rounded-md border">
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Receipt preview"
                        className="object-cover w-full h-full"
                        data-testid="receipt-preview"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center mb-4">
                    <ImageIcon className="h-12 w-12 text-gray-400 mb-2" aria-hidden="true" />
                    <p className="text-sm text-gray-500">Upload a photo of your receipt</p>
                    <p className="text-xs text-gray-400 mt-1">Supported formats: JPEG, PNG</p>
                  </div>
                )}

                <div className="flex flex-col items-center gap-2 w-full">
                  <input
                    ref={fileInputRef}
                    id="receipt"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                    aria-label="Upload receipt image"
                    data-testid="receipt-file-input"
                  />

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      data-testid="select-file-button"
                      aria-controls="receipt"
                    >
                      {previewUrl ? "Change File" : "Select File"}
                    </Button>

                    {previewUrl && (
                      <Button
                        type="button"
                        variant="default"
                        onClick={processReceipt}
                        disabled={isUploading}
                        data-testid="process-receipt-button"
                        aria-busy={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
                            Process Receipt
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {receiptFile && !isUploading && (
                    <div className="text-sm text-gray-500 mt-2" data-testid="file-info">
                      {receiptFile.name} ({Math.round(receiptFile.size / 1024)} KB)
                    </div>
                  )}
                </div>
              </div>

              {uploadError && (
                <Alert
                  variant="destructive"
                  className="mt-2"
                  data-testid="upload-error"
                  role="alert"
                  aria-live="assertive"
                >
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  <AlertDescription>{uploadError}</AlertDescription>
                </Alert>
              )}

              {isUploading && (
                <div
                  className="flex items-center justify-center gap-2 mt-2 text-sm text-blue-600"
                  data-testid="processing-indicator"
                  aria-live="polite"
                >
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Processing your receipt...
                </div>
              )}
            </div>

            {ocrData && (
              <Alert
                className="mt-2 bg-green-50 text-green-800 border-green-200"
                data-testid="ocr-success"
                role="status"
                aria-live="polite"
              >
                <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                <AlertDescription>Receipt processed! You can now review the extracted information.</AlertDescription>
              </Alert>
            )}
          </div>
        )

      case "review":
        return (
          <form onSubmit={handleSubmit} data-testid="expense-form">
            <div className="grid gap-4 py-4">
              {/* Preview of processed receipt */}
              {previewUrl && (
                <div className="mb-4 p-2 border rounded-md" data-testid="receipt-preview-container">
                  <div className="aspect-[3/4] h-40 relative overflow-hidden rounded-md">
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Receipt preview"
                      className="object-cover absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              )}

              {ocrData && (
                <Alert className="mb-4 bg-blue-50 text-blue-800 border-blue-200" data-testid="ocr-info" role="status">
                  <AlertDescription className="text-xs">
                    We've extracted information from your receipt. Please verify and make any necessary adjustments.
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                    Amount
                  </Label>
                  <div className="flex">
                    <Select value={currency} onValueChange={setCurrency} data-testid="currency-select">
                      <SelectTrigger className="w-[80px] rounded-r-none" aria-label="Currency">
                        <SelectValue placeholder="USD" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                        <SelectItem value="AUD">AUD</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1 rounded-l-none"
                      required
                      data-testid="amount-input"
                      aria-required="true"
                      aria-invalid={amount ? "false" : "true"}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                    Category
                  </Label>
                  <Select value={category} onValueChange={setCategory} required data-testid="category-select">
                    <SelectTrigger id="category" aria-required="true" aria-invalid={category ? "false" : "true"}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values({
                        Travel: "Travel",
                        Accommodation: "Accommodation",
                        Meals: "Meals",
                        "Team Building": "Team Building",
                        "Office Supplies": "Office Supplies",
                        Software: "Software",
                        Training: "Training",
                        Transportation: "Transportation",
                        Equipment: "Equipment",
                        Entertainment: "Entertainment",
                        Other: "Other",
                      } as Record<string, ExpenseCategory>).map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the expense..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  required
                  data-testid="description-textarea"
                  aria-required="true"
                  aria-invalid={description ? "false" : "true"}
                />
              </div>

              {ocrData && (
                <div className="mt-2 text-xs text-gray-500" data-testid="extracted-text">
                  <p className="font-semibold mb-1">Extracted text:</p>
                  <pre
                    className="whitespace-pre-wrap bg-gray-50 p-2 rounded border"
                    aria-label="Extracted text from receipt"
                  >
                    {ocrData.extracted_text}
                  </pre>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("upload")}
                data-testid="back-button"
                aria-label="Go back to upload step"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                data-testid="submit-expense-button"
                aria-busy={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
                Submit Expense
              </Button>
            </DialogFooter>
          </form>
        )

      default:
        return null
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          handleClose()
        } else {
          setOpen(true)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="bg-orange-600 hover:bg-orange-700"
          data-testid="new-expense-button"
          aria-label="Create new expense report"
        >
          + New Expense
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[500px]"
        aria-labelledby="expense-dialog-title"
        aria-describedby="expense-dialog-description"
        data-testid="expense-dialog"
      >
        <DialogHeader>
          <DialogTitle id="expense-dialog-title">New Expense Report</DialogTitle>
          <DialogDescription id="expense-dialog-description">
            {step === "upload"
              ? "Upload a receipt to automatically extract expense details."
              : "Review and confirm the expense details extracted from your receipt."}
          </DialogDescription>
        </DialogHeader>

        {renderStepContent()}

        {step === "upload" && (
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              data-testid="cancel-button"
              aria-label="Cancel expense creation"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!receiptFile || isUploading}
              onClick={processReceipt}
              data-testid="process-button"
              aria-busy={isUploading}
              aria-disabled={!receiptFile || isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Processing...
                </>
              ) : (
                "Process Receipt"
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
