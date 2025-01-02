'use client'

import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getMonthOrdersAmount } from '@/http/get-month-orders-amount'

import { MetricCardSkeleton } from './metric-card-skeleton'

export const MonthOrdersAmountCard = () => {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: ['month-orders-amount'],
    queryFn: getMonthOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersAmount ? (
          <div>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-sm text-muted-foreground">
              {monthOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  {' '}
                  <span className="text-emerald-500 dark:text-emerald-400">
                    + {monthOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês anterior
                </>
              ) : (
                <>
                  {' '}
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthOrdersAmount.diffFromLastMonth}%
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
