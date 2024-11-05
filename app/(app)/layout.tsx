import { Header } from '@/components/header'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col p-8 pt-6">{children}</div>
    </section>
  )
}
