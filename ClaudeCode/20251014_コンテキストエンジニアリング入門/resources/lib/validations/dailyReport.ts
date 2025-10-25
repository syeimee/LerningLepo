import { z } from 'zod'

export const dailyReportSchema = z.object({
  lessonId: z.string().min(1, '授業を選択してください'),
  studentId: z.string().min(1, '生徒を選択してください'),
  teacherId: z.string().min(1, '講師を選択してください'),
  understanding: z.number().min(1, '理解度を選択してください').max(5),
  progress: z.string().min(1, '進捗を入力してください'),
  homework: z.string().optional(),
  nextGoal: z.string().min(1, '次回目標を入力してください'),
})

export type DailyReportFormData = z.infer<typeof dailyReportSchema>
