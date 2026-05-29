"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import type { OperationalEvent } from '@/hooks/use-live-operations'
import { Cpu, AlertTriangle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AiAlertCenter({ events }: { events: OperationalEvent[] }) {
  const aiAlerts = events.filter(e => e.type === 'ai_alert' || e.type === 'churn_risk').slice(0, 3)

  return (
    <Card className="border-border/60 bg-gradient-to-br from-cyan-950/20 to-background shadow-lg shadow-black/10">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Cpu className="h-5 w-5 text-cyan-400" />
              Proactive AI Insights
            </CardTitle>
            <CardDescription>Autonomous anomaly detection</CardDescription>
          </div>
          {aiAlerts.length > 0 && (
             <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
             </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {aiAlerts.length === 0 ? (
          <div className="py-6 text-center text-sm text-cyan-500/50">Monitoring telemetry across 14 vectors...</div>
        ) : (
          <div className="space-y-3">
            {aiAlerts.map(alert => (
              <div key={alert.id} className="group relative overflow-hidden rounded-lg border border-cyan-500/20 bg-cyan-950/40 p-3 transition-colors hover:bg-cyan-900/40 animate-in slide-in-from-right-4 duration-300">
                <div className="flex gap-3">
                  <AlertTriangle className={`h-4 w-4 shrink-0 mt-0.5 ${alert.severity === 'critical' || alert.severity === 'high' ? 'text-rose-400' : 'text-cyan-400'}`} />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground/90">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                  </div>
                </div>
                <Button variant="link" className="mt-2 h-auto p-0 px-7 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Run deep analysis <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
