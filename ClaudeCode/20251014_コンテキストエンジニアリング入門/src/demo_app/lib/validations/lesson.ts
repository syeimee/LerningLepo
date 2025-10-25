import { z } from 'zod'

// 時刻の形式検証（HH:MM）
const timeFormat = z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, '時刻はHH:MM形式で入力してください')

export const createLessonSchema = z.object({
  studentId: z.string().uuid('有効な生徒IDを指定してください'),
  teacherId: z.string().uuid('有効な講師IDを指定してください'),
  subject: z.string().min(1, '科目を入力してください'),
  date: z.string().or(z.date()),
  startTime: timeFormat,
  endTime: timeFormat,
  location: z.string().optional(),
  notes: z.string().optional(),
}).refine((data) => data.startTime < data.endTime, {
  message: '終了時刻は開始時刻より後である必要があります',
  path: ['endTime'],
})

export type CreateLessonInput = z.infer<typeof createLessonSchema>

export const updateLessonSchema = createLessonSchema.partial().extend({
  id: z.string().uuid(),
  status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED']).optional(),
})

export type UpdateLessonInput = z.infer<typeof updateLessonSchema>
