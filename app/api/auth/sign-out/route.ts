import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { signOut } from '@/http/sign-out'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = 'sign-in'

  await signOut()

  const cookie = await cookies()
  cookie.delete('auth')

  return NextResponse.redirect(redirectUrl)
}
