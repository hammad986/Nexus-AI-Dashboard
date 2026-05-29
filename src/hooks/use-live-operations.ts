"use client"

import { useEffect, useState, useCallback, useRef } from 'react'

export type OperationalEvent = {
  id: string
  type: 'revenue' | 'conversion' | 'churn_risk' | 'engagement' | 'ai_alert' | 'system'
  title: string
  message: string
  metricValue?: number
  metricLabel?: string
  severity?: 'low' | 'medium' | 'high' | 'critical'
  timestamp: Date
}

const EVENT_TEMPLATES = [
  { type: 'revenue', title: 'Plan Upgraded', message: 'Nexus Corp upgraded from Pro to Enterprise tier.', metricValue: 2400, metricLabel: 'MRR', severity: 'low' },
  { type: 'revenue', title: 'New Subscriber', message: 'Acme Inc converted from trial to Pro.', metricValue: 49, metricLabel: 'MRR', severity: 'low' },
  { type: 'conversion', title: 'Checkout Completed', message: 'User completed the onboarding flow in EU region.', severity: 'low' },
  { type: 'churn_risk', title: 'Churn Risk Increased', message: '3 enterprise accounts showed declining engagement.', metricValue: 18, metricLabel: 'Risk Score', severity: 'high' },
  { type: 'engagement', title: 'Traffic Surge', message: 'Unexpected traffic spike from social campaign.', metricValue: 1240, metricLabel: 'Active sessions', severity: 'medium' },
  { type: 'ai_alert', title: 'Target Opportunity', message: 'Conversion rate dropped 11% in EU. Recommend tweaking pricing localization.', severity: 'medium' },
  { type: 'ai_alert', title: 'Retention Anomaly', message: 'Onboarding step 3 drop-off increased by 22% over the last 2 hours.', severity: 'high' },
  { type: 'system', title: 'Database Optimized', message: 'Automated index rebuild completed.', severity: 'low' },
] as const

export function useLiveOperations() {
  const [events, setEvents] = useState<OperationalEvent[]>([])
  const [isLive, setIsLive] = useState(true)
  const isMounted = useRef(true)

  // Initialize with a few events
  useEffect(() => {
    isMounted.current = true
    const initialEvents: OperationalEvent[] = [
      { id: 'ev_0', type: 'system', title: 'Command Center Initialized', message: 'Connecting to telemetry streams...', timestamp: new Date(Date.now() - 30000), severity: 'low' }
    ]
    setEvents(initialEvents)

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (!isLive) return
    
    // Simulate streaming events at random intervals (3s to 12s)
    let timeoutId: NodeJS.Timeout
    
    const scheduleNextEvent = () => {
      const delay = Math.random() * 9000 + 3000
      timeoutId = setTimeout(() => {
        if (!isMounted.current) return
        
        const template = EVENT_TEMPLATES[Math.floor(Math.random() * EVENT_TEMPLATES.length)]
        const newEvent: OperationalEvent = {
          ...template,
          id: `ev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          timestamp: new Date()
        }
        
        setEvents((prev) => [newEvent, ...prev].slice(0, 50)) // Keep last 50 events
        
        scheduleNextEvent()
      }, delay)
    }

    scheduleNextEvent()
    return () => clearTimeout(timeoutId)
  }, [isLive])

  const toggleLive = useCallback(() => setIsLive(prev => !prev), [])
  const clearEvents = useCallback(() => setEvents([]), [])

  return {
    events,
    isLive,
    toggleLive,
    clearEvents
  }
}
