"use client"

import * as React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { TopNavbar } from "./top-navbar"
import { DemoBanner } from "./demo-banner"
import { AiCopilotButton } from "@/components/dashboard/ai-copilot-button"
import type { SaaSWorkspace } from "@/lib/saas/types"

export function DashboardShell({
  children,
  workspaces,
}: {
  children: React.ReactNode
  workspaces?: SaaSWorkspace[]
}) {
  return (
    <SidebarProvider>
      <AppSidebar workspaces={workspaces} />
      <div className="flex min-h-screen flex-1 flex-col overflow-hidden w-full">
        <DemoBanner />
        <TopNavbar />
        <main className="flex-1 bg-muted/20">
          {children}
        </main>
      </div>
      <AiCopilotButton />
    </SidebarProvider>
  )
}
