import { z } from 'zod'

export const createMonthlyReportSchema = z
  .object({
    studentId: z.string().uuid('有効な生徒IDを指定してください'),
    teacherId: z.string().uuid('有効な講師IDを指定してください'),
    subject: z.string().min(1, '科目は必須です'),
    year: z.number().int().min(2020, '有効な年を入力してください'),
    month: z.number().int().min(1).max(12, '月は1〜12の範囲で入力してください'),
    totalLessons: z.number().int().min(0, '授業回数は0以上である必要があります').optional().default(0),
    absences: z.number().int().min(0, '欠席数は0以上である必要があります').optional().default(0),
    lateCount: z.number().int().min(0, '遅刻数は0以上である必要があります').optional().default(0),
    learningMotivation: z
      .number()
      .int()
      .min(1)
      .max(3, '学習意欲は1〜3の範囲で入力してください')
      .optional()
      .default(2),
    homeworkEngagement: z
      .number()
      .int()
      .min(1)
      .max(3, '課題・宿題の取り組みは1〜3の範囲で入力してください')
      .optional()
      .default(2),
    reviewEngagement: z
      .number()
      .int()
      .min(1)
      .max(3, '復習の取り組みは1〜3の範囲で入力してください')
      .optional()
      .default(2),
    lessonContent: z
      .string()
      .min(1, '授業内容は必須です')
      .max(500, '授業内容は500文字以内で入力してください'),
    comprehension: z
      .string()
      .min(1, '理解度は必須です')
      .max(500, '理解度は500文字以内で入力してください'),
    weeklyTestDates: z
      .array(z.string().or(z.date()))
      .max(4, '週テスト日付は最大4回分まで登録できます')
      .optional()
      .default([]),
    weeklyTestTopics: z
      .array(z.string())
      .max(4, '週テスト出題内容は最大4回分まで登録できます')
      .optional()
      .default([]),
    weeklyTestScores: z
      .array(z.number().int().min(0))
      .max(4, '得点は最大4回分まで登録できます')
      .optional()
      .default([]),
    weeklyTestPassingScores: z
      .array(z.number().int().min(0))
      .max(4, '合格点は最大4回分まで登録できます')
      .optional()
      .default([]),
    overallComment: z
      .string()
      .min(1, '総評は必須です')
      .max(500, '総評は500文字以内で入力してください'),
    googleSheetUrl: z.string().url().optional(),
  })
  .refine(
    (data) => {
      // 週テスト配列の長さが一致しているかチェック
      const dates = data.weeklyTestDates?.length || 0
      const topics = data.weeklyTestTopics?.length || 0
      const scores = data.weeklyTestScores?.length || 0
      const passing = data.weeklyTestPassingScores?.length || 0
      return dates === topics && topics === scores && scores === passing
    },
    {
      message:
        '週テストの各項目（日付、出題内容、得点、合格点）の数は一致している必要があります',
    }
  )

export type CreateMonthlyReportInput = z.infer<typeof createMonthlyReportSchema>

// 更新用スキーマ（部分的な更新を許可）
export const updateMonthlyReportSchema = createMonthlyReportSchema.partial().extend({
  id: z.string().uuid(),
})

export type UpdateMonthlyReportInput = z.infer<typeof updateMonthlyReportSchema>

// 従来の互換性のため
export const monthlyReportSchema = createMonthlyReportSchema
export type MonthlyReportFormData = CreateMonthlyReportInput
