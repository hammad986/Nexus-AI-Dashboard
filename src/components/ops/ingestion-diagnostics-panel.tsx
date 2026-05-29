"use client"

import { useEffect, useState } from 'react'
import { Activity, Cpu, Server, Database, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export function IngestionDiagnosticsPanel() {
  const [metrics, setMetrics] = useState({
    apiLatency: 45,
    dbConnections: 12,
    errorRate: 0.1,
    aiTokenUsage: 14200,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        apiLatency: Math.max(20, Math.min(200, prev.apiLatency + (Math.random() * 20 - 10))),
        dbConnections: Math.max(5, Math.min(50, prev.dbConnections + Math.floor(Math.random() * 3 - 1))),
        errorRate: Math.max(0, Math.min(5, prev.errorRate + (Math.random() * 0.2 - 0.1))),
        aiTokenUsage: prev.aiTokenUsage + Math.floor(Math.random() * 500),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-border/60 shadow-lg shadow-black/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Server className="h-5 w-5 text-muted-foreground" />
          System Diagnostics
        </CardTitle>
        <CardDescription>Live operational health and performance vectors.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Activity className="h-4 w-4" /> API Latency</div>
            <span className={`font-mono ${metrics.apiLatency > 150 ? 'text-rose-400' : 'text-emerald-400'}`}>{metrics.apiLatency.toFixed(0)} ms</span>
          </div>
          <Progress value={Math.min(100, metrics.apiLatency / 2)} className="h-1.5" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Database className="h-4 w-4" /> Active Connections</div>
            <span className="font-mono text-cyan-400">{metrics.dbConnections} pools</span>
          </div>
          <Progress value={metrics.dbConnections * 2} className="h-1.5" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Cpu className="h-4 w-4" /> AI Token Burn</div>
            <span className="font-mono text-amber-400">{metrics.aiTokenUsage.toLocaleString()}</span>
          </div>
          <Progress value={Math.min(100, metrics.aiTokenUsage / 500)} className="h-1.5" />
        </div>

        {metrics.errorRate > 2 && (
          <div className="flex items-center gap-2 text-sm text-rose-400 bg-rose-500/10 p-2 rounded border border-rose-500/20">
            <AlertCircle className="h-4 w-4" /> Elevated error rate detected ({metrics.errorRate.toFixed(2)}%)
          </div>
        )}
      </CardContent>
    </Card>
  )
}
