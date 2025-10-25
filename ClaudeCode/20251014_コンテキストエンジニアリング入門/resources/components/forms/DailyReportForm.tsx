'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  Rating,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { dailyReportSchema, type DailyReportFormData } from '@/lib/validations/dailyReport'
import { students, teachers } from '@/lib/data'
import { useSession } from '@/contexts/SessionContext'
import { useData } from '@/contexts/DataContext'
import { useMemo } from 'react'

interface DailyReportFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: DailyReportFormData) => void
}

export default function DailyReportForm({ open, onClose, onSubmit }: DailyReportFormProps) {
  const { session } = useSession()
  const { lessons, dailyReports } = useData()
  const currentUser = session.user

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DailyReportFormData>({
    resolver: zodResolver(dailyReportSchema),
    defaultValues: {
      lessonId: '',
      studentId: '',
      teacherId: '',
      understanding: 3,
      progress: '',
      homework: '',
      nextGoal: '',
    },
  })

  // 現在ログインしている講師の担当授業で、まだ日報が作成されていない授業のみを表示
  const availableLessons = useMemo(() => {
    const currentTeacherId = (currentUser as any)?.teacherId

    if (!currentTeacherId) {
      return []
    }

    return lessons.filter((lesson) => {
      // 自分が担当する授業のみ
      const isMyLesson = lesson.teacherId === currentTeacherId

      // マッチング済み（生徒と講師が両方設定されている）
      const isMatched = lesson.studentId && lesson.teacherId

      // SCHEDULED状態（まだ完了していない）
      const isScheduled = lesson.status === 'SCHEDULED'

      // 該当するlessonIdの日報がまだ存在しない
      const hasNoReport = !dailyReports.some((report) => report.lessonId === lesson.id)

      return isMyLesson && isMatched && isScheduled && hasNoReport
    })
  }, [lessons, dailyReports, currentUser])

  // 授業を選択したら自動的に生徒と講師をセット
  const handleLessonChange = (lessonId: string, onChange: (value: string) => void) => {
    onChange(lessonId)
    const lesson = lessons.find((l) => l.id === lessonId)
    if (lesson) {
      // 生徒と講師のIDをセット
      control._formValues.studentId = lesson.studentId
      control._formValues.teacherId = lesson.teacherId
    }
  }

  const handleFormSubmit = (data: DailyReportFormData) => {
    onSubmit(data)
    reset()
    onClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>日報を作成</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* 授業選択 */}
            <Controller
              name="lessonId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="授業"
                  error={!!errors.lessonId}
                  helperText={errors.lessonId?.message}
                  fullWidth
                  onChange={(e) => handleLessonChange(e.target.value, field.onChange)}
                >
                  {availableLessons.length === 0 ? (
                    <MenuItem value="" disabled>
                      日報作成可能な授業がありません
                    </MenuItem>
                  ) : (
                    availableLessons.map((lesson) => {
                      const student = students.find((s) => s.id === lesson.studentId)
                      const teacher = teachers.find((t) => t.id === lesson.teacherId)
                      return (
                        <MenuItem key={lesson.id} value={lesson.id}>
                          {lesson.date} {lesson.startTime} - {student?.name} / {teacher?.name} /{' '}
                          {lesson.subject}
                        </MenuItem>
                      )
                    })
                  )}
                </TextField>
              )}
            />

            {/* 生徒（自動入力） */}
            <Controller
              name="studentId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="生徒"
                  error={!!errors.studentId}
                  helperText={errors.studentId?.message}
                  fullWidth
                  disabled
                  value={
                    field.value
                      ? students.find((s) => s.id === field.value)?.name || ''
                      : '授業を選択してください'
                  }
                />
              )}
            />

            {/* 講師（自動入力） */}
            <Controller
              name="teacherId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="講師"
                  error={!!errors.teacherId}
                  helperText={errors.teacherId?.message}
                  fullWidth
                  disabled
                  value={
                    field.value
                      ? teachers.find((t) => t.id === field.value)?.name || ''
                      : '授業を選択してください'
                  }
                />
              )}
            />

            {/* 理解度 */}
            <Box>
              <Typography component="legend" sx={{ mb: 1 }}>
                理解度
              </Typography>
              <Controller
                name="understanding"
                control={control}
                render={({ field }) => (
                  <Box>
                    <Rating
                      {...field}
                      value={field.value}
                      onChange={(_, value) => field.onChange(value || 1)}
                      size="large"
                    />
                    {errors.understanding && (
                      <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                        {errors.understanding.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Box>

            {/* 進捗 */}
            <Controller
              name="progress"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="進捗"
                  error={!!errors.progress}
                  helperText={errors.progress?.message}
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="今日の授業で学習した内容を入力してください"
                />
              )}
            />

            {/* 宿題 */}
            <Controller
              name="homework"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="宿題（任意）"
                  error={!!errors.homework}
                  helperText={errors.homework?.message}
                  multiline
                  rows={2}
                  fullWidth
                  placeholder="出された宿題を入力してください"
                />
              )}
            />

            {/* 次回目標 */}
            <Controller
              name="nextGoal"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="次回目標"
                  error={!!errors.nextGoal}
                  helperText={errors.nextGoal?.message}
                  multiline
                  rows={2}
                  fullWidth
                  placeholder="次回の授業の目標を入力してください"
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button type="submit" variant="contained">
            作成
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
