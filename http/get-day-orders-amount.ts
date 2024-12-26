import { api } from './api-client'

interface GetDayOrdersAmountResponse {
  amount: number
  diffFromYesterday: number
}

export async function getDayOrdersAmount() {
  const response = await api
    .get('metrics/day-orders-amount')
    .json<GetDayOrdersAmountResponse>()

  return response
}
