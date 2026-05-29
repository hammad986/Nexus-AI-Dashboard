import { AuthForm } from '@/components/dashboard/auth-form'
import { DemoAuthProvider } from '@/providers/demo-auth-provider'

export default function SignupPage() {
  return (
    <DemoAuthProvider>
      <AuthForm mode="signup" />
    </DemoAuthProvider>
  )
}
