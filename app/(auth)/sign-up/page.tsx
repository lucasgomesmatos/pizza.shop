import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { FormSignUp } from '../components/form-sign-up'

export const metadata: Metadata = {
  title: 'Cadastro',
}

export default function SignUp() {
  return (
    <div className="p-8">
      <Button variant="outline" asChild className="absolute right-8 top-8">
        <Link href="/sign-in">
          {' '}
          Fazer login
          <ArrowRight className="ml-1 size-4" />
        </Link>
      </Button>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tighter">
            Criar conta Grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um parceiro e comece suas vendas
          </p>
        </div>

        <FormSignUp />
      </div>
    </div>
  )
}
