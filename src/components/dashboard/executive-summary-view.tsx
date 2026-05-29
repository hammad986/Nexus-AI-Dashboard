import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SaaSExecutiveSummary } from '@/lib/saas/types'

export function ExecutiveSummaryView({ summary }: { summary: SaaSExecutiveSummary }) {
  return (
    <Card className="border-border/60 bg-gradient-to-br from-background to-muted/20 shadow-lg shadow-black/10">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-xl">{summary.title}</CardTitle>
          <Badge variant="outline" className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30">
            Boardroom Ready
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{summary.workspaceName} · {summary.createdAt}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base leading-7 text-foreground/90">{summary.summary}</p>
        {summary.fileUrl ? (
          <a className="text-sm font-medium text-cyan-400 hover:underline" href={summary.fileUrl} target="_blank" rel="noreferrer">
            Download executive export
          </a>
        ) : null}
      </CardContent>
    </Card>
  )
}
