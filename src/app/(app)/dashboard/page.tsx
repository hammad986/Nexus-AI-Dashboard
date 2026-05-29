import { CommandCenter } from '@/components/dashboard/command-center'
import { getDashboardSnapshot } from '@/lib/saas/server'
import { OnboardingWizard } from '@/components/onboarding/onboarding-wizard'
import { ErrorBoundaryWrapper } from '@/components/ops/error-boundary-wrapper'

export default async function DashboardPage() {
  const snapshot = await getDashboardSnapshot()

  return (
    <div className="space-y-6 relative">
      <OnboardingWizard />
      <ErrorBoundaryWrapper>
        <CommandCenter snapshot={snapshot} />
      </ErrorBoundaryWrapper>
    </div>
  )
}
