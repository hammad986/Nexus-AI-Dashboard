"use client"

import { Activity } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { RealtimeStatusIndicator } from './realtime-status-indicator'

export function IngestionMonitor({ isLive, eventCount }: { isLive: boolean, eventCount: number }) {
  return (
    <Card className="flex items-center justify-between rounded-xl border-border/60 bg-background/80 px-4 py-3 shadow-lg shadow-black/10 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
          <Activity className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium">Telemetry Bridge</p>
          <p className="text-xs text-muted-foreground">
            Processed {eventCount} real-time events this session
          </p>
        </div>
      </div>
      <div>
        <RealtimeStatusIndicator isLive={isLive} />
      </div>
    </Card>
  )
}
