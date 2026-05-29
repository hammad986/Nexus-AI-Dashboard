import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import type { SaaSActivityLog, SaaSExecutiveSummary, SaaSAnalyticsSnapshot } from '@/lib/saas/types'

export function AIMemoryTimeline({
  snapshots,
  summaries,
  activityLogs,
}: {
  snapshots: SaaSAnalyticsSnapshot[]
  summaries: SaaSExecutiveSummary[]
  activityLogs: SaaSActivityLog[]
}) {
  const timeline = [
    ...snapshots.map((item) => ({ key: item.id, title: item.metricKey, subtitle: item.periodLabel ?? 'Historical metric', detail: `${item.metricValue}${item.metricDelta ? ` (${item.metricDelta > 0 ? '+' : ''}${item.metricDelta}%)` : ''}`, time: item.createdAt })),
    ...summaries.map((item) => ({ key: item.id, title: item.title, subtitle: 'Executive summary', detail: item.summary, time: item.createdAt })),
    ...activityLogs.map((item) => ({ key: item.id, title: item.eventType, subtitle: item.workspaceName, detail: item.message, time: item.createdAt })),
  ]

  return (
    <Card className="border-border/60 bg-background/90 shadow-lg shadow-black/10">
      <CardHeader>
        <CardTitle className="text-lg">AI Memory Timeline</CardTitle>
        <CardDescription>Historical analyses, saved intelligence, and operational events.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {timeline.map((entry) => (
          <div key={entry.key} className="relative border-l border-border/60 pl-4">
            <div className="absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
            <div className="space-y-1 pb-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium">{entry.title}</p>
                <span className="text-xs text-muted-foreground">{entry.time}</span>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{entry.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{entry.detail}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
