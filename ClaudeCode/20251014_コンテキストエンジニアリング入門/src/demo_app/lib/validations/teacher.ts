import { z } from 'zod'

export const createTeacherSchema = z.object({
  userId: z.string().uuid('有効なユーザーIDを指定してください'),
  lastName: z.string().min(1, '姓を入力してください'),
  firstName: z.string().min(1, '名を入力してください'),
  lastNameKana: z.string().optional(),
  firstNameKana: z.string().optional(),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  subjects: z.array(z.string()).min(1, '少なくとも1つの科目を選択してください'),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  notes: z.string().optional(),
})

export type CreateTeacherInput = z.infer<typeof createTeacherSchema>

export const updateTeacherSchema = createTeacherSchema.partial().extend({
  id: z.string().uuid(),
})

export type UpdateTeacherInput = z.infer<typeof updateTeacherSchema>

// 簡易版（ユーザー作成と講師作成を同時に行う）
export const createTeacherWithUserSchema = z.object({
  lastName: z.string().min(1, '姓を入力してください'),
  firstName: z.string().min(1, '名を入力してください'),
  lastNameKana: z.string().optional(),
  firstNameKana: z.string().optional(),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  subjects: z.array(z.string()).min(1, '少なくとも1つの科目を選択してください'),
  notes: z.string().optional(),
})

export type CreateTeacherWithUserInput = z.infer<typeof createTeacherWithUserSchema>
