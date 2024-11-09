'use client'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import {
  Pagination,
  PaginationContent,
  PaginationLink,
} from '@/components/ui/pagination'

interface OrderPaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => void
}

export const OrderPagination = ({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: OrderPaginationProps) => {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <Pagination>
        <PaginationContent>
          <div className="flex items-center gap-6 lg:gap-8">
            <div className="text-sm font-medium">
              Página {pageIndex + 1} de {pages}
            </div>
            <div className="flex items-center gap-2">
              <PaginationLink
                onClick={() => onPageChange(0)}
                disabled={pageIndex === 0}
                className="h-8 w-8 p-0"
              >
                <ChevronsLeft className="h-4 w-4" />
                <span className="sr-only">Primeira página</span>
              </PaginationLink>
              <PaginationLink
                onClick={() => onPageChange(pageIndex - 1)}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Página anterior</span>
              </PaginationLink>
              <PaginationLink
                onClick={() => onPageChange(pageIndex + 1)}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Próxima página</span>
              </PaginationLink>
              <PaginationLink
                onClick={() => onPageChange(pages - 1)}
                className="h-8 w-8 p-0"
              >
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">Última página</span>
              </PaginationLink>
            </div>
          </div>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
