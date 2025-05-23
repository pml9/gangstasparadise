"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { NewSickLeaveDialog } from "@/components/new-sick-leave-dialog"
import { NeedHelpSection } from "@/components/need-help-section"
import type { SickLeaveRequest } from "@/types/sick-leave"

const statusColors = {
  pending: "bg-orange-100 text-orange-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
}

export default function SickLeavePage() {
  const [requests, setRequests] = useState<SickLeaveRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<SickLeaveRequest[]>([])
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/sick-leave")
      if (response.ok) {
        const data = await response.json()
        setRequests(data)
        setFilteredRequests(data)
      }
    } catch (error) {
      console.error("Failed to fetch requests:", error)
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

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays === 1 ? "1 day" : `${diffDays} days`
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = format(new Date(startDate), "MMM d")
    const end = format(new Date(endDate), "MMM d, yyyy")

    if (startDate === endDate) {
      return format(new Date(startDate), "MMM d, yyyy")
    }

    return `${start} - ${end}`
  }

  if (loading) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Loading your sick leave requests...</p>
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
          <h1 className="text-2xl font-bold">Sick Leave Management</h1>
          <p className="text-gray-600">Submit and track your sick leave requests in one place.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Sick Leave Requests</CardTitle>
                  <NewSickLeaveDialog onSuccess={fetchRequests} />
                </div>
              </CardHeader>
              <CardContent>
                {/* Filter Tabs */}
                <div className="flex gap-2 mb-6">
                  {[
                    { key: "all", label: "All" },
                    { key: "pending", label: "Pending" },
                    { key: "approved", label: "Approved" },
                    { key: "rejected", label: "Rejected" },
                  ].map((filter) => (
                    <Button
                      key={filter.key}
                      variant={activeFilter === filter.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter(filter.key)}
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
                        <TableHead>Request Date</TableHead>
                        <TableHead>Leave Period</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Comments</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                            No sick leave requests found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>{format(new Date(request.created_at), "MMM d, yyyy")}</TableCell>
                            <TableCell>{formatDateRange(request.start_date, request.end_date)}</TableCell>
                            <TableCell>{calculateDuration(request.start_date, request.end_date)}</TableCell>
                            <TableCell>
                              <Badge className={statusColors[request.status]}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs">
                              {request.manager_comments ? (
                                <span className="text-sm">{request.manager_comments}</span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
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
            {/* Need Help Section */}
            <NeedHelpSection />
          </div>
        </div>
      </div>
    </div>
  )
}
