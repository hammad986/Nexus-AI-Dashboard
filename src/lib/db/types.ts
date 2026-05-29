export type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[]

export interface DatabaseWorkspaceRow {
  id: string
  organization_id: string
  name: string
  slug: string
  plan: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface DatabaseReportRow {
  id: string
  workspace_id: string
  author_id: string | null
  title: string
  summary: string
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'draft' | 'published' | 'archived'
  content: JsonValue
  created_at: string
  updated_at: string
  archived_at: string | null
}

export interface DatabaseConversationRow {
  id: string
  workspace_id: string
  user_id: string | null
  title: string
  created_at: string
  updated_at: string
}

export interface DatabaseNotificationRow {
  id: string
  workspace_id: string
  user_id: string
  type: 'alert' | 'opportunity' | 'warning' | 'info'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  message: string
  read_at: string | null
  created_at: string
}

export interface DatabaseSnapshotRow {
  id: string
  workspace_id: string
  metric_key: string
  metric_value: number
  metric_delta: number | null
  period_label: string | null
  source: string
  metadata: JsonValue
  created_at: string
}

export interface DatabaseSavedInsightRow {
  id: string
  workspace_id: string
  author_id: string | null
  title: string
  description: string
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  tags: JsonValue
  created_at: string
}

export interface DatabaseExecutiveSummaryRow {
  id: string
  workspace_id: string
  report_id: string | null
  title: string
  summary: string
  file_url: string | null
  created_at: string
}

export interface DatabaseActivityLogRow {
  id: string
  workspace_id: string
  user_id: string | null
  event_type: string
  payload: JsonValue
  created_at: string
}
