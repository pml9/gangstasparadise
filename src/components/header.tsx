"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { useUserData } from "@/lib/hooks/useUserData"

interface HeaderProps {
  /** Test ID for testing purposes */
  testId?: string
  /** Additional accessibility attributes */
  ally?: {
    /** ARIA role for the header */
    role?: string
    /** ARIA label for the header */
    'aria-label'?: string
    /** ARIA label for the navigation */
    navAriaLabel?: string
  }
}

export default function Header({ 
  testId = 'header',
  ally = {}
}: HeaderProps) {
  const pathname = usePathname()
  const { userData, isLoading } = useUserData()
  
  const { 
    role = 'banner',
    'aria-label': ariaLabel = 'Site header',
    navAriaLabel = 'Main navigation'
  } = ally

  // Navigation items
  const navigation = [
    { name: "Home", href: "/dashboard" },
    { name: "Browse Skills", href: "/browse" },
    { name: "My Sessions", href: "/my-sessions" },
  ]

  return (
    <header 
      className="bg-white border-b border-neutral-100" 
      role={role}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      <div className="container mx-auto px-4">
        <div 
          className="flex h-16 items-center justify-between"
          role="navigation"
          aria-label={navAriaLabel}
        >
          {/* Logo */}
          <div className="flex items-center" role="img" aria-label="SkillBridge Logo">
            <Link 
              href="/" 
              className="flex items-center gap-2"
              data-testid="logo-link"
              aria-label="SkillBridge Home"
            >
              <div className="bg-primary-warm-gold rounded-full" data-testid="logo">
                <Image
                  src="/logo.png"
                  alt="SkillBridge Logo"
                  width={36}
                  height={36}
                  data-testid="logo-image"
                />
              </div>
              <span className="text-lg font-semibold text-gray-900" data-testid="logo-text">
                SkillBridge
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav 
            className="hidden md:flex items-center space-x-8" 
            role="navigation"
            aria-label="Main navigation"
          >
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary-warm-gold"
                      : "text-gray-700 hover:text-primary-warm-gold"
                  }`}
                  data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right side - profile */}
          <div 
            className="flex items-center space-x-4" 
            data-testid="profile-section"
            role="region"
            aria-label="User profile"
          >
            <Link 
              href="/profile" 
              className="flex items-center space-x-2"
              data-testid="profile-link"
              aria-label={userData?.name ? `View ${userData.name}'s profile` : 'View profile'}
            >
              <Avatar className="h-8 w-8" data-testid="user-avatar">
                <AvatarImage
                  src={userData?.image || ''}
                  alt={userData?.name ? `${userData.name}'s profile picture` : 'User profile'}
                  data-testid="user-avatar-image"
                />
                <AvatarFallback 
                  className="bg-primary-warm-gold text-white"
                  data-testid="user-avatar-fallback"
                >
                  {isLoading ? '...' : userData?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <span 
                className="text-sm font-medium text-gray-700 hidden sm:inline-block"
                data-testid="user-name"
              >
                {isLoading ? 'Loading...' : userData?.name || 'Profile'}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
