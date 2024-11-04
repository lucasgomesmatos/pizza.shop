'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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

type FormSignInValues = z.infer<typeof formSchema>

export const FormSignIn = () => {
  const form = useForm<FormSignInValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: FormSignInValues) {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(values)

    toast.success('Enviamos um link de autenticação para seu e-mail', {
      action: {
        label: 'Reenviar',
        onClick: () => onSubmit(values),
      },
    })
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
        <Button disabled={isSubmitting} className="w-full" type="submit">
          Acessar painel
        </Button>
      </form>
    </Form>
  )
}
