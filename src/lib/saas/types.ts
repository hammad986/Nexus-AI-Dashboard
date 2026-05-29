export type WorkspaceRole = 'owner' | 'admin' | 'member' | 'viewer'

export interface SaaSWorkspace {
  id: string
  name: string
  slug: string
  plan: string
  role: WorkspaceRole
  memberCount: number
}

export interface SaaSUserProfile {
  id: string
  email: string
  fullName?: string | null
  avatarUrl?: string | null
}

export interface SaaSConversation {
  id: string
  title: string
  workspaceName: string
  preview: string
  updatedAt: string
  messageCount: number
}

export interface SaaSReport {
  id: string
  title: string
  summary: string
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  workspaceName: string
  createdAt: string
  tags: string[]
}

export interface SaaSNotification {
  id: string
  title: string
  message: string
  type: 'alert' | 'opportunity' | 'warning' | 'info'
  severity: 'low' | 'medium' | 'high' | 'critical'
  unread: boolean
  createdAt: string
}

export interface SaaSSavedInsight {
  id: string
  title: string
  description: string
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  createdAt: string
  workspaceName: string
}

export interface SaaSAnalyticsSnapshot {
  id: string
  metricKey: string
  metricValue: number
  metricDelta?: number | null
  periodLabel?: string | null
  source: string
  createdAt: string
}

export interface SaaSExecutiveSummary {
  id: string
  title: string
  summary: string
  fileUrl?: string | null
  createdAt: string
  workspaceName: string
}

export interface SaaSActivityLog {
  id: string
  eventType: string
  message: string
  createdAt: string
  workspaceName: string
}

export interface DashboardSnapshot {
  user?: SaaSUserProfile | null
  workspace?: SaaSWorkspace | null
  workspaces: SaaSWorkspace[]
  conversations: SaaSConversation[]
  reports: SaaSReport[]
  notifications: SaaSNotification[]
  savedInsights: SaaSSavedInsight[]
  analyticsSnapshots: SaaSAnalyticsSnapshot[]
  executiveSummaries: SaaSExecutiveSummary[]
  activityLogs: SaaSActivityLog[]
}
