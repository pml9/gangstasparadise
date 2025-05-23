import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AssetsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Asset Booking</h1>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-lg mb-4">
          This is the Asset Booking page where you can reserve company resources like equipment and meeting rooms.
        </p>
        <p>Feature implementation coming soon.</p>
      </div>
    </div>
  )
}
