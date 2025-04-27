import { useCallback, useEffect, useState } from 'react'
import { usePocketbase } from './usePocketbase'
import type { UsersRecord } from 'pocketbase-types'

export const useAuth = () => {
  const pb = usePocketbase()

  const [token, setToken] = useState(pb.authStore.token)
  const [user, setUser] = useState<UsersRecord | null>(
    pb.authStore.record as unknown as UsersRecord,
  )
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid)

  useEffect(() => {
    return pb.authStore.onChange((token, record) => {
      setToken(token)
      setUser(record as unknown as UsersRecord)
      setIsAuthenticated(pb.authStore.isValid)
    })
  }, [])

  const refreshSession = useCallback(async () => {
    console.log('Refreshing session')
    if (!pb.authStore.isValid) return
    const expiration = pb.authStore.record?.tokenExpires
    const timeLeft = expiration
      ? new Date(expiration).getTime() - Date.now()
      : 0
    if (timeLeft > 5 * 60 * 1000) return // Refresh if less than 5 minutes left
    await pb.collection('users').authRefresh()
  }, [token])

  useEffect(() => {
    const interval = setInterval(() => {
      refreshSession()
    }, 60 * 1000) // Check every minute

    return () => clearInterval(interval)
  }, [refreshSession])

  return {
    user,
    isAuthenticated,
    token,
  }
}
