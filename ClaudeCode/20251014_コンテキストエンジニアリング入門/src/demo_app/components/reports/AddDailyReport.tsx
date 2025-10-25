'use client'

import {
  Button,
  Container,
  Dialog,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Alert,
  Rating,
  Box,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { createDailyReport } from '@/app/(dashboard)/reports/daily/actions'
import { getLessons } from '@/app/(dashboard)/schedule/actions'
import { useRouter } from 'next/navigation'
import type { Lesson, Student, Teacher, DailyReport } from '@prisma/client'

interface LessonWithRelations extends Lesson {
  student: Student
  teacher: Teacher
  dailyReport: DailyReport | null
}

interface AddDailyReportProps {
  isOpen: boolean
  toggleOpen: () => void
}

const AddDailyReport = ({ isOpen, toggleOpen }: AddDailyReportProps) => {
  const router = useRouter()

  const [lessons, setLessons] = useState<LessonWithRelations[]>([])
  const [selectedLesson, setSelectedLesson] = useState<LessonWithRelations | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    lessonId: '',
    theme: '',
    content: '',
    materials: '',
    understanding: 3,
    homework: '',
    nextPlan: '',
    remarks: '',
  })

  // 授業一覧を取得（日報未作成かつ過去の授業）
  useEffect(() => {
    async function fetchLessons() {
      const result = await getLessons()
      if (result.success && result.data) {
        // 日報が未作成で、過去の日付の授業のみ表示
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const availableLessons = result.data.filter(lesson => {
          const lessonDate = new Date(lesson.date)
          lessonDate.setHours(0, 0, 0, 0)
          return !lesson.dailyReport && lessonDate <= today
        })
        setLessons(availableLessons)
      }
    }

    if (isOpen) {
      fetchLessons()
    }
  }, [isOpen])

  const handleLessonChange = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId)
    setSelectedLesson(lesson || null)
    setFormData(prev => ({
      ...prev,
      lessonId,
    }))
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!formData.lessonId || !formData.theme || !formData.content) {
      setError('必須項目を入力してください')
      return
    }

    if (!selectedLesson) {
      setError('授業を選択してください')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await createDailyReport({
        lessonId: formData.lessonId,
        teacherId: selectedLesson.teacherId,
        studentId: selectedLesson.studentId,
        subject: selectedLesson.subject,
        lessonDate: new Date(selectedLesson.date).toISOString().split('T')[0],
        theme: formData.theme,
        content: formData.content,
        materials: formData.materials,
        understanding: formData.understanding,
        homework: formData.homework,
        nextPlan: formData.nextPlan,
        remarks: formData.remarks,
      })

      if (result.success) {
        // フォームをリセット
        setFormData({
          lessonId: '',
          theme: '',
          content: '',
          materials: '',
          understanding: 3,
          homework: '',
          nextPlan: '',
          remarks: '',
        })
        setSelectedLesson(null)

        toggleOpen()
        router.refresh() // ページをリフレッシュしてデータを再取得
      } else {
        setError(result.error || '日報の作成に失敗しました')
      }
    } catch (err) {
      setError('予期しないエラーが発生しました')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    // フォームをリセット
    setFormData({
      lessonId: '',
      theme: '',
      content: '',
      materials: '',
      understanding: 3,
      homework: '',
      nextPlan: '',
      remarks: '',
    })
    setSelectedLesson(null)
    setError(null)
    toggleOpen()
  }

  return (
    <>
      <Dialog open={isOpen} onClose={handleCancel} maxWidth="md" fullWidth>
        <Container maxWidth="md" sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom align="center">
            日報を作成
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                select
                label="授業"
                variant="outlined"
                fullWidth
                required
                value={formData.lessonId}
                onChange={(e) => handleLessonChange(e.target.value)}
                disabled={loading}
                helperText="日報未作成の過去の授業のみ表示されます"
              >
                {lessons.length === 0 ? (
                  <MenuItem disabled>日報作成可能な授業がありません</MenuItem>
                ) : (
                  lessons.map((lesson) => (
                    <MenuItem key={lesson.id} value={lesson.id}>
                      {new Date(lesson.date).toLocaleDateString('ja-JP')} {lesson.startTime} - {lesson.subject} - {lesson.student.lastName} {lesson.student.firstName}
                    </MenuItem>
                  ))
                )}
              </TextField>
            </Grid>

            {selectedLesson && (
              <Grid item xs={12}>
                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="body2"><strong>生徒:</strong> {selectedLesson.student.lastName} {selectedLesson.student.firstName}</Typography>
                  <Typography variant="body2"><strong>講師:</strong> {selectedLesson.teacher.lastName} {selectedLesson.teacher.firstName}</Typography>
                  <Typography variant="body2"><strong>科目:</strong> {selectedLesson.subject}</Typography>
                  <Typography variant="body2"><strong>日時:</strong> {new Date(selectedLesson.date).toLocaleDateString('ja-JP')} {selectedLesson.startTime}-{selectedLesson.endTime}</Typography>
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                label="テーマ"
                variant="outlined"
                fullWidth
                required
                value={formData.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="授業内容"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="使用教材"
                variant="outlined"
                fullWidth
                value={formData.materials}
                onChange={(e) => handleChange('materials', e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography component="legend">理解度</Typography>
              <Rating
                value={formData.understanding}
                onChange={(_, value) => handleChange('understanding', value || 3)}
                max={5}
                size="large"
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="宿題"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                value={formData.homework}
                onChange={(e) => handleChange('homework', e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="次回の予定"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                value={formData.nextPlan}
                onChange={(e) => handleChange('nextPlan', e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="備考"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                value={formData.remarks}
                onChange={(e) => handleChange('remarks', e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                disabled={loading || !formData.lessonId}
              >
                {loading ? '作成中...' : '作成する'}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                sx={{ ml: 2 }}
                onClick={handleCancel}
                disabled={loading}
              >
                キャンセル
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </>
  )
}

export default AddDailyReport
