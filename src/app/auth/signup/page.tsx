import { login, signup } from '../actions'
import { AuthForm } from '@/components/dashboard/auth-form'

export default function SignupPage() {
  return <AuthForm mode="signup" primaryAction={signup} secondaryAction={login} />
}
