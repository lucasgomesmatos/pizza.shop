import { getCookie } from 'cookies-next'
import ky from 'ky'

import { env } from '@/lib/env'

export const api = ky.create({
  prefixUrl: env.API_URL,
  credentials: 'include',
  hooks: {
    beforeRequest: [
      async (request) => {
        let token: string | undefined
        if (typeof window === 'undefined') {
          const { cookies } = await import('next/headers')
          token = (await cookies()).get('auth')?.value
        } else {
          token = getCookie('auth') as string | undefined
        }

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
          request.headers.set('Cookie', `auth=${token}`)
        }
      },
    ],
  },
})
