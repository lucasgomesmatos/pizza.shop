'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'

import { FormSignInValues } from '@/app/(auth)/components/form-sign-in'
import { signInWithEmail } from '@/http/sign-in-with-email'

export async function signInWithEmailAction(values: FormSignInValues) {
  try {
    const { token } = await signInWithEmail(values)

    const cookieAuth = await cookies()

    cookieAuth.set('token', token, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    })
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
