import { AuthForm } from '@/components/dashboard/auth-form'
import { DemoAuthProvider } from '@/providers/demo-auth-provider'

export default function LoginPage() {
  return (
    <DemoAuthProvider>
      <div className="space-y-4">
        <AuthForm mode="login" />
      </div>
    </DemoAuthProvider>
  )
}
