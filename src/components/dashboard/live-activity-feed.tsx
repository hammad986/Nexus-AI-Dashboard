"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { OperationalEvent } from '@/hooks/use-live-operations'
import { Activity, DollarSign, Users, AlertTriangle, Cpu, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const ICON_MAP = {
  revenue: DollarSign,
  conversion: TrendingUp,
  churn_risk: AlertTriangle,
  engagement: Users,
  ai_alert: Cpu,
  system: Activity,
}

export function LiveActivityFeed({ events }: { events: OperationalEvent[] }) {
  return (
    <Card className="border-border/60 bg-background/90 shadow-lg shadow-black/10 overflow-hidden h-[400px] flex flex-col">
      <CardHeader className="py-4 border-b border-border/60 bg-muted/20">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
          <Activity className="h-4 w-4" />
          Live Event Stream
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto">
        <div className="divide-y divide-border/60">
          {events.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">No events yet. Waiting for telemetry...</div>
          ) : (
            events.map((event) => {
              const Icon = ICON_MAP[event.type]
              return (
                <div key={event.id} className="p-4 hover:bg-muted/30 transition-colors animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`mt-0.5 rounded-full p-2 ${event.type === 'ai_alert' ? 'bg-cyan-500/10 text-cyan-400' : event.type === 'revenue' ? 'bg-emerald-500/10 text-emerald-400' : event.type === 'churn_risk' ? 'bg-rose-500/10 text-rose-400' : 'bg-muted text-muted-foreground'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">{event.title}</p>
                        <span className="text-[10px] text-muted-foreground">
                          {event.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-snug">{event.message}</p>
                      {event.metricValue != null && (
                        <div className="mt-2">
                          <Badge variant="outline" className={`text-xs ${event.type === 'revenue' ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-muted-foreground/30'}`}>
                            {event.metricLabel}: {event.type === 'revenue' ? '$' : ''}{event.metricValue}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
