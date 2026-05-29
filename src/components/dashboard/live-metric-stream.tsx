"use client"

import { useEffect, useState, useRef } from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export function LiveMetricStream() {
  const [data, setData] = useState<{ time: string; value: number }[]>([])
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    const now = new Date()
    // Generate initial history
    const initialData = Array.from({ length: 20 }).map((_, i) => {
      const t = new Date(now.getTime() - (20 - i) * 2000)
      return {
        time: t.toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }),
        value: 91500 + Math.random() * 500 + (i * 25),
      }
    })
    setData(initialData)

    const interval = setInterval(() => {
      if (!isMounted.current) return
      const t = new Date()
      setData((prev) => {
        const lastVal = prev[prev.length - 1]?.value || 92000
        const newVal = lastVal + (Math.random() * 200 - 80) // random walk
        const newEntry = {
          time: t.toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }),
          value: newVal,
        }
        return [...prev.slice(1), newEntry]
      })
    }, 2000)

    return () => {
      isMounted.current = false
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="w-full min-h-[180px]" style={{ height: 180 }}>
      <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis
          dataKey="time"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
          domain={['auto', 'auto']}
        />
        <Tooltip
          contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
          labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
          formatter={(value: any) => [`$${Number(value).toFixed(0)}`, 'MRR']}
        />
        <Line type="monotone" dataKey="value" stroke="hsl(var(--cyan-500))" strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
