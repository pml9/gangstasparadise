"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Heart, MapPin, ChevronDown, ChevronUp, Star, Calendar, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import RelatedSkillCard from "@/components/related-skill-card"
import ReviewCard from "@/components/review-card"
import SessionRequestModal from "@/components/session-request-modal"
import StarRating from "@/components/star-rating"
import { useToast } from "@/components/ui/use-toast"
import { Skill } from "@/types/skill"
import SkillDetailLoading from "./loading"

export default function SkillDetail() {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [skill, setSkill] = useState<Skill | null>(null)
  const [relatedSkills, setRelatedSkills] = useState<Skill[]>([])
  const { toast } = useToast()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/skills/${id}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch skill')
        }
        
        const data = await response.json()
        setSkill(data.data)
        
        // Fetch related skills (you might want to create a separate API endpoint for this)
        const relatedResponse = await fetch(`/api/skills?category=${data.data.category.id}&limit=4`)
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json()
          setRelatedSkills(relatedData.data)
        }
      } catch (err) {
        console.error('Error fetching skill:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
        toast({
          title: "Error",
          description: "Failed to load skill details",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSkill()
  }, [id, toast])
  
  if (isLoading) {
    return <SkillDetailLoading />
  }

  if (error || !skill) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Error loading skill</h2>
        <p className="text-muted-foreground">{error || 'Skill not found'}</p>
      </div>
    )
  }

  // Get teacher level badge class
  const getTeacherBadgeClass = (level: string) => {
    switch (level) {
      case "YOUNG LEARNER":
        return "badge-young"
      case "ESTABLISHED ADULT":
        return "badge-established"
      case "EXPERIENCED GUIDE":
        return "badge-experienced"
      case "WISDOM KEEPER":
        return "badge-wisdom"
      default:
        return "bg-primary-warm-gold"
    }
  }

  return (
    <div className="bg-background-light min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="w-full lg:w-2/3">
            {/* Hero section */}
            <div className="bg-background-ivory rounded-xl p-6 mb-8 border border-neutral-taupe/10 shadow-card">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Teacher profile */}
                <div className="flex flex-col items-center text-center md:w-1/4">
                  <div className="relative mb-3">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary-warm-gold">
                      <Image
                        src={skill.teacher.image || "/placeholder.svg"}
                        alt={skill.teacher.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-h4 font-semibold mb-1">{skill.teacher.name}</h3>
                  <p className="text-body-small text-neutral-taupe mb-3">Teacher · {skill.teacher.ageGroup}</p>
                  <div className="flex items-center justify-center text-body-small">
                    <MapPin className="h-4 w-4 text-primary-warm-gold mr-1" />
                    <span>{skill.location?.city}, {skill.location?.country}</span>
                  </div>
                </div>

                {/* Skill info */}
                <div className="md:w-3/4">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <div className="text-overline text-neutral-taupe mb-1">{skill.category.name}</div>
                      <h1 className="text-h2 font-bold text-primary-deep-brown mb-2">{skill.name}</h1>
                    </div>
                    <div className="flex items-start mt-2 md:mt-0">
                      <StarRating rating={skill.averageRating! || 0} reviewCount={skill.totalSessions! || 0} size="lg" />
                    </div>
                  </div>  

                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge className="bg-dark-brown/10 text-dark-brown hover:bg-dark-brown/20 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {skill.sessionFormat}
                    </Badge>
                  </div>

                  <div className={`text-body relative ${!isDescriptionExpanded && "max-h-28 overflow-hidden"}`}>
                    <p>{skill.description}</p>
                    {!isDescriptionExpanded && (
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background-ivory to-transparent"></div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-primary-warm-gold hover:bg-secondary-gold-pale flex items-center"
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  >
                    {isDescriptionExpanded ? (
                      <>
                        Show less <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Read more <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Session details */}
            <div className="bg-background-ivory rounded-xl p-6 mb-8 border border-neutral-taupe/10 shadow-card">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <div className="bg-secondary-gold-pale p-2 rounded-full mr-3">
                    <MapPin className="h-5 w-5 text-primary-warm-gold" />
                  </div>
                  <div>
                    <h3 className="text-h4 font-semibold mb-1">Format</h3>
                    <p className="text-body-small text-neutral-taupe">{skill.sessionFormat} {skill.location?.city}, {skill.location?.country}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Button className="btn-primary" onClick={() => setIsRequestModalOpen(true)}>
                  <Calendar className="mr-2 h-4 w-4" /> Request Session
                </Button>
              </div>
            </div>

            {/* Reviews section */}
            <div className="bg-background-ivory rounded-xl p-6 mb-8 border border-neutral-taupe/10 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-h3 font-semibold text-primary-deep-brown flex items-center">
                  <Star className="h-5 w-5 text-warning-amber fill-warning-amber mr-2" />
                  Learner Reviews
                  <Badge className="ml-2 bg-secondary-gold-pale text-primary-warm-gold">{skill.reviews.length}</Badge>
                </h2>
              </div>

              <div className="space-y-6">
                {skill.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>

              <Button variant="ghost" className="mt-6 text-primary-warm-gold hover:bg-secondary-gold-pale w-full">
                Show more reviews
              </Button>
            </div>

            {/* Related skills */}
            <div>
              <h2 className="text-h3 font-semibold text-primary-deep-brown mb-4 flex items-center">
                <Link2 className="h-5 w-5 text-primary-warm-gold mr-2" />
                Related Skills
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto pb-4">
                {relatedSkills.map((skill) => (
                  <RelatedSkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-background-ivory rounded-xl p-6 border border-neutral-taupe/10 shadow-card sticky top-8">
              <h2 className="text-h3 font-semibold text-primary-deep-brown mb-4">Book This Skill</h2>

              <div className="flex items-center mb-4 text-body-small">
                <MapPin className="h-4 w-4 text-primary-warm-gold mr-2" />
                <span>{skill.location?.city}, {skill.location?.country} · {skill.sessionFormat}</span>
              </div>
              </div>

              <Button className="btn-primary w-full mb-3" onClick={() => setIsRequestModalOpen(true)}>
                <Calendar className="mr-2 h-4 w-4" /> Request Session
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={() => setIsSaved(!isSaved)}
              >
                <Heart className={`mr-2 h-4 w-4 ${isSaved ? "fill-primary-warm-gold text-primary-warm-gold" : ""}`} />
                Save for Later
              </Button>
            </div>
          </div>
        </div>
        <SessionRequestModal skill={skill} isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)} />
      </div>
    
  )
}
