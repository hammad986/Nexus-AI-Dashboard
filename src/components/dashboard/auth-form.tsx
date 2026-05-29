import Link from 'next/link'
import { BrainCircuit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

type AuthAction = (formData: FormData) => Promise<void>

export function AuthForm({
  mode,
  primaryAction,
  secondaryAction,
}: {
  mode: 'login' | 'signup'
  primaryAction: AuthAction
  secondaryAction: AuthAction
}) {
  const isLogin = mode === 'login'

  return (
    <Card className="w-full border-border/60 bg-background/90 shadow-2xl shadow-black/20 backdrop-blur">
      <form>
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
          <Button formAction={primaryAction} className="w-full">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
          <Button formAction={secondaryAction} variant="outline" className="w-full">
            {isLogin ? 'Create Account' : 'Already have an account? Sign In'}
          </Button>
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
