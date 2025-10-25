import { z } from 'zod'

export const createStudentSchema = z.object({
  lastName: z.string().min(1, '姓を入力してください'),
  firstName: z.string().min(1, '名を入力してください'),
  lastNameKana: z.string().optional(),
  firstNameKana: z.string().optional(),
  grade: z.string().optional(),
  schoolName: z.string().optional(),
  targetUniversity: z.string().optional(),
  email: z.string().email('有効なメールアドレスを入力してください').optional().or(z.literal('')),
  phone: z.string().optional(),
  parentName: z.string().optional(),
  parentEmail: z.string().email('有効なメールアドレスを入力してください').optional().or(z.literal('')),
  parentPhone: z.string().optional(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'WITHDRAWN']).default('ACTIVE'),
  notes: z.string().optional(),
})

export type CreateStudentInput = z.infer<typeof createStudentSchema>

export const updateStudentSchema = createStudentSchema.partial().extend({
  id: z.string().uuid(),
})

export type UpdateStudentInput = z.infer<typeof updateStudentSchema>
