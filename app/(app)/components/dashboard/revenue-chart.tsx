'use client'
import { useQuery } from '@tanstack/react-query'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { getDailyRevenueInPeriod } from '@/http/get-daily-revenue-in-period'

const chartConfig = {
  date: {
    label: 'Data',
    color: 'hsl(var(--chart-5))',
  },
  receipt: {
    label: 'Receita',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export const RevenueChart = () => {
  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period'],
    queryFn: getDailyRevenueInPeriod,
  })

  return (
    <Card className="col-span-6">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle>Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {dailyRevenueInPeriod && (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart
              data={dailyRevenueInPeriod}
              margin={{
                top: 20,
                left: 14,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} className="stroke-muted" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
                formatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />
              <YAxis
                stroke={colors.zinc[500]}
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />
              <Line
                dataKey="receipt"
                type="linear"
                stroke={colors.rose[500]}
                strokeWidth={1.5}
                dot={{
                  fill: colors.rose[500],
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
