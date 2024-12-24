import { api } from './api-client'

interface DeliverOrderRequest {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliverOrderRequest) {
  await api
    .patch(`orders/${orderId}/deliver`, {
      next: {
        tags: ['orders'],
      },
    })
    .json()
}
