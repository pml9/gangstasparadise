import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"
import type { ReactNode } from "react"

export interface HelpContact {
  icon: ReactNode
  title: string
  value: string
  link?: string
}

// Universal help contacts that appear on all pages
const universalHelpContacts: HelpContact[] = [
  {
    icon: <Mail className="h-5 w-5 text-blue-600" />,
    title: "Support Team",
    value: "support@opendesk.com",
    link: "mailto:support@opendesk.com",
  },
  {
    icon: <Phone className="h-5 w-5 text-blue-600" />,
    title: "Help Desk",
    value: "+1 (555) 123-4567",
  },
]

interface NeedHelpSectionProps {
  // Optional prop to override the universal contacts if needed
  customContacts?: HelpContact[]
}

export function NeedHelpSection({ customContacts }: NeedHelpSectionProps) {
  // Use custom contacts if provided, otherwise use the universal ones
  const contacts = customContacts || universalHelpContacts

  return (
    <Card data-testid="need-help-section">
      <CardHeader>
        <CardTitle className="text-lg">Need Help?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-start gap-3" data-testid={`help-contact-${index}`}>
            <div className="mt-0.5">{contact.icon}</div>
            <div>
              <div className="font-medium">{contact.title}</div>
              {contact.link ? (
                <a
                  href={contact.link}
                  className="text-sm text-blue-600 hover:underline"
                  data-testid={`help-contact-link-${index}`}
                >
                  {contact.value}
                </a>
              ) : (
                <div className="text-sm text-gray-600">{contact.value}</div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
