'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { signUpAction } from '@/actions/sign-up.action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { normalizePhoneNumber } from '@/utils/string-utils'

const formSchema = z.object({
  restaurantName: z
    .string({
      message: 'O nome do restaurante é obrigatório',
    })
    .min(3, {
      message: 'O nome do restaurante deve ter no mínimo 3 caracteres',
    }),
  managerName: z
    .string({
      message: 'O nome do responsável é obrigatório',
    })
    .min(3, {
      message: 'O nome do responsável deve ter no mínimo 3 caracteres',
    }),
  phone: z
    .string({
      message: 'O telefone é obrigatório',
    })
    .min(10, {
      message: 'O telefone deve ter no mínimo 10 caracteres',
    }),
  email: z
    .string({
      message: 'O e-mail é obrigatório',
    })
    .email({
      message: 'Insira um email válido',
    }),
})

export type FormSignUpValues = z.infer<typeof formSchema>

export const FormSignUp = () => {
  const [isPending, startTransition] = useTransition()
  const { push } = useRouter()

  const form = useForm<FormSignUpValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      phone: '',
      managerName: '',
      restaurantName: '',
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: FormSignUpValues) {
    startTransition(() =>
      signUpAction(values).then((data) => {
        if (data?.success) {
          toast.success('Restaurante cadastrado com sucesso!', {
            action: {
              label: 'Login',
              onClick: () => push(`/sign-in?email=${values.email}`),
            },
          })
          form.reset()
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="restaurantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do estabelecimento</FormLabel>
              <FormControl>
                <Input placeholder="Pizzaria" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="managerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>O seu nome</FormLabel>
              <FormControl>
                <Input placeholder="João da Silva" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu e-mail</FormLabel>
              <FormControl>
                <Input placeholder="pizzashop@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field: { onChange, ...props } }) => (
            <FormItem>
              <FormLabel>O seu Telefone</FormLabel>
              <FormControl>
                <Input
                  onChange={(event) => {
                    const { value } = event.target
                    event.target.value = normalizePhoneNumber(value)
                    onChange(event)
                  }}
                  placeholder="(11) 99999-9999"
                  {...props}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitting || isPending}
          className="w-full"
          type="submit"
        >
          Finalizar cadastro
        </Button>

        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
          Ao continuar, você concorda com nossos
          <Link className="underline underline-offset-4" href="/terms">
            {' '}
            Termos de serviços{' '}
          </Link>
          e{' '}
          <Link className="underline underline-offset-4" href="/privacy">
            Política de privacidade
          </Link>
        </p>
      </form>
    </Form>
  )
}
