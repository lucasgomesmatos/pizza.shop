import { CookiesFn, getCookie } from 'cookies-next'
import ky from 'ky'

import { env } from '@/lib/env'

export const api = ky.create({
  prefixUrl: env.API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined

        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')

          cookieStore = serverCookies
        }
        const token = getCookie('token', { cookies: cookieStore })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
