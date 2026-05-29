import { ReportHistoryTable } from '@/components/dashboard/report-history-table'
import { ReportExportDialog } from '@/components/dashboard/report-export-dialog'
import { ExecutiveSummaryView } from '@/components/dashboard/executive-summary-view'
import { HistoricalComparisonCard } from '@/components/dashboard/historical-comparison-card'
import { getDashboardSnapshot } from '@/lib/saas/server'

export default async function ReportsPage() {
  const snapshot = await getDashboardSnapshot()
  const primaryReport = snapshot.reports[0]

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">Saved executive summaries, archives, and board-ready exports.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {primaryReport ? <ReportExportDialog reportId={primaryReport.id} /> : null}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        {snapshot.executiveSummaries[0] ? <ExecutiveSummaryView summary={snapshot.executiveSummaries[0]} /> : null}
        <HistoricalComparisonCard title="MRR vs previous period" current={92} previous={84.2} />
      </div>
      <ReportHistoryTable reports={snapshot.reports} />
    </div>
  )
}
