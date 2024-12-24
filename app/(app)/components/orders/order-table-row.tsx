'use client'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { approveOrderAction } from '@/actions/approve-order.action'
import { cancelOrderAction } from '@/actions/cancel-order.action'
import { deliverOrderAction } from '@/actions/deliver-order.action'
import { dispatchOrderAction } from '@/actions/dispatch-order.action'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'
import { OrderStatus } from './order-status'

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const [isPending, startTransition] = useTransition()

  async function onCancelOrder(orderId: string) {
    startTransition(() =>
      cancelOrderAction({
        orderId,
      }).then((data) => {
        if (data?.success) {
          toast.success('Pedido cancelado com sucesso')
        } else {
          toast.error(data?.error)
        }
      }),
    )
  }

  async function onApproveOrder(orderId: string) {
    startTransition(() =>
      approveOrderAction({
        orderId,
      }).then((data) => {
        if (data?.success) {
          toast.success('Pedido aprovado com sucesso')
        } else {
          toast.error(data?.error)
        }
      }),
    )
  }

  async function onDeliverOrder(orderId: string) {
    startTransition(() =>
      deliverOrderAction({
        orderId,
      }).then((data) => {
        if (data?.success) {
          toast.success('Pedido entregue com sucesso')
        } else {
          toast.error(data?.error)
        }
      }),
    )
  }

  async function onDispatchOrder(orderId: string) {
    startTransition(() =>
      dispatchOrderAction({
        orderId,
      }).then((data) => {
        if (data?.success) {
          toast.success('Pedido despachado com sucesso')
        } else {
          toast.error(data?.error)
        }
      }),
    )
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Search className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-sm font-medium">
        {' '}
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {' '}
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
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApproveOrder(order.orderId)}
            disabled={isPending}
          >
            <ArrowRight className="size-3" />
            Aprovar
          </Button>
        )}
        {order.status === 'processing' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDispatchOrder(order.orderId)}
            disabled={isPending}
          >
            <ArrowRight className="size-3" />
            Em entrega
          </Button>
        )}
        {order.status === 'delivering' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDeliverOrder(order.orderId)}
            disabled={isPending}
          >
            <ArrowRight className="size-3" />
            Entregar
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          disabled={
            !['pending', 'processing'].includes(order.status) || isPending
          }
          variant="ghost"
          size="sm"
          onClick={() => onCancelOrder(order.orderId)}
        >
          <X className="size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
