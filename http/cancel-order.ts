import { api } from './api-client'

interface CancelOrderRequest {
  orderId: string
}

export async function cancelOrder({ orderId }: CancelOrderRequest) {
  await api
    .patch(`orders/${orderId}/cancel`, {
      next: {
        tags: ['orders'],
      },
    })
    .json()
}
