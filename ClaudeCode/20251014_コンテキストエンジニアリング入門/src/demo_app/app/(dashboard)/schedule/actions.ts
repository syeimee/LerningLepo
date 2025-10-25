'use server'

import { prisma } from '@/lib/prisma'
import { createLessonSchema, updateLessonSchema } from '@/lib/validations/lesson'
import { revalidatePath } from 'next/cache'

// スケジュール重複チェック
async function checkScheduleConflict(
  date: Date,
  startTime: string,
  endTime: string,
  teacherId: string,
  studentId: string,
  excludeLessonId?: string
) {
  const conflicts = await prisma.lesson.findMany({
    where: {
      date,
      status: { not: 'CANCELLED' },
      id: excludeLessonId ? { not: excludeLessonId } : undefined,
      OR: [
        { teacherId },
        { studentId },
      ],
      AND: [
        {
          OR: [
            // 新しい授業の開始時刻が既存授業の時間内
            { startTime: { lte: startTime }, endTime: { gt: startTime } },
            // 新しい授業の終了時刻が既存授業の時間内
            { startTime: { lt: endTime }, endTime: { gte: endTime } },
            // 新しい授業が既存授業を完全に包含
            { startTime: { gte: startTime }, endTime: { lte: endTime } },
          ],
        },
      ],
    },
    include: {
      student: true,
      teacher: true,
    },
  })

  return conflicts
}

// 授業一覧の取得
export async function getLessons() {
  try {
    const lessons = await prisma.lesson.findMany({
      include: {
        student: true,
        teacher: true,
        dailyReport: true,
      },
      orderBy: [
        { date: 'desc' },
        { startTime: 'asc' },
      ],
    })

    return { success: true, data: lessons }
  } catch (error) {
    console.error('授業一覧取得エラー:', error)
    return { success: false, error: '授業一覧の取得に失敗しました' }
  }
}

// 授業の作成
export async function createLesson(input: unknown) {
  try {
    // バリデーション
    const validated = createLessonSchema.parse(input)
    const date = typeof validated.date === 'string' ? new Date(validated.date) : validated.date

    // スケジュール重複チェック
    const conflicts = await checkScheduleConflict(
      date,
      validated.startTime,
      validated.endTime,
      validated.teacherId,
      validated.studentId
    )

    if (conflicts.length > 0) {
      const conflict = conflicts[0]
      const conflictType = conflict.teacherId === validated.teacherId ? '講師' : '生徒'
      return {
        success: false,
        error: `${conflictType}のスケジュールが重複しています（${conflict.startTime}-${conflict.endTime}）`,
      }
    }

    // 授業を作成
    const lesson = await prisma.lesson.create({
      data: {
        ...validated,
        date,
        status: 'SCHEDULED',
      },
      include: {
        student: true,
        teacher: true,
      },
    })

    // キャッシュを再検証
    revalidatePath('/schedule')

    return { success: true, data: lesson }
  } catch (error) {
    console.error('授業作成エラー:', error)

    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    return { success: false, error: '授業の作成に失敗しました' }
  }
}

// 授業の更新
export async function updateLesson(input: unknown) {
  try {
    // バリデーション
    const validated = updateLessonSchema.parse(input)
    const { id, ...data } = validated

    // 日時やスケジュールが変更される場合は重複チェック
    if (data.date || data.startTime || data.endTime || data.teacherId || data.studentId) {
      const currentLesson = await prisma.lesson.findUnique({ where: { id } })
      if (!currentLesson) {
        return { success: false, error: '授業が見つかりませんでした' }
      }

      const date = data.date ? (typeof data.date === 'string' ? new Date(data.date) : data.date) : currentLesson.date
      const startTime = data.startTime || currentLesson.startTime
      const endTime = data.endTime || currentLesson.endTime
      const teacherId = data.teacherId || currentLesson.teacherId
      const studentId = data.studentId || currentLesson.studentId

      const conflicts = await checkScheduleConflict(
        date,
        startTime,
        endTime,
        teacherId,
        studentId,
        id
      )

      if (conflicts.length > 0) {
        const conflict = conflicts[0]
        const conflictType = conflict.teacherId === teacherId ? '講師' : '生徒'
        return {
          success: false,
          error: `${conflictType}のスケジュールが重複しています（${conflict.startTime}-${conflict.endTime}）`,
        }
      }
    }

    // 日付の型変換
    const updateData = {
      ...data,
      date: data.date ? (typeof data.date === 'string' ? new Date(data.date) : data.date) : undefined,
    }

    // 授業を更新
    const lesson = await prisma.lesson.update({
      where: { id },
      data: updateData,
      include: {
        student: true,
        teacher: true,
      },
    })

    // キャッシュを再検証
    revalidatePath('/schedule')
    revalidatePath(`/schedule/${id}`)

    return { success: true, data: lesson }
  } catch (error) {
    console.error('授業更新エラー:', error)

    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    return { success: false, error: '授業の更新に失敗しました' }
  }
}

// 授業の削除（キャンセル）
export async function cancelLesson(id: string) {
  try {
    // ステータスをCANCELLEDに変更
    const lesson = await prisma.lesson.update({
      where: { id },
      data: {
        status: 'CANCELLED',
      },
    })

    // キャッシュを再検証
    revalidatePath('/schedule')

    return { success: true, data: lesson }
  } catch (error) {
    console.error('授業キャンセルエラー:', error)
    return { success: false, error: '授業のキャンセルに失敗しました' }
  }
}

// IDで授業を取得
export async function getLessonById(id: string) {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        student: true,
        teacher: true,
        dailyReport: true,
      },
    })

    if (!lesson) {
      return { success: false, error: '授業が見つかりませんでした' }
    }

    return { success: true, data: lesson }
  } catch (error) {
    console.error('授業取得エラー:', error)
    return { success: false, error: '授業の取得に失敗しました' }
  }
}

// 生徒別授業一覧
export async function getLessonsByStudentId(studentId: string) {
  try {
    const lessons = await prisma.lesson.findMany({
      where: { studentId },
      include: {
        teacher: true,
        dailyReport: true,
      },
      orderBy: [
        { date: 'desc' },
        { startTime: 'asc' },
      ],
    })

    return { success: true, data: lessons }
  } catch (error) {
    console.error('生徒別授業取得エラー:', error)
    return { success: false, error: '授業の取得に失敗しました' }
  }
}

// 講師別授業一覧
export async function getLessonsByTeacherId(teacherId: string) {
  try {
    const lessons = await prisma.lesson.findMany({
      where: { teacherId },
      include: {
        student: true,
        dailyReport: true,
      },
      orderBy: [
        { date: 'desc' },
        { startTime: 'asc' },
      ],
    })

    return { success: true, data: lessons }
  } catch (error) {
    console.error('講師別授業取得エラー:', error)
    return { success: false, error: '授業の取得に失敗しました' }
  }
}

// 日付範囲で授業を取得
export async function getLessonsByDateRange(startDate: string, endDate: string) {
  try {
    const lessons = await prisma.lesson.findMany({
      where: {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        student: true,
        teacher: true,
        dailyReport: true,
      },
      orderBy: [
        { date: 'asc' },
        { startTime: 'asc' },
      ],
    })

    return { success: true, data: lessons }
  } catch (error) {
    console.error('日付範囲別授業取得エラー:', error)
    return { success: false, error: '授業の取得に失敗しました' }
  }
}
