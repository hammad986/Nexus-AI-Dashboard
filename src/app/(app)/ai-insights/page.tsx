import { AiAnalysisPanel } from '@/components/dashboard/ai-analysis-panel'
import { AiChatSection } from '@/components/dashboard/ai-chat-section'
import { ConversationHistory } from '@/components/dashboard/conversation-history'
import { SavedInsightsPanel } from '@/components/dashboard/saved-insights-panel'
import { AIMemoryTimeline } from '@/components/dashboard/ai-memory-timeline'
import { HistoricalComparisonCard } from '@/components/dashboard/historical-comparison-card'
import { getDashboardSnapshot } from '@/lib/saas/server'

export default async function AIInsightsPage() {
  const snapshot = await getDashboardSnapshot()

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI Insights</h2>
        <p className="text-muted-foreground">Saved intelligence and chat history for {snapshot.workspace?.name ?? 'your workspace'}.</p>
      </div>

      {/* AI Chat + Analysis grid */}
      <div className="grid gap-6 xl:grid-cols-2">
        <AiChatSection />
        <AiAnalysisPanel />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <SavedInsightsPanel insights={snapshot.savedInsights} />
        <div className="space-y-6">
          <HistoricalComparisonCard title="Engagement lift" current={74.0} previous={69.2} />
          <HistoricalComparisonCard title="Risk score" current={12.0} previous={15.4} suffix=" pts" />
        </div>
      </div>

      <AIMemoryTimeline snapshots={snapshot.analyticsSnapshots} summaries={snapshot.executiveSummaries} activityLogs={snapshot.activityLogs} />
      <ConversationHistory conversations={snapshot.conversations} />
    </div>
  )
}
