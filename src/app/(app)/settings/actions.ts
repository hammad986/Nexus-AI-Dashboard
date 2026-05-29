'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createWorkspace } from '@/lib/db/mutations'

export async function createWorkspaceAction(formData: FormData) {
  const organizationName = String(formData.get('organizationName') ?? '').trim()
  const organizationSlug = String(formData.get('organizationSlug') ?? '').trim()
  const workspaceName = String(formData.get('workspaceName') ?? '').trim()
  const workspaceSlug = String(formData.get('workspaceSlug') ?? '').trim()

  await createWorkspace({ organizationName, organizationSlug, workspaceName, workspaceSlug })
  revalidatePath('/settings')
  redirect('/settings')
}
