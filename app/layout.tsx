import './globals.css'

import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { Toaster } from 'sonner'

import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Pizza Shop',
    default: 'Pizza Shop',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
