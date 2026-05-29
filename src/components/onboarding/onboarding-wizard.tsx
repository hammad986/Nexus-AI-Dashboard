"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ArrowRight, Zap, Target, LayoutDashboard } from 'lucide-react'

export function OnboardingWizard() {
  const [step, setStep] = useState<number>(0)
  const [completed, setCompleted] = useState(false)

  if (completed) return null

  const steps = [
    {
      title: 'Welcome to Nexus AI',
      description: 'Your operational command center is ready. Let’s configure your intelligence engine.',
      icon: <Zap className="h-6 w-6 text-cyan-400" />
    },
    {
      title: 'Connect Analytics',
      description: 'We simulate Stripe and product events by default. You can attach live data streams in settings.',
      icon: <Target className="h-6 w-6 text-emerald-400" />
    },
    {
      title: 'AI Copilot Ready',
      description: 'Nexus AI autonomously monitors cohorts, flags churn risks, and summarizes trends for you.',
      icon: <CheckCircle2 className="h-6 w-6 text-indigo-400" />
    }
  ]

  if (step >= steps.length) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <Card className="w-full max-w-md border-border/60 shadow-2xl animate-in zoom-in-95 duration-300">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10">
              <LayoutDashboard className="h-8 w-8 text-cyan-500" />
            </div>
            <CardTitle className="text-2xl">Initialization Complete</CardTitle>
            <CardDescription className="text-base text-muted-foreground mt-2">
              Your workspace is active and telemetry is live.
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-6">
            <Button className="w-full h-11" onClick={() => setCompleted(true)}>
              Enter Command Center
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const currentStep = steps[step]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md border-border/60 shadow-2xl animate-in fade-in duration-300">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Step {step + 1} of {steps.length}</span>
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <div key={i} className={`h-1.5 w-6 rounded-full transition-colors ${i === step ? 'bg-cyan-500' : i < step ? 'bg-cyan-500/40' : 'bg-muted'}`} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted/50 border border-border/50">
              {currentStep.icon}
            </div>
            <div>
              <CardTitle className="text-xl">{currentStep.title}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {currentStep.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 pt-4 border-t border-border/30">
          <Button variant="ghost" onClick={() => setCompleted(true)} className="text-muted-foreground">Skip</Button>
          <Button onClick={() => setStep(s => s + 1)}>
            {step === steps.length - 1 ? 'Finish' : 'Continue'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
