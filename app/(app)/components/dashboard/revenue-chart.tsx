'use client'
import { TrendingUp } from 'lucide-react'
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
  { date: '10/12', revenue: 3500 },
  { date: '11/12', revenue: 3000 },
  { date: '12/12', revenue: 2000 },
  { date: '13/12', revenue: 2780 },
  { date: '14/12', revenue: 1890 },
  { date: '15/12', revenue: 2390 },
  { date: '16/12', revenue: 3490 },
  { date: '17/12', revenue: 2000 },
  { date: '18/12', revenue: 2780 },
  { date: '19/12', revenue: 1890 },
]
const chartConfig = {
  date: {
    label: 'Data',
    color: 'hsl(var(--chart-5))',
  },
  revenue: {
    label: 'Receita',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export const RevenueChart = () => {
  return (
    <Card className="col-span-6">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle>Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 14,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="revenue"
              type="linear"
              stroke={colors.rose[500]}
              strokeWidth={1.5}
              dot={{
                fill: colors.rose[500],
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                dataKey="revenue"
                formatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
