'use client'

import { BarChart } from 'lucide-react'
import { Cell, Pie, PieChart } from 'recharts'
import colors from 'tailwindcss/colors'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
  { product: 'Pepperoni', amount: 40, fill: 'hsl(var(--chart-1))' },
  { product: 'Mussarela', amount: 30, fill: 'hsl(var(--chart-2))' },
  { product: 'Marguerita', amount: 50, fill: 'hsl(var(--chart-3))' },
  { product: '4 Queijos', amount: 16, fill: 'hsl(var(--chart-4))' },
  { product: 'Frango', amount: 26, fill: 'hsl(var(--chart-5))' },
]

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
]

const chartConfig = {
  product: {
    label: 'Produto',
  },
} satisfies ChartConfig

export function PopularProductsChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle> Produtos populares</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              style={{ fontSize: 10 }}
              data={chartData}
              dataKey="amount"
              nameKey="product"
              outerRadius={86}
              innerRadius={64}
              strokeWidth={4}
              labelLine={false}
              z={1}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180
                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)
                return (
                  <text
                    x={x}
                    y={y}
                    z={index}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {chartData[index].product.length > 12
                      ? chartData[index].product.substring(0, 12).concat('...')
                      : chartData[index].product}{' '}
                    ({value})
                  </text>
                )
              }}
            >
              {chartData.map((_, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-background hover:opacity-80"
                  />
                )
              })}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
