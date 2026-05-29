"use client"

import { useState } from 'react'
import { Activity, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AnalyticsIngestionStatus() {
  const [status, setStatus] = useState<'idle' | 'syncing' | 'synced'>('idle')

  const runIngestion = async () => {
    setStatus('syncing')
    await fetch('/api/analytics/ingest', { method: 'POST' })
    setStatus('synced')
    setTimeout(() => setStatus('idle'), 2500)
  }

  return (
    <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/90 px-4 py-3 shadow-lg shadow-black/10">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
          <Activity className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium">Analytics ingestion</p>
          <p className="text-xs text-muted-foreground">
            {status === 'syncing' ? 'Syncing Stripe-style events and product activity...' : status === 'synced' ? 'Latest data ingested successfully.' : 'Operational and ready for fresh events.'}
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={runIngestion} disabled={status === 'syncing'}>
        <RefreshCw className={`mr-2 h-4 w-4 ${status === 'syncing' ? 'animate-spin' : ''}`} />
        Sync
      </Button>
    </div>
  )
}
