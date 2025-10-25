'use server'

import { prisma } from '@/lib/prisma'
import { createStudentSchema, updateStudentSchema } from '@/lib/validations/student'
import { revalidatePath } from 'next/cache'

// 生徒一覧の取得
export async function getStudents() {
  try {
    const students = await prisma.student.findMany({
      where: {
        status: 'ACTIVE',
      },
      orderBy: [
        { lastName: 'asc' },
        { firstName: 'asc' },
      ],
    })

    return { success: true, data: students }
  } catch (error) {
    console.error('生徒一覧取得エラー:', error)
    return { success: false, error: '生徒一覧の取得に失敗しました' }
  }
}

// 生徒の作成
export async function createStudent(input: unknown) {
  try {
    // バリデーション
    const validated = createStudentSchema.parse(input)

    // 生徒を作成
    const student = await prisma.student.create({
      data: validated,
    })

    // キャッシュを再検証
    revalidatePath('/students')

    return { success: true, data: student }
  } catch (error) {
    console.error('生徒作成エラー:', error)

    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    return { success: false, error: '生徒の作成に失敗しました' }
  }
}

// 生徒の更新
export async function updateStudent(input: unknown) {
  try {
    // バリデーション
    const validated = updateStudentSchema.parse(input)
    const { id, ...data } = validated

    // 生徒を更新
    const student = await prisma.student.update({
      where: { id },
      data,
    })

    // キャッシュを再検証
    revalidatePath('/students')
    revalidatePath(`/students/${id}`)

    return { success: true, data: student }
  } catch (error) {
    console.error('生徒更新エラー:', error)

    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    return { success: false, error: '生徒の更新に失敗しました' }
  }
}

// 生徒の削除（論理削除）
export async function deleteStudent(id: string) {
  try {
    // ステータスをWITHDRAWNに変更（論理削除）
    const student = await prisma.student.update({
      where: { id },
      data: {
        status: 'WITHDRAWN',
      },
    })

    // キャッシュを再検証
    revalidatePath('/students')

    return { success: true, data: student }
  } catch (error) {
    console.error('生徒削除エラー:', error)
    return { success: false, error: '生徒の削除に失敗しました' }
  }
}

// IDで生徒を取得
export async function getStudentById(id: string) {
  try {
    const student = await prisma.student.findUnique({
      where: { id },
    })

    if (!student) {
      return { success: false, error: '生徒が見つかりませんでした' }
    }

    return { success: true, data: student }
  } catch (error) {
    console.error('生徒取得エラー:', error)
    return { success: false, error: '生徒の取得に失敗しました' }
  }
}
