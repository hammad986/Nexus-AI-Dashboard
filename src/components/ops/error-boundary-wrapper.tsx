"use client"

import React from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundaryWrapper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service here (e.g. Sentry)
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-xl border border-destructive/20 bg-destructive/5 text-destructive">
          <div className="rounded-full bg-destructive/10 p-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Something went wrong</h3>
            <p className="text-sm text-destructive/80 mt-1 max-w-sm">
              We encountered a runtime error rendering this component. The issue has been logged to our monitoring system.
            </p>
          </div>
          <Button variant="outline" onClick={() => this.setState({ hasError: false })} className="border-destructive/20 hover:bg-destructive/10">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
