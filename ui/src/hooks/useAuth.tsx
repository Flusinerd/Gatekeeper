import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { usePocketbase } from './usePocketbase'
import type { UsersRecord } from 'pocketbase-types'

interface AuthContextType {
  user: UsersRecord | null
  isAuthenticated: boolean
  token: string
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pb = usePocketbase()
  const [token, setToken] = useState(pb.authStore.token)
  const [user, setUser] = useState<UsersRecord | null>(
    pb.authStore.record as unknown as UsersRecord,
  )
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid)

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((token, record) => {
      setToken(token)
      setUser(record as unknown as UsersRecord)
      setIsAuthenticated(pb.authStore.isValid)
    })

    return () => unsubscribe()
  }, [pb])

  const refreshSession = useCallback(async () => {
    console.log('Refreshing session')
    if (!pb.authStore.isValid) return
    const expiration = pb.authStore.record?.tokenExpires
    const timeLeft = expiration
      ? new Date(expiration).getTime() - Date.now()
      : 0
    if (timeLeft > 5 * 60 * 1000) return
    await pb.collection('users').authRefresh()
  }, [pb])

  useEffect(() => {
    const interval = setInterval(() => {
      refreshSession()
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [refreshSession])

  const logout = () => pb.authStore.clear()

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, token, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
