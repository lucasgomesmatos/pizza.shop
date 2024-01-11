import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

// export type OrderTableRowProps = {}
export const OrderTableRow = () => {
  return (
    <>
      <TableRow>
        <TableCell>
          <Button variant="outline" size="xs">
            <Search className="h-3 w-3" />
            <span className="sr-only">Detalhes do pedido</span>
          </Button>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          821dasdsa5454dsad45
        </TableCell>
        <TableCell className="text-muted-foreground">1 hora atrás</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            <span className="font-medium text-muted-foreground">Pendente</span>
          </div>
        </TableCell>
        <TableCell className="font-medium">João da Silva</TableCell>
        <TableCell className="font-medium">R$ 132,00</TableCell>
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
