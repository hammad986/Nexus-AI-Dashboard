"use client"

import * as React from "react"
import { Search, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { NotificationCenter } from "@/components/dashboard/notification-center"
import { AccountDropdown } from "@/components/dashboard/account-dropdown"
import { mockNotifications } from "@/lib/saas/mock-data"

import { CommandPalette } from "./command-palette"
import ScenarioSwitcher from '@/components/demo/scenario-switcher'

export function TopNavbar() {
  const { setTheme, theme } = useTheme()

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full shrink-0 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4 hidden md:block" />
        <div className="w-full max-w-sm hidden md:flex items-center space-x-2">
          <CommandPalette />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <ScenarioSwitcher />
        <NotificationCenter notifications={mockNotifications} />
        <Button
          variant="ghost"
          size="icon"
          className="relative hidden sm:inline-flex"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <AccountDropdown />
      </div>
    </header>
  )
}
