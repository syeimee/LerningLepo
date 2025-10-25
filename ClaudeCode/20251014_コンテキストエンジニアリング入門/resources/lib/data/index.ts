import studentsData from './students.json'
import teachersData from './teachers.json'
import lessonsData from './lessons.json'
import dailyReportsData from './dailyReports.json'
import usersData from './users.json'
import scheduleRequestsData from './scheduleRequests.json'
import monthlyReportsData from './monthlyReports.json'

export interface Student {
  id: string
  name: string
  email: string
  phone: string
  grade: string
  targetUniversity: string
  weakSubjects: string[]
  createdAt: string
  updatedAt: string
}

export interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  subjects: string[]
  bio: string
  createdAt: string
  updatedAt: string
}

export interface Lesson {
  id: string
  studentId: string
  teacherId: string
  subject: string
  date: string
  startTime: string
  endTime: string
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED'
  notes: string
  createdAt: string
  updatedAt: string
}

export interface DailyReport {
  id: string
  lessonId: string
  teacherId: string
  studentId: string
  understanding: number
  progress: string
  homework: string
  nextGoal: string
  createdAt: string
  updatedAt: string
}

export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT'

export interface User {
  id: string
  email: string
  role: UserRole
  teacherId?: string // role が TEACHER の場合
  studentId?: string // role が STUDENT の場合
  createdAt: string
  updatedAt: string
}

export interface ScheduleRequest {
  id: string
  requesterId: string // User ID
  requesterRole: UserRole
  teacherId?: string // 講師からの希望の場合
  studentId?: string // 生徒からの希望の場合
  subject: string
  preferredDates: string[] // 希望日のリスト（YYYY-MM-DD形式）
  preferredTimeSlots: number[] // 希望時限のリスト（1-8）
  notes: string
  status: 'PENDING' | 'MATCHED' | 'REJECTED'
  createdAt: string
  updatedAt: string
}

export type Evaluation = '◎' | '○' | '△'

export interface MonthlyReport {
  id: string
  month: string // YYYY-MM形式
  studentId: string
  teacherId: string
  subject: string
  lessonCount: number // 授業回数
  absenceCount: number // 欠席回数
  lateCount: number // 遅刻回数
  learningMotivation: Evaluation // 学習意欲
  homeworkEngagement: Evaluation // 課題と宿題の取り組み
  reviewEngagement: Evaluation // 復習の取り組み
  lessonContent: string // 授業内容（500文字）
  understanding: string // 理解度（500文字）
  weeklyTestDates: (string | null)[] // 週テスト実施日（最大4回）
  googleSheetUrl?: string // Google Sheetsへのリンク（出力済みの場合のみ）
  exportedAt?: string // スプレッドシート出力日時（ISO 8601形式）
  createdAt: string
  updatedAt: string
}

// データをエクスポート
export const students: Student[] = studentsData
export const teachers: Teacher[] = teachersData
export const lessons: Lesson[] = lessonsData as Lesson[]
export const dailyReports: DailyReport[] = dailyReportsData
export const users: User[] = usersData as User[]
export const scheduleRequests: ScheduleRequest[] = scheduleRequestsData as ScheduleRequest[]
export const monthlyReports: MonthlyReport[] = monthlyReportsData as MonthlyReport[]

// ヘルパー関数
export const getStudentById = (id: string): Student | undefined => {
  return students.find((student) => student.id === id)
}

export const getTeacherById = (id: string): Teacher | undefined => {
  return teachers.find((teacher) => teacher.id === id)
}

export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find((lesson) => lesson.id === id)
}

export const getDailyReportByLessonId = (lessonId: string): DailyReport | undefined => {
  return dailyReports.find((report) => report.lessonId === lessonId)
}

export const getLessonsByStudentId = (studentId: string): Lesson[] => {
  return lessons.filter((lesson) => lesson.studentId === studentId)
}

export const getLessonsByTeacherId = (teacherId: string): Lesson[] => {
  return lessons.filter((lesson) => lesson.teacherId === teacherId)
}

export const getDailyReportsByStudentId = (studentId: string): DailyReport[] => {
  return dailyReports.filter((report) => report.studentId === studentId)
}

export const getDailyReportsByTeacherId = (teacherId: string): DailyReport[] => {
  return dailyReports.filter((report) => report.teacherId === teacherId)
}

// ユーザー関連のヘルパー関数
export const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id)
}

export const getUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email)
}

export const getUserByTeacherId = (teacherId: string): User | undefined => {
  return users.find((user) => user.teacherId === teacherId)
}

export const getUserByStudentId = (studentId: string): User | undefined => {
  return users.find((user) => user.studentId === studentId)
}

// スケジュール希望関連のヘルパー関数
export const getScheduleRequestById = (id: string): ScheduleRequest | undefined => {
  return scheduleRequests.find((request) => request.id === id)
}

export const getPendingScheduleRequests = (): ScheduleRequest[] => {
  return scheduleRequests.filter((request) => request.status === 'PENDING')
}

export const getScheduleRequestsByTeacherId = (teacherId: string): ScheduleRequest[] => {
  return scheduleRequests.filter((request) => request.teacherId === teacherId)
}

export const getScheduleRequestsByStudentId = (studentId: string): ScheduleRequest[] => {
  return scheduleRequests.filter((request) => request.studentId === studentId)
}

// 月報関連のヘルパー関数
export const getMonthlyReportById = (id: string): MonthlyReport | undefined => {
  return monthlyReports.find((report) => report.id === id)
}

export const getMonthlyReportsByTeacherId = (teacherId: string): MonthlyReport[] => {
  return monthlyReports.filter((report) => report.teacherId === teacherId)
}

export const getMonthlyReportsByStudentId = (studentId: string): MonthlyReport[] => {
  return monthlyReports.filter((report) => report.studentId === studentId)
}

export const getMonthlyReportsByMonth = (month: string): MonthlyReport[] => {
  return monthlyReports.filter((report) => report.month === month)
}
