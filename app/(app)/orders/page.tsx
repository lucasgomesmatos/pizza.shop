import { Search } from 'lucide-react'
import { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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
        <form action="" className="flex items-center gap-2">
          <span className="text-sm font-semibold">Filtros</span>
          <Input placeholder="Nome do Cliente" className="h-8 w-[320px]" />
        </form>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Identificador</TableHead>
                <TableHead>Realizado há</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Total do pedido</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Search className="size-3" />
                    <span className="sr-only">Detalhes do pedido</span>
                  </Button>
                </TableCell>
                <TableCell className="font-mono text-sm font-medium">
                  asdasdasdas48d7as8das
                </TableCell>
                <TableCell className="text-muted-foreground">
                  há 15 minutos
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    <span className="font-medium text-muted-foreground">
                      Pendente
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">Lucas Gomes</TableCell>
                <TableCell>123456</TableCell>
                <TableCell>123456</TableCell>
                <TableCell>123456</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
