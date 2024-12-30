import { api } from './api-client'

export interface GetDailyRevenueInPeriodQuery {
  from?: Date
  to?: Date
}

type GetDailyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) {
  const response = await api
    .get('metrics/daily-receipt-in-period', {
      searchParams: new URLSearchParams({
        from: from!.toString(),
        to: to!.toString(),
      }),
    })
    .json<GetDailyRevenueInPeriodResponse>()

  return response
}
