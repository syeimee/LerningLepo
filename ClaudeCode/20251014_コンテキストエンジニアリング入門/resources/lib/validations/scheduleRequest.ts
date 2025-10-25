import { z } from 'zod'

export const scheduleRequestSchema = z.object({
  subject: z.string().min(1, '科目を入力してください'),
  preferredDates: z.array(z.string()).min(1, '希望日を最低1つ選択してください'),
  preferredTimeSlots: z.array(z.number()).min(1, '希望時限を最低1つ選択してください'),
  notes: z.string().min(1, '備考を入力してください'),
})

export type ScheduleRequestFormData = z.infer<typeof scheduleRequestSchema>
