import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = ['/sign-up', '/sign-in']

export async function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)'],
}
