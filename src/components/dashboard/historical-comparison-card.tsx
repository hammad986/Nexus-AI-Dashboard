import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function HistoricalComparisonCard({
  title,
  current,
  previous,
  suffix = '%',
}: {
  title: string
  current: number
  previous: number
  suffix?: string
}) {
  const delta = current - previous
  const up = delta >= 0

  return (
    <Card className="border-border/60 bg-background/90 shadow-lg shadow-black/10">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-semibold tracking-tight">{current.toLocaleString()}{suffix}</p>
          <p className="text-xs text-muted-foreground">Previous: {previous.toLocaleString()}{suffix}</p>
        </div>
        <div className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${up ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>
          {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {delta >= 0 ? '+' : ''}{delta.toFixed(1)}
        </div>
      </CardContent>
    </Card>
  )
}
