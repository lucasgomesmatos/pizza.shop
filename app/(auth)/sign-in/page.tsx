import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { FormSignIn } from '../components/form-sign-in'

export const metadata: Metadata = {
  title: 'Fazer login',
}

export default function SignIn() {
  return (
    <div className="p-8">
      <Button variant="outline" asChild className="absolute right-8 top-8">
        <Link href="/sign-up">
          {' '}
          Novo estabelecimento
          <ArrowRight className="ml-1 size-4" />
        </Link>
      </Button>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tighter">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro
          </p>
        </div>

        <FormSignIn />
      </div>
    </div>
  )
}
