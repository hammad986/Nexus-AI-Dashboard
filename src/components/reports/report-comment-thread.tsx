"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { MessageSquare, Send, User } from 'lucide-react'

interface Comment {
  id: string
  user: string
  content: string
  timestamp: string
}

export function ReportCommentThread({ reportId }: { reportId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [value, setValue] = useState('')

  const handlePost = () => {
    if (!value.trim()) return
    const newComment: Comment = {
      id: Math.random().toString(36),
      user: 'You',
      content: value.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })
    }
    setComments(prev => [...prev, newComment])
    setValue('')
  }

  return (
    <Card className="border-border/60 shadow-lg shadow-black/10 flex flex-col h-full">
      <CardHeader className="py-4 border-b border-border/60 bg-muted/20">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
          <MessageSquare className="h-4 w-4" />
          Team Discussion
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[300px]">
        {comments.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-8">
            No comments yet. Start the discussion.
          </div>
        ) : (
          comments.map(c => (
            <div key={c.id} className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border/50">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{c.user}</span>
                  <span className="text-xs text-muted-foreground">{c.timestamp}</span>
                </div>
                <p className="text-sm text-foreground/90 bg-muted/30 p-2 rounded-lg border border-border/50 break-words">{c.content}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
      <CardFooter className="p-3 border-t border-border/60 bg-muted/10 gap-2">
        <Textarea 
          placeholder="Add a comment or tag team members..." 
          className="min-h-[40px] h-10 resize-none text-sm leading-relaxed" 
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handlePost()
            }
          }}
        />
        <Button size="icon" onClick={handlePost} disabled={!value.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
