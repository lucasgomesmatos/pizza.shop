import { api } from '@/lib/axios'

export type GetMonthRevenueOrdersAmountResponse = {
  receipt: number
  diffFromLastMonth: number
}

export const getMonthRevenueOrdersAmount = async () => {
  const response = await api.get<GetMonthRevenueOrdersAmountResponse>(
    `metrics/month-receipt`,
  )

  return response.data
}
