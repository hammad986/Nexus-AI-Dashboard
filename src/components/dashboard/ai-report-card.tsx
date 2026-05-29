import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SaaSReport } from '@/lib/saas/types'

const priorityClassNames: Record<SaaSReport['priority'], string> = {
  Critical: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  High: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  Medium: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  Low: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
}

export function AIReportCard({ report }: { report: SaaSReport }) {
  return (
    <Card className="border-border/60 bg-gradient-to-br from-background to-muted/20 shadow-lg shadow-black/10">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg">{report.title}</CardTitle>
          <Badge variant="outline" className={priorityClassNames[report.priority]}>
            {report.priority}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{report.summary}</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="flex flex-wrap gap-2">
          {report.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-background/80">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{report.workspaceName}</span>
          <span>{report.createdAt}</span>
        </div>
      </CardContent>
    </Card>
  )
}
