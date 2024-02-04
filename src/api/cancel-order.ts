import { api } from '@/lib/axios'

export type CancelOrderBody = {
  orderId: string
}

export const cancelOrder = async ({ orderId }: CancelOrderBody) => {
  await api.patch(`orders/${orderId}/cancel`)
}
