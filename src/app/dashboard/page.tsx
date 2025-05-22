"use client"
import { useEffect, useState } from "react"
import { useUserData } from "@/lib/hooks/useUserData"
import Image from "next/image"
import Link from "next/link"
import { Users, Award, Star, Clock, ChevronRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import StarRating from "@/components/star-rating"
import { DashboardResponse, ActivityTimelineItem, SkillProgress } from "@/types/dashboard"
import { ApiResponse } from "@/types/api"
import DashboardLoading from "./loading"

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null)
  const { userData, isLoading: isUserLoading } = useUserData()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard')
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data')
        }
        const data = await response.json() as ApiResponse<DashboardResponse>
        setDashboardData(data.data!)
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <DashboardLoading />
      </div>
    )
  }


  if (error || !dashboardData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h2 className="text-h3 font-semibold text-primary-deep-brown mb-2">Something went wrong</h2>
          <p className="text-body text-neutral-taupe mb-4">
            {error || 'Failed to load dashboard data'}
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-primary-warm-gold hover:bg-secondary-gold-light text-white"
          >
            Try again
          </Button>
        </div>
      </div>
    )
  }

  const { stats, recentActivity, upcomingSessions, skillProgress, recommendations } = dashboardData
  
  // Helper function to get the session type badge
  const getSessionTypeBadge = (session: any) => {
    const type = session.sessionFormat?.toLowerCase() || 'virtual'
    return {
      className: type === 'virtual' 
        ? 'bg-secondary-gold-pale text-primary-warm-gold' 
        : type === 'in-person' 
          ? 'bg-accent-teal/20 text-accent-teal' 
          : 'bg-accent-mauve/20 text-accent-mauve',
      label: type.charAt(0).toUpperCase() + type.slice(1)
    }
  }

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="bg-background-light min-h-screen pb-16" data-testid="dashboard-container">
      {/* Hero Stats Section */}
      <div className="bg-white border-b border-neutral-taupe/10 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <h1 className="text-h2 font-bold text-primary-deep-brown mb-2" data-testid="dashboard-greeting">
              {getGreeting()}, {userData?.name || 'there'} <span className="text-2xl">👋</span>
            </h1>
            <p className="text-body text-neutral-taupe">Here's a look at your learning & teaching journey.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="bg-background-ivory p-4 rounded-xl border border-neutral-taupe/10 shadow-sm" data-testid="stat-sessions-completed">
              <div className="text-body-small text-neutral-taupe uppercase mb-2">Sessions Completed</div>
              <div className="flex items-center">
                <span className="text-h2 font-bold text-primary-deep-brown mr-2">{stats.totalSessions}</span>
                <CheckCircle2 className="h-5 w-5 text-success-green" />
              </div>
            </div>

            <div className="bg-background-ivory p-4 rounded-xl border border-neutral-taupe/10 shadow-sm" data-testid="stat-hours-teaching">
              <div className="text-body-small text-neutral-taupe uppercase mb-2">Hours Teaching</div>
              <div className="flex items-center">
                <span className="text-h2 font-bold text-primary-deep-brown mr-2">{stats.hoursTaught}</span>
                <span className="text-primary-warm-gold">🎵</span>
              </div>
            </div>

            <div className="bg-background-ivory p-4 rounded-xl border border-neutral-taupe/10 shadow-sm" data-testid="stat-hours-learning">
              <div className="text-body-small text-neutral-taupe uppercase mb-2">Hours Learning</div>
              <div className="flex items-center">
                <span className="text-h2 font-bold text-primary-deep-brown mr-2">{stats.hoursLearned}</span>
                <span className="text-accent-sage">📚</span>
              </div>
            </div>

            <div className="bg-background-ivory p-4 rounded-xl border border-neutral-taupe/10 shadow-sm" data-testid="stat-avg-rating">
              <div className="text-body-small text-neutral-taupe uppercase mb-2">Avg. Rating</div>
              <div className="flex items-center">
                <span className="text-h2 font-bold text-primary-deep-brown mr-2">{stats.averageRating.toFixed(1)}</span>
                <Star className="h-5 w-5 text-warning-amber fill-warning-amber" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Upcoming Sessions */}
            <div className="bg-white p-6 rounded-xl border border-neutral-taupe/10 shadow-sm" data-testid="upcoming-sessions-section">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-h3 font-semibold text-primary-deep-brown">Upcoming Sessions</h2>
                <Link
                  href="/my-sessions"
                  className="text-body-small text-primary-warm-gold hover:text-secondary-gold-light transition-colors"
                  data-testid="view-all-sessions"
                >
                  View all
                </Link>
              </div>

              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center p-3 bg-background-light rounded-lg border border-neutral-taupe/10"
                      data-testid={`session-item-${session.id}`}
                    >
                      <div className="mr-3">
                        <div className="bg-background-ivory p-2 rounded-md border border-neutral-taupe/10">
                          <Image
                            src={session.teacher?.image || "/default-skill-icon.png"}
                            alt={session.skill.name}
                            width={40}
                            height={40}
                            className="rounded-md"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-body font-medium text-primary-deep-brown">{session.skill.name}</h3>
                        <div className="flex items-center text-body-small text-neutral-taupe">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{new Date(session.startTime).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</span>
                        </div>
                      </div>
                      <Badge className={`mr-2 ${getSessionTypeBadge(session).className}`}>
                        {getSessionTypeBadge(session).label}
                      </Badge>
                      <Button className="bg-primary-warm-gold hover:bg-secondary-gold-light text-white" data-testid="join-session-button">Join</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6" data-testid="no-sessions-message">
                  <p className="text-body text-neutral-taupe">No upcoming sessions</p>
                  <Button className="mt-4 bg-primary-warm-gold hover:bg-secondary-gold-light text-white" data-testid="browse-skills-button">
                    Browse Skills
                  </Button>
                </div>
              )}
            </div>

          </div>

          {/* Middle Column */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl border border-neutral-taupe/10 shadow-sm">
              <h2 className="text-h3 font-semibold text-primary-deep-brown mb-4">Recent Activity</h2>

              <div className="space-y-6">
                {recentActivity.map((activity: ActivityTimelineItem) => (
                  <div key={activity.id} className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 ${
                      activity.type === 'session' ? 'bg-success-green/20 text-success-green' :
                      activity.type === 'review' ? 'bg-warning-amber/20 text-warning-amber' :
                      activity.type === 'achievement' ? 'bg-accent-teal/20 text-accent-teal' :
                      'bg-accent-mauve/20 text-accent-mauve'
                    }`}>
                      {activity.type === 'session' ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : activity.type === 'review' ? (
                        <Star className="h-5 w-5" />
                      ) : activity.type === 'achievement' ? (
                        <Award className="h-5 w-5" />
                      ) : (
                        <Users className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-body font-medium text-primary-deep-brown">{activity.title}</h3>
                      <p className="text-body-small text-neutral-taupe">{activity.description}</p>
                      <p className="text-caption text-neutral-taupe mt-1">
                        {new Date(activity.timestamp).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Skills */}
            <div className="bg-white p-6 rounded-xl border border-neutral-taupe/10 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-h3 font-semibold text-primary-deep-brown">Recommended Skills</h2>
                <Link
                  href="/browse"
                  className="text-body-small text-primary-warm-gold hover:text-secondary-gold-light transition-colors"
                >
                  See all
                </Link>
              </div>

              <div className="space-y-4">
                {recommendations.skills.map((skill) => (
                  <div key={skill.id} className="p-4 bg-background-light rounded-lg border border-neutral-taupe/10 hover:shadow-sm transition-shadow">
                    <div className="flex items-center mb-3">
                      <div className="mr-3">
                        <div className="bg-background-ivory p-2 rounded-md border border-neutral-taupe/10">
                          <Image
                            src={skill.image || "/default-skill-icon.png"}
                            alt={skill.name}
                            width={40}
                            height={40}
                            className="rounded-md"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-body font-medium text-primary-deep-brown">{skill.name}</h3>
                        <Badge className="bg-secondary-gold-pale text-primary-warm-gold">
                          {typeof skill.category === 'string' ? skill.category : skill.category?.name || 'Uncategorized'}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="icon" className="text-primary-warm-gold hover:bg-secondary-gold-pale">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-body-small text-neutral-taupe line-clamp-2">
                      {skill.description}
                    </p>
                    <div className="flex items-center mt-2">
                      <StarRating rating={skill.averageRating || 0} size="sm" />
                      <span className="text-caption text-neutral-taupe ml-2">
                        ({skill.totalSessions || 0} session{skill.totalSessions !== 1 ? 's' : ''})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Skill Progress */}
            <div className="bg-white p-6 rounded-xl border border-neutral-taupe/10 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-h3 font-semibold text-primary-deep-brown">Skill Progress</h2>
                <Link
                  href="/profile"
                  className="text-body-small text-primary-warm-gold hover:text-secondary-gold-light transition-colors"
                >
                  View all
                </Link>
              </div>

              <div className="space-y-6">
                {skillProgress.map((skill: SkillProgress) => {
                  const progress = Math.round((skill.hoursCompleted / skill.targetHours) * 100)
                  return (
                    <div key={skill.skill.id} className="p-4 bg-background-light rounded-lg border border-neutral-taupe/10">
                      <div className="flex items-center mb-3">
                        <div className="mr-3">
                          <div className="bg-background-ivory p-2 rounded-md border border-neutral-taupe/10">
                            <Image
                              src={skill.skill.image || "/default-skill-icon.png"}
                              alt={skill.skill.name}
                              width={40}
                              height={40}
                              className="rounded-md"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-body font-medium text-primary-deep-brown">{skill.skill.name}</h3>
                          <p className="text-body-small text-neutral-taupe">
                            {skill.currentLevel} · {skill.hoursCompleted}h / {skill.targetHours}h
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Progress 
                          value={progress} 
                          className="h-2 bg-neutral-taupe/20" 
                          indicatorColor="bg-primary-warm-gold" 
                        />
                        <div className="flex justify-between text-caption">
                          <span className="text-primary-warm-gold">{progress}% complete</span>
                          {skill.lastSession && (
                            <span className="text-neutral-taupe">
                              Last session: {new Date(skill.lastSession).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
