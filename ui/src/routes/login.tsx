import { LoginForm } from '@/components/login-form'
import { useAuth } from '@/hooks/useAuth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  loader: ({ context }) => {
    const { pb } = context
    if (pb.authStore.isValid) {
      return redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    window.location.href = '/'
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
