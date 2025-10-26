'use client'

import { useState, useMemo, useEffect } from 'react'
import { Typography, Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import type { Lesson, Student, Teacher, DailyReport } from '@prisma/client'
import { getWeekStart, getWeekDates, formatDate, TIME_PERIODS, type TimetableData } from '@/lib/utils/schedule'
import { scheduleRequests as initialScheduleRequests, type ScheduleRequest } from '@/lib/data'
import { createLesson } from '@/app/(dashboard)/schedule/actions'
import { getStudents } from '@/app/(dashboard)/students/actions'
import { getTeachers } from '@/app/(dashboard)/teachers/actions'
import { useRouter } from 'next/navigation'
import { useSession } from '@/contexts/SessionContext'
import WeekSelector from './WeekSelector'
import TimetableGrid from './TimetableGrid'
import AddLesson from './AddLesson'
import ScheduleRequestForm from '@/components/forms/ScheduleRequestForm'
import MatchingDialog from './MatchingDialog'
import MyScheduleRequests from './MyScheduleRequests'
import type { ScheduleRequestFormData } from '@/lib/validations/scheduleRequest'

interface LessonWithRelations extends Lesson {
  student: Student
  teacher: Teacher
  dailyReport: DailyReport | null
}

interface ScheduleViewProps {
  initialLessons: LessonWithRelations[]
}

export default function ScheduleView({ initialLessons }: ScheduleViewProps) {
  const router = useRouter()
  const { session } = useSession()
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getWeekStart(new Date()))
  const [lessons] = useState(initialLessons)
  const [addLessonOpen, setAddLessonOpen] = useState(false)

  // 希望申請関連の状態
  const [scheduleRequests, setScheduleRequests] = useState<ScheduleRequest[]>(initialScheduleRequests)
  const [requestFormOpen, setRequestFormOpen] = useState(false)
  const [matchingDialogOpen, setMatchingDialogOpen] = useState(false)

  // 生徒と講師のデータ
  const [students, setStudents] = useState<Student[]>([])
  const [teachers, setTeachers] = useState<(Teacher & { user: { id: string; email: string; name: string | null; role: string } })[]>([])

  // セッションからユーザー情報を取得
  const currentUser = session?.user

  // 生徒と講師のデータを取得
  useEffect(() => {
    const fetchData = async () => {
      const [studentsResult, teachersResult] = await Promise.all([
        getStudents(),
        getTeachers(),
      ])

      if (studentsResult.success && studentsResult.data) {
        setStudents(studentsResult.data)
      }

      if (teachersResult.success && teachersResult.data) {
        setTeachers(teachersResult.data)
      }
    }

    fetchData()
  }, [])

  const handlePrevWeek = () => {
    const newWeekStart = new Date(currentWeekStart)
    newWeekStart.setDate(currentWeekStart.getDate() - 7)
    setCurrentWeekStart(newWeekStart)
  }

  const handleNextWeek = () => {
    const newWeekStart = new Date(currentWeekStart)
    newWeekStart.setDate(currentWeekStart.getDate() + 7)
    setCurrentWeekStart(newWeekStart)
  }

  // 希望申請の送信ハンドラー
  const handleRequestSubmit = (data: ScheduleRequestFormData) => {
    const newRequest: ScheduleRequest = {
      id: `request-${Date.now()}`,
      requesterId: currentUser?.id || '',
      requesterRole: currentUser?.role || 'TEACHER',
      teacherId: currentUser?.role === 'TEACHER' ? (currentUser as any)?.teacherId : undefined,
      studentId: undefined,
      subject: data.subject,
      preferredDates: data.preferredDates,
      preferredTimeSlots: data.preferredTimeSlots,
      notes: data.notes,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setScheduleRequests([newRequest, ...scheduleRequests])
    setRequestFormOpen(false)
  }

  // マッチングハンドラー
  const handleMatch = async (
    requestId: string,
    matchedTeacherId: string,
    matchedStudentId: string,
    date: string,
    timeSlot: number
  ) => {
    try {
      // 時限から開始時刻と終了時刻を取得
      const timePeriod = TIME_PERIODS.find((tp) => tp.period === timeSlot)
      if (!timePeriod) {
        console.error('時限が見つかりません:', timeSlot)
        alert('時限が見つかりません')
        return
      }

      // 希望申請から科目を取得
      const request = scheduleRequests.find((r) => r.id === requestId)
      if (!request) {
        console.error('希望申請が見つかりません:', requestId)
        alert('希望申請が見つかりません')
        return
      }

      console.log('授業作成データ:', {
        studentId: matchedStudentId,
        teacherId: matchedTeacherId,
        subject: request.subject,
        date: date,
        startTime: timePeriod.startTime,
        endTime: timePeriod.endTime,
        notes: `希望申請から自動作成: ${request.notes}`,
      })

      // Server Actionを呼んで授業を作成
      const result = await createLesson({
        studentId: matchedStudentId,
        teacherId: matchedTeacherId,
        subject: request.subject,
        date: date,
        startTime: timePeriod.startTime,
        endTime: timePeriod.endTime,
        notes: `希望申請から自動作成: ${request.notes}`,
      })

      console.log('授業作成結果:', result)

      if (result.success) {
        // 希望申請のステータスを更新
        const updatedRequests = scheduleRequests.map((req) =>
          req.id === requestId ? { ...req, status: 'MATCHED' as const } : req
        )
        setScheduleRequests(updatedRequests)

        // ページをリフレッシュしてデータを再取得
        router.refresh()
        alert('授業を作成しました')
      } else {
        console.error('授業作成エラー:', result.error)
        alert(`授業の作成に失敗しました: ${result.error}`)
      }
    } catch (error) {
      console.error('マッチング処理エラー:', error)
      alert(`エラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`)
    }
  }

  // ペンディング中の希望申請数
  const pendingRequestsCount = scheduleRequests.filter((r) => r.status === 'PENDING').length

  const weekDates = getWeekDates(currentWeekStart)

  // 時間割データを生成（TimetableGridが期待する形式に変換）
  const timetableData: TimetableData = useMemo(() => {
    const data: TimetableData = {}

    // 週の各日付を初期化（空の配列）
    weekDates.forEach((date) => {
      const dateStr = formatDate(date)
      data[dateStr] = {}
      TIME_PERIODS.forEach((tp) => {
        data[dateStr][tp.period] = []
      })
    })

    // 授業を時間割に配置
    lessons.forEach((lesson) => {
      const lessonDate = new Date(lesson.date)
      const dateStr = formatDate(lessonDate)

      if (!data[dateStr]) return

      // 時刻から時限を推定
      const period = TIME_PERIODS.find((tp) => tp.startTime === lesson.startTime)
      if (!period) return

      // 配列に授業を追加
      data[dateStr][period.period].push({
        lesson: {
          id: lesson.id,
          studentId: lesson.studentId,
          teacherId: lesson.teacherId,
          subject: lesson.subject,
          date: formatDate(lessonDate), // Date型をstring型に変換
          startTime: lesson.startTime,
          endTime: lesson.endTime,
          status: lesson.status,
          notes: lesson.notes || '',
          createdAt: lesson.createdAt.toISOString(),
          updatedAt: lesson.updatedAt.toISOString(),
        },
        studentName: `${lesson.student.lastName} ${lesson.student.firstName}`,
        teacherName: `${lesson.teacher.lastName} ${lesson.teacher.firstName}`,
      })
    })

    return data
  }, [lessons, currentWeekStart, weekDates])

  // 今週の授業数をカウント
  const weekLessonsCount = useMemo(() => {
    return lessons.filter((lesson) => {
      const lessonDate = new Date(lesson.date)
      const weekStartDate = new Date(currentWeekStart)
      const weekEndDate = new Date(currentWeekStart)
      weekEndDate.setDate(weekEndDate.getDate() + 7)

      return lessonDate >= weekStartDate && lessonDate < weekEndDate
    }).length
  }, [lessons, currentWeekStart])

  return (
    <>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            授業スケジュール
          </Typography>
          <Typography variant="body2" color="text.secondary">
            今週の授業: {weekLessonsCount}件 / 全授業: {lessons.length}件
          </Typography>
        </div>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {currentUser?.role === 'TEACHER' && (
            <Button
              variant="outlined"
              startIcon={<EventAvailableIcon />}
              onClick={() => setRequestFormOpen(true)}
            >
              希望申請
            </Button>
          )}
          {currentUser?.role === 'ADMIN' && (
            <>
              <Button
                variant="outlined"
                startIcon={<EventAvailableIcon />}
                onClick={() => setMatchingDialogOpen(true)}
              >
                マッチング ({pendingRequestsCount})
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setAddLessonOpen(true)}
              >
                授業を追加
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* 授業追加モーダル */}
      <AddLesson isOpen={addLessonOpen} toggleOpen={() => setAddLessonOpen(!addLessonOpen)} />

      {/* 希望申請フォーム */}
      <ScheduleRequestForm
        open={requestFormOpen}
        onClose={() => setRequestFormOpen(false)}
        onSubmit={handleRequestSubmit}
        userRole={currentUser?.role === 'TEACHER' ? 'TEACHER' : 'STUDENT'}
      />

      {/* マッチングダイアログ - 管理者のみ表示 */}
      {currentUser?.role === 'ADMIN' && (
        <MatchingDialog
          open={matchingDialogOpen}
          onClose={() => setMatchingDialogOpen(false)}
          scheduleRequests={scheduleRequests}
          onMatch={handleMatch}
          students={students}
          teachers={teachers}
        />
      )}

      {/* 講師ビューの場合のみ希望申請一覧を表示（時間割の上に） */}
      {currentUser?.role === 'TEACHER' && (
        <Box sx={{ mb: 3 }}>
          <MyScheduleRequests scheduleRequests={scheduleRequests} userId={currentUser?.id || ''} />
        </Box>
      )}

      <WeekSelector
        currentWeekStart={currentWeekStart}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
      />

      <TimetableGrid timetableData={timetableData} weekDates={weekDates} />
    </>
  )
}
