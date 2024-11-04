'use client'

import { RotateCcw, ShieldX } from 'lucide-react'
import { Metadata } from 'next'
import { Space_Grotesk as FontSans } from 'next/font/google'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { cn } from '../lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Hackathon Brasil',
    default: 'Hackathon Brasil',
  },
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="flex flex-col items-center gap-4 text-2xl font-bold">
              <ShieldX className="size-11" /> 500 - Ocorreu um erro !
            </h1>
            <p className="text-center">
              Se o erro persistir, entre em contato com o suporte.
            </p>
          </div>
          <p className="max-w-96 text-center">
            <code>{error?.message}</code>
          </p>

          <Link href="/">
            <Button className="gap-4" variant="outline" onClick={() => reset()}>
              Tente novamente
              <RotateCcw className="size-4" />
            </Button>
          </Link>
        </div>
      </body>
    </html>
  )
}
