'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { dispatchOrder } from '@/http/dispatch-order'

interface DispatchOrderParams {
  orderId: string
}

export async function dispatchOrderAction({ orderId }: DispatchOrderParams) {
  try {
    await dispatchOrder({
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
