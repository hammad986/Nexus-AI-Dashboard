"use client"

import { Bell, AlertTriangle, Info, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { SaaSNotification } from '@/lib/saas/types'

const iconMap = {
  alert: AlertTriangle,
  opportunity: TrendingUp,
  warning: Bell,
  info: Info,
} as const

export function NotificationCenter({ notifications }: { notifications: SaaSNotification[] }) {
  const unreadCount = notifications.filter((notification) => notification.unread).length

  const severityClassNames = {
    low: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    medium: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    high: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
    critical: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  } as const

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="relative hidden sm:inline-flex" />}>
        <Bell className="h-4 w-4" />
        {unreadCount > 0 ? (
          <span className="absolute right-1 top-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 ring-2 ring-background" />
        ) : null}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="px-3 py-2">
          <p className="text-sm font-semibold">Notifications</p>
          <p className="text-xs text-muted-foreground">{unreadCount} unread alerts and intelligence updates</p>
        </div>
        <DropdownMenuSeparator />
        {notifications.map((notification) => {
          const Icon = iconMap[notification.type]

          return (
            <DropdownMenuItem key={notification.id} className={cn('items-start gap-3 py-3', notification.unread && 'bg-muted/40')}>
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                <Icon className="h-4 w-4 text-cyan-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{notification.title}</span>
                  {notification.unread ? <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> : null}
                </div>
                <Badge variant="outline" className={severityClassNames[notification.severity]}>
                  {notification.severity}
                </Badge>
                <p className="text-xs text-muted-foreground leading-relaxed">{notification.message}</p>
                <p className="text-[11px] text-muted-foreground/80">{notification.createdAt}</p>
              </div>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
