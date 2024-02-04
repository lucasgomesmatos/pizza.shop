import { api } from '@/lib/axios'

export type DeliverOrderBody = {
  orderId: string
}

export const deliverOrder = async ({ orderId }: DeliverOrderBody) => {
  await api.patch(`orders/${orderId}/deliver`)
}
