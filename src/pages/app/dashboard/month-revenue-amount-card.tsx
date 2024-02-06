import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenueOrdersAmount } from '@/api/get-mount-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const MonthRevenueCard = () => {
  const { data: monthRevenueOrdersAmount } = useQuery({
    queryKey: ['metrics', 'mount-revenue-orders-amount'],
    queryFn: getMonthRevenueOrdersAmount,
  })

  return (
    <Card>
      <CardHeader
        title="Receitas total (mes)"
        className="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle className="text-base font-semibold">
          Receitas total (mes)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenueOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenueOrdersAmount.receipt / 100).toLocaleString(
                'pt-BR',
                {
                  style: 'currency',
                  currency: 'BRL',
                },
              )}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthRevenueOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +
                    {monthRevenueOrdersAmount.diffFromLastMonth.toLocaleString(
                      'pt-BR',
                    )}
                    %
                  </span>{' '}
                  em relação ao mês anterior
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthRevenueOrdersAmount.diffFromLastMonth.toLocaleString(
                      'pt-BR',
                    )}
                    %
                  </span>{' '}
                  em relação ao mês anterior
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
