"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { revenueData } from "@/data/mock-analytics"
import { useDemoScenario } from '@/providers/demo-scenario-provider'

export function RevenueChart() {
  const { metrics } = useDemoScenario()
  const data = metrics.revenueData
  return (
    <div className="w-full min-h-[300px]" style={{ height: 350 }}>
      <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2} />
            <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <Tooltip
          contentStyle={{ backgroundColor: "hsl(var(--background))", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}
          itemStyle={{ color: "hsl(var(--foreground))" }}
          formatter={(value: any, name: any) => [`$${Number(value).toLocaleString()}`, name === 'current' ? 'Current MRR' : name === 'predicted' ? 'Predicted MRR' : 'Previous Year']}
          labelStyle={{ color: "hsl(var(--foreground))", fontWeight: "bold", marginBottom: "4px" }}
        />
        <Area
          type="monotone"
          dataKey="predicted"
          stroke="hsl(var(--muted-foreground))"
          strokeDasharray="4 4"
          fillOpacity={1}
          fill="url(#colorPredicted)"
          name="predicted"
          isAnimationActive={true}
          animationDuration={700}
        />
        <Area
          type="monotone"
          dataKey="current"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorCurrent)"
          name="current"
          activeDot={{ r: 6, fill: "hsl(var(--primary))", stroke: "hsl(var(--background))", strokeWidth: 2 }}
          isAnimationActive={true}
          animationDuration={900}
        />
      </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
