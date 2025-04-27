import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    useEffect(() => {
      const timer = setTimeout(() => {
        window.location.href = '/login'
      }, 5000)

      return () => clearTimeout(timer)
    }, [])
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
