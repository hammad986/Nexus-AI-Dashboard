import { NextResponse } from 'next/server'
import { getDashboardSnapshot } from '@/lib/saas/server'
import { ingestAnalyticsEvent } from '@/lib/db/mutations'
import { apiRouteGuard } from '@/lib/ops/rate-limit'
import { logger } from '@/lib/ops/logger'

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const guard = apiRouteGuard(ip);
  if (!guard.success) {
    logger.warn("Analytics ingest rate limit exceeded", { ip });
    return NextResponse.json({ ok: false, error: 'Rate limit exceeded' }, { status: 429 });
  }

  const snapshot = await getDashboardSnapshot()
  const workspace = snapshot.workspace ?? snapshot.workspaces[0]

  if (!workspace) {
    return NextResponse.json({ ok: false, error: 'No workspace available' }, { status: 400 })
  }

  const result = await ingestAnalyticsEvent({
    workspaceId: workspace.id,
    metricKey: 'mrr',
    metricValue: 92000,
    metricDelta: 8.2,
    periodLabel: 'Live sync',
    source: 'stripe-style-event',
    message: 'Stripe-style revenue event ingested for workspace analytics.',
  })

  if (!result.success) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
