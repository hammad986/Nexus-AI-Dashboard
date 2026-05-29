"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, User, Sparkles, X, ChevronDown, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChatMessage } from "@/types/chat"

interface AiCopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_PROMPTS = [
  "Why did churn increase?",
  "Summarize this week's performance",
  "Identify growth opportunities",
  "Where are we losing users?"
]

export function AiCopilotPanel({ isOpen, onClose }: AiCopilotPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: "welcome",
    role: "assistant",
    content: "Hello. I'm Nexus, your startup intelligence copilot. I have full context of your dashboard metrics. What would you like to analyze?",
    createdAt: new Date()
  }])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async (text: string) => {
    if (!text.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      createdAt: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Add empty assistant message to update via stream
    const aiMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: aiMessageId,
      role: "assistant",
      content: "",
      createdAt: new Date()
    }])

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({ role, content }))
        })
      })

      if (!response.ok) throw new Error("Failed to fetch")
      if (!response.body) throw new Error("No response body")

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      let fullContent = ""

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone
        if (value) {
          const chunk = decoder.decode(value, { stream: true })
          fullContent += chunk
          setMessages(prev => prev.map(msg => 
            msg.id === aiMessageId ? { ...msg, content: fullContent } : msg
          ))
        }
      }
    } catch (error) {
      console.error("Chat error:", error)
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? { ...msg, content: "Sorry, I encountered an error connecting to the intelligence engine." } : msg
      ))
    } finally {
      setIsTyping(false)
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md h-[600px] max-h-[80vh] flex flex-col bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-bottom-5">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-indigo-500/20 text-indigo-500">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Nexus Copilot</h3>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              Context Active
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
            <div className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
              msg.role === "user" ? "bg-primary/10 text-primary" : "bg-indigo-500/10 text-indigo-500"
            )}>
              {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            
            <div className={cn(
              "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
              msg.role === "user" 
                ? "bg-primary text-primary-foreground rounded-tr-sm" 
                : "bg-muted rounded-tl-sm border border-border/50"
            )}>
               <div className="whitespace-pre-wrap leading-relaxed">
                 {msg.content || (msg.role === "assistant" && isTyping && <span className="animate-pulse">...</span>)}
               </div>
            </div>
          </div>
        ))}
        {isTyping && messages[messages.length - 1]?.role !== "assistant" && (
           <div className="flex gap-3">
             <div className="h-8 w-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
               <Bot className="h-4 w-4" />
             </div>
             <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-2.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full animate-bounce"></span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button 
              key={i} 
              onClick={() => handleSend(prompt)}
              className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full border transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-background border-t">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="relative flex items-center"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Copilot about your metrics..."
            className="w-full bg-muted border-transparent focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 rounded-full pl-4 pr-12 py-3 text-sm transition-all outline-none"
            disabled={isTyping}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-1.5 bg-indigo-500 text-white rounded-full disabled:opacity-50 transition-opacity"
          >
            <Send className="h-4 w-4 -ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  )
}
