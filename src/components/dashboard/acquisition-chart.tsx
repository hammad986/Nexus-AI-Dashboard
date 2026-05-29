"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { acquisitionData } from "@/data/mock-analytics"

export function AcquisitionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={acquisitionData}
        margin={{
          top: 10,
          right: 10,
          left: -20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
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
        />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))" }}
          contentStyle={{ backgroundColor: "hsl(var(--background))", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}
          itemStyle={{ color: "hsl(var(--foreground))" }}
        />
        <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
        <Bar dataKey="organic" name="Organic" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 4, 4]} />
        <Bar dataKey="referral" name="Referral" stackId="a" fill="hsl(var(--primary) / 0.6)" />
        <Bar dataKey="paid" name="Paid Ads" stackId="a" fill="hsl(var(--primary) / 0.3)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
