import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Sparkles, TrendingUp, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIInsightCardProps {
  className?: string
  title?: string
  description?: string
  type?: "opportunity" | "warning" | "neutral"
  action?: string
  confidence?: number
}

export function AIInsightCard({ 
  className,
  title = "Nexus Insight",
  description = "Insight generated based on data.",
  type = "opportunity",
  action = "View Analysis",
  confidence
}: AIInsightCardProps) {
  
  const getColors = () => {
    switch(type) {
      case "opportunity": return "border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
      case "warning": return "border-rose-500/20 bg-rose-500/5 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400";
      default: return "border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400";
    }
  }

  const getIcon = () => {
    switch(type) {
      case "opportunity": return <TrendingUp className="h-5 w-5" />;
      case "warning": return <AlertTriangle className="h-5 w-5" />;
      default: return <Sparkles className="h-5 w-5" />;
    }
  }

  const colors = getColors();

  return (
    <Card className={cn("relative overflow-hidden shadow-sm", colors.split(' ').filter(c => c.startsWith('border') || c.startsWith('bg')).join(' '), className)}>
      <div className={cn("absolute top-0 right-0 p-4 opacity-10", colors.split(' ').find(c => c.startsWith('text')))}>
        <Sparkles className="h-24 w-24" />
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className={colors.split(' ').find(c => c.startsWith('text'))}>
            {getIcon()}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          {confidence && (
             <span className="ml-auto text-xs font-semibold px-2 py-1 rounded-full bg-background/50 backdrop-blur-sm border">
               {confidence}% Confidence
             </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed max-w-[85%] text-foreground/80">
          {description}
        </p>
        <div className="mt-4 flex gap-2">
          <button className={cn("text-xs font-medium hover:underline", colors.split(' ').find(c => c.startsWith('text')))}>
            {action} &rarr;
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
