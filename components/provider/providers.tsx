'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from '../theme-provider'
import { Toaster } from '../ui/sonner'

const queryClient = new QueryClient()

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster richColors />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
