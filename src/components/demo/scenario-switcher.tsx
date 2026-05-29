"use client"

import * as React from 'react'
import { availableScenarios, useDemoScenario } from '@/providers/demo-scenario-provider'
import { Button } from '@/components/ui/button'

export function ScenarioSwitcher() {
  const { scenario, setScenario } = useDemoScenario()

  return (
    <div className="hidden md:flex items-center gap-2">
      {availableScenarios.map((s) => (
        <Button
          key={s.id}
          size="sm"
          variant={s.id === scenario ? 'default' : 'ghost'}
          onClick={() => setScenario(s.id as any)}
          className="h-8 px-3 transition-shadow transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-pressed={s.id === scenario}
        >
          <span className="select-none">{s.name}</span>
        </Button>
      ))}
    </div>
  )
}

export default ScenarioSwitcher
