import { useAuth } from '@/hooks/useAuth'

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    window.location.href = '/login'

    return (
      <div>
        <h1>Unauthorized</h1>
        <p>You are not authorized to view this page.</p>
        <p>Redirecting to login page...</p>
      </div>
    )
  }

  return children
}
