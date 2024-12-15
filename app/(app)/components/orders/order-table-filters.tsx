'use client'
import { Search, X } from 'lucide-react'
import { parseAsString, useQueryStates } from 'nuqs'
import { createSearchParamsCache } from 'nuqs/server'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const searchParamsCache = createSearchParamsCache({
  pageIndex: parseAsString.withDefault('0'),
})

export const OrderTableFilters = () => {
  const [{ id }, setSearch] = useQueryStates({
    pageIndex: parseAsString.withDefault('0'),
    id: parseAsString.withDefault(''),
    status: parseAsString.withDefault('all'),
    customerName: parseAsString.withDefault(''),
  })

  return (
    <form action="" className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        value={id}
        onChange={(event) =>
          setSearch({
            id: event.target.value,
          })
        }
        placeholder="ID do pedido"
        className="h-8 w-auto"
      />
      <Input placeholder="Nome do Cliente" className="h-8 w-[320px]" />
      <Select defaultValue="all">
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
      <Button type="submit" variant="secondary" size="sm">
        <Search className="size-4" />
        Filtrar Resultados
      </Button>

      <Button type="button" variant="outline" size="sm">
        <X className="size-4" />
        Remover Filtros
      </Button>
    </form>
  )
}
