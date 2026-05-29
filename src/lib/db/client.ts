import { createClient } from '@/lib/supabase/server'

export async function getDb() {
  return await createClient()
}
