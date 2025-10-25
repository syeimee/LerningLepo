'use server'

import { prisma } from '@/lib/prisma'
import { createTeacherWithUserSchema, updateTeacherSchema } from '@/lib/validations/teacher'
import { revalidatePath } from 'next/cache'

// 講師一覧の取得
export async function getTeachers() {
  try {
    const teachers = await prisma.teacher.findMany({
      where: {
        status: 'ACTIVE',
      },
      include: {
        user: true,
      },
      orderBy: [
        { lastName: 'asc' },
        { firstName: 'asc' },
      ],
    })

    return { success: true, data: teachers }
  } catch (error) {
    console.error('講師一覧取得エラー:', error)
    return { success: false, error: '講師一覧の取得に失敗しました' }
  }
}

// 講師の作成（ユーザーも同時に作成）
export async function createTeacher(input: unknown) {
  try {
    // バリデーション
    const validated = createTeacherWithUserSchema.parse(input)

    // メールアドレスの重複チェック
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    })

    if (existingUser) {
      return { success: false, error: 'このメールアドレスは既に登録されています' }
    }

    // トランザクションでUserとTeacherを作成
    const result = await prisma.$transaction(async (tx) => {
      // Userを作成
      const user = await tx.user.create({
        data: {
          email: validated.email,
          name: `${validated.lastName} ${validated.firstName}`,
          role: 'TEACHER',
        },
      })

      // Teacherを作成
      const teacher = await tx.teacher.create({
        data: {
          userId: user.id,
          lastName: validated.lastName,
          firstName: validated.firstName,
          lastNameKana: validated.lastNameKana,
          firstNameKana: validated.firstNameKana,
          email: validated.email,
          phone: validated.phone,
          subjects: validated.subjects,
          notes: validated.notes,
          status: 'ACTIVE',
        },
        include: {
          user: true,
        },
      })

      return teacher
    })

    // キャッシュを再検証
    revalidatePath('/teachers')

    return { success: true, data: result }
  } catch (error) {
    console.error('講師作成エラー:', error)

    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    return { success: false, error: '講師の作成に失敗しました' }
  }
}

// 講師の更新
export async function updateTeacher(input: unknown) {
  try {
    // バリデーション
    const validated = updateTeacherSchema.parse(input)
    const { id, ...data } = validated

    // 講師を更新
    const teacher = await prisma.teacher.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    })

    // キャッシュを再検証
    revalidatePath('/teachers')
    revalidatePath(`/teachers/${id}`)

    return { success: true, data: teacher }
  } catch (error) {
    console.error('講師更新エラー:', error)

    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    return { success: false, error: '講師の更新に失敗しました' }
  }
}

// 講師の削除（論理削除）
export async function deleteTeacher(id: string) {
  try {
    // ステータスをINACTIVEに変更（論理削除）
    const teacher = await prisma.teacher.update({
      where: { id },
      data: {
        status: 'INACTIVE',
      },
    })

    // キャッシュを再検証
    revalidatePath('/teachers')

    return { success: true, data: teacher }
  } catch (error) {
    console.error('講師削除エラー:', error)
    return { success: false, error: '講師の削除に失敗しました' }
  }
}

// IDで講師を取得
export async function getTeacherById(id: string) {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        user: true,
      },
    })

    if (!teacher) {
      return { success: false, error: '講師が見つかりませんでした' }
    }

    return { success: true, data: teacher }
  } catch (error) {
    console.error('講師取得エラー:', error)
    return { success: false, error: '講師の取得に失敗しました' }
  }
}
