import { Metadata } from 'next/types'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getOrders } from '@/http/get-orders'

import { OrderPagination } from '../components/orders/order-pagination'
import { OrderTableFilters } from '../components/orders/order-table-filters'
import { OrderTableRow } from '../components/orders/order-table-row'

export const metadata: Metadata = {
  title: 'Pedidos',
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Orders(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const pageIndex = Number(searchParams.page) - 1 || 0

  const { orders, meta } = await getOrders({
    pageIndex,
  })

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

      <div className="space-y-2.5">
        <OrderTableFilters />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64]"></TableHead>
                <TableHead className="w-[140]">Identificador</TableHead>
                <TableHead className="w-[180]">Realizado há</TableHead>
                <TableHead className="w-[140]">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[140]">Total do pedido</TableHead>
                <TableHead className="w-[164]"></TableHead>
                <TableHead className="w-[132]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders &&
                orders.map((order) => (
                  <OrderTableRow key={order.orderId} order={order} />
                ))}
            </TableBody>
          </Table>
        </div>
        {meta && (
          <OrderPagination
            totalCount={meta.totalCount}
            perPage={meta.perPage}
          />
        )}
      </div>
    </div>
  )
}
