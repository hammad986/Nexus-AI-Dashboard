"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, Sparkles, Building } from "lucide-react"
import { useDemoAuth } from '@/providers/demo-auth-provider'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export function WorkspaceSwitcher({
  workspaces,
}: {
  workspaces: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  try {
    const { user, createWorkspace, switchWorkspace } = useDemoAuth()

    const items = React.useMemo(() => {
      if (user && user.workspaces?.length) {
        return user.workspaces.map((w, i) => ({ name: w.name, id: w.id, logo: i === 0 ? Sparkles : Building, plan: 'Demo' }))
      }
      return workspaces.map((w) => ({ name: w.name, id: w.name, logo: w.logo ?? Sparkles, plan: w.plan ?? 'Demo' }))
    }, [user, workspaces])

    const active = React.useMemo(() => {
      if (user && user.currentWorkspaceId) {
        return items.find((it) => it.id === user.currentWorkspaceId) ?? items[0]
      }
      return items[0]
    }, [user, items])

    const handleSelect = (it: any) => {
      if (user) {
        switchWorkspace(it.id)
      } else {
        alert('Sign in to switch workspaces')
      }
    }

    const handleCreate = () => {
      const name = prompt('Workspace name')
      if (!name) return
      const ws = createWorkspace(name)
      if (ws) switchWorkspace(ws.id)
    }

    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger render={<SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <active.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {active?.name}
                </span>
                <span className="truncate text-xs">{active?.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side="bottom"
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Workspaces
              </DropdownMenuLabel>
              {items.map((workspace, index) => (
                <DropdownMenuItem
                  key={workspace.id}
                  onClick={() => handleSelect(workspace)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <workspace.logo className="size-4 shrink-0" />
                  </div>
                  {workspace.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleCreate} className="gap-2 p-2 cursor-pointer">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">Add workspace</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  } catch {
    // Fallback for SSR build time
    const [workspace] = workspaces
    const LogoComponent = workspace?.logo
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              {LogoComponent && <LogoComponent className="size-4" />}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {workspace?.name}
              </span>
              <span className="truncate text-xs">{workspace?.plan}</span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }
}
