import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { SaaSReport } from '@/lib/saas/types'

const priorityClassNames: Record<SaaSReport['priority'], string> = {
  Critical: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  High: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  Medium: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  Low: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
}

export function ReportHistoryTable({ reports }: { reports: SaaSReport[] }) {
  return (
    <Card className="border-border/60 bg-background/90 shadow-lg shadow-black/10">
      <CardHeader>
        <CardTitle className="text-lg">Report History</CardTitle>
        <CardDescription>Saved executive reports, archives, and board-ready snapshots.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-xl border border-border/60">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-border/60 bg-muted/30 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <span>Report</span>
            <span>Priority</span>
            <span>Workspace</span>
            <span>Created</span>
          </div>
          <div className="divide-y divide-border/60">
            {reports.map((report) => (
              <Link key={report.id} href={`/reports/${report.id}`} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-4 transition-colors hover:bg-muted/30">
                <div className="space-y-1">
                  <p className="font-medium leading-none">{report.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{report.summary}</p>
                </div>
                <div>
                  <Badge variant="outline" className={priorityClassNames[report.priority]}>
                    {report.priority}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{report.workspaceName}</div>
                <div className="text-sm text-muted-foreground">{report.createdAt}</div>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
