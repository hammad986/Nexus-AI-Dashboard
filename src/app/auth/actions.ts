'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { hasSupabaseConfig } from '@/lib/supabase/config'

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}

export async function login(formData: FormData) {
  if (!hasSupabaseConfig()) {
    redirect('/dashboard')
  }

  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect('/auth/login?error=invalid-credentials')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  if (!hasSupabaseConfig()) {
    redirect('/auth/login?message=account-created')
  }

  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    redirect('/auth/signup?error=sign-up-failed')
  }

  revalidatePath('/', 'layout')
  redirect('/auth/login?message=account-created')
}