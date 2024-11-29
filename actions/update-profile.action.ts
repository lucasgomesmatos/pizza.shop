'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { StoreProfileSchema } from '@/components/store-profile-dialog'
import { updateProfile } from '@/http/update-profile'

export async function updateProfileAction(values: StoreProfileSchema) {
  try {
    await updateProfile(values)

    revalidateTag('profile')
  } catch (error) {
    if (error instanceof HTTPError) {
      return {
        success: false,
        error: 'Erro ao atualizar o perfil do restaurante',
      }
    }
    return {
      success: false,
      error: 'Não foi possível atualizar o perfil do restaurante',
    }
  }

  return {
    success: true,
    error: null,
  }
}
