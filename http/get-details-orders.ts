import { api } from './api-client'

export interface GetDetailsOrdersRequest {
  orderId: string
}

export interface GetDetailsOrdersResponse {
  id: string
  createdAt: string
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export const getDetailsOrders = async ({
  orderId,
}: GetDetailsOrdersRequest) => {
  const response = await api
    .get(`orders/${orderId}`)
    .json<GetDetailsOrdersResponse>()

  return response
}
