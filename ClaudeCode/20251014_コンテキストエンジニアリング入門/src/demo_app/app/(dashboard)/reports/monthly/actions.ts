'use server'

import { prisma } from '@/lib/prisma'
import { createMonthlyReportSchema, updateMonthlyReportSchema } from '@/lib/validations/monthlyReport'
import { revalidatePath } from 'next/cache'

// 月報一覧の取得
export async function getMonthlyReports() {
  try {
    const reports = await prisma.monthlyReport.findMany({
      include: {
        student: true,
        teacher: true,
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
      ],
    })

    return { success: true, data: reports }
  } catch (error) {
    console.error('月報一覧取得エラー:', error)
    return { success: false, error: '月報一覧の取得に失敗しました' }
  }
}

// 月報の作成
export async function createMonthlyReport(input: unknown) {
  try {
    // バリデーション
    const validated = createMonthlyReportSchema.parse(input)

    // 週テスト日付の変換（string → Date）
    const weeklyTestDates = validated.weeklyTestDates?.map((date) =>
      typeof date === 'string' ? new Date(date) : date
    ) || []

    // 既に同じ年月の月報が存在するかチェック
    const existingReport = await prisma.monthlyReport.findFirst({
      where: {
        studentId: validated.studentId,
        teacherId: validated.teacherId,
        subject: validated.subject,
        year: validated.year,
        month: validated.month,
      },
    })

    if (existingReport) {
      return {
        success: false,
        error: `${validated.year}年${validated.month}月の${validated.subject}の月報は既に作成されています`
      }
    }

    // 月報を作成
    const report = await prisma.monthlyReport.create({
      data: {
        ...validated,
        weeklyTestDates,
      },
      include: {
        student: true,
        teacher: true,
      },
    })

    // キャッシュを再検証
    revalidatePath('/reports/monthly')

    return { success: true, data: report }
  } catch (error) {
    console.error('月報作成エラー:', error)

    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    return { success: false, error: '月報の作成に失敗しました' }
  }
}

// 月報の更新
export async function updateMonthlyReport(input: unknown) {
  try {
    // バリデーション
    const validated = updateMonthlyReportSchema.parse(input)
    const { id, ...data } = validated

    // 週テスト日付の変換
    const updateData = {
      ...data,
      weeklyTestDates: data.weeklyTestDates?.map((date) =>
        typeof date === 'string' ? new Date(date) : date
      ),
    }

    // 月報を更新
    const report = await prisma.monthlyReport.update({
      where: { id },
      data: updateData,
      include: {
        student: true,
        teacher: true,
      },
    })

    // キャッシュを再検証
    revalidatePath('/reports/monthly')
    revalidatePath(`/reports/monthly/${id}`)

    return { success: true, data: report }
  } catch (error) {
    console.error('月報更新エラー:', error)

    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    return { success: false, error: '月報の更新に失敗しました' }
  }
}

// 月報の削除
export async function deleteMonthlyReport(id: string) {
  try {
    await prisma.monthlyReport.delete({
      where: { id },
    })

    // キャッシュを再検証
    revalidatePath('/reports/monthly')

    return { success: true }
  } catch (error) {
    console.error('月報削除エラー:', error)
    return { success: false, error: '月報の削除に失敗しました' }
  }
}

// IDで月報を取得
export async function getMonthlyReportById(id: string) {
  try {
    const report = await prisma.monthlyReport.findUnique({
      where: { id },
      include: {
        student: true,
        teacher: true,
      },
    })

    if (!report) {
      return { success: false, error: '月報が見つかりませんでした' }
    }

    return { success: true, data: report }
  } catch (error) {
    console.error('月報取得エラー:', error)
    return { success: false, error: '月報の取得に失敗しました' }
  }
}

// 生徒別月報一覧
export async function getMonthlyReportsByStudentId(studentId: string) {
  try {
    const reports = await prisma.monthlyReport.findMany({
      where: { studentId },
      include: {
        teacher: true,
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
      ],
    })

    return { success: true, data: reports }
  } catch (error) {
    console.error('生徒別月報取得エラー:', error)
    return { success: false, error: '月報の取得に失敗しました' }
  }
}

// 講師別月報一覧
export async function getMonthlyReportsByTeacherId(teacherId: string) {
  try {
    const reports = await prisma.monthlyReport.findMany({
      where: { teacherId },
      include: {
        student: true,
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
      ],
    })

    return { success: true, data: reports }
  } catch (error) {
    console.error('講師別月報取得エラー:', error)
    return { success: false, error: '月報の取得に失敗しました' }
  }
}

// 年月範囲で月報を取得
export async function getMonthlyReportsByDateRange(startYear: number, startMonth: number, endYear: number, endMonth: number) {
  try {
    const reports = await prisma.monthlyReport.findMany({
      where: {
        OR: [
          { year: { gt: startYear } },
          { year: startYear, month: { gte: startMonth } },
        ],
        AND: [
          { OR: [
            { year: { lt: endYear } },
            { year: endYear, month: { lte: endMonth } },
          ]},
        ],
      },
      include: {
        student: true,
        teacher: true,
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
      ],
    })

    return { success: true, data: reports }
  } catch (error) {
    console.error('年月範囲別月報取得エラー:', error)
    return { success: false, error: '月報の取得に失敗しました' }
  }
}

// 生徒の特定年月の月報を取得
export async function getMonthlyReportByStudentAndDate(
  studentId: string,
  teacherId: string,
  subject: string,
  year: number,
  month: number
) {
  try {
    const report = await prisma.monthlyReport.findFirst({
      where: {
        studentId,
        teacherId,
        subject,
        year,
        month,
      },
      include: {
        student: true,
        teacher: true,
      },
    })

    if (!report) {
      return { success: false, error: '月報が見つかりませんでした' }
    }

    return { success: true, data: report }
  } catch (error) {
    console.error('月報取得エラー:', error)
    return { success: false, error: '月報の取得に失敗しました' }
  }
}
