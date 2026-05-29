import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SaaSConversation } from '@/lib/saas/types'

export function ConversationHistory({ conversations }: { conversations: SaaSConversation[] }) {
  return (
    <Card className="border-border/60 bg-background/90 shadow-lg shadow-black/10">
      <CardHeader>
        <CardTitle className="text-lg">Conversation History</CardTitle>
        <CardDescription>Workspace chat sessions persisted for team replay and review.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="rounded-xl border border-border/60 bg-muted/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h4 className="font-medium leading-none">{conversation.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{conversation.preview}</p>
              </div>
              <Badge variant="secondary" className="bg-background/80">
                {conversation.messageCount} messages
              </Badge>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{conversation.workspaceName}</span>
              <span>{conversation.updatedAt}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
