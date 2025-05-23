"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { NewTravelRequestDialog } from "@/components/new-travel-request-dialog"
import { NeedHelpSection, type HelpContact } from "@/components/need-help-section"
import type { TravelRequest } from "@/types/travel"
import { Mail } from "lucide-react"

const statusColors = {
  pending: "bg-orange-100 text-orange-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
  draft: "bg-gray-100 text-gray-800",
}

const statusLabels = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  completed: "Completed",
  draft: "Draft",
}

export default function TravelPage() {
  const [requests, setRequests] = useState<TravelRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<TravelRequest[]>([])
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/travel")
      if (response.ok) {
        const data = await response.json()
        setRequests(data)
        setFilteredRequests(data)
      }
    } catch (error) {
      console.error("Failed to fetch travel requests:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredRequests(requests)
    } else {
      setFilteredRequests(requests.filter((req) => req.status === activeFilter))
    }
  }, [requests, activeFilter])

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = format(new Date(startDate), "MMM d")
    const end = format(new Date(endDate), "MMM d, yyyy")

    if (startDate === endDate) {
      return format(new Date(startDate), "MMM d, yyyy")
    }

    return `${start} - ${end}`
  }

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "-"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Custom help contacts for travel
  const travelHelpContacts: HelpContact[] = [
    {
      icon: <Mail className="h-5 w-5 text-blue-600" />,
      title: "Travel Support",
      value: "travel@opendesk.com",
      link: "mailto:travel@opendesk.com",
    },
  ]

  if (loading) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Loading your travel requests...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Corporate Travel Management</h1>
          <p className="text-gray-600">Request and track business trips for your work-related travel.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Travel Requests</CardTitle>
                  <NewTravelRequestDialog onSuccess={fetchRequests} />
                </div>
              </CardHeader>
              <CardContent>
                {/* Filter Tabs */}
                <div className="flex gap-2 mb-6 flex-wrap">
                  {[
                    { key: "all", label: "All" },
                    { key: "pending", label: "Pending" },
                    { key: "approved", label: "Approved" },
                    { key: "completed", label: "Completed" },
                    { key: "rejected", label: "Rejected" },
                  ].map((filter) => (
                    <Button
                      key={filter.key}
                      variant={activeFilter === filter.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter(filter.key)}
                      data-testid={`filter-${filter.key}`}
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>

                {/* Requests Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Destination</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Est. Cost</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                            No travel requests found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRequests.map((request) => (
                          <TableRow key={request.id} data-testid={`travel-request-${request.id}`}>
                            <TableCell className="font-medium">{request.destination}</TableCell>
                            <TableCell>{formatDateRange(request.departure_date, request.return_date)}</TableCell>
                            <TableCell className="max-w-xs truncate" title={request.purpose || ""}>
                              {request.purpose || request.title}
                            </TableCell>
                            <TableCell>{formatCurrency(request.estimated_cost)}</TableCell>
                            <TableCell>
                              <Badge className={statusColors[request.status]}>{statusLabels[request.status]}</Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {filteredRequests.length > 0 && (
                  <div className="mt-4 text-sm text-gray-500">
                    Showing {filteredRequests.length} of {requests.length} requests
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Need Help Section with travel-specific contacts */}
            <NeedHelpSection customContacts={travelHelpContacts} />

            {/* Approval Process Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Approval Process</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="mb-2">
                  Your travel request will be submitted to your selected manager for approval. You'll receive email
                  notifications about the status of your request.
                </p>
                <p>Please submit requests at least 2 weeks before your planned departure date.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
