import { DollarSign, Eye, LineChart, Users } from 'lucide-react'
import { KpiCard } from './kpi-card'
import { AiAnalysisPanel } from './ai-analysis-panel'
import { SectionCard } from './section-card'
import { RevenueChart } from './revenue-chart'
import { AcquisitionChart } from './acquisition-chart'
import { RetentionChart } from './retention-chart'
import { SavedInsightsPanel } from './saved-insights-panel'
import { NotificationCenter } from './notification-center'
import { AIReportCard } from './ai-report-card'
import { ConversationHistory } from './conversation-history'
import type { DashboardSnapshot } from '@/lib/saas/types'

export function DashboardOverview({ snapshot }: { snapshot: DashboardSnapshot }) {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="max-w-2xl text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening inside {snapshot.workspace?.name ?? 'your workspace'} today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <NotificationCenter notifications={snapshot.notifications} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Total Revenue (MRR)" value="$92,000" trend="+8.2%" trendUp={true} icon={DollarSign} />
        <KpiCard title="Active Users" value="+2,350" trend="+12.1%" trendUp={true} icon={Users} />
        <KpiCard title="Conversion Rate" value="4.5%" trend="+1.2%" trendUp={true} icon={LineChart} />
        <KpiCard title="Churn Rate" value="1.2%" trend="-0.5%" trendUp={true} icon={Eye} />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <SectionCard
          title="Revenue Growth"
          description="Monthly MRR growth over the last 12 months with AI predictions."
          className="lg:col-span-4"
          contentClassName="min-h-[300px] flex items-center justify-center p-6"
        >
          <div className="flex h-full w-full flex-col gap-4">
            <RevenueChart />
          </div>
        </SectionCard>

        <div className="flex flex-col gap-6 lg:col-span-3">
          <SectionCard
            title="Nexus AI Engine"
            description="Real-time operations analysis & predictive intelligence."
            contentClassName="flex flex-col gap-4 p-4"
          >
            <AiAnalysisPanel />
          </SectionCard>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Customer Acquisition"
          description="Traffic sources leading to conversion."
          contentClassName="min-h-[300px] flex items-center justify-center p-6"
        >
          <div className="flex h-full w-full flex-col gap-4">
            <AcquisitionChart />
          </div>
        </SectionCard>

        <SectionCard
          title="Cohort Retention"
          description="User retention over the first 8 weeks."
          contentClassName="min-h-[300px] flex items-center justify-center p-6"
        >
          <div className="flex h-full w-full flex-col gap-4">
            <RetentionChart />
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SavedInsightsPanel insights={snapshot.savedInsights} />
        <ConversationHistory conversations={snapshot.conversations} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {snapshot.reports.slice(0, 3).map((report) => (
          <AIReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  )
}
