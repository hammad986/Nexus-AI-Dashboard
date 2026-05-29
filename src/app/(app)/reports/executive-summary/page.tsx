import { getDashboardSnapshot } from '@/lib/saas/server'
import { ExecutiveSummaryView } from '@/components/dashboard/executive-summary-view'
import { AIReportCard } from '@/components/dashboard/ai-report-card'

export default async function ExecutiveSummaryPage() {
  const snapshot = await getDashboardSnapshot()
  const summary = snapshot.executiveSummaries[0]

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Executive Summary</h2>
        <p className="text-muted-foreground">Board-ready summary export for founders and growth teams.</p>
      </div>
      {summary ? <ExecutiveSummaryView summary={summary} /> : null}
      <div className="grid gap-6 xl:grid-cols-3">
        {snapshot.reports.map((report) => (
          <AIReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  )
}
