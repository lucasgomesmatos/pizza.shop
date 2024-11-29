import { api } from './api-client'

interface GetProfileResponse {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const response = await api
    .get('me', {
      next: {
        tags: ['profile'],
      },
    })
    .json<GetProfileResponse>()

  return response
}
