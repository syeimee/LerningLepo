import { z } from 'zod'

export const createDailyReportSchema = z.object({
  lessonId: z.string().uuid('有効な授業IDを指定してください'),
  teacherId: z.string().uuid('有効な講師IDを指定してください'),
  studentId: z.string().uuid('有効な生徒IDを指定してください'),
  subject: z.string().min(1, '科目を入力してください'),
  lessonDate: z.string().or(z.date()),
  theme: z.string().min(1, 'テーマを入力してください'),
  content: z.string().min(1, '授業内容を入力してください'),
  materials: z.string().optional(),
  understanding: z.number().min(1, '理解度は1以上です').max(5, '理解度は5以下です').optional().default(3),
  homework: z.string().optional(),
  nextPlan: z.string().optional(),
  remarks: z.string().optional(),
})

export type CreateDailyReportInput = z.infer<typeof createDailyReportSchema>

export const updateDailyReportSchema = createDailyReportSchema.partial().extend({
  id: z.string().uuid(),
})

export type UpdateDailyReportInput = z.infer<typeof updateDailyReportSchema>

// 従来の互換性のため
export const dailyReportSchema = createDailyReportSchema
export type DailyReportFormData = CreateDailyReportInput
