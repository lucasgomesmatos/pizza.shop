import { api } from './api-client'

interface GetMonthCanceledOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthCanceledOrdersAmount() {
  const response = await api
    .get('metrics/month-canceled-orders-amount')
    .json<GetMonthCanceledOrdersAmountResponse>()

  return response
}
