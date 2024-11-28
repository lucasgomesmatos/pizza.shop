'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from './ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z
    .string({
      message: 'O nome do restaurante é obrigatório',
    })
    .min(3, {
      message: 'O nome do restaurante deve ter no mínimo 3 caracteres',
    }),
  description: z.string({
    message: 'A descrição é obrigatória',
  }),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

interface StoreProfileDialogProps {
  name: string
  description: string | null
}

export const StoreProfileDialog = ({
  name,
  description,
}: StoreProfileDialogProps) => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),

    values: {
      name: name || '',
      description: description || '',
    },
  })

  async function onSubmit(values: StoreProfileSchema) {
    // startTransition(() =>
    //   signUpAction(values).then((data) => {
    //     if (data?.success) {
    //       toast.success('Restaurante cadastrado com sucesso!', {
    //         action: {
    //           label: 'Login',
    //           onClick: () => {},
    //         },
    //       })
    //       form.reset()
    //     }
    //   }),
    // )
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription className="text-[13px]">
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right" htmlFor="name">
                    Nome
                  </FormLabel>
                  <FormControl className="col-span-3">
                    <Input {...field} id="name" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right" htmlFor="description">
                    Descrição
                  </FormLabel>
                  <FormControl className="col-span-3">
                    <Textarea
                      {...field}
                      id="description"
                      className="min-h-24"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
            <Button variant="success" type="submit">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
