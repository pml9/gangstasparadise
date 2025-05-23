"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { NewExpenseDialog } from "@/components/new-expense-dialog"
import { ReceiptPreviewDialog } from "@/components/receipt-preview-dialog"
import { NeedHelpSection } from "@/components/need-help-section"
import type { ExpenseReport } from "@/types/expense"

const statusColors = {
  pending: "bg-orange-100 text-orange-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<ExpenseReport[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseReport[]>([])
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  const fetchExpenses = async () => {
    try {
      const response = await fetch("/api/expenses")
      if (response.ok) {
        const data = await response.json()
        setExpenses(data)
        setFilteredExpenses(data)
      }
    } catch (error) {
      console.error("Failed to fetch expenses:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredExpenses(expenses)
    } else {
      setFilteredExpenses(expenses.filter((exp) => exp.status === activeFilter))
    }
  }, [expenses, activeFilter])

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p>Loading your expenses...</p>
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
          <h1 className="text-2xl font-bold">Expense Management</h1>
          <p className="text-gray-600">Upload, track, and manage your work-related expenses.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Expense Reports</CardTitle>
                  <NewExpenseDialog onSuccess={fetchExpenses} />
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

                {/* Expenses Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Receipt</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExpenses.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            No expenses found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredExpenses.map((expense) => (
                          <TableRow key={expense.id}>
                            <TableCell>{format(new Date(expense.created_at), "MMM d, yyyy")}</TableCell>
                            <TableCell>{expense.category}</TableCell>
                            <TableCell className="max-w-xs truncate" title={expense.description || ""}>
                              {expense.description}
                            </TableCell>
                            <TableCell>{formatCurrency(expense.amount, expense.currency)}</TableCell>
                            <TableCell>
                              <Badge className={statusColors[expense.status]}>
                                {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <ReceiptPreviewDialog
                                receiptUrl={expense.receipt_url || ""}
                                expenseDescription={expense.description || ""}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {filteredExpenses.length > 0 && (
                  <div className="mt-4 text-sm text-gray-500">
                    Showing {filteredExpenses.length} of {expenses.length} expenses
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
