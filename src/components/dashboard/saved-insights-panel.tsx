import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SaaSSavedInsight } from '@/lib/saas/types'

const priorityVariant: Record<SaaSSavedInsight['priority'], string> = {
  Critical: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  High: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  Medium: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  Low: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
}

export function SavedInsightsPanel({ insights }: { insights: SaaSSavedInsight[] }) {
  return (
    <Card className="border-border/60 bg-background/90 shadow-lg shadow-black/10">
      <CardHeader>
        <CardTitle className="text-lg">Saved Intelligence</CardTitle>
        <CardDescription>Persistent strategic findings saved across workspaces.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight) => (
          <div key={insight.id} className="rounded-xl border border-border/60 bg-muted/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h4 className="font-medium leading-none">{insight.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
              </div>
              <Badge variant="outline" className={priorityVariant[insight.priority]}>
                {insight.priority}
              </Badge>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{insight.workspaceName}</span>
              <span>{insight.createdAt}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
