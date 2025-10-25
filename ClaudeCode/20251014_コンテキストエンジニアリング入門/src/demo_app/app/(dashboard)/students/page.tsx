import { prisma } from '@/lib/prisma'
import StudentsList from '@/components/students/StudentsList'

export default async function StudentsPage() {
  // データベースから生徒一覧を取得
  const students = await prisma.student.findMany({
    where: {
      status: 'ACTIVE',
    },
    orderBy: [
      { lastName: 'asc' },
      { firstName: 'asc' },
    ],
  })

  return <StudentsList initialStudents={students} />
}
