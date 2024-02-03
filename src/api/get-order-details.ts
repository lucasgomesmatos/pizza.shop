import { api } from '@/lib/axios'

export type GetOrderDetailsResponse = {
  id: string
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  createdAt: string
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

export type GetOrderDetailsParams = {
  orderId: string
}

export const getOrderDetails = async ({ orderId }: GetOrderDetailsParams) => {
  const response = await api.get<GetOrderDetailsResponse>(`orders/${orderId}`)

  return response.data
}
