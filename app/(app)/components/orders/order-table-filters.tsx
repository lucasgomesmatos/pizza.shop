'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const ordersFiltersSchema = z.object({
  orderId: z.string().optional(),
  status: z.string().optional(),
  customerName: z.string().optional(),
})

export type OrdersFiltersSchema = z.infer<typeof ordersFiltersSchema>

export const OrderTableFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const orderId = searchParams.get('orderId')
  const status = searchParams.get('status')
  const customerName = searchParams.get('customerName')

  const { register, handleSubmit, control, reset } = useForm({
    resolver: zodResolver(ordersFiltersSchema),
    defaultValues: {
      orderId: orderId ?? '',
      status: status ?? 'all',
      customerName: customerName ?? '',
    },
  })

  const handleFilter = ({
    orderId,
    customerName,
    status,
  }: OrdersFiltersSchema) => {
    const params = new URLSearchParams()

    if (orderId) {
      params.set('orderId', orderId)
    } else {
      params.delete('orderId')
    }
    if (customerName) {
      params.set('customerName', customerName)
    } else {
      params.delete('customerName')
    }
    if (status && status !== 'all') {
      params.set('status', status)
    } else {
      params.delete('status')
    }

    params.set('page', '1')

    router.push(`?${params.toString()}`)
  }

  const handleClearFilters = () => {
    const formReset = {
      orderId: '',
      status: 'all',
      customerName: '',
    }

    reset(formReset)
    handleFilter(formReset)
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        {...register('orderId')}
        placeholder="ID do pedido"
        className="h-8 w-auto"
      />
      <Input
        {...register('customerName')}
        placeholder="Nome do Cliente"
        className="h-8 w-[320px]"
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { onChange, value, ...props } }) => (
          <Select
            defaultValue="all"
            value={value}
            onValueChange={onChange}
            {...props}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em Preparo</SelectItem>
              <SelectItem value="delivering">Em Entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <Button type="submit" variant="secondary" size="sm">
        <Search className="size-4" />
        Filtrar Resultados
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleClearFilters}
      >
        <X className="size-4" />
        Remover Filtros
      </Button>
    </form>
  )
}
