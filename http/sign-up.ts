import { api } from './api-client'

interface SignUpRequest {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function signUp({
  email,
  managerName,
  phone,
  restaurantName,
}: SignUpRequest) {
  await api
    .post('restaurants', {
      json: { email, managerName, phone, restaurantName },
    })
    .json()
}
