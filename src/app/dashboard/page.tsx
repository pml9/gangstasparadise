import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, John! Here's everything you need to manage your workplace needs.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sick Leave Card */}
          <Card className="overflow-hidden border-l-4 border-l-blue-600">
            <CardHeader className="bg-white p-4 pb-0">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">Essential</span>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">Sick Leave</h3>
              <p className="text-gray-600 mb-4">
                Feeling under the weather? Submit your sick leave with just a few clicks and get some rest!
              </p>
            </CardContent>
            <CardFooter className="bg-white p-4 pt-0">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="/dashboard/leave">Request Leave</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Education & Social Card */}
          <Card className="overflow-hidden border-l-4 border-l-green-600">
            <CardHeader className="bg-white p-4 pb-0">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">Development</span>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">Education & Social</h3>
              <p className="text-gray-600 mb-4">
                Want to learn something new, join a team-building event, or even organize one?
              </p>
            </CardContent>
            <CardFooter className="bg-white p-4 pt-0">
              <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
                <Link href="/dashboard/events">Browse Events</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Corporate Travel Card */}
          <Card className="overflow-hidden border-l-4 border-l-orange-600">
            <CardHeader className="bg-white p-4 pb-0">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">Business</span>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">Corporate Travel</h3>
              <p className="text-gray-600 mb-4">
                Got a meeting in another city? Arrange your flights and book your business trip.
              </p>
            </CardContent>
            <CardFooter className="bg-white p-4 pt-0">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white" asChild>
                <Link href="/dashboard/travel">Plan Trip</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Maintenance Issues Card */}
          <Card className="overflow-hidden border-l-4 border-l-red-600">
            <CardHeader className="bg-white p-4 pb-0">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-red-100 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">Facility</span>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">Maintenance Issues</h3>
              <p className="text-gray-600 mb-4">
                Got a flickering light or a broken pipe? Report it and let the fixers do their magic.
              </p>
            </CardContent>
            <CardFooter className="bg-white p-4 pt-0">
              <Button className="bg-red-600 hover:bg-red-700 text-white" asChild>
                <Link href="/dashboard/maintenance">Report Issue</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Asset Booking Card */}
          <Card className="overflow-hidden border-l-4 border-l-blue-600">
            <CardHeader className="bg-white p-4 pb-0">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">Resources</span>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">Asset Booking</h3>
              <p className="text-gray-600 mb-4">
                Need a company car, projector, or those awesome portable speakers? Book it all here!
              </p>
            </CardContent>
            <CardFooter className="bg-white p-4 pt-0">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="/dashboard/assets">Book Asset</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Expense Report Card */}
          <Card className="overflow-hidden border-l-4 border-l-orange-600">
            <CardHeader className="bg-white p-4 pb-0">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">Finance</span>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">Expense Report</h3>
              <p className="text-gray-600 mb-4">
                Bought something for work? Snap the receipt, upload it, and get reimbursed in no time.
              </p>
            </CardContent>
            <CardFooter className="bg-white p-4 pt-0">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white" asChild>
                <Link href="/dashboard/expenses">Submit Expense</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
