import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getMountOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const MonthOrdersAmountCard = () => {
  const { data: mountOrdersAmount } = useQuery({
    queryKey: ['metrics', 'mount-orders-amount'],
    queryFn: getMountOrdersAmount,
  })

  return (
    <Card>
      <CardHeader
        title="Receitas total (mes)"
        className="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {mountOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {mountOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              {mountOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +
                    {mountOrdersAmount.diffFromLastMonth.toLocaleString(
                      'pt-BR',
                    )}
                    %
                  </span>{' '}
                  em relação ao mês anterior
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {mountOrdersAmount.diffFromLastMonth.toLocaleString(
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
