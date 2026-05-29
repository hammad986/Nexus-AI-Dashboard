'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { archiveReport } from '@/lib/db/mutations'

export async function archiveReportAction(reportId: string) {
  await archiveReport(reportId)
  revalidatePath('/reports')
  revalidatePath(`/reports/${reportId}`)
  redirect('/reports')
}
