import { createBrowserClient } from '@supabase/ssr'
import { hasSupabaseConfig } from './config'

// Returns null in the Demo Intelligence Environment (no Supabase project
// configured) so client components can run entirely on mock data.
export function createClient() {
  if (!hasSupabaseConfig()) {
    return null
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
