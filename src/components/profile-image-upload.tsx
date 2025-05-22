"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Camera, X, Check, Move, ZoomIn, ZoomOut } from "lucide-react"
import ReactCrop, { type Crop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"

interface ProfileImageUploadProps {
  /** URL of the current profile image */
  currentImage?: string
  /** Name of the user for avatar fallback */
  name: string
  /** Callback when the image is changed */
  onImageChange: (file: File | null, croppedImageUrl: string) => void
  /** Test ID for testing purposes */
  testId?: string
  /** ARIA label for the upload button */
  'aria-label'?: string
  /** Additional class names */
  className?: string
}

export function ProfileImageUpload({ 
  currentImage, 
  name, 
  onImageChange, 
  testId = 'profile-image-upload',
  'aria-label': ariaLabel = 'Upload profile image',
  className = ''
}: ProfileImageUploadProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 80,
    height: 80,
    x: 10,
    y: 10,
  })
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null)
  const [zoom, setZoom] = useState(1)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
        setIsDialogOpen(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  const getCroppedImg = useCallback(() => {
    if (!imageRef.current || !completedCrop) return null

    const canvas = document.createElement("canvas")
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height
    const ctx = canvas.getContext("2d")

    if (!ctx) return null

    canvas.width = completedCrop.width
    canvas.height = completedCrop.height

    ctx.drawImage(
      imageRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height,
    )

    return canvas.toDataURL("image/jpeg")
  }, [completedCrop])

  const handleSave = () => {
    const croppedImageUrl = getCroppedImg()
    if (croppedImageUrl && selectedFile) {
      onImageChange(selectedFile, croppedImageUrl)
    }
    setIsDialogOpen(false)
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setIsDialogOpen(false)
  }

  return (
    <div 
      className="flex flex-col items-center"
      data-testid={testId}
      role="region"
      aria-label={ariaLabel}
    >
      <div 
        className={`relative group ${className}`}
        data-testid="avatar-container"
      >
        <Avatar 
          className="h-24 w-24 border-4 border-primary-warm-gold"
          data-testid="profile-avatar"
          aria-hidden="true"
        >
          <AvatarImage 
            src={currentImage || "/placeholder.svg"} 
            alt="" 
            role="presentation"
            data-testid="avatar-image"
          />
          <AvatarFallback 
            className="bg-primary-warm-gold text-white text-xl"
            data-testid="avatar-fallback"
          >
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div 
          className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          role="button"
          aria-label={`Change profile picture for ${name}`}
          aria-haspopup="dialog"
          data-testid="change-profile-image-button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              document.getElementById('profile-image-upload')?.click()
            }
          }}
        >
          <Camera className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <label
          htmlFor="profile-image-upload"
          className="sr-only"
          data-testid="file-input-label"
        >
          Upload a new profile picture
        </label>
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          id="profile-image-upload"
          onChange={handleFileChange}
          data-testid="file-input"
          aria-describedby="file-format-hint"
        />
        <p 
          id="file-format-hint" 
          className="sr-only"
          data-testid="file-format-hint"
        >
          Accepted formats: JPG, PNG, GIF. Maximum size: 5MB.
        </p>
      </div>

      <Dialog 
        open={isDialogOpen} 
        onOpenChange={(isOpen) => {
          if (!isOpen) handleCancel();
          setIsDialogOpen(isOpen);
        }}
        data-testid="crop-dialog"
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle data-testid="dialog-title">Crop Image</DialogTitle>
          </DialogHeader>

          <div 
            className="flex flex-col items-center space-y-4"
            role="region"
            aria-label="Image crop area"
          >
            <div 
              className="relative overflow-hidden rounded-lg border border-neutral-taupe/20"
              data-testid="crop-container"
            >
              {previewUrl && (
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1}
                  circularCrop
                  aria-label="Crop your profile picture"
                  data-testid="react-crop"
                >
                  <img
                    ref={imageRef}
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview of uploaded image for cropping"
                    style={{ transform: `scale(${zoom})` }}
                    className="max-h-[300px] transition-transform"
                    data-testid="crop-image-preview"
                  />
                </ReactCrop>
              )}
            </div>

            <div 
              className="flex items-center justify-center space-x-4"
              role="toolbar"
              aria-label="Image adjustment controls"
              data-testid="zoom-controls"
            >
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                className="rounded-full h-8 w-8 p-0"
                aria-label="Zoom out"
                data-testid="zoom-out-button"
              >
                <ZoomOut className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Zoom out</span>
              </Button>

              <div 
                className="flex items-center space-x-2"
                data-testid="drag-instruction"
              >
                <Move className="h-4 w-4 text-neutral-taupe" aria-hidden="true" />
                <span className="text-body-small text-neutral-taupe">
                  <span className="sr-only">Instructions: </span>
                  Drag to position
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                className="rounded-full h-8 w-8 p-0"
                aria-label="Zoom in"
                data-testid="zoom-in-button"
              >
                <ZoomIn className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Zoom in</span>
              </Button>
            </div>

            <div 
              className="flex justify-end gap-2 mt-4 w-full"
              role="toolbar"
              aria-label="Image crop actions"
              data-testid="crop-actions"
            >
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                data-testid="cancel-crop-button"
                aria-label="Cancel and discard changes"
              >
                <X className="h-4 w-4 mr-2" aria-hidden="true" />
                <span>Cancel</span>
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                data-testid="save-crop-button"
                aria-label="Save profile picture"
              >
                <Check className="h-4 w-4 mr-2" aria-hidden="true" />
                <span>Save</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
