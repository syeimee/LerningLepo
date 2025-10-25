import { prisma } from '@/lib/prisma'
import TeachersList from '@/components/teachers/TeachersList'

export default async function TeachersPage() {
  // データベースから講師一覧を取得
  const teachers = await prisma.teacher.findMany({
    where: {
      status: 'ACTIVE',
    },
    include: {
      user: true,
    },
    orderBy: [
      { lastName: 'asc' },
      { firstName: 'asc' },
    ],
  })

  return <TeachersList initialTeachers={teachers} />
}
