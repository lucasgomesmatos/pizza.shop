'use client'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getMonthCanceledOrdersAmount } from '@/http/get-month-canceled-orders-amount'

import { MetricCardSkeleton } from './metric-card-skeleton'

export const MonthCanceledOrdersAmountCard = () => {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ['month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount ? (
          <div>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-sm text-muted-foreground">
              {monthCanceledOrdersAmount.diffFromLastMonth < 0 ? (
                <>
                  {' '}
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {monthCanceledOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês anterior
                </>
              ) : (
                <>
                  {' '}
                  <span className="text-rose-500 dark:text-rose-400">
                    + {monthCanceledOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês anterior
                </>
              )}
            </p>
          </div>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
