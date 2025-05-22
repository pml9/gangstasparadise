import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FooterProps {
  /** Test ID for testing purposes */
  testId?: string
  /** Additional accessibility attributes */
  ally?: {
    /** ARIA role for the footer */
    role?: string
    /** ARIA label for the footer */
    'aria-label'?: string
  }
}

export default function Footer({ 
  testId = 'footer',
  ally = {}
}: FooterProps) {
  const { 
    role = 'contentinfo',
    'aria-label': ariaLabel = 'Site footer'
  } = ally;
  return (
    <footer 
      className="bg-[#3c2f2d] text-white py-12"
      role={role}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-primary-warm-gold p-2 rounded-md mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 10V8a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2"></path>
                  <path d="M18 14v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2"></path>
                  <rect width="18" height="8" x="3" y="10" rx="2"></rect>
                </svg>
              </div>
              <span className="text-xl font-bold">SkillBridge</span>
            </div>
            <p className="text-gray-300 text-sm mb-6">Connecting generations through shared knowledge and skills.</p>
            <div className="flex space-x-3">
              <Link
                href="#"
                className="bg-[#4e3f3d] p-2 rounded-full hover:bg-primary-warm-gold/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-[#4e3f3d] p-2 rounded-full hover:bg-primary-warm-gold/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-[#4e3f3d] p-2 rounded-full hover:bg-primary-warm-gold/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-[#4e3f3d] p-2 rounded-full hover:bg-primary-warm-gold/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary-warm-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-primary-warm-gold transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-primary-warm-gold transition-colors">
                  Become a Teacher
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-primary-warm-gold transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-primary-warm-gold transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-primary-warm-gold transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-primary-warm-gold transition-colors">
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-primary-warm-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-primary-warm-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-primary-warm-gold transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-[#4e3f3d] text-white rounded-r-none border-0 focus:ring-primary-warm-gold"
              />
              <Button className="bg-primary-warm-gold hover:bg-secondary-gold-light text-white rounded-l-none">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#4e3f3d] mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2024 SkillBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
