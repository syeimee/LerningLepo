'use client'

import { useEffect, useState } from 'react'
import { Container, Typography, Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import {
  getStudentById,
  getTeacherById,
  scheduleRequests as initialScheduleRequests,
  type Lesson,
  type ScheduleRequest,
} from '@/lib/data'
import { getWeekStart, getWeekDates, convertToTimetable, TIME_PERIODS } from '@/lib/utils/schedule'
import WeekSelector from '@/components/schedule/WeekSelector'
import TimetableGrid from '@/components/schedule/TimetableGrid'
import ScheduleRequestForm from '@/components/forms/ScheduleRequestForm'
import MatchingDialog from '@/components/schedule/MatchingDialog'
import MyScheduleRequests from '@/components/schedule/MyScheduleRequests'
import type { ScheduleRequestFormData } from '@/lib/validations/scheduleRequest'
import { useSession } from '@/contexts/SessionContext'
import { useData } from '@/contexts/DataContext'

export default function SchedulePage() {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getWeekStart(new Date()))
  const { session } = useSession()
  const { lessons: allLessons, addLesson } = useData()
  const currentUser = session.user
  const [scheduleRequests, setScheduleRequests] = useState<ScheduleRequest[]>(initialScheduleRequests)
  const [requestFormOpen, setRequestFormOpen] = useState(false)
  const [matchingDialogOpen, setMatchingDialogOpen] = useState(false)

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

  // ロール別に授業をフィルタリング
  const getFilteredLessons = (): Lesson[] => {
    switch (currentUser?.role) {
      case 'ADMIN':
        return allLessons // 管理者は全授業を表示
      case 'TEACHER':
        const teacherId = (currentUser as any).teacherId
        if (teacherId) {
          return allLessons.filter((lesson) => lesson.teacherId === teacherId)
        }
        return []
      case 'STUDENT':
        const studentId = (currentUser as any).studentId
        if (studentId) {
          return allLessons.filter((lesson) => lesson.studentId === studentId)
        }
        return []
      default:
        return []
    }
  }

  const filteredLessons = getFilteredLessons()
  const weekDates = getWeekDates(currentWeekStart)
  const timetableData = convertToTimetable(
    filteredLessons,
    currentWeekStart,
    (id) => getStudentById(id)?.name || '不明',
    (id) => getTeacherById(id)?.name || '不明'
  )

  // ロール別のタイトルと説明
  const getViewInfo = () => {
    switch (currentUser?.role) {
      case 'ADMIN':
        return {
          title: '時間割（管理者ビュー）',
          description: '全ての講師と生徒の授業を表示しています',
        }
      case 'TEACHER':
        const teacherId = (currentUser as any).teacherId
        const teacher = teacherId ? getTeacherById(teacherId) : null
        return {
          title: `時間割（講師: ${teacher?.name || currentUser?.name || '不明'}）`,
          description: '担当している生徒の授業のみを表示しています',
        }
      case 'STUDENT':
        const studentId = (currentUser as any).studentId
        const student = studentId ? getStudentById(studentId) : null
        return {
          title: `時間割（生徒: ${student?.name || currentUser?.name || '不明'}）`,
          description: '自分の授業のみを表示しています',
        }
      default:
        return {
          title: '時間割',
          description: '',
        }
    }
  }

  const viewInfo = getViewInfo()

  const handleRequestSubmit = (data: ScheduleRequestFormData) => {
    // デバッグ用ログ
    console.log('handleRequestSubmit - currentUser:', {
      id: currentUser?.id,
      name: currentUser?.name,
      role: currentUser?.role,
      teacherId: (currentUser as any)?.teacherId,
      studentId: (currentUser as any)?.studentId,
    })

    const newRequest: ScheduleRequest = {
      id: `request-${Date.now()}`,
      requesterId: currentUser?.id || '',
      requesterRole: currentUser?.role || 'STUDENT',
      teacherId: currentUser?.role === 'TEACHER' ? (currentUser as any).teacherId : undefined,
      studentId: currentUser?.role === 'STUDENT' ? (currentUser as any).studentId : undefined,
      subject: data.subject,
      preferredDates: data.preferredDates,
      preferredTimeSlots: data.preferredTimeSlots,
      notes: data.notes,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log('handleRequestSubmit - newRequest:', newRequest)
    setScheduleRequests([newRequest, ...scheduleRequests])
  }

  // ペンディング中の希望申請数
  const pendingRequestsCount = scheduleRequests.filter((r) => r.status === 'PENDING').length

  const handleMatch = (
    requestId: string,
    matchedTeacherId: string,
    matchedStudentId: string,
    date: string,
    timeSlot: number
  ) => {
    // 希望申請のステータスを更新
    const updatedRequests = scheduleRequests.map((request) =>
      request.id === requestId ? { ...request, status: 'MATCHED' as const } : request
    )
    setScheduleRequests(updatedRequests)

    // 時限から開始時刻と終了時刻を取得
    const timePeriod = TIME_PERIODS.find((tp) => tp.period === timeSlot)
    if (!timePeriod) return

    // 希望申請から科目を取得
    const request = scheduleRequests.find((r) => r.id === requestId)
    if (!request) return

    // 新しい授業を作成
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      studentId: matchedStudentId,
      teacherId: matchedTeacherId,
      subject: request.subject,
      date: date,
      startTime: timePeriod.startTime,
      endTime: timePeriod.endTime,
      status: 'SCHEDULED',
      notes: `希望申請から自動作成: ${request.notes}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addLesson(newLesson)
  }
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            {viewInfo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {viewInfo.description} - 授業数: {filteredLessons.length}件
          </Typography>
        </div>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {(currentUser?.role === 'TEACHER' || currentUser?.role === 'STUDENT') && (
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
                onClick={() => {
                  // TODO: 授業追加モーダルを開く
                  console.log('授業追加モーダルを開く')
                }}
              >
                授業を追加
              </Button>
            </>
          )}
        </Box>
      </Box>

      <ScheduleRequestForm
        open={requestFormOpen}
        onClose={() => setRequestFormOpen(false)}
        onSubmit={handleRequestSubmit}
        userRole={currentUser?.role === 'TEACHER' ? 'TEACHER' : 'STUDENT'}
      />

      {currentUser?.role === 'ADMIN' && (
        <MatchingDialog
          open={matchingDialogOpen}
          onClose={() => setMatchingDialogOpen(false)}
          scheduleRequests={scheduleRequests}
          onMatch={handleMatch}
        />
      )}

      {/* 講師・生徒ビューの場合のみ希望申請一覧を表示 */}
      {(currentUser?.role === 'TEACHER' || currentUser?.role === 'STUDENT') && (
        <MyScheduleRequests scheduleRequests={scheduleRequests} userId={currentUser?.id || ''} />
      )}

      <WeekSelector
        currentWeekStart={currentWeekStart}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
      />

      <TimetableGrid timetableData={timetableData} weekDates={weekDates} />
    </Container>
  )
}
