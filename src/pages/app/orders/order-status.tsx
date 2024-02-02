import { cn } from '@/lib/utils'

type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

type OrderStatusProps = {
  status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  processing: 'Processando',
  delivering: 'Em entrega',
  delivered: 'Entregue',
}

const orderStatusColorMap: Record<OrderStatus, string> = {
  pending: 'bg-slate-400',
  canceled: 'bg-rose-500',
  processing: 'bg-yellow-400',
  delivering: 'bg-amber-500',
  delivered: 'bg-emerald-500',
}

export const OrderStatus = ({ status }: OrderStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(`h-2 w-2 rounded-full`, orderStatusColorMap[status])}
      />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}
