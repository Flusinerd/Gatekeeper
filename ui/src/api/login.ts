import { usePocketbase } from '@/hooks/usePocketbase'
import { useMutation } from '@tanstack/react-query'
import PocketBase from 'pocketbase'

type PocketBaseUser = {
  id: string
  email: string
  emailVisibility: boolean
  verified: boolean
  created: string
  updated: string
}

export async function login(
  email: string,
  password: string,
  pb: PocketBase,
): Promise<PocketBaseUser | null> {
  console.log(email, password)
  try {
    const authData = await pb
      .collection<PocketBaseUser>('users')
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
