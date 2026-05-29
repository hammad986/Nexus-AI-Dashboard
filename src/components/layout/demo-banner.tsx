import { ExternalLink, Sparkles } from "lucide-react"

export function DemoBanner() {
  return (
    <div className="bg-primary px-4 py-2 text-primary-foreground">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm font-medium tracking-tight">
        <Sparkles className="h-4 w-4" />
        <span>Demo Intelligence Environment — Exploring mock startup scenarios.</span>
        <div className="ml-2 hidden rounded-full bg-primary-foreground/20 px-2 py-0.5 text-xs text-primary-foreground sm:flex items-center gap-1">
          Portfolio Showcase <ExternalLink className="h-3 w-3" />
        </div>
      </div>
    </div>
  )
}