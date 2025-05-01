import PocketBase from 'pocketbase'
import type { TypedPocketBase } from 'pocketbase-types'

// Pocketbase is proxied under /api
const pocketbaseHost = window.location.origin
export const pb = new PocketBase(pocketbaseHost) as TypedPocketBase
