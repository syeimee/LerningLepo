import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnSignIn = req.nextUrl.pathname.startsWith('/signin')
  const isOnAuthCallback = req.nextUrl.pathname.startsWith('/api/auth')
  const isOnRoot = req.nextUrl.pathname === '/'

  // サインインページ、認証コールバック、ルートパスは常にアクセス可能
  if (isOnSignIn || isOnAuthCallback || isOnRoot) {
    return NextResponse.next()
  }

  // ログインしていない場合はサインインページにリダイレクト
  if (!isLoggedIn) {
    const signInUrl = new URL('/signin', req.url)
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|.*\\..*|api/google-sheets).*)',
  ],
}
