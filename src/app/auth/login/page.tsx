import { login, signup } from '../actions'
import { AuthForm } from '@/components/dashboard/auth-form'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { error?: string; message?: string }
}) {
  const isCreated = searchParams?.message === 'account-created'
  const hasError = Boolean(searchParams?.error)

  return (
    <div className="space-y-4">
      {isCreated ? (
        <Alert className="border-cyan-500/20 bg-cyan-500/10 text-cyan-100">
          <AlertDescription>Your account is ready. Sign in to continue into your workspace.</AlertDescription>
        </Alert>
      ) : null}
      {hasError ? (
        <Alert className="border-rose-500/20 bg-rose-500/10 text-rose-100">
          <AlertDescription>We could not authenticate that account. Check your credentials and try again.</AlertDescription>
        </Alert>
      ) : null}
      <AuthForm mode="login" primaryAction={login} secondaryAction={signup} />
    </div>
  )
}
