import { api } from './api-client'

interface GetOrdersQuery {
  pageIndex?: number
}

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

export async function getOrders({ pageIndex }: GetOrdersQuery) {
  const response = await api
    .get('orders', {
      next: {
        tags: ['orders'],
      },
      searchParams: {
        pageIndex: pageIndex ?? 0,
      },
    })
    .json<GetOrdersResponse>()

  return response
}
