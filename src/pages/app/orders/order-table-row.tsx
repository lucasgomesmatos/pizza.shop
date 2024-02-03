import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'
import { OrderStatus } from './order-status'

export type OrderTableRowProps = {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}
export const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <TableRow>
        <TableCell>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="xs">
                <Search className="h-3 w-3" />
                <span className="sr-only">Detalhes do pedido</span>
              </Button>
            </DialogTrigger>
            <OrderDetails open={isDialogOpen} orderId={order.orderId} />
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {order.orderId}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {formatDistanceToNow(order.createdAt, {
            locale: ptBR,
            addSuffix: true,
          })}
        </TableCell>
        <TableCell>
          <OrderStatus status={order.status} />
        </TableCell>
        <TableCell className="font-medium">{order.customerName}</TableCell>
        <TableCell className="font-medium">
          {order.total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </TableCell>
        <TableCell>
          <Button variant="outline" size="sm">
            <ArrowRight className="mr-2 h-4 w-4" />
            Aprovar
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="ghost" size="sm">
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}
