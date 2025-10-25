import DashboardClient from './DashboardClient'
import { getDummySession } from '@/app/(auth)/signin/actions'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // クッキーからセッション情報を取得
  const user = await getDummySession()

  // ログインしていない場合はログイン画面にリダイレクト
  if (!user) {
    redirect('/signin')
  }

  // セッション情報を構築
  const session = {
    user: {
      id: user.id,
      name: user.name || undefined,
      email: user.email || undefined,
      image: user.image || undefined,
      role: user.role,
      ...(user.teacherId && { teacherId: user.teacherId }),
      ...(user.studentId && { studentId: user.studentId }),
    },
    expires: '2099-12-31',
  }

  return <DashboardClient session={session}>{children}</DashboardClient>
}
