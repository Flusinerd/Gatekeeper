import { usePocketbase } from '@/hooks/usePocketbase'
import { useMutation } from '@tanstack/react-query'
import PocketBase from 'pocketbase'
import type { UsersRecord } from 'pocketbase-types'

export async function login(
  email: string,
  password: string,
  pb: PocketBase,
): Promise<UsersRecord | null> {
  try {
    const authData = await pb
      .collection<UsersRecord>('users')
      .authWithPassword(email, password)
    return authData.record
  } catch (error) {
    console.error('Login failed', error)
    return null
  }
}

export function useLoginMutation() {
  const pb = usePocketbase()

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password, pb),
    onSuccess: (data) => {
      if (data) {
        console.log('Login successful', data)
      } else {
        console.error('Login failed')
      }
    },
    onError: (error) => {
      console.error('Login error', error)
    },
  })
}
