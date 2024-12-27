import { api } from './api-client'

interface GetMonthRevenueResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthRevenue() {
  const response = await api
    .get('metrics/month-receipt')
    .json<GetMonthRevenueResponse>()

  return response
}