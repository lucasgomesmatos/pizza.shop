'use server'

import { HTTPError } from 'ky'

import { FormSignInValues } from '@/app/(auth)/components/form-sign-in'
import { signInWithEmail } from '@/http/sign-in-with-email'

export async function signInWithEmailAction(values: FormSignInValues) {
  try {
    await signInWithEmail(values)
  } catch (error) {
    console.error(error)
    if (error instanceof HTTPError && error.response.status === 401) {
      return {
        success: false,
        error: 'Usuário não autorizado',
      }
    }
    return {
      success: false,
      error: 'Não foi possível autenticar o usuário',
    }
  }

  return {
    success: true,
    error: null,
  }
}
