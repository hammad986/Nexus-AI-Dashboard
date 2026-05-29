"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, User, Sparkles, ChevronDown, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChatMessage } from "@/types/chat"
import { useDemoScenario } from "@/providers/demo-scenario-provider"

const SCENARIO_LABELS: Record<string, string> = {
  baseline: 'Baseline',
  hyper: 'Hyper-growth',
  retention: 'Retention Crisis',
  revenue: 'Revenue Anomaly',
  acquisition: 'Acquisition Spike',
}

const SCENARIO_PROMPTS: Record<string, string[]> = {
  baseline: ["Summarize current MRR", "Biggest growth opportunity?", "Where are we losing users?", "Give me a board summary"],
  hyper: ["Why is MRR growing so fast?", "What are the scaling risks?", "How do we sustain this?", "Forecast next quarter"],
  retention: ["Why is retention dropping?", "Which cohorts are at risk?", "How do we fix the churn?", "Re-engagement strategy?"],
  revenue: ["Explain this revenue anomaly", "Is the spike sustainable?", "What caused the spike?", "Impact on ARR forecast"],
  acquisition: ["Why is acquisition spiking?", "Which channel is winning?", "How do we convert this traffic?", "CAC for this spike?"],
}

const SCENARIO_BADGE_STYLES: Record<string, string> = {
  baseline: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  hyper: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  retention: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  revenue: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  acquisition: "bg-teal-500/10 text-teal-400 border-teal-500/20",
}

function getWelcomeMessage(scenario: string): string {
  const label = SCENARIO_LABELS[scenario] ?? scenario
  if (scenario === 'baseline') {
    return "Hello. I'm Nexus, your startup intelligence copilot. I have full context of your dashboard metrics. What would you like to analyze?"
  }
  return `Hello. I'm Nexus. I'm analyzing the **${label}** scenario. Ask me anything about what's happening and what you should do next.`
}

interface AiCopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiCopilotPanel({ isOpen, onClose }: AiCopilotPanelProps) {
  const { scenario, metrics } = useDemoScenario()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scenarioLabel = SCENARIO_LABELS[scenario] ?? scenario
  const suggestedPrompts = SCENARIO_PROMPTS[scenario] ?? SCENARIO_PROMPTS.baseline

  useEffect(() => {
    setMessages([{
      id: `welcome_${scenario}`,
      role: "assistant",
      content: getWelcomeMessage(scenario),
      createdAt: new Date()
    }])
    setInput("")
  }, [scenario])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const clearChat = () => {
    setMessages([{
      id: `welcome_${Date.now()}`,
      role: "assistant",
      content: getWelcomeMessage(scenario),
      createdAt: new Date()
    }])
  }

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      role: "user",
      content: text,
      createdAt: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    const aiMessageId = `ai_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    setMessages(prev => [...prev, {
      id: aiMessageId,
      role: "assistant",
      content: "",
      createdAt: new Date()
    }])

    try {
      const allMessages = [...messages, userMessage]
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages.map(({ role, content }) => ({ role, content })),
          context: {
            scenarioName: scenarioLabel,
            metrics
          }
        })
      })

      if (!response.ok || !response.body) throw new Error("Request failed")

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullContent = ""
      let done = false

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone
        if (value) {
          fullContent += decoder.decode(value, { stream: true })
          setMessages(prev => prev.map(msg =>
            msg.id === aiMessageId ? { ...msg, content: fullContent } : msg
          ))
        }
      }
    } catch {
      setMessages(prev => prev.map(msg =>
        msg.id === aiMessageId ? { ...msg, content: "Sorry, I encountered an error connecting to the intelligence engine." } : msg
      ))
    } finally {
      setIsTyping(false)
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[70] w-full max-w-md h-[600px] max-h-[80vh] flex flex-col bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-bottom-5">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-indigo-500/20 text-indigo-500">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Nexus Copilot</h3>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Analyzing: {scenarioLabel}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", SCENARIO_BADGE_STYLES[scenario] ?? SCENARIO_BADGE_STYLES.baseline)}>
            {scenarioLabel}
          </span>
          <button
            onClick={clearChat}
            className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
            title="Clear chat"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
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
                {msg.content || (msg.role === "assistant" && isTyping && (
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full border border-border/50 transition-colors"
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
            placeholder={`Ask about ${scenarioLabel.toLowerCase()} metrics...`}
            className="w-full bg-muted border-transparent focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 rounded-full pl-4 pr-12 py-3 text-sm transition-all outline-none"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-1.5 bg-indigo-500 text-white rounded-full disabled:opacity-40 hover:bg-indigo-600 transition-all"
          >
            <Send className="h-4 w-4 -ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  )
}
