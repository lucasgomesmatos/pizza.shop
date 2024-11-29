import { api } from './api-client'

interface UpdateProfileRequest {
  name: string
  description: string
}

export async function updateProfile({
  name,
  description,
}: UpdateProfileRequest) {
  await api.put('profile', {
    json: { name, description },
  })
}
