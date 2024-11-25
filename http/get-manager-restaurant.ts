import { api } from './api-client'

interface GetManagedRestaurantResponse {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant() {
  const response = await api
    .get('managed-restaurant')
    .json<GetManagedRestaurantResponse>()

  return response
}
