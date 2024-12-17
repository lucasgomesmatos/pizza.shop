import { api } from './api-client'

interface GetOrdersQuery {
  pageIndex?: number
  orderId?: string
  status?: string | null
  customerName?: string
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

export async function getOrders({
  pageIndex,
  customerName,
  orderId,
  status,
}: GetOrdersQuery) {
  const response = await api
    .get('orders', {
      next: {
        tags: ['orders'],
      },
      searchParams: new URLSearchParams(
        Object.entries({
          pageIndex: (pageIndex ?? 0).toString(),
          customerName: customerName ?? '',
          orderId: orderId ?? '',
          status: status === 'all' ? null : status,
        }).filter(([, v]) => v != null) as [string, string][],
      ),
    })
    .json<GetOrdersResponse>()

  return response
}
