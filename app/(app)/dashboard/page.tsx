import { Metadata } from 'next'

import { DayOrdersAmountCard } from '../components/dashboard/day-orders-amount-card'
import { MonthCanceledOrdersAmountCard } from '../components/dashboard/month-canceled-orders-amount-card'
import { MonthOrdersAmountCard } from '../components/dashboard/month-orders-amount-card'
import { MonthRevenueCard } from '../components/dashboard/month-revenue-card'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <MonthRevenueCard />
        <MonthOrdersAmountCard />
        <DayOrdersAmountCard />
        <MonthCanceledOrdersAmountCard />
      </div>
    </div>
  )
}
