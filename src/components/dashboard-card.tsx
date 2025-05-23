import Link from "next/link"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface DashboardCardProps {
  title: string
  description: string
  icon: ReactNode
  category: string
  accentColor: string
  buttonText: string
  href: string
}

export function DashboardCard({
  title,
  description,
  icon,
  category,
  accentColor,
  buttonText,
  href,
}: DashboardCardProps) {
  return (
    <Card className={`overflow-hidden border-l-4 border-l-${accentColor}-600`}>
      <CardHeader className="bg-white p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className={`p-2 bg-${accentColor}-100 rounded-lg`}>
            <div className={`text-${accentColor}-600`}>{icon}</div>
          </div>
          <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">{category}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
      </CardContent>
      <CardFooter className="bg-white p-4 pt-0">
        <Button className={`bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white`} asChild>
          <Link href={href}>{buttonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
