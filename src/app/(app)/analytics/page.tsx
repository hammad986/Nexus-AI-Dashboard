import { SectionCard } from '@/components/dashboard/section-card'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { AcquisitionChart } from '@/components/dashboard/acquisition-chart'
import { RetentionChart } from '@/components/dashboard/retention-chart'
import { getDashboardSnapshot } from '@/lib/saas/server'

export default async function AnalyticsPage() {
  const snapshot = await getDashboardSnapshot()

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Workspace-aware growth metrics for {snapshot.workspace?.name ?? 'your team'}.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Revenue Growth" description="Monthly MRR and predictions." contentClassName="min-h-[300px] p-6">
          <RevenueChart />
        </SectionCard>
        <SectionCard title="Customer Acquisition" description="Source mix across the week." contentClassName="min-h-[300px] p-6">
          <AcquisitionChart />
        </SectionCard>
        <SectionCard title="Cohort Retention" description="Early lifecycle retention curve." contentClassName="min-h-[300px] p-6">
          <RetentionChart />
        </SectionCard>
      </div>
    </div>
  )
}
