"use client"

import * as React from 'react'
import { mockMetrics } from '@/lib/saas/mock-data'

type Metrics = typeof mockMetrics

type ScenarioId = 'hyper' | 'retention' | 'revenue' | 'acquisition' | 'baseline'

const scenarios: Record<ScenarioId, { id: ScenarioId; name: string; metrics: Metrics }> = {
  baseline: { id: 'baseline', name: 'Baseline', metrics: mockMetrics },
  hyper: {
    id: 'hyper',
    name: 'Hyper-growth',
    metrics: {
      revenueData: mockMetrics.revenueData.map((r) => ({ ...r, current: Math.round(r.current * 1.35) })),
      acquisitionData: mockMetrics.acquisitionData.map((a) => ({ ...a, paid: Math.round(a.paid * 1.6) })),
      retentionData: mockMetrics.retentionData.map((r) => ({ ...r, retention: Math.max(60, r.retention - 5) })),
    },
  },
  retention: {
    id: 'retention',
    name: 'Retention Crisis',
    metrics: {
      revenueData: mockMetrics.revenueData.map((r, i) => ({ ...r, current: i > 6 ? Math.round(r.current * 0.85) : r.current })),
      acquisitionData: mockMetrics.acquisitionData.map((a) => ({ ...a, organic: Math.round(a.organic * 0.9) })),
      retentionData: mockMetrics.retentionData.map((r, i) => ({ ...r, retention: Math.max(30, r.retention - 20) })),
    },
  },
  revenue: {
    id: 'revenue',
    name: 'Revenue Anomaly',
    metrics: {
      revenueData: mockMetrics.revenueData.map((r, i) => ({ ...r, current: i === 10 ? Math.round(r.current * 1.6) : r.current })),
      acquisitionData: mockMetrics.acquisitionData,
      retentionData: mockMetrics.retentionData,
    },
  },
  acquisition: {
    id: 'acquisition',
    name: 'Acquisition Spike',
    metrics: {
      revenueData: mockMetrics.revenueData,
      acquisitionData: mockMetrics.acquisitionData.map((a, i) => ({ ...a, paid: i === 3 ? Math.round(a.paid * 3) : a.paid })),
      retentionData: mockMetrics.retentionData,
    },
  },
}

const DemoContext = React.createContext<{
  scenario: ScenarioId
  setScenario: (s: ScenarioId) => void
  metrics: Metrics
} | null>(null)

export function DemoScenarioProvider({ children }: { children: React.ReactNode }) {
  const [scenario, setScenario] = React.useState<ScenarioId>('baseline')

  const value = React.useMemo(() => ({ scenario, setScenario, metrics: scenarios[scenario].metrics }), [scenario])

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemoScenario() {
  const ctx = React.useContext(DemoContext)
  if (!ctx) throw new Error('useDemoScenario must be used within DemoScenarioProvider')
  return ctx
}

export const availableScenarios = Object.values(scenarios).map((s) => ({ id: s.id, name: s.name }))
