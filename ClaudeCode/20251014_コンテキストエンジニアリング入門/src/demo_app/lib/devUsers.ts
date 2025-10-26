import { prisma } from './prisma'

export interface DevUser {
  id: string
  name: string
  email: string
  image: string | null
  role: 'ADMIN' | 'TEACHER' | 'STUDENT'
  teacherId?: string // 講師の場合のteacherId
  studentId?: string // 生徒の場合のstudentId
}

/**
 * 開発用: データベースから管理者、講師、生徒を1人ずつ取得
 */
export async function getDevUsers(): Promise<DevUser[]> {
  const users: DevUser[] = []

  // 管理者を1人取得
  const admin = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
    orderBy: { createdAt: 'asc' },
  })

  if (admin) {
    users.push({
      id: admin.id,
      name: admin.name || '管理者',
      email: admin.email,
      image: admin.image,
      role: 'ADMIN',
    })
  }

  // 講師を1人取得（Teacherテーブルとの関連も含む）
  const teacherUser = await prisma.user.findFirst({
    where: { role: 'TEACHER' },
    include: { teacher: true },
    orderBy: { createdAt: 'asc' },
  })

  if (teacherUser && teacherUser.teacher) {
    users.push({
      id: teacherUser.id,
      name: teacherUser.name || `${teacherUser.teacher.lastName} ${teacherUser.teacher.firstName}`,
      email: teacherUser.email,
      image: teacherUser.image,
      role: 'TEACHER',
      teacherId: teacherUser.teacher.id,
    })
  }

  // 生徒を1人取得（開発用にSTUDENTロールとして扱う）
  const student = await prisma.student.findFirst({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'asc' },
  })

  if (student) {
    users.push({
      id: student.id,
      name: `${student.lastName} ${student.firstName}`,
      email: student.email || `${student.id}@example.com`,
      image: null,
      role: 'STUDENT',
      studentId: student.id,
    })
  }

  return users
}

/**
 * 開発用: ユーザーIDまたは生徒IDから開発用ユーザー情報を取得
 */
export async function getDevUserById(id: string): Promise<DevUser | null> {
  // まずUserテーブルから検索
  const user = await prisma.user.findUnique({
    where: { id },
    include: { teacher: true },
  })

  if (user) {
    return {
      id: user.id,
      name: user.name || (user.teacher ? `${user.teacher.lastName} ${user.teacher.firstName}` : ''),
      email: user.email,
      image: user.image,
      role: user.role,
      teacherId: user.teacher?.id,
    }
  }

  // Studentテーブルから検索
  const student = await prisma.student.findUnique({
    where: { id },
  })

  if (student) {
    return {
      id: student.id,
      name: `${student.lastName} ${student.firstName}`,
      email: student.email || `${student.id}@example.com`,
      image: null,
      role: 'STUDENT',
      studentId: student.id,
    }
  }

  return null
}
