"use client"

import { useRouter } from 'next/navigation'
import { LogOut, Settings, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { hasSupabaseConfig } from '@/lib/supabase/config'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function AccountDropdown({ email }: { email?: string | null }) {
  const router = useRouter()
  const supabase = createClient()
  const initials = email?.[0]?.toUpperCase() ?? 'U'

  const handleLogout = async () => {
    if (hasSupabaseConfig()) {
      await supabase.auth.signOut()
    }
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" className="relative h-9 w-9 rounded-full" />}>
        <Avatar className="h-9 w-9 ring-2 ring-border/60">
          <AvatarImage src="/placeholder-user.jpg" alt={email ?? 'user'} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">Account</p>
          <p className="text-xs text-muted-foreground truncate">{email ?? 'Loading account...'}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-rose-500 focus:text-rose-500">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
