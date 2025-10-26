import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import DashboardContent from './DashboardContent'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/signin')
  }

  // 生徒数と講師数を取得
  const [studentsCount, teachersCount] = await Promise.all([
    prisma.student.count({ where: { status: 'ACTIVE' } }),
    prisma.teacher.count({ where: { status: 'ACTIVE' } }),
  ])

  // 授業データを取得（生徒と講師の情報を含む）
  const lessons = await prisma.lesson.findMany({
    include: {
      student: {
        select: {
          id: true,
          lastName: true,
          firstName: true,
          email: true,
        },
      },
      teacher: {
        select: {
          id: true,
          lastName: true,
          firstName: true,
          email: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  })

  // 日報データを取得
  const dailyReports = await prisma.dailyReport.findMany({
    select: {
      id: true,
      lessonId: true,
    },
  })

  return (
    <DashboardContent
      session={session}
      lessons={lessons}
      dailyReports={dailyReports}
      studentsCount={studentsCount}
      teachersCount={teachersCount}
    />
  )
}
