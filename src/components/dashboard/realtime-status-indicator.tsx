"use client"

import { Activity } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function RealtimeStatusIndicator({ isLive }: { isLive: boolean }) {
  return (
    <Badge variant="outline" className={`flex items-center gap-1.5 px-2 py-0.5 border ${isLive ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-muted-foreground/30 bg-muted/50 text-muted-foreground'}`}>
      {isLive ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live Stream
        </>
      ) : (
        <>
          <Activity className="h-3 w-3" />
          Paused
        </>
      )}
    </Badge>
  )
}
