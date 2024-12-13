import { api } from './api-client'

interface GetOrdersResponse {
  orders: {
    orderId: string
    createdAt: string
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
      next: {
        tags: ['orders'],
      },
      searchParams: {
        pageIndex: 0,
      },
    })
    .json<GetOrdersResponse>()

  return response
}
