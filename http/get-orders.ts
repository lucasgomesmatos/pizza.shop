import { api } from './api-client'

interface GetOrdersResponse {
  orders: {
    orderId: string
    createdAt: Date | null
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders() {
  const response = await api
    .get('orders', {
      json: {
        pageIndex: 0,
      },
      next: {
        tags: ['orders'],
      },
    })
    .json<GetOrdersResponse>()

  return response
}
