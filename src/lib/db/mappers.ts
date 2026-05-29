import type {
  DatabaseActivityLogRow,
  DatabaseConversationRow,
  DatabaseExecutiveSummaryRow,
  DatabaseNotificationRow,
  DatabaseReportRow,
  DatabaseSavedInsightRow,
  DatabaseSnapshotRow,
  DatabaseWorkspaceRow,
} from './types'
import type {
  SaaSActivityLog,
  SaaSAnalyticsSnapshot,
  SaaSConversation,
  SaaSExecutiveSummary,
  SaaSNotification,
  SaaSReport,
  SaaSSavedInsight,
  SaaSWorkspace,
} from '@/lib/saas/types'

export function mapWorkspaceRow(row: DatabaseWorkspaceRow): SaaSWorkspace {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    plan: row.plan,
    role: 'owner',
    memberCount: 1,
  }
}

export function mapReportRow(row: DatabaseReportRow, workspaceName = 'Workspace'): SaaSReport {
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    priority: row.priority,
    workspaceName,
    createdAt: row.created_at,
    tags: Array.isArray((row.content as { tags?: string[] })?.tags) ? ((row.content as { tags?: string[] }).tags ?? []) : [],
  }
}

export function mapConversationRow(row: DatabaseConversationRow, workspaceName = 'Workspace'): SaaSConversation {
  return {
    id: row.id,
    title: row.title,
    workspaceName,
    preview: 'Historical conversation saved in workspace memory.',
    updatedAt: row.updated_at,
    messageCount: 0,
  }
}

export function mapNotificationRow(row: DatabaseNotificationRow, workspaceName = 'Workspace'): SaaSNotification {
  return {
    id: row.id,
    title: row.title,
    message: row.message,
    type: row.type,
    severity: row.severity,
    unread: !row.read_at,
    createdAt: row.created_at,
  }
}

export function mapSavedInsightRow(row: DatabaseSavedInsightRow, workspaceName = 'Workspace'): SaaSSavedInsight {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    priority: row.priority,
    createdAt: row.created_at,
    workspaceName,
  }
}

export function mapSnapshotRow(row: DatabaseSnapshotRow): SaaSAnalyticsSnapshot {
  return {
    id: row.id,
    metricKey: row.metric_key,
    metricValue: Number(row.metric_value),
    metricDelta: row.metric_delta == null ? null : Number(row.metric_delta),
    periodLabel: row.period_label,
    source: row.source,
    createdAt: row.created_at,
  }
}

export function mapExecutiveSummaryRow(row: DatabaseExecutiveSummaryRow, workspaceName = 'Workspace'): SaaSExecutiveSummary {
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    fileUrl: row.file_url,
    createdAt: row.created_at,
    workspaceName,
  }
}

export function mapActivityLogRow(row: DatabaseActivityLogRow, workspaceName = 'Workspace'): SaaSActivityLog {
  const payload = row.payload as Record<string, unknown> | null

  return {
    id: row.id,
    eventType: row.event_type,
    message: typeof payload?.message === 'string' ? payload.message : 'Activity recorded',
    createdAt: row.created_at,
    workspaceName,
  }
}
