import { ArrowLeft, Ban } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: '404 - Página não encontrada',
}

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
      <h1 className="flex flex-col items-center gap-4 text-2xl font-bold">
        <Ban className="size-11" /> 404 - Página não encontrada!
      </h1>
      <Link href="/">
        <Button className="gap-4" variant="outline">
          <ArrowLeft className="size-4" />
          Ir para a página inicial
        </Button>
      </Link>
    </div>
  )
}
