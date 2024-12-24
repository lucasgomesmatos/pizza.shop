import { api } from './api-client'

interface DispatchOrderRequest {
  orderId: string
}

export async function dispatchOrder({ orderId }: DispatchOrderRequest) {
  await api
    .patch(`orders/${orderId}/dispatch`, {
      next: {
        tags: ['orders'],
      },
    })
    .json()
}
