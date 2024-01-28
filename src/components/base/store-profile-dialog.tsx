import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'

import { Button } from '../ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
  name: z
    .string({
      required_error: 'O nome é obrigatório',
    })
    .min(3, {
      message: 'O nome deve ter no mínimo 3 caracteres',
    }),
  description: z.string({
    required_error: 'A descrição é obrigatória',
  }),
})

type StoreProfileForm = z.infer<typeof formSchema>

export const StoreProfileDialog = () => {
  const queryClient = useQueryClient()

  const updateManagedRestaurantCache = ({
    name,
    description,
  }: StoreProfileForm) => {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managed-restaurant'],
        {
          ...cached,
          name,
          description,
        },
      )
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate: ({ name, description }) => {
      const { cached } = updateManagedRestaurantCache({
        name,
        description: description || '',
      })

      return {
        previousProfile: cached,
      }
    },
    onError: (_, __, context) => {
      if (context?.previousProfile) {
        updateManagedRestaurantCache({
          name: context.previousProfile.name,
          description: context.previousProfile.description || '',
        })
      }
    },
  })

  const { data: managedRestaurante } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const form = useForm<StoreProfileForm>({
    resolver: zodResolver(formSchema),
    values: {
      name: managedRestaurante?.name || '',
      description: managedRestaurante?.description || '',
    },
  })

  async function onSubmit(data: StoreProfileForm) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Perfil atualizado com sucesso.')
    } catch (error) {
      toast.error('Falha ao atualizar o perfil, tente novamente!')
    }
  }

  const { isSubmitting } = form.formState

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da Loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4  py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Nome</FormLabel>
                  <div className="col-span-3 flex flex-col">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Descrição</FormLabel>
                  <div className="col-span-3 flex flex-col">
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" variant="success" disabled={isSubmitting}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
