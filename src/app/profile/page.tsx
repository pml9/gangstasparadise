"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format, isBefore, isAfter, parseISO } from "date-fns"
import { 
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Star,
  Plus,
  Edit2,
  Check,
  X,
  Loader2,
  Camera,
  ZoomOut,
  ZoomIn,
  StarHalf,
} from "lucide-react"
import { SessionStatus } from "@/types/common"
import { Session } from "@/types/session"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ProfileTeachingSkillCard from "@/components/profile-teaching-skill-card"
import ProfileLearningSkillCard from "@/components/profile-learning-skill-card"
import { cn } from "@/lib/utils"
import { useUserData } from "@/lib/hooks/useUserData"
import { AgeGroup, SessionFormat } from "@/types/common"
import { generateCalendarDays } from "@/lib/utils/calendar"
import ProfileLoading from "./loading"
import { ApiResponse } from "@/types"

export default function ProfilePage() {
  const { userData, isLoading: isUserLoading, error: userError } = useUserData()
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("teaching")
  const [editMode, setEditMode] = useState<string | null>(null)
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)  // Use userData when available, otherwise use default values
  const currentUser = userData;

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Profile image state
  const [profileImage, setProfileImage] = useState(currentUser?.image || '')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 100, height: 100 })
  const [zoom, setZoom] = useState(1)
  
  // Form state
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    motivation: currentUser?.motivation || '',
    city: currentUser?.location?.city || '',
    country: currentUser?.location?.country || '',
    preferredFormat: currentUser?.preferredFormat || SessionFormat.BOTH,
    contactEmail: currentUser?.contactEmail || false,
    contactPhone: currentUser?.contactPhone || false,
    phoneNumber: currentUser?.phoneNumber || '',
    ageGroup: currentUser?.ageGroup || AgeGroup.YOUNG_LEARNERS, // Update form data when user data loads
  })


  // Session state
  const [sessionsState, setSessionsState] = useState<{
    recent: Array<{
      id: string;
      title: string;
      date: string;
      teacherName: string;
      teacherImage?: string;
      rating: number;
    }>;
    upcoming: Array<{
      id: string;
      title: string;
      date: string;
      time: string;
      teacherName: string;
      teacherImage?: string;
    }>;
    isLoading: boolean;
    error: string | null;
  }>({
    recent: [],
    upcoming: [],
    isLoading: true,
    error: null
  });

  // Autosave state
  const [showCharCount, setShowCharCount] = useState(false)
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        bio: userData.bio || '',
        motivation: userData.motivation || '',
        city: userData.location?.city || '',
        country: userData.location?.country || '',
        preferredFormat: userData.preferredFormat || SessionFormat.BOTH,
        contactEmail: userData.contactEmail || false,
        contactPhone: userData.contactPhone || false,
        phoneNumber: userData.phoneNumber || '',
        ageGroup: userData.ageGroup || AgeGroup.YOUNG_LEARNERS,
      });
    }
  }, [userData])
  
  useEffect(() => {
    if (userData?.image) {
      setProfileImage(userData.image);
    }
  }, [userData?.image])

  
  const router = useRouter();
  const { isLoading: isSessionsLoading, error: sessionsError, recent, upcoming } = sessionsState;
  const nextUpcomingSession = upcoming[0]; // Get the next upcoming session for the main card


  // Fetch sessions data
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setSessionsState(prev => ({ ...prev, isLoading: true, error: null }));
        
        // Fetch all sessions
        const response = await fetch('/api/sessions');
        if (!response.ok) {
          throw new Error('Failed to fetch sessions');
        }
        
        const sessions: Session[] = (await response.json() as ApiResponse<Session[]>).data!;
        const now = new Date();
        
        // Process recent completed sessions (last 3)
        const recent = sessions
          .filter(session => session.status === SessionStatus.COMPLETED)
          .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
          .slice(0, 3)
          .map(session => ({
            id: session.id,
            title: session.title,
            date: format(new Date(session.startTime), 'MMM d, yyyy'),
            teacherName: session.teacher.name,
            teacherImage: session.teacher.image || undefined,
            rating: session.reviews?.length 
              ? session.reviews.reduce((sum, review) => sum + review.rating, 0) / session.reviews.length
              : 5 // Default to 5 if no reviews
          }));
        
        // Process upcoming sessions (next 30 days)
        const upcoming = sessions
          .filter(session => 
            session.status === SessionStatus.SCHEDULED && 
            isAfter(parseISO(session.startTime), now) &&
            isBefore(parseISO(session.startTime), new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000))
          )
          .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
          .slice(0, 5) // Limit to 5 upcoming sessions
          .map(session => ({
            id: session.id,
            title: session.title,
            date: format(new Date(session.startTime), 'MMM d, yyyy'),
            time: `${format(new Date(session.startTime), 'h:mm a')} - ${format(new Date(session.endTime), 'h:mm a')}`,
            teacherName: session.teacher.name,
            teacherImage: session.teacher.image || undefined
          }));
        
        setSessionsState({
          recent,
          upcoming,
          isLoading: false,
          error: null
        });
        
      } catch (err) {
        console.error('Error fetching sessions:', err);
        setSessionsState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to load sessions. Please try again later.'
        }));
      }
    };
    
    fetchSessions();
  }, [])

  const upcomingSession = sessionsState.upcoming[0]; // Get the next upcoming session for the main card

  
  // Show loading state while user data is being fetched
  if (isUserLoading) {
    return <ProfileLoading />
  }

  // Show error state if user data fails to load
  if (userError) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center space-y-4">
          <p className="text-red-500">Error loading profile: {userError}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }
  
  // Loading state - using isUserLoading from useUserData hook
  if (isUserLoading) {
    return <ProfileLoading />
  }

  // Error state - using userError from useUserData hook
  if (userError) {
    return (
      <div className="bg-background-light min-h-screen pb-16">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error loading profile: {userError}</strong>
          </div>
        </div>
      </div>
    );
  }
  // Calendar data for current month
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  const currentDay = now.getDate()
  
  // Generate calendar days using the utility function
  const calendarDays = generateCalendarDays(currentYear, currentMonth, currentDay)

  // Handle edit mode toggle
  const toggleEditMode = (section: string) => {
    if (editMode === section) {
      setEditMode(null)
    } else {
      setEditMode(section)
    }
  }

  // Handle form field changes
  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when field is edited
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Handle autosave for bio field
  const handleBioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      bio: value,
    }))

    setShowCharCount(true)

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current)
    }

    setIsSaving(true)
    autoSaveTimerRef.current = setTimeout(() => {
      // Simulate API call
      setTimeout(() => {
        setIsSaving(false)
        setTimeout(() => setShowCharCount(false), 2000)
      }, 1000)
    }, 1000)
  }

  // Validate form fields
  const validateForm = (section: string) => {
    const newErrors: Record<string, string> = {}

    if (section === "basic") {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required"
      }

      if (formData.bio.length > 300) {
        newErrors.bio = "Bio must be less than 300 characters"
      }
    }

    if (section === "contact") {
      if (formData.contactPhone && !formData.phoneNumber) {
        newErrors.phoneNumber = "Phone number is required if contact by phone is enabled"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle section save
  const handleSaveSection = async (section: string) => {
    if (!validateForm(section)) {
      return Promise.reject("Validation failed")
    }

    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // In a real app, you would save to the backend here
        toast({
          title: "Changes saved",
          description: "Your profile has been updated successfully.",
        })
        resolve()
        setEditMode(null)
      }, 1000)
    })
  }

  // Handle profile image change
  const handleProfileImageChange = (file: File | null, croppedImageUrl: string) => {
    // In a real app, you would upload the file to your backend/storage
    setProfileImage(croppedImageUrl)
    setIsImageDialogOpen(false)

    toast({
      title: "Profile picture updated",
      description: "Your new profile picture has been saved.",
    })
  }

  // Handle file selection for profile image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
        setIsImageDialogOpen(true)
      }
      reader.readAsDataURL(file)
    }
  }

  // Format age group for display
  const formatAgeGroup = (ageGroup: string) => {
    return ageGroup
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }

  // Get age group display name
  const getAgeGroupDisplay = (ageGroup: AgeGroup) => {
    switch (ageGroup) {
      case AgeGroup.ESTABLISHED_ADULTS:
        return 'Established Adult';
      case AgeGroup.YOUNG_LEARNERS:
        return 'Young Learner';
      case AgeGroup.EXPERIENCED_GUIDES:
        return 'Experienced Guide';
      case AgeGroup.WISDOM_KEEPERS:
        return 'Wisdom Keeper';
      default:
        return '';
    }
  }

  // Get join date
  const getJoinDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  }

  // Render star rating
  const renderStarRating = (rating: number) => {
    const safeRating = rating || 0;
    const stars = [];
    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="h-4 w-4 text-yellow-400 fill-current" />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300 fill-current" />
      );
    }

    return stars;
  }

  return (
    <div className="bg-background-light min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm relative">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-2 border-primary-warm-gold">
                  <AvatarImage src={profileImage || "/placeholder.svg"} alt={formData.name} />
                  <AvatarFallback className="bg-primary-warm-gold text-white text-xl">
                    {formData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label
                    htmlFor="profile-image-upload"
                    className="cursor-pointer p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <Camera className="h-5 w-5 text-white" />
                    <span className="sr-only">Change profile picture</span>
                  </label>
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                <div className="bg-success-green rounded-full w-4 h-4"></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  {editMode === "basic" ? (
                    <div className="mb-4">
                      <label className="text-body-small text-neutral-taupe mb-1 block">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        className={cn("max-w-xs", errors.name ? "border-error-red focus-visible:border-error-red" : "")}
                      />
                      {errors.name && (
                        <p className="text-error-red text-caption mt-1 animate-in slide-in-from-top-1">{errors.name}</p>
                      )}
                    </div>
                  ) : (
                    <h1 className="text-h2 font-bold text-primary-deep-brown">{formData.name}</h1>
                  )}
                  <Badge className="bg-accent-sage text-white mt-1 mb-2">{getAgeGroupDisplay(formData.ageGroup)}</Badge>
                </div>
                {editMode ? (
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-neutral-taupe hover:text-error-red hover:border-error-red"
                      onClick={() => setEditMode(null)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="bg-success-green hover:bg-success-green/90 text-white"
                      onClick={() => handleSaveSection(editMode)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" className="mt-2 md:mt-0" size="sm" onClick={() => toggleEditMode("basic")}>
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit Profile
                  </Button>
                )}
              </div>

              {editMode === "basic" ? (
                <div className="space-y-4 max-w-2xl">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-body-small text-neutral-taupe">Bio</label>
                      {isSaving ? (
                        <span className="text-information-blue flex items-center text-caption">
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Saving...
                        </span>
                      ) : showCharCount ? (
                        <span
                          className={`text-caption ${formData.bio.length > 240 ? "text-warning-amber" : "text-neutral-taupe"}`}
                        >
                          {formData.bio.length}/300
                        </span>
                      ) : null}
                    </div>
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => handleBioChange(e.target.value)}
                      className="resize-none min-h-[100px]"
                      placeholder="Tell us about yourself"
                      maxLength={300}
                    />
                    {errors.bio && (
                      <p className="text-error-red text-caption animate-in slide-in-from-top-1">{errors.bio}</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-body text-neutral-taupe mb-2">{formData.bio}</p>
              )}

              {editMode === "contact" ? (
                <div className="space-y-4 max-w-2xl mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-body-small text-neutral-taupe">City</label>
                      <Input
                        value={formData.city}
                        onChange={(e) => handleFieldChange("city", e.target.value)}
                        placeholder="Your city"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-body-small text-neutral-taupe">Country</label>
                      <Input
                        value={formData.country}
                        onChange={(e) => handleFieldChange("country", e.target.value)}
                        placeholder="Your country"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center md:items-start text-body-small text-neutral-taupe">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-primary-warm-gold mr-1" />
                    <span>
                      {formData.city}, {formData.country}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-primary-warm-gold mr-1" />
                    <span>Joined {getJoinDate(userData!.createdAt)}</span>
                  </div>
                </div>
              )}

              {editMode === "contact" && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-body-small text-neutral-taupe">Preferred Session Format</label>
                    <Select
                      value={formData.preferredFormat}
                      onValueChange={(value) => handleFieldChange("preferredFormat", value)}
                    >
                      <SelectTrigger className="max-w-xs">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VIRTUAL">Virtual</SelectItem>
                        <SelectItem value="IN_PERSON">In-person</SelectItem>
                        <SelectItem value="BOTH">Hybrid (Both)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-body-small font-medium">Contact Preferences</h4>

                    <div className="flex items-center justify-between max-w-md">
                      <div className="space-y-0.5">
                        <Label htmlFor="contact-email">Allow contact via email</Label>
                        <p className="text-caption text-neutral-taupe">Your email will be visible to other users</p>
                      </div>
                      <Switch
                        id="contact-email"
                        checked={formData.contactEmail}
                        onCheckedChange={(value) => handleFieldChange("contactEmail", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between max-w-md">
                      <div className="space-y-0.5">
                        <Label htmlFor="contact-phone">Allow contact via phone</Label>
                        <p className="text-caption text-neutral-taupe">
                          Your phone number will be visible to other users
                        </p>
                      </div>
                      <Switch
                        id="contact-phone"
                        checked={formData.contactPhone}
                        onCheckedChange={(value) => handleFieldChange("contactPhone", value)}
                      />
                    </div>

                    {formData.contactPhone && (
                      <div className="space-y-2 max-w-xs">
                        <label className="text-body-small text-neutral-taupe">
                          Phone Number
                          <span className="text-error-red ml-1">*</span>
                        </label>
                        <Input
                          value={formData.phoneNumber}
                          onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
                          placeholder="Your phone number"
                          className={errors.phoneNumber ? "border-error-red focus-visible:border-error-red" : ""}
                        />
                        {errors.phoneNumber && (
                          <p className="text-error-red text-caption animate-in slide-in-from-top-1">
                            {errors.phoneNumber}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!editMode && (
                <div className="mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-neutral-taupe hover:text-primary-warm-gold"
                    onClick={() => toggleEditMode("contact")}
                  >
                    <Edit2 className="h-3 w-3 mr-1" />
                    Edit Contact Info
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-none shadow-sm overflow-hidden">
            <CardContent className="p-4 flex items-center">
              <div className="bg-primary-warm-gold/10 p-3 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-warm-gold"
                >
                  <path d="M18 10V8a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2"></path>
                  <path d="M18 14v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2"></path>
                  <rect width="18" height="8" x="3" y="10" rx="2"></rect>
                </svg>
              </div>
              <div>
                <p className="text-h3 font-semibold text-primary-deep-brown">{userData?.teachingSkills?.length || 0}</p>
                <p className="text-body-small text-neutral-taupe">Skills Taught</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm overflow-hidden">
            <CardContent className="p-4 flex items-center">
              <div className="bg-primary-warm-gold/10 p-3 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-warm-gold"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                </svg>
              </div>
              <div>
                <p className="text-h3 font-semibold text-primary-deep-brown">{userData?.learningSkills?.length || 0}</p>
                <p className="text-body-small text-neutral-taupe">Skills Learned</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm overflow-hidden">
            <CardContent className="p-4 flex items-center">
              <div className="bg-primary-warm-gold/10 p-3 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-warm-gold"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
              </div>
              <div>
                <p className="text-h3 font-semibold text-primary-deep-brown">{userData?.totalSessions || 0}</p>
                <p className="text-body-small text-neutral-taupe">Sessions Completed</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm overflow-hidden">
            <CardContent className="p-4 flex items-center">
              <div className="bg-primary-warm-gold/10 p-3 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-warm-gold"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <div>
                <p className="text-h3 font-semibold text-primary-deep-brown">
                  {userData?.averageRating ? userData.averageRating.toFixed(1) : '0.0'}
                </p>
                <p className="text-body-small text-neutral-taupe">Average Rating</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left and Middle Columns */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="teaching" onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 bg-white w-full justify-start border-b rounded-none h-auto p-0 gap-4">
                <TabsTrigger
                  value="teaching"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-warm-gold data-[state=active]:bg-transparent py-3 px-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M18 10V8a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2"></path>
                    <path d="M18 14v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2"></path>
                    <rect width="18" height="8" x="3" y="10" rx="2"></rect>
                  </svg>
                  Teaching
                </TabsTrigger>
                <TabsTrigger
                  value="learning"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-warm-gold data-[state=active]:bg-transparent py-3 px-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                  </svg>
                  Learning
                </TabsTrigger>
                <TabsTrigger
                  value="sessions"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-warm-gold data-[state=active]:bg-transparent py-3 px-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                  Sessions
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-warm-gold data-[state=active]:bg-transparent py-3 px-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  Reviews
                </TabsTrigger>
              </TabsList>

              {/* Teaching Tab */}
              <TabsContent value="teaching" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-h3 font-semibold text-primary-deep-brown">Teaching Skills</h2>
                  <Button className="bg-primary-warm-gold hover:bg-primary-warm-gold/90 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Skill
                  </Button>
                </div>

                {userData!.teachingSkills.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData?.teachingSkills?.map((skill) => (
                      <ProfileTeachingSkillCard key={skill.id} skill={skill} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl border border-neutral-taupe/10 flex flex-col items-center">
                    <div className="bg-primary-warm-gold/10 p-4 rounded-full mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary-warm-gold"
                      >
                        <path d="M18 10V8a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2"></path>
                        <path d="M18 14v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2"></path>
                        <rect width="18" height="8" x="3" y="10" rx="2"></rect>
                      </svg>
                    </div>
                    <h3 className="text-h4 font-semibold text-primary-deep-brown mb-2">No Teaching Skills Yet</h3>
                    <p className="text-body text-neutral-taupe mb-6 max-w-md">
                      Share your knowledge with others by adding skills you can teach.
                    </p>
                    <Button className="bg-primary-warm-gold hover:bg-primary-warm-gold/90 text-white">
                      Start Teaching
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Learning Tab */}
              <TabsContent value="learning" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-h3 font-semibold text-primary-deep-brown">Learning Skills</h2>
                  <Button
                    variant="outline"
                    className="border-primary-warm-gold text-primary-warm-gold hover:bg-primary-warm-gold/10"
                  >
                    Browse Skills
                  </Button>
                </div>

                {userData!.learningSkills.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData?.learningSkills?.map((skill) => (
                      <ProfileLearningSkillCard key={skill.id} skill={skill} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl border border-neutral-taupe/10 flex flex-col items-center">
                    <div className="bg-primary-warm-gold/10 p-4 rounded-full mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary-warm-gold"
                      >
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                      </svg>
                    </div>
                    <h3 className="text-h4 font-semibold text-primary-deep-brown mb-2">Start Your Learning Journey</h3>
                    <p className="text-body text-neutral-taupe mb-6 max-w-md">
                      Discover skills you'd like to learn from others in the community.
                    </p>
                    <Button className="bg-primary-warm-gold hover:bg-primary-warm-gold/90 text-white">
                      Explore Skills
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Sessions Tab */}
              <TabsContent value="sessions" className="space-y-6">
                <h2 className="text-h3 font-semibold text-primary-deep-brown mb-4">Recent Sessions</h2>

                {isSessionsLoading ? (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-100 rounded-lg h-24"></div>
        ))}
      </div>
    ) : sessionsError ? (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{sessionsError}</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="text-primary-warm-gold border-primary-warm-gold"
        >
          Retry
        </Button>
      </div>
    ) : recent.length > 0 ? (
      <div className="space-y-4">
        {recent.map((session) => (
          <Card key={session.id} className="bg-white border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center p-4">
                <Badge className="bg-success-green text-white mr-3">Completed</Badge>
                <div className="flex-1">
                  <h3 className="text-body font-semibold text-primary-deep-brown">{session.title}</h3>
                  <p className="text-body-small text-neutral-taupe">{session.date}</p>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage
                      src={session.teacherImage || "/placeholder.svg"}
                      alt={session.teacherName}
                    />
                    <AvatarFallback className="bg-primary-warm-gold text-white">
                      {session.teacherName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-body-small font-medium">with {session.teacherName}</p>
                    <div className="flex">
                      {renderStarRating(session.rating)}
                      <span className="text-caption ml-1 text-neutral-taupe">
                        {session.rating.toFixed(1)} rating
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="text-center mt-4">
          <Button 
            variant="link" 
            className="text-primary-warm-gold"
            onClick={() => router.push('/my-sessions')}
          >
            View All Sessions
          </Button>
        </div>
      </div>
    ) : (
      <div className="text-center py-12 bg-white rounded-xl border border-neutral-taupe/10">
        <p className="text-body text-neutral-taupe mb-4">You don't have any completed sessions yet.</p>
        <Button 
          className="bg-primary-warm-gold hover:bg-primary-warm-gold/90 text-white"
          onClick={() => router.push('/skills')}
        >
          Find Skills to Learn
        </Button>
      </div>
    )}
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-h3 font-semibold text-primary-deep-brown">Reviews</h2>
                  <div className="flex items-center">
                    <div className="flex mr-2">{renderStarRating(userData?.averageRating || 0)}</div>
                    <span className="text-body-small text-neutral-taupe">({userData?.totalSessions || 0} reviews)</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Calendar and Upcoming Sessions */}
          <div className="space-y-8">
            {/* Upcoming Sessions Calendar */}
            <Card className="bg-white border-none shadow-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-h4 font-semibold text-primary-deep-brown">Upcoming Sessions</h2>
                  <div className="flex">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-taupe">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-taupe">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-body font-medium text-center mb-2">May 2024</h3>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    <div className="text-caption text-neutral-taupe">S</div>
                    <div className="text-caption text-neutral-taupe">M</div>
                    <div className="text-caption text-neutral-taupe">T</div>
                    <div className="text-caption text-neutral-taupe">W</div>
                    <div className="text-caption text-neutral-taupe">T</div>
                    <div className="text-caption text-neutral-taupe">F</div>
                    <div className="text-caption text-neutral-taupe">S</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => (
                      <div
                        key={index}
                        className={`
                          h-8 w-8 flex items-center justify-center rounded-full text-sm
                          ${!day.current ? "text-neutral-taupe/50" : "text-primary-deep-brown"}
                          ${day.isToday ? "bg-primary-warm-gold text-white" : ""}
                          ${day.hasSession && !day.isToday ? "border-2 border-primary-warm-gold" : ""}
                        `}
                      >
                        {day.day}
                      </div>
                    ))}
                  </div>
                </div>

                {isSessionsLoading ? (
                  <div className="space-y-4">
                    <div className="animate-pulse bg-gray-100 rounded-lg h-24"></div>
                  </div>
                ) : nextUpcomingSession ? (
                  <div>
                    <h3 className="text-body-small font-medium mb-2 flex justify-between">
                      <span>Next Session</span>
                      <span className="text-neutral-taupe">{nextUpcomingSession.date}</span>
                    </h3>
                    <div className="bg-background-light p-3 rounded-lg flex items-center">
                      <Avatar className="h-10 w-10 mr-3 bg-primary-warm-gold/10">
                        <AvatarImage
                          src={nextUpcomingSession.teacherImage || "/placeholder.svg"}
                          alt={nextUpcomingSession.teacherName}
                        />
                        <AvatarFallback className="bg-primary-warm-gold text-white">
                          {nextUpcomingSession.teacherName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="text-body font-medium">{nextUpcomingSession.title}</h4>
                        <p className="text-body-small text-neutral-taupe">
                          with {nextUpcomingSession.teacherName} • {nextUpcomingSession.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-body text-neutral-taupe mb-4">No upcoming sessions scheduled.</p>
                    <Button 
                      className="bg-primary-warm-gold hover:bg-primary-warm-gold/90 text-white"
                      onClick={() => router.push('/skills')}
                    >
                      Browse Available Skills
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Profile Image Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center space-y-4">
            {previewUrl && (
              <div className="relative overflow-hidden rounded-lg border border-neutral-taupe/20 w-full max-w-xs">
                <img src={previewUrl || "/placeholder.svg"} alt="Profile preview" className="w-full h-auto" />
              </div>
            )}

            <div className="flex items-center justify-center space-x-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}
                className="rounded-full h-8 w-8 p-0"
              >
                <ZoomOut className="h-4 w-4" />
                <span className="sr-only">Zoom out</span>
              </Button>

              <div className="flex items-center space-x-2">
                <span className="text-body-small text-neutral-taupe">Zoom: {Math.round(zoom * 100)}%</span>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setZoom(Math.min(zoom + 0.1, 3))}
                className="rounded-full h-8 w-8 p-0"
              >
                <ZoomIn className="h-4 w-4" />
                <span className="sr-only">Zoom in</span>
              </Button>
            </div>

            <div className="flex justify-end space-x-2 w-full">
              <Button variant="outline" onClick={() => setIsImageDialogOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={() => handleProfileImageChange(selectedFile, previewUrl || "")}>
                <Check className="h-4 w-4 mr-2" />
                Apply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
