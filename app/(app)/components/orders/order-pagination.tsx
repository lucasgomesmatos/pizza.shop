'use client'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import {
  Pagination,
  PaginationContent,
  PaginationLink,
} from '@/components/ui/pagination'

interface OrderPaginationProps {
  totalCount: number
  perPage: number
}

export const OrderPagination = ({
  totalCount,
  perPage,
}: OrderPaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pages = Math.ceil(totalCount / perPage) || 1

  // Converte page da URL (base 1) para pageIndex (base 0)
  const currentPage = Number(searchParams.get('page')) || 1
  const pageIndex = currentPage - 1

  const onPageChange = (newPageIndex: number) => {
    if (newPageIndex < 0 || newPageIndex >= pages) return

    // Atualiza a URL com page em base 1
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', (newPageIndex + 1).toString())
    router.push(`?${params.toString()}`)
  }

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
                disabled={pageIndex === 0}
                onClick={() => onPageChange(pageIndex - 1)}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Página anterior</span>
              </PaginationLink>
              <PaginationLink
                disabled={pageIndex === pages - 1}
                onClick={() => onPageChange(pageIndex + 1)}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Próxima página</span>
              </PaginationLink>
              <PaginationLink
                disabled={pageIndex === pages - 1}
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
