"use client"

import * as React from "react"
import {
  LayoutDashboard,
  BarChart3,
  Sparkles,
  FileText,
  Users,
  Settings,
  LifeBuoy,
  Send,
  Building,
  Briefcase,
} from "lucide-react"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

import { WorkspaceSwitcher } from "./workspace-switcher"
import { mockWorkspaces } from "@/lib/saas/mock-data"
import type { SaaSWorkspace } from "@/lib/saas/types"

function toSwitcherItems(workspaces: SaaSWorkspace[]) {
  return workspaces.map((workspace, index) => ({
    name: workspace.name,
    logo: index === 0 ? Sparkles : Building,
    plan: workspace.plan,
  }))
}

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "AI Insights",
    url: "/ai-insights",
    icon: Sparkles,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

const tertiaryItems = [
  {
    title: "Team",
    url: "#",
    icon: Users,
  },
  {
    title: "Help & Support",
    url: "#",
    icon: LifeBuoy,
  },
  {
    title: "Feedback",
    url: "#",
    icon: Send,
  },
]

export function AppSidebar({ workspaces = mockWorkspaces, ...props }: React.ComponentProps<typeof Sidebar> & { workspaces?: SaaSWorkspace[] }) {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspaces={toSwitcherItems(workspaces)} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<a href={item.url} />}
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {tertiaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<a href={item.url} />} size="sm">
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground border">
                <Briefcase className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Workspace Health</span>
                <span className="truncate text-xs text-muted-foreground">Multi-user SaaS mode</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
