import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SectionCardProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export function SectionCard({ title, description, children, className, contentClassName }: SectionCardProps) {
  return (
    <Card className={cn("overflow-hidden flex flex-col shadow-sm", className)}>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn("flex-1", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  )
}
