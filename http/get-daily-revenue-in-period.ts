import { api } from './api-client'

type GetDailyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

export async function getDailyRevenueInPeriod() {
  const response = await api
    .get('metrics/daily-receipt-in-period')
    .json<GetDailyRevenueInPeriodResponse>()

  return response
}
