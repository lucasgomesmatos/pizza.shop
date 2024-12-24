'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { deliverOrder } from '@/http/deliver-order'

interface DeliverOrderParams {
  orderId: string
}

export async function deliverOrderAction({ orderId }: DeliverOrderParams) {
  try {
    await deliverOrder({
      orderId,
    })

    revalidateTag('orders')
  } catch (error) {
    if (error instanceof HTTPError) {
      return {
        success: false,
        error: 'Erro ao entregar o pedido',
      }
    }
    return {
      success: false,
      error: 'Não foi possível entregar o pedido',
    }
  }

  return {
    success: true,
    error: null,
  }
}
