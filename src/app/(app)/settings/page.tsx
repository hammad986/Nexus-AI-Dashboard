import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { getDashboardSnapshot } from '@/lib/saas/server'
import { WorkspaceSettingsPanel } from '@/components/dashboard/workspace-settings-panel'
import { AnalyticsIngestionStatus } from '@/components/dashboard/analytics-ingestion-status'
import { createWorkspaceAction } from './actions'

export default async function SettingsPage() {
  const snapshot = await getDashboardSnapshot()

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage account preferences for {snapshot.user?.email ?? 'your account'}.</p>
      </div>

      <AnalyticsIngestionStatus />

      <div className="grid gap-6 lg:grid-cols-2">
        {snapshot.workspace ? <WorkspaceSettingsPanel workspace={snapshot.workspace} /> : null}

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Keep the right alerts flowing to the right people.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-frequency">Report Frequency</Label>
              <Input id="report-frequency" defaultValue="Daily AI summary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alert-routing">Alert Routing</Label>
              <Input id="alert-routing" defaultValue="Email + in-app notifications" />
            </div>
            <Button variant="outline">Update Notifications</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Workspace</CardTitle>
          <CardDescription>Spin up a new organization and workspace for a team, client, or product line.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createWorkspaceAction} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="organizationName">Organization Name</Label>
              <Input id="organizationName" name="organizationName" placeholder="Nexus Labs" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organizationSlug">Organization Slug</Label>
              <Input id="organizationSlug" name="organizationSlug" placeholder="nexus-labs" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workspaceName">Workspace Name</Label>
              <Input id="workspaceName" name="workspaceName" placeholder="Growth Ops" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workspaceSlug">Workspace Slug</Label>
              <Input id="workspaceSlug" name="workspaceSlug" placeholder="growth-ops" required />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Create Workspace</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
