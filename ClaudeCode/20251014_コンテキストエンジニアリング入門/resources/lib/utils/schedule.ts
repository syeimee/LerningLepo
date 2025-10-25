import { Lesson } from '../data'

// 曜日の定義
export const WEEKDAYS = ['月', '火', '水', '木', '金', '土', '日'] as const
export type Weekday = (typeof WEEKDAYS)[number]

// 時限の定義（1時限目から8時限目）
export const TIME_PERIODS = [
  { period: 1, startTime: '09:00', endTime: '10:00' },
  { period: 2, startTime: '10:10', endTime: '11:10' },
  { period: 3, startTime: '11:20', endTime: '12:20' },
  { period: 4, startTime: '13:20', endTime: '14:20' },
  { period: 5, startTime: '14:30', endTime: '15:30' },
  { period: 6, startTime: '15:40', endTime: '16:40' },
  { period: 7, startTime: '16:50', endTime: '17:50' },
  { period: 8, startTime: '18:00', endTime: '19:00' },
] as const

// 週の開始日を取得（月曜日）
export const getWeekStart = (date: Date): Date => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // 月曜日に調整
  return new Date(d.setDate(diff))
}

// 週の終了日を取得（日曜日）
export const getWeekEnd = (date: Date): Date => {
  const start = getWeekStart(date)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return end
}

// 週の日付配列を取得
export const getWeekDates = (weekStart: Date): Date[] => {
  const dates: Date[] = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + i)
    dates.push(date)
  }
  return dates
}

// 日付を YYYY-MM-DD 形式に変換
export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 週の表示文字列を取得（例：2025年10月14日（月）〜2025年10月20日（日））
export const getWeekRangeString = (weekStart: Date): string => {
  const weekEnd = getWeekEnd(weekStart)
  const startStr = `${weekStart.getFullYear()}年${weekStart.getMonth() + 1}月${weekStart.getDate()}日`
  const endStr = `${weekEnd.getFullYear()}年${weekEnd.getMonth() + 1}月${weekEnd.getDate()}日`
  return `${startStr}（月）〜 ${endStr}（日）`
}

// 授業を時間割形式に変換
export interface TimetableLesson {
  lesson: Lesson
  studentName: string
  teacherName: string
}

export type TimetableCell = TimetableLesson[]

export type TimetableData = {
  [date: string]: {
    [period: number]: TimetableCell
  }
}

export const convertToTimetable = (
  lessons: Lesson[],
  weekStart: Date,
  getStudentName: (id: string) => string,
  getTeacherName: (id: string) => string
): TimetableData => {
  const weekDates = getWeekDates(weekStart)
  const timetable: TimetableData = {}

  // 週の各日付を初期化（空の配列）
  weekDates.forEach((date) => {
    const dateStr = formatDate(date)
    timetable[dateStr] = {}
    TIME_PERIODS.forEach((tp) => {
      timetable[dateStr][tp.period] = []
    })
  })

  // 授業を時間割に配置（複数授業を配列に追加）
  lessons.forEach((lesson) => {
    const dateStr = lesson.date
    if (!timetable[dateStr]) return

    // 時刻から時限を推定
    const period = TIME_PERIODS.find((tp) => tp.startTime === lesson.startTime)
    if (!period) return

    // 配列に授業を追加
    timetable[dateStr][period.period].push({
      lesson,
      studentName: getStudentName(lesson.studentId),
      teacherName: getTeacherName(lesson.teacherId),
    })
  })

  return timetable
}
