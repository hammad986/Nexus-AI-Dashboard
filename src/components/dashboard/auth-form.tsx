"use client"

import Link from 'next/link'
import { useState } from 'react'
import { BrainCircuit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useDemoAuth } from '@/providers/demo-auth-provider'

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const isLogin = mode === 'login'
  const { signup, login } = useDemoAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const email = (formData.get('email') as string) || ''
    const password = (formData.get('password') as string) || ''

    if (isLogin) {
      const res = await login({ email, password })
      if (!res.success) setError(res.error || 'Sign in failed')
    } else {
      const name = (formData.get('name') as string) || ''
      if (!name) {
        setError('Please provide your name')
        setLoading(false)
        return
      }
      const res = await signup({ name, email, password })
      if (!res.success) setError(res.error || 'Sign up failed')
      else setMessage('Account created — redirecting to dashboard')
    }

    setLoading(false)
  }

  return (
    <Card className="w-full border-border/60 bg-background/90 shadow-2xl shadow-black/20 backdrop-blur">
      <form onSubmit={handleSubmit}>
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/30">
              <BrainCircuit className="h-7 w-7" />
            </div>
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl tracking-tight">
              {isLogin ? 'Sign in to Nexus AI' : 'Create your Nexus AI workspace'}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? 'Continue into your workspace, reports, and AI copilot.'
                : 'Launch a multi-user intelligence workspace in minutes.'}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isLogin ? (
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" type="text" placeholder="Your name" required />
            </div>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="founder@startup.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          {error ? (
            <Alert className="border-rose-500/20 bg-rose-500/10 text-rose-100">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
          {message ? (
            <Alert className="border-cyan-500/20 bg-cyan-500/10 text-cyan-100">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          ) : null}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (isLogin ? 'Signing in...' : 'Creating account...') : isLogin ? 'Sign In' : 'Create Account'}
          </Button>

          <Link href={isLogin ? '/auth/signup' : '/auth/login'}>
            <Button type="button" variant="outline" className="w-full">
              {isLogin ? 'Create an account' : 'Already have an account? Sign In'}
            </Button>
          </Link>

          <p className="text-xs text-muted-foreground">
            {isLogin ? (
              <>
                New here? <Link className="text-foreground underline underline-offset-4" href="/auth/signup">Create a workspace</Link>
              </>
            ) : (
              <>
                Have an account? <Link className="text-foreground underline underline-offset-4" href="/auth/login">Sign in</Link>
              </>
            )}
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
