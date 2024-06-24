import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type'
import { localStorage } from '@/utils/local-storage'

export function getToken() {
  return localStorage.get(STORAGE_TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.set(STORAGE_TOKEN_KEY, token)
}
