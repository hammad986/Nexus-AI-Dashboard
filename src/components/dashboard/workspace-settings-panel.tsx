import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { SaaSWorkspace } from '@/lib/saas/types'

export function WorkspaceSettingsPanel({ workspace }: { workspace: SaaSWorkspace }) {
  return (
    <Card className="border-border/60 bg-background/90 shadow-lg shadow-black/10">
      <CardHeader>
        <CardTitle className="text-lg">Workspace Settings</CardTitle>
        <CardDescription>Operational controls and workspace-scoped preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="workspace-name">Workspace Name</Label>
            <Input id="workspace-name" defaultValue={workspace.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workspace-plan">Plan</Label>
            <Input id="workspace-plan" defaultValue={workspace.plan} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="workspace-timezone">Timezone</Label>
            <Input id="workspace-timezone" defaultValue="UTC" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workspace-owner">Owner Role</Label>
            <Input id="workspace-owner" defaultValue={workspace.role} readOnly />
          </div>
        </div>
        <Button>Save Workspace Settings</Button>
      </CardContent>
    </Card>
  )
}
