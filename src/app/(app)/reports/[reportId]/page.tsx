import { notFound } from 'next/navigation'
import { getDashboardSnapshot } from '@/lib/saas/server'
import { ReportExportDialog } from '@/components/dashboard/report-export-dialog'
import { ExecutiveSummaryView } from '@/components/dashboard/executive-summary-view'
import { HistoricalComparisonCard } from '@/components/dashboard/historical-comparison-card'
import { ReportCommentThread } from '@/components/reports/report-comment-thread'
import { Button } from '@/components/ui/button'
import { archiveReportAction } from './actions'

export default async function ReportDetailPage({ params }: { params: Promise<{ reportId: string }> }) {
  const { reportId } = await params
  const snapshot = await getDashboardSnapshot()
  const report = snapshot.reports.find((entry) => entry.id === reportId)

  if (!report) {
    notFound()
  }

  const executiveSummary = snapshot.executiveSummaries[0]

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{report.title}</h2>
          <p className="text-muted-foreground">{report.workspaceName} · {report.createdAt}</p>
        </div>
        <div className="flex items-center gap-3">
          <form action={archiveReportAction.bind(null, report.id)}>
            <Button variant="outline" type="submit">Archive</Button>
          </form>
          <ReportExportDialog reportId={report.id} />
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <ExecutiveSummaryView summary={executiveSummary ?? {
          id: report.id,
          title: report.title,
          summary: report.summary,
          createdAt: report.createdAt,
          workspaceName: report.workspaceName,
        }} />
        <div className="space-y-6">
          <HistoricalComparisonCard title="Revenue growth vs prior period" current={92} previous={84.2} />
          <HistoricalComparisonCard title="Retention vs prior period" current={55} previous={50} suffix="%" />
          <div className="h-[400px]">
            <ReportCommentThread reportId={report.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

