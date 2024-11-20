import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const publicRoutes = ['/sign-up', '/sign-in']

export function middleware(request: NextRequest) {
  const authenticated = request.cookies.get('auth')

  if (!authenticated && !publicRoutes.includes(request.nextUrl.pathname)) {
    const url = new URL('/sign-in', request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)'],
}
