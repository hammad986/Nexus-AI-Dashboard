import { hasSupabaseConfig } from '@/lib/supabase/config'
import { getDb } from './client'

type MutationResult = { success: boolean; error?: string }

export async function ingestAnalyticsEvent(input: {
  workspaceId: string
  metricKey: string
  metricValue: number
  metricDelta?: number | null
  periodLabel?: string | null
  source?: string
  message?: string
}): Promise<MutationResult> {
  if (!hasSupabaseConfig()) {
    return { success: true }
  }

  const db = await getDb()

  const { error: snapshotError } = await db.from('analytics_snapshots').insert({
    workspace_id: input.workspaceId,
    metric_key: input.metricKey,
    metric_value: input.metricValue,
    metric_delta: input.metricDelta ?? null,
    period_label: input.periodLabel ?? null,
    source: input.source ?? 'ingestion',
    metadata: {
      message: input.message ?? 'Analytics event ingested',
    },
  })

  if (snapshotError) {
    return { success: false, error: String(snapshotError) }
  }

  const { error: activityError } = await db.from('activity_logs').insert({
    workspace_id: input.workspaceId,
    event_type: 'analytics.ingested',
    payload: { message: input.message ?? 'Analytics event ingested' },
  })

  if (activityError) {
    return { success: false, error: String(activityError) }
  }

  return { success: true }
}

export async function archiveReport(reportId: string): Promise<MutationResult> {
  if (!hasSupabaseConfig()) {
    return { success: true }
  }

  const db = await getDb()
  const { error } = await db.from('ai_reports').update({ status: 'archived', archived_at: new Date().toISOString() }).eq('id', reportId)

  if (error) {
    return { success: false, error: String(error) }
  }

  return { success: true }
}

export async function createWorkspace(input: {
  organizationName: string
  organizationSlug: string
  workspaceName: string
  workspaceSlug: string
}): Promise<MutationResult> {
  if (!hasSupabaseConfig()) {
    return { success: true }
  }

  const db = await getDb()
  const { data: authData } = await db.auth.getUser()
  const user = authData.user

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  const { data: organization, error: organizationError } = await db
    .from('organizations')
    .insert({
      name: input.organizationName,
      slug: input.organizationSlug,
      owner_id: user.id,
    })
    .select('id')
    .single()

  if (organizationError || !organization) {
    return { success: false, error: String(organizationError) }
  }

  const { data: workspace, error: workspaceError } = await db
    .from('workspaces')
    .insert({
      organization_id: organization.id,
      name: input.workspaceName,
      slug: input.workspaceSlug,
      plan: 'Pro',
    })
    .select('id')
    .single()

  if (workspaceError || !workspace) {
    return { success: false, error: String(workspaceError) }
  }

  const { error: membershipError } = await db.from('workspace_members').insert({
    workspace_id: workspace.id,
    user_id: user.id,
    role: 'owner',
  })

  if (membershipError) {
    return { success: false, error: String(membershipError) }
  }

  return { success: true }
}

