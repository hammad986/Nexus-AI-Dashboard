import { NextResponse } from 'next/server'
import { getDashboardSnapshot } from '@/lib/saas/server'
import { createSimplePdfBuffer } from '@/lib/exports/pdf'

export async function GET(request: Request, { params }: { params: Promise<{ reportId: string }> }) {
  const { reportId } = await params
  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format') ?? 'pdf'
  const snapshot = await getDashboardSnapshot()
  const report = snapshot.reports.find((entry) => entry.id === reportId)

  if (!report) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 })
  }

  if (format === 'json') {
    return NextResponse.json({ report, executiveSummary: snapshot.executiveSummaries[0] ?? null })
  }

  if (format === 'txt') {
    return new NextResponse([
      `Report: ${report.title}`,
      `Workspace: ${report.workspaceName}`,
      `Priority: ${report.priority}`,
      `Created: ${report.createdAt}`,
      '',
      report.summary,
    ].join('\n'), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="${report.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.txt"`,
      },
    })
  }

  const pdf = createSimplePdfBuffer(report.title, [
    `Workspace: ${report.workspaceName}`,
    `Priority: ${report.priority}`,
    `Created: ${report.createdAt}`,
    '',
    report.summary,
  ])

  return new NextResponse(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${report.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.pdf"`,
    },
  })
}
