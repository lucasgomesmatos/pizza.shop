import { api } from '@/lib/axios'

export type GetMountOrdersAmountResponse = {
  amount: number
  diffFromLastMonth: number
}

export const getMountOrdersAmount = async () => {
  const response = await api.get<GetMountOrdersAmountResponse>(
    `metrics/month-orders-amount`,
  )

  return response.data
}
