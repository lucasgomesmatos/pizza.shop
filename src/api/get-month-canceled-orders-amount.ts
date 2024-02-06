import { api } from '@/lib/axios'

export type GetMountCanceledOrdersAmountResponse = {
  amount: number
  diffFromLastMonth: number
}

export const getMountCanceledOrdersAmount = async () => {
  const response = await api.get<GetMountCanceledOrdersAmountResponse>(
    `metrics/month-canceled-orders-amount`,
  )

  return response.data
}
