import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardShell } from './dashboard-shell'
import { hasSupabaseConfig } from '@/lib/supabase/config'
import { getDashboardSnapshot } from '@/lib/saas/server'

export async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  if (!hasSupabaseConfig()) {
    const snapshot = await getDashboardSnapshot()
    return <DashboardShell workspaces={snapshot.workspaces}>{children}</DashboardShell>
  }

  const supabase = await createClient()
  let user = null

  try {
    const response = await supabase.auth.getUser()
    user = response.data.user
  } catch {
    const snapshot = await getDashboardSnapshot()
    return <DashboardShell workspaces={snapshot.workspaces}>{children}</DashboardShell>
  }

  const snapshot = await getDashboardSnapshot()

  if (!user) {
    redirect('/auth/login')
  }

  return <DashboardShell workspaces={snapshot.workspaces}>{children}</DashboardShell>
}
