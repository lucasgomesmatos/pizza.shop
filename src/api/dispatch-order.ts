import { api } from '@/lib/axios'

export type DispatchOrderBody = {
  orderId: string
}

export const dispatchOrder = async ({ orderId }: DispatchOrderBody) => {
  await api.patch(`orders/${orderId}/dispatch`)
}
