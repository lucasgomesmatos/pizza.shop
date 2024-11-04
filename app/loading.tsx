import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="fixed left-0 top-0 z-50 flex min-h-screen w-full flex-col items-center justify-center gap-2">
      <span>
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </span>
      <div className="text-sm text-muted-foreground">Carregando...</div>
    </div>
  )
}
