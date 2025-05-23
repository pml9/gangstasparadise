"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { NewMaintenanceDialog } from "@/components/new-maintenance-dialog"
import { NeedHelpSection } from "@/components/need-help-section"
import type { MaintenanceIssue } from "@/types/maintenance"

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  assigned: "bg-purple-100 text-purple-800",
  in_progress: "bg-orange-100 text-orange-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
}

const statusLabels = {
  new: "New",
  assigned: "Assigned",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
}

export default function MaintenancePage() {
  const [issues, setIssues] = useState<MaintenanceIssue[]>([])
  const [filteredIssues, setFilteredIssues] = useState<MaintenanceIssue[]>([])
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  const fetchIssues = async () => {
    try {
      const response = await fetch("/api/maintenance")
      if (response.ok) {
        const data = await response.json()
        setIssues(data)
        setFilteredIssues(data)
      }
    } catch (error) {
      console.error("Failed to fetch maintenance issues:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIssues()
  }, [])

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredIssues(issues)
    } else {
      setFilteredIssues(issues.filter((issue) => issue.status === activeFilter))
    }
  }, [issues, activeFilter])

  if (loading) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p>Loading your maintenance requests...</p>
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
          <h1 className="text-2xl font-bold">Maintenance Issues Management</h1>
          <p className="text-gray-600">Report and track facility-related issues across your workspace.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Maintenance Requests</CardTitle>
                  <NewMaintenanceDialog onSuccess={fetchIssues} />
                </div>
              </CardHeader>
              <CardContent>
                {/* Filter Tabs */}
                <div className="flex gap-2 mb-6 flex-wrap">
                  {[
                    { key: "all", label: "All" },
                    { key: "new", label: "New" },
                    { key: "assigned", label: "Assigned" },
                    { key: "in_progress", label: "In Progress" },
                    { key: "resolved", label: "Resolved" },
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

                {/* Issues Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Issue Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIssues.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            No maintenance issues found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredIssues.map((issue) => (
                          <TableRow key={issue.id}>
                            <TableCell>#{issue.id}</TableCell>
                            <TableCell>{issue.issue_type}</TableCell>
                            <TableCell className="max-w-xs truncate" title={issue.description}>
                              {issue.description}
                            </TableCell>
                            <TableCell>
                              {issue.device ? (
                                <span>
                                  {issue.device.type} - {issue.device.model}
                                </span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge className={statusColors[issue.status]}>{statusLabels[issue.status]}</Badge>
                            </TableCell>
                            <TableCell>{format(new Date(issue.created_at), "MMM d, yyyy")}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {filteredIssues.length > 0 && (
                  <div className="mt-4 text-sm text-gray-500">
                    Showing {filteredIssues.length} of {issues.length} issues
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
