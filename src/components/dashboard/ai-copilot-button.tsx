"use client"

import { useState } from "react"
import { Bot, Sparkles } from "lucide-react"
import { AiCopilotPanel } from "./ai-copilot-panel"

export function AiCopilotButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group ${
          isOpen ? 'translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        } bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-indigo-400/30`}
      >
        <div className="relative">
          <Bot className="h-6 w-6" />
          <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-indigo-200 animate-pulse" />
        </div>
      </button>

      <AiCopilotPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
