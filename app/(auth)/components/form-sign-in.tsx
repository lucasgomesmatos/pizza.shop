'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { signInWithEmailAction } from '@/actions/sign-in-with-email.action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  email: z
    .string({
      message: 'O e-mail é obrigatório',
    })
    .email({
      message: 'Insira um email válido',
    }),
})

export type FormSignInValues = z.infer<typeof formSchema>

export const FormSignIn = () => {
  const searchParams = useSearchParams()

  const paramEmail = searchParams.get('email')

  const [isPending, startTransition] = useTransition()
  const form = useForm<FormSignInValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: paramEmail || '',
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: FormSignInValues) {
    startTransition(() =>
      signInWithEmailAction(values).then((data) => {
        if (data?.success) {
          toast.success('Enviamos um link de autenticação para seu e-mail', {
            action: {
              label: 'Reenviar',
              onClick: () => onSubmit(values),
            },
          })
        } else if (data?.error) {
          toast.error(data.error)
        } else {
          toast.error('Não foi possível autenticar o usuário')
        }
      }),
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu e-mail</FormLabel>
              <FormControl>
                <Input placeholder="pizzashop@example.com" {...field} />
              </FormControl>
              <FormDescription>Insira seu email cadastrado</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending || isSubmitting}
          className="w-full"
          type="submit"
        >
          Acessar painel
        </Button>
      </form>
    </Form>
  )
}
