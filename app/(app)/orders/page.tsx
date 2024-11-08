import { Metadata } from 'next'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableFilters } from '../components/order-table-filters'
import { OrderTableRow } from '../components/order-table-row'

export const metadata: Metadata = {
  title: 'Pedidos',
}

export default function Orders() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
      </div>
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
              {Array.from({ length: 10 }).map((_, index) => (
                <OrderTableRow key={index} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
