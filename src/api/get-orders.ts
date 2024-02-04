import { api } from '@/lib/axios'

export type GetOrdersResponse = {
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

export type GetOrdersParams = {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export const getOrders = async ({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetOrdersParams) => {
  const response = await api.get<GetOrdersResponse>('orders', {
    params: {
      pageIndex,
      orderId,
      customerName,
      status,
    },
  })

  return response.data
}
