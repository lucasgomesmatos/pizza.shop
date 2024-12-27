'use client'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getMonthRevenue } from '@/http/get-month-revenue'

export const MonthRevenueCard = () => {
  const { data: monthRevenue } = useQuery({
    queryKey: ['month-revenue'],
    queryFn: getMonthRevenue,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receitas total (mês)
        </CardTitle>
        <DollarSign className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue && (
          <div>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <p className="text-sm text-muted-foreground">
              {monthRevenue.diffFromLastMonth >= 0 ? (
                <>
                  {' '}
                  <span className="text-emerald-500 dark:text-emerald-400">
                    + {monthRevenue.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês anterior
                </>
              ) : (
                <>
                  {' '}
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthRevenue.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês anterior
                </>
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
