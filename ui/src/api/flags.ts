import { pb } from '@/pocketbase-client'
import { queryOptions } from '@tanstack/react-query'

export async function getFlags(page: number, pageSize: number) {
  try {
    return await pb.collection('feature_flags').getList(page, pageSize)
  } catch (error) {
    console.error('Login failed', error)
    return null
  }
}

export const getFlagsOptions = (page: number, pageSize: number) => {
  return queryOptions({
    queryKey: ['flags', page, pageSize],
    queryFn: () => getFlags(page, pageSize),
  })
}
