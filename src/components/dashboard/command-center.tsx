"use client"

import { useLiveOperations } from '@/hooks/use-live-operations'
import { DollarSign, Eye, LineChart, Users } from 'lucide-react'
import { KpiCard } from './kpi-card'
import { AiAnalysisPanel } from './ai-analysis-panel'
import { SectionCard } from './section-card'
import { RevenueChart } from './revenue-chart'
import { AcquisitionChart } from './acquisition-chart'
import { SavedInsightsPanel } from './saved-insights-panel'
import { AIReportCard } from './ai-report-card'
import { NotificationCenter } from './notification-center'
import type { DashboardSnapshot, SaaSNotification } from '@/lib/saas/types'
import { LiveActivityFeed } from './live-activity-feed'
import { AiAlertCenter } from './ai-alert-center'
import { IngestionMonitor } from './ingestion-monitor'
import { LiveMetricStream } from './live-metric-stream'
import { IngestionDiagnosticsPanel } from '../ops/ingestion-diagnostics-panel'

export function CommandCenter({ snapshot }: { snapshot: DashboardSnapshot }) {

  const { events, isLive } = useLiveOperations()

  // Calculate live MRR based on events for demo purposes
  const revenueEvents = events.filter(e => e.type === 'revenue' && e.metricValue)
  const additionalMrr = revenueEvents.reduce((acc, e) => acc + (e.metricValue || 0), 0)
  const currentMrr = 92000 + additionalMrr

  // Merge live alerts into notifications
  const liveNotifications: SaaSNotification[] = [
    ...events
      .filter(e => e.type === 'ai_alert' || e.type === 'churn_risk')
      .map(e => ({
        id: e.id,
        title: e.title,
        message: e.message,
        type: (e.type === 'churn_risk' ? 'alert' : 'opportunity') as SaaSNotification['type'],
        severity: e.severity || 'medium',
        unread: true,
        createdAt: e.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }),
      })),
    ...snapshot.notifications,
  ]

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight">Command Center</h2>
          </div>
          <p className="max-w-2xl text-muted-foreground">
            Live operational intelligence for {snapshot.workspace?.name ?? 'your workspace'}.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <NotificationCenter notifications={liveNotifications} />
          <IngestionMonitor isLive={isLive} eventCount={events.length} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Live MRR" value={`$${currentMrr.toLocaleString()}`} trend="+8.2%" trendUp={true} icon={DollarSign} className={additionalMrr > 0 ? 'border-emerald-500/50 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)] transition-all duration-500' : ''} />
        <KpiCard title="Active Users" value="+2,350" trend="+12.1%" trendUp={true} icon={Users} />
        <KpiCard title="Conversion Rate" value="4.5%" trend="+1.2%" trendUp={true} icon={LineChart} />
        <KpiCard title="Churn Risk Score" value="1.2%" trend="-0.5%" trendUp={true} icon={Eye} />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <AiAlertCenter events={events} />
            <SectionCard
              title="Nexus AI Engine"
              description="Real-time operations analysis & predictive intelligence."
              contentClassName="flex flex-col gap-4 p-4 h-[250px] overflow-auto"
              className="h-full"
            >
              <AiAnalysisPanel />
            </SectionCard>
          </div>
          
          <SectionCard
            title="Live Revenue Velocity"
            description="Real-time streaming MRR fluctuations and processing."
            className="flex-1"
            contentClassName="min-h-[250px] flex items-center justify-center p-6"
          >
            <div className="flex h-full w-full flex-col gap-4">
              <LiveMetricStream />
            </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <LiveActivityFeed events={events} />
          <IngestionDiagnosticsPanel />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Customer Acquisition"
          description="Traffic sources leading to conversion."
          contentClassName="min-h-[250px] flex items-center justify-center p-6"
        >
          <div className="flex h-full w-full flex-col gap-4">
            <AcquisitionChart />
          </div>
        </SectionCard>

        <SavedInsightsPanel insights={snapshot.savedInsights} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {snapshot.reports.slice(0, 3).map((report) => (
          <AIReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  )
}
