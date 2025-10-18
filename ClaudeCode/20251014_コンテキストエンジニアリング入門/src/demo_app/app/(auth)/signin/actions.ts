'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { dummyUsers } from '@/lib/dummyUsers'

export async function dummySignIn(userId: string) {
  const user = dummyUsers.find((u) => u.id === userId)

  if (!user) {
    return { error: 'ユーザーが見つかりません' }
  }

  // セッション情報をクッキーに保存
  const cookieStore = await cookies()
  cookieStore.set('dummy-session', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7日間
  })

  redirect('/dashboard')
}

export async function dummySignOut() {
  const cookieStore = await cookies()
  cookieStore.delete('dummy-session')
  redirect('/signin')
}

export async function getDummySession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('dummy-session')

  if (!session) {
    return null
  }

  try {
    return JSON.parse(session.value)
  } catch {
    return null
  }
}
