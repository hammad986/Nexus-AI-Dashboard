import { acquisitionData, aiInsights, retentionData, revenueData } from '@/data/mock-analytics'
import type {
  DashboardSnapshot,
  SaaSActivityLog,
  SaaSAnalyticsSnapshot,
  SaaSConversation,
  SaaSExecutiveSummary,
  SaaSNotification,
  SaaSReport,
  SaaSSavedInsight,
  SaaSWorkspace,
} from './types'

export const mockWorkspaces: SaaSWorkspace[] = [
  {
    id: 'ws_1',
    name: 'Nexus AI',
    slug: 'nexus-ai',
    plan: 'Enterprise',
    role: 'owner',
    memberCount: 7,
  },
  {
    id: 'ws_2',
    name: 'Acme Growth',
    slug: 'acme-growth',
    plan: 'Pro',
    role: 'admin',
    memberCount: 4,
  },
]

export const mockConversations: SaaSConversation[] = [
  {
    id: 'conv_1',
    title: 'Q2 revenue forecast review',
    workspaceName: 'Nexus AI',
    preview: 'Gemini highlighted a 14% upsell window in enterprise accounts.',
    updatedAt: '2 minutes ago',
    messageCount: 18,
  },
  {
    id: 'conv_2',
    title: 'Churn warning triage',
    workspaceName: 'Acme Growth',
    preview: 'Retention dip concentrated in two beta cohorts after the pricing change.',
    updatedAt: '18 minutes ago',
    messageCount: 11,
  },
  {
    id: 'conv_3',
    title: 'Launch KPI recap',
    workspaceName: 'Nexus AI',
    preview: 'AI copilot summarized activation, conversion, and referral lift.',
    updatedAt: '1 hour ago',
    messageCount: 9,
  },
]

export const mockReports: SaaSReport[] = [
  {
    id: 'rep_1',
    title: 'Executive Growth Brief',
    summary: 'MRR accelerated 8.2% with strongest expansion coming from paid conversion.',
    priority: 'High',
    workspaceName: 'Nexus AI',
    createdAt: 'Today · 8:30 AM',
    tags: ['MRR', 'Expansion', 'Board'],
  },
  {
    id: 'rep_2',
    title: 'Churn Risk Scan',
    summary: 'A cohort-specific engagement drop suggests proactive outreach before renewal dates.',
    priority: 'Critical',
    workspaceName: 'Acme Growth',
    createdAt: 'Yesterday · 5:10 PM',
    tags: ['Retention', 'Risk'],
  },
  {
    id: 'rep_3',
    title: 'Feature Adoption Snapshot',
    summary: 'Advanced reporting adoption jumped 300% following the product education push.',
    priority: 'Medium',
    workspaceName: 'Nexus AI',
    createdAt: '2 days ago',
    tags: ['Product', 'Adoption'],
  },
]

export const mockNotifications: SaaSNotification[] = [
  {
    id: 'not_1',
    title: 'Retention warning',
    message: 'Cohort 2024-Q3 retention dropped 18% over the last 14 days.',
    type: 'warning',
    severity: 'high',
    unread: true,
    createdAt: '3 min ago',
  },
  {
    id: 'not_2',
    title: 'Upsell opportunity',
    message: 'Gemini identified 28 accounts matching enterprise usage behavior.',
    type: 'opportunity',
    severity: 'medium',
    unread: true,
    createdAt: '14 min ago',
  },
  {
    id: 'not_3',
    title: 'Weekly report ready',
    message: 'Your board summary was generated and saved to the workspace history.',
    type: 'info',
    severity: 'low',
    unread: false,
    createdAt: '1 hour ago',
  },
]

export const mockSavedInsights: SaaSSavedInsight[] = aiInsights.map((insight, index) => ({
  id: `insight_${index + 1}`,
  title: insight.title,
  description: insight.description,
  priority: insight.impact === 'Critical' ? 'Critical' : insight.type === 'opportunity' ? 'High' : 'Medium',
  createdAt: `${index + 1} day${index === 0 ? '' : 's'} ago`,
  workspaceName: index === 1 ? 'Acme Growth' : 'Nexus AI',
}))

export const mockAnalyticsSnapshots: SaaSAnalyticsSnapshot[] = [
  {
    id: 'snap_1',
    metricKey: 'mrr',
    metricValue: 92000,
    metricDelta: 8.2,
    periodLabel: 'This month',
    source: 'stripe-events',
    createdAt: '5 minutes ago',
  },
  {
    id: 'snap_2',
    metricKey: 'activation',
    metricValue: 74,
    metricDelta: 4.1,
    periodLabel: '7 day average',
    source: 'product-events',
    createdAt: '20 minutes ago',
  },
  {
    id: 'snap_3',
    metricKey: 'churn-risk',
    metricValue: 12,
    metricDelta: 2.5,
    periodLabel: 'High-risk cohort count',
    source: 'cohort-analysis',
    createdAt: '1 hour ago',
  },
]

export const mockExecutiveSummaries: SaaSExecutiveSummary[] = [
  {
    id: 'exec_1',
    title: 'Board Snapshot Q2',
    summary: 'Revenue is up 8.2% and upsell exposure remains concentrated in the enterprise cohort.',
    fileUrl: '/api/reports/rep_1/export',
    createdAt: 'Today · 9:15 AM',
    workspaceName: 'Nexus AI',
  },
  {
    id: 'exec_2',
    title: 'Founder Weekly Brief',
    summary: 'Engagement remains healthy, but one beta cohort requires proactive retention outreach.',
    fileUrl: '/api/reports/rep_2/export',
    createdAt: 'Yesterday · 4:40 PM',
    workspaceName: 'Acme Growth',
  },
]

export const mockActivityLogs: SaaSActivityLog[] = [
  {
    id: 'act_1',
    eventType: 'analytics.ingested',
    message: 'Stripe revenue event synced into the analytics snapshot store.',
    createdAt: '5 minutes ago',
    workspaceName: 'Nexus AI',
  },
  {
    id: 'act_2',
    eventType: 'report.saved',
    message: 'Executive Growth Brief archived to workspace report history.',
    createdAt: '18 minutes ago',
    workspaceName: 'Nexus AI',
  },
  {
    id: 'act_3',
    eventType: 'notification.created',
    message: 'Churn spike alert issued to workspace members.',
    createdAt: '34 minutes ago',
    workspaceName: 'Acme Growth',
  },
]

export const mockSnapshot: DashboardSnapshot = {
  user: {
    id: 'user_1',
    email: 'founder@nexusai.dev',
    fullName: 'Founder',
  },
  workspace: mockWorkspaces[0],
  workspaces: mockWorkspaces,
  conversations: mockConversations,
  reports: mockReports,
  notifications: mockNotifications,
  savedInsights: mockSavedInsights,
  analyticsSnapshots: mockAnalyticsSnapshots,
  executiveSummaries: mockExecutiveSummaries,
  activityLogs: mockActivityLogs,
}

export const mockMetrics = {
  revenueData,
  acquisitionData,
  retentionData,
}
