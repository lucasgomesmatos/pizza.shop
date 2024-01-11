import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

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

const formSchema = z.object({
  restauranteName: z
    .string({
      required_error: 'Digite um nome para o estabelecimento válido',
    })
    .min(3, {
      message: 'O nome para o estabelecimento ter no mínimo 3 letras',
    }),
  managerName: z
    .string({
      required_error: 'Digite um nome para o gerente válido',
    })
    .min(3, { message: ' O nome do gerente precisa ter no mínimo 3 letras' }),
  phone: z
    .string({
      required_error: 'Digite um telefone válido',
    })
    .min(11, {
      message: 'O número de telefone precisa ter no mínimo 3 números',
    }),
  email: z
    .string({
      required_error: 'Digite um e-mail válido',
    })
    .email({ message: 'Digite um e-mail válido' }),
})

type SignUpForm = z.infer<typeof formSchema>

export const SignUp = () => {
  const form = useForm<SignUpForm>({
    resolver: zodResolver(formSchema),
  })

  const naginate = useNavigate()

  async function onSubmit(data: SignUpForm) {
    console.log(data)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success('Restaurante cadastrado com sucesso', {
        action: {
          label: 'Login',
          onClick: () => naginate('/sign-in'),
        },
      })
    } catch (error) {
      toast.success('Error ao cadastrar restaurante.')
    }
  }

  const { isSubmitting } = form.formState

  return (
    <div>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer Login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="restauranteName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do estabelecimento</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Seu nome</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input type="email" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu telefone</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={isSubmitting} className="w-full" type="submit">
                Finalizar cadastro
              </Button>

              <p className="pex-6 text-center text-sm leading-relaxed text-muted-foreground">
                Ao continuar, você concorda com os nossos <br />
                <a className="underline underline-offset-4" href="">
                  termos de serviço
                </a>{' '}
                e{' '}
                <a className="underline underline-offset-4" href="">
                  política de privacidade
                </a>
                .
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
