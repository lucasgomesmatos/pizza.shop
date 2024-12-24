'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { approveOrder } from '@/http/approve-order'

interface ApproveOrderParams {
  orderId: string
}

export async function approveOrderAction({ orderId }: ApproveOrderParams) {
  try {
    await approveOrder({
      orderId,
    })

    revalidateTag('orders')
  } catch (error) {
    if (error instanceof HTTPError) {
      return {
        success: false,
        error: 'Erro ao aprovar o pedido',
      }
    }
    return {
      success: false,
      error: 'Não foi possível aprovar o pedido',
    }
  }

  return {
    success: true,
    error: null,
  }
}
