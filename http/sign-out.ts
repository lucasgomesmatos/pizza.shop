import { api } from './api-client'

export async function signOut() {
  await api.post('sign-out')
}
