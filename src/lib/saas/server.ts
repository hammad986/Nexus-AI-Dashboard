import { createClient } from '@/lib/supabase/server'
import { hasSupabaseConfig } from '@/lib/supabase/config'
import { mockSnapshot } from './mock-data'
import { getActivityLogRows, getConversationRows, getExecutiveSummaryRows, getNotificationRows, getReportRows, getSavedInsightRows, getSnapshotRows, getWorkspaceWorkspaceRows } from '@/lib/db/queries'
import { mapActivityLogRow, mapConversationRow, mapExecutiveSummaryRow, mapNotificationRow, mapReportRow, mapSavedInsightRow, mapSnapshotRow, mapWorkspaceRow } from '@/lib/db/mappers'
import type { DatabaseActivityLogRow, DatabaseConversationRow, DatabaseExecutiveSummaryRow, DatabaseNotificationRow, DatabaseReportRow, DatabaseSavedInsightRow, DatabaseSnapshotRow, DatabaseWorkspaceRow } from '@/lib/db/types'
import type {
  DashboardSnapshot,
  SaaSConversation,
  SaaSExecutiveSummary,
  SaaSAnalyticsSnapshot,
  SaaSNotification,
  SaaSReport,
  SaaSSavedInsight,
  SaaSWorkspace,
  SaaSActivityLog,
} from './types'

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  if (!hasSupabaseConfig()) {
    return mockSnapshot
  }

  const supabase = await createClient()
  let user = null

  try {
    const response = await supabase.auth.getUser()
    user = response.data.user
  } catch {
    return mockSnapshot
  }

  const [workspaceRows, conversationRows, reportRows, notificationRows, savedInsightRows, snapshotRows, executiveSummaryRows, activityLogRows] = await Promise.all([
    getWorkspaceWorkspaceRows(),
    getConversationRows(),
    getReportRows(),
    getNotificationRows(),
    getSavedInsightRows(),
    getSnapshotRows(),
    getExecutiveSummaryRows(),
    getActivityLogRows(),
  ])

  return {
    user: user
      ? {
          id: user.id,
          email: user.email ?? mockSnapshot.user?.email ?? 'founder@nexusai.dev',
          fullName: user.user_metadata?.full_name ?? mockSnapshot.user?.fullName ?? null,
          avatarUrl: user.user_metadata?.avatar_url ?? null,
        }
      : mockSnapshot.user,
    workspace: workspaceRows[0] ? mapWorkspaceRow(workspaceRows[0] as DatabaseWorkspaceRow) : mockSnapshot.workspace,
    workspaces: workspaceRows.map((row: DatabaseWorkspaceRow) => mapWorkspaceRow(row)),
    conversations: conversationRows.map((row: DatabaseConversationRow) => mapConversationRow(row, workspaceRows[0]?.name ?? mockSnapshot.workspace?.name ?? 'Workspace')),
    reports: reportRows.map((row: DatabaseReportRow) => mapReportRow(row, workspaceRows[0]?.name ?? mockSnapshot.workspace?.name ?? 'Workspace')),
    notifications: notificationRows.map((row: DatabaseNotificationRow) => mapNotificationRow(row, workspaceRows[0]?.name ?? mockSnapshot.workspace?.name ?? 'Workspace')),
    savedInsights: savedInsightRows.map((row: DatabaseSavedInsightRow) => mapSavedInsightRow(row, workspaceRows[0]?.name ?? mockSnapshot.workspace?.name ?? 'Workspace')),
    analyticsSnapshots: snapshotRows.length ? snapshotRows.map((row: DatabaseSnapshotRow) => mapSnapshotRow(row)) : mockSnapshot.analyticsSnapshots,
    executiveSummaries: executiveSummaryRows.length ? executiveSummaryRows.map((row: DatabaseExecutiveSummaryRow) => mapExecutiveSummaryRow(row, workspaceRows[0]?.name ?? mockSnapshot.workspace?.name ?? 'Workspace')) : mockSnapshot.executiveSummaries,
    activityLogs: activityLogRows.length ? activityLogRows.map((row: DatabaseActivityLogRow) => mapActivityLogRow(row, workspaceRows[0]?.name ?? mockSnapshot.workspace?.name ?? 'Workspace')) : mockSnapshot.activityLogs,
  }
}
