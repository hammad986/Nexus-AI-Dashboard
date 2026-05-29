"use client"

import * as React from "react"
import { revenueData, acquisitionData, retentionData } from "@/data/mock-analytics"

export type ScenarioType = "hypergrowth" | "retention_crisis" | "revenue_anomaly" | "acquisition_spike"

interface DemoScenarioContextType {
  activeScenario: ScenarioType
  setActiveScenario: (scenario: ScenarioType) => void
  getRevenueData: () => typeof revenueData
  getAcquisitionData: () => typeof acquisitionData
  getRetentionData: () => typeof retentionData
}

export const DemoScenarioContext = React.createContext<DemoScenarioContextType | undefined>(undefined)

// Custom data variants for showcase
const scenarios = {
  hypergrowth: {
    revenue: revenueData,
    acquisition: acquisitionData,
    retention: retentionData
  },
  retention_crisis: {
    revenue: revenueData.map(d => ({ ...d, current: d.current * 0.9, predicted: d.predicted * 0.7 })),
    acquisition: acquisitionData,
    retention: [
      { cohort: "Week 1", retention: 100 },
      { cohort: "Week 2", retention: 60 },
      { cohort: "Week 3", retention: 45 },
      { cohort: "Week 4", retention: 20 },
      { cohort: "Week 5", retention: 10 },
      { cohort: "Week 6", retention: 5 },
      { cohort: "Week 7", retention: 2 },
      { cohort: "Week 8", retention: 1 },
    ]
  },
  revenue_anomaly: {
    revenue: revenueData.map((d, i) => i === 8 ? { ...d, current: d.current * 0.3 } : d),
    acquisition: acquisitionData,
    retention: retentionData
  },
  acquisition_spike: {
    revenue: revenueData,
    acquisition: acquisitionData.map(d => ({ ...d, referral: d.referral * 5, paid: d.paid * 2 })),
    retention: retentionData
  }
}

export function DemoScenarioProvider({ children }: { children: React.ReactNode }) {
  const [activeScenario, setActiveScenario] = React.useState<ScenarioType>("hypergrowth")

  const getRevenueData = () => scenarios[activeScenario].revenue
  const getAcquisitionData = () => scenarios[activeScenario].acquisition
  const getRetentionData = () => scenarios[activeScenario].retention

  return (
    <DemoScenarioContext.Provider value={{ activeScenario, setActiveScenario, getRevenueData, getAcquisitionData, getRetentionData }}>
      {children}
    </DemoScenarioContext.Provider>
  )
}

export function useDemoScenario() {
  const context = React.useContext(DemoScenarioContext)
  if (context === undefined) {
    throw new Error("useDemoScenario must be used within a DemoScenarioProvider")
  }
  return context
}