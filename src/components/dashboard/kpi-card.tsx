import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string
  trend: string
  trendUp?: boolean
  icon: LucideIcon
  className?: string
}

export function KpiCard({ title, value, trend, trendUp = true, icon: Icon, className }: KpiCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        <p className="mt-1 text-xs flex items-center gap-1">
          <span className={cn("font-medium", trendUp ? "text-emerald-500" : "text-rose-500")}>
            {trend}
          </span>
          <span className="text-muted-foreground">from last month</span>
        </p>
      </CardContent>
    </Card>
  )
}
