// ダミーユーザーデータ（開発・テスト用）

export interface DummyUser {
  id: string
  name: string
  email: string
  image: string | null
  role: 'ADMIN' | 'TEACHER' | 'STUDENT'
  teacherId?: string // 講師の場合のteacherId
  studentId?: string // 生徒の場合のstudentId
}

export const dummyUsers: DummyUser[] = [
  {
    id: 'admin-1',
    name: '管理者',
    email: 'admin@example.com',
    image: null,
    role: 'ADMIN',
  },
  {
    id: 'teacher-1',
    name: '山田先生',
    email: 'yamada@example.com',
    image: null,
    role: 'TEACHER',
    teacherId: 'teacher-1',
  },
  {
    id: 'teacher-2',
    name: '佐藤先生',
    email: 'sato@example.com',
    image: null,
    role: 'TEACHER',
    teacherId: 'teacher-2',
  },
  {
    id: 'teacher-3',
    name: '鈴木講師',
    email: 'suzukilecturer@example.com',
    image: null,
    role: 'TEACHER',
    teacherId: 'teacher-3',
  },
  {
    id: 'student-1',
    name: '田中太郎',
    email: 'tanaka@example.com',
    image: null,
    role: 'STUDENT',
    studentId: 'student-1',
  },
  {
    id: 'student-2',
    name: '佐藤花子',
    email: 'sato@example.com',
    image: null,
    role: 'STUDENT',
    studentId: 'student-2',
  },
  {
    id: 'student-3',
    name: '鈴木一郎',
    email: 'suzuki@example.com',
    image: null,
    role: 'STUDENT',
    studentId: 'student-3',
  },
]

export const getDummyUserById = (id: string): DummyUser | undefined => {
  return dummyUsers.find((user) => user.id === id)
}

export const getDefaultDummyUser = (): DummyUser => {
  return dummyUsers[0] // デフォルトは管理者
}
