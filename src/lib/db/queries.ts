import { hasSupabaseConfig } from '@/lib/supabase/config'
import { mockReports, mockNotifications, mockSavedInsights, mockConversations, mockWorkspaces } from '@/lib/saas/mock-data'
import type { DatabaseReportRow, DatabaseSnapshotRow, DatabaseNotificationRow, DatabaseConversationRow, DatabaseWorkspaceRow, DatabaseSavedInsightRow, DatabaseExecutiveSummaryRow, DatabaseActivityLogRow } from './types'
import { getDb } from './client'

async function selectOrFallback<T>(query: any, fallback: T[]) {
  try {
    const { data, error } = await query
    if (error || !data || data.length === 0) {
      return fallback
    }
    return data
  } catch {
    return fallback
  }
}

export async function getWorkspaceWorkspaceRows() {
  if (!hasSupabaseConfig()) {
    return mockWorkspaces
  }

  const db = await getDb()
  return await selectOrFallback<DatabaseWorkspaceRow>(db.from('workspaces').select('*').order('created_at', { ascending: false }), mockWorkspaces as unknown as DatabaseWorkspaceRow[])
}

export async function getReportRows() {
  if (!hasSupabaseConfig()) {
    return mockReports
  }

  const db = await getDb()
  return await selectOrFallback<DatabaseReportRow>(db.from('ai_reports').select('*').order('created_at', { ascending: false }).limit(50), [] as DatabaseReportRow[])
}

export async function getConversationRows() {
  if (!hasSupabaseConfig()) {
    return mockConversations
  }

  const db = await getDb()
  return await selectOrFallback<DatabaseConversationRow>(db.from('ai_conversations').select('*').order('updated_at', { ascending: false }).limit(50), [] as DatabaseConversationRow[])
}

export async function getNotificationRows() {
  if (!hasSupabaseConfig()) {
    return mockNotifications
  }

  const db = await getDb()
  return await selectOrFallback<DatabaseNotificationRow>(db.from('notifications').select('*').order('created_at', { ascending: false }).limit(50), [] as DatabaseNotificationRow[])
}

export async function getSavedInsightRows() {
  if (!hasSupabaseConfig()) {
    return mockSavedInsights
  }

  const db = await getDb()
  return await selectOrFallback<DatabaseSavedInsightRow>(db.from('saved_insights').select('*').order('created_at', { ascending: false }).limit(50), [] as DatabaseSavedInsightRow[])
}

export async function getSnapshotRows() {
  if (!hasSupabaseConfig()) {
    return [] as DatabaseSnapshotRow[]
  }

  const db = await getDb()
  return await selectOrFallback<DatabaseSnapshotRow>(db.from('analytics_snapshots').select('*').order('created_at', { ascending: false }).limit(50), [] as DatabaseSnapshotRow[])
}

export async function getExecutiveSummaryRows() {
  if (!hasSupabaseConfig()) {
    return [] as DatabaseExecutiveSummaryRow[]
  }

  const db = await getDb()
  return await selectOrFallback<DatabaseExecutiveSummaryRow>(db.from('executive_summaries').select('*').order('created_at', { ascending: false }).limit(50), [] as DatabaseExecutiveSummaryRow[])
}

export async function getActivityLogRows() {
  if (!hasSupabaseConfig()) {
    return [] as DatabaseActivityLogRow[]
  }

  const db = await getDb()
  return await selectOrFallback<DatabaseActivityLogRow>(db.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(50), [] as DatabaseActivityLogRow[])
}
