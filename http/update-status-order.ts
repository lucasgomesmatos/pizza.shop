import { api } from './api-client'

interface ApproveOrderRequest {
  orderId: string
}

export async function approveOrder({ orderId }: ApproveOrderRequest) {
  await api
    .patch(`orders/${orderId}/approve`, {
      next: {
        tags: ['orders'],
      },
    })
    .json()
}
