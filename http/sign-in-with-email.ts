import { api } from './api-client'

interface SignInWithEmailRequest {
  email: string
}
interface SignInWithEmailResponse {
  token: string
}

export async function signInWithEmail({ email }: SignInWithEmailRequest) {
  const response = await api
    .post<SignInWithEmailResponse>('authenticate', {
      json: { email },
    })
    .json<SignInWithEmailResponse>()

  return response
}
