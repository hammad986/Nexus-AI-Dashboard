export function hasSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return false
  }

  if (url.includes('mock-workspace.supabase.co') || key.includes('mock-anon-key')) {
    return false
  }

  return true
}
