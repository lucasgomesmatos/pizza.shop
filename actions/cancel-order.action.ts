'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { cancelOrder } from '@/http/cancel-order'

interface CancelOrderParams {
  orderId: string
}

export async function cancelOrderAction({ orderId }: CancelOrderParams) {
  try {
    await cancelOrder({
      orderId,
    })

    revalidateTag('orders')
  } catch (error) {
    if (error instanceof HTTPError) {
      return {
        success: false,
        error: 'Erro ao cancelar o pedido',
      }
    }
    return {
      success: false,
      error: 'Não foi possível cancelar o pedido',
    }
  }

  return {
    success: true,
    error: null,
  }
}
