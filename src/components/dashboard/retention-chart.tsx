"use client"

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { retentionData } from "@/data/mock-analytics"

export function RetentionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={retentionData}
        margin={{
          top: 10,
          right: 10,
          left: -20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis
          dataKey="cohort"
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
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "hsl(var(--background))", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}
          formatter={(value: any) => [`${value}%`, 'Retention Rate']}
          labelStyle={{ color: "hsl(var(--foreground))", fontWeight: "bold", marginBottom: "4px" }}
        />
        <Line
          type="monotone"
          dataKey="retention"
          stroke="hsl(var(--ring))"
          strokeWidth={2}
          dot={{ r: 4, fill: "hsl(var(--ring))", strokeWidth: 0 }}
          activeDot={{ r: 6, fill: "hsl(var(--ring))", stroke: "hsl(var(--background))", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
