'use server'

import { HTTPError } from 'ky'

import { FormSignUpValues } from '@/app/(auth)/components/form-sign-up'
import { SignUp } from '@/http/sign-up'

export async function signUpAction(values: FormSignUpValues) {
  try {
    await SignUp(values)
  } catch (error) {
    console.error(error)
    if (error instanceof HTTPError && error.response.status === 401) {
      return {
        success: false,
        error: 'Erro ao cadastrar o restaurante',
      }
    }
    return {
      success: false,
      error: 'Não foi possível cadastrar o restaurante',
    }
  }

  return {
    success: true,
    error: null,
  }
}
