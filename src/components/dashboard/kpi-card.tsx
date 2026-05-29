import * as React from 'react'
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
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <Card
      className={cn(
        "overflow-hidden transition-transform transition-shadow duration-250 ease-in-out hover:-translate-y-0.5 hover:shadow-2xl focus-within:shadow-2xl focus-within:outline-none focus-within:ring-1 focus-within:ring-primary/30",
        // subtle reveal on mount
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1',
        className
      )}
      tabIndex={0}
      role="group"
      aria-label={title}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-all duration-200 group-focus-within:bg-primary/10 group-hover:scale-105">
          <Icon className="h-4 w-4 transition-colors duration-200" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        <p className="mt-1 text-xs flex items-center gap-1">
          <span className={cn("font-medium transition-colors duration-200", trendUp ? "text-emerald-500" : "text-rose-500")}>
            {trend}
          </span>
          <span className="text-muted-foreground">from last month</span>
        </p>
      </CardContent>
    </Card>
  )
}
