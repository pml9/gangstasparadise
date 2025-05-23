import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  Clock,
  Users,
  Shield,
  Zap,
  Lightbulb,
  LayoutGrid,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white p-4 border-b">
        <div className="container mx-auto">
          <h1 className="text-blue-700 font-bold text-xl">OpenDesk</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-4">
              One platform for all your workplace needs
            </h2>
            <p className="text-lg mb-8">
              Welcome to our comprehensive enterprise web application, designed
              to streamline everyday workplace processes and enhance employee
              experience across multiple dimensions.
            </p>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg">
                Enter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">
            Streamline Your Workplace Experience
          </h2>
          <p className="text-center mb-12 max-w-3xl mx-auto">
            Our powerful platform brings together six essential features that
            address common organizational needs—from personal wellbeing to
            resource management—all within a unified, intuitive interface.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="border rounded-lg p-6 bg-white">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">Sick Leave Management</h3>
              <p className="text-gray-600">
                Simplify the leave request process by managing time off with an
                intuitive calendar interface and automated approval workflows.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border rounded-lg p-6 bg-white">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <LayoutGrid className="text-green-600 h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">Expense Reports</h3>
              <p className="text-gray-600">
                Streamline expense reporting with OCR receipt scanning,
                automated categorization, and simplified approval processes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border rounded-lg p-6 bg-white">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-orange-600 h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">Maintenance Requests</h3>
              <p className="text-gray-600">
                Efficiently track facility issues with priority indicators,
                photo documentation, and real-time status updates.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="border rounded-lg p-6 bg-white">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-purple-600 h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">Travel Booking</h3>
              <p className="text-gray-600">
                Manage business travel with integrated booking tools, expense
                tracking, and automated policy compliance.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="border rounded-lg p-6 bg-white">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <LayoutGrid className="text-pink-600 h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">Asset Management</h3>
              <p className="text-gray-600">
                Track and manage company resources with inventory management,
                request workflow, and usage analytics.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="border rounded-lg p-6 bg-white">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="text-red-600 h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">AI Assistant</h3>
              <p className="text-gray-600">
                Get intelligent recommendations, predictive analytics, and
                automated workflows powered by advanced AI technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Productivity Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img
                src="/workplace-productivity-meeting.png"
                alt="Team collaboration"
                className="rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">
                Enhance Workplace Productivity
              </h2>
              <p className="mb-6">
                In today's fast-paced work environment, employees need efficient
                digital tools that reduce administrative burdens and allow them
                to focus on meaningful work. Our application responds to this
                need by digitalizing and optimizing processes that traditionally
                consume valuable time and create unnecessary stress.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Reduce administrative overhead with streamlined digital
                    workflows
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Maintain organizational controls while improving user
                    experience
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Create a cohesive digital ecosystem that supports
                    productivity
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Enhance employee wellbeing through simplified processes
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Platform Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">One Unified Platform</h2>
          <p className="max-w-2xl mx-auto mb-12">
            Whether managing personal time off, arranging business travel, or
            reporting facility issues, users will find streamlined workflows
            that respect their time while maintaining necessary organizational
            controls.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                <Clock className="h-6 w-6" />
              </div>
              <span>Time Savings</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                <Zap className="h-6 w-6" />
              </div>
              <span>Productivity Boost</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                <Shield className="h-6 w-6" />
              </div>
              <span>Security & Compliance</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                <Users className="h-6 w-6" />
              </div>
              <span>Team Collaboration</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                <Lightbulb className="h-6 w-6" />
              </div>
              <span>Smart Insights</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <span>Centralized Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Transform Your Workplace?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Discover how our comprehensive enterprise application can streamline
            your organization's processes and enhance employee experience.
          </p>
          <Link href="/dashboard">
            <Button size="lg">Enter</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-blue-700 font-bold text-xl">OpenDesk</h3>
              <p className="text-sm text-gray-500">
                Streamlining workplace processes
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">Email</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21.54 15.23l-1.39 1.39c-1.73 1.73-4.78 1.73-6.51 0l-1.39-1.39c-1.73-1.73-1.73-4.78 0-6.51l1.39-1.39c1.73-1.73 4.78-1.73 6.51 0l1.39 1.39c1.73 1.73 1.73 4.78 0 6.51z"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 mt-8">
            © 2025 OpenDesk. All rights reserved. 123
          </div>
          <div className="flex justify-center font-bold">
            <a
              href=" 
            https://www.youtube.com/watch?v=8n1cWBNmPio"
              target="_blank"
              className="text-sm text-center text-red-500 mt-8"
            >
              GANgstas Paradise Music Video for vibe coding 👨‍💻
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
