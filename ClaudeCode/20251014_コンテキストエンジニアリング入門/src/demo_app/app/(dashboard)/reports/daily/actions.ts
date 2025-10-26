'use server'

import { prisma } from '@/lib/prisma'
import { createDailyReportSchema, updateDailyReportSchema } from '@/lib/validations/dailyReport'
import { revalidatePath } from 'next/cache'

// 日報一覧の取得
export async function getDailyReports() {
  try {
    const reports = await prisma.dailyReport.findMany({
      include: {
        lesson: true,
        student: true,
        teacher: true,
      },
      orderBy: {
        lessonDate: 'desc',
      },
    })

    return { success: true, data: reports }
  } catch (error) {
    console.error('日報一覧取得エラー:', error)
    return { success: false, error: '日報一覧の取得に失敗しました' }
  }
}

// 日報の作成（授業ステータスも自動更新）
export async function createDailyReport(input: unknown) {
  try {
    // バリデーション
    const validated = createDailyReportSchema.parse(input)
    const lessonDate = typeof validated.lessonDate === 'string' ? new Date(validated.lessonDate) : validated.lessonDate

    // 授業の存在確認
    const lesson = await prisma.lesson.findUnique({
      where: { id: validated.lessonId },
    })

    if (!lesson) {
      return { success: false, error: '指定された授業が見つかりません' }
    }

    // 既に日報が存在するかチェック
    const existingReport = await prisma.dailyReport.findUnique({
      where: { lessonId: validated.lessonId },
    })

    if (existingReport) {
      return { success: false, error: 'この授業の日報は既に作成されています' }
    }

    // トランザクションで日報作成と授業ステータス更新
    const result = await prisma.$transaction(async (tx) => {
      // 日報を作成
      const report = await tx.dailyReport.create({
        data: {
          ...validated,
          lessonDate,
        },
        include: {
          lesson: true,
          student: true,
          teacher: true,
        },
      })

      // 授業のステータスをCOMPLETEDに更新
      await tx.lesson.update({
        where: { id: validated.lessonId },
        data: { status: 'COMPLETED' },
      })

      return report
    })

    // キャッシュを再検証
    revalidatePath('/reports/daily')
    revalidatePath('/schedule')
    revalidatePath('/dashboard') // ダッシュボードの未提出日報一覧を更新

    return { success: true, data: result }
  } catch (error) {
    console.error('日報作成エラー:', error)

    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    return { success: false, error: '日報の作成に失敗しました' }
  }
}

// 日報の更新
export async function updateDailyReport(input: unknown) {
  try {
    // バリデーション
    const validated = updateDailyReportSchema.parse(input)
    const { id, ...data } = validated

    // 日付の型変換
    const updateData = {
      ...data,
      lessonDate: data.lessonDate ? (typeof data.lessonDate === 'string' ? new Date(data.lessonDate) : data.lessonDate) : undefined,
    }

    // 日報を更新
    const report = await prisma.dailyReport.update({
      where: { id },
      data: updateData,
      include: {
        lesson: true,
        student: true,
        teacher: true,
      },
    })

    // キャッシュを再検証
    revalidatePath('/reports/daily')
    revalidatePath(`/reports/daily/${id}`)
    revalidatePath('/dashboard') // ダッシュボードの表示を更新

    return { success: true, data: report }
  } catch (error) {
    console.error('日報更新エラー:', error)

    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    return { success: false, error: '日報の更新に失敗しました' }
  }
}

// 日報の削除
export async function deleteDailyReport(id: string) {
  try {
    const report = await prisma.dailyReport.findUnique({
      where: { id },
    })

    if (!report) {
      return { success: false, error: '日報が見つかりませんでした' }
    }

    // トランザクションで日報削除と授業ステータス変更
    await prisma.$transaction(async (tx) => {
      // 日報を削除
      await tx.dailyReport.delete({
        where: { id },
      })

      // 授業のステータスをSCHEDULEDに戻す
      await tx.lesson.update({
        where: { id: report.lessonId },
        data: { status: 'SCHEDULED' },
      })
    })

    // キャッシュを再検証
    revalidatePath('/reports/daily')
    revalidatePath('/schedule')
    revalidatePath('/dashboard') // ダッシュボードの未提出日報一覧を更新

    return { success: true }
  } catch (error) {
    console.error('日報削除エラー:', error)
    return { success: false, error: '日報の削除に失敗しました' }
  }
}

// IDで日報を取得
export async function getDailyReportById(id: string) {
  try {
    const report = await prisma.dailyReport.findUnique({
      where: { id },
      include: {
        lesson: true,
        student: true,
        teacher: true,
      },
    })

    if (!report) {
      return { success: false, error: '日報が見つかりませんでした' }
    }

    return { success: true, data: report }
  } catch (error) {
    console.error('日報取得エラー:', error)
    return { success: false, error: '日報の取得に失敗しました' }
  }
}

// 生徒別日報一覧
export async function getDailyReportsByStudentId(studentId: string) {
  try {
    const reports = await prisma.dailyReport.findMany({
      where: { studentId },
      include: {
        lesson: true,
        teacher: true,
      },
      orderBy: {
        lessonDate: 'desc',
      },
    })

    return { success: true, data: reports }
  } catch (error) {
    console.error('生徒別日報取得エラー:', error)
    return { success: false, error: '日報の取得に失敗しました' }
  }
}

// 講師別日報一覧
export async function getDailyReportsByTeacherId(teacherId: string) {
  try {
    const reports = await prisma.dailyReport.findMany({
      where: { teacherId },
      include: {
        lesson: true,
        student: true,
      },
      orderBy: {
        lessonDate: 'desc',
      },
    })

    return { success: true, data: reports }
  } catch (error) {
    console.error('講師別日報取得エラー:', error)
    return { success: false, error: '日報の取得に失敗しました' }
  }
}

// 授業IDで日報を取得
export async function getDailyReportByLessonId(lessonId: string) {
  try {
    const report = await prisma.dailyReport.findUnique({
      where: { lessonId },
      include: {
        lesson: true,
        student: true,
        teacher: true,
      },
    })

    if (!report) {
      return { success: false, error: '日報が見つかりませんでした' }
    }

    return { success: true, data: report }
  } catch (error) {
    console.error('日報取得エラー:', error)
    return { success: false, error: '日報の取得に失敗しました' }
  }
}
