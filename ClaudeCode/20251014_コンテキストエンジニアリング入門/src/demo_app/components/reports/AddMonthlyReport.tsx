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
} from '@mui/material'
import { useState, useEffect } from 'react'
import { createMonthlyReport } from '@/app/(dashboard)/reports/monthly/actions'
import { getStudents } from '@/app/(dashboard)/students/actions'
import { getTeachers } from '@/app/(dashboard)/teachers/actions'
import { useRouter } from 'next/navigation'
import type { Student, Teacher } from '@prisma/client'

interface AddMonthlyReportProps {
  isOpen: boolean
  toggleOpen: () => void
}

const availableSubjects = ['数学', '英語', '国語', '物理', '化学', '生物', '地理', '歴史', '現代社会']

const AddMonthlyReport = ({ isOpen, toggleOpen }: AddMonthlyReportProps) => {
  const router = useRouter()

  const [students, setStudents] = useState<Student[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1

  const [formData, setFormData] = useState({
    studentId: '',
    teacherId: '',
    subject: '',
    year: currentYear,
    month: currentMonth - 1 || 12, // 前月
    totalLessons: 0,
    absences: 0,
    lateCount: 0,
    learningMotivation: 2,
    homeworkEngagement: 2,
    reviewEngagement: 2,
    lessonContent: '',
    comprehension: '',
    overallComment: '',
  })

  // 生徒と講師のリストを取得
  useEffect(() => {
    async function fetchData() {
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

    if (isOpen) {
      fetchData()
    }
  }, [isOpen])

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!formData.studentId || !formData.teacherId || !formData.subject ||
        !formData.lessonContent || !formData.comprehension || !formData.overallComment) {
      setError('必須項目を入力してください')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await createMonthlyReport({
        studentId: formData.studentId,
        teacherId: formData.teacherId,
        subject: formData.subject,
        year: formData.year,
        month: formData.month,
        totalLessons: formData.totalLessons,
        absences: formData.absences,
        lateCount: formData.lateCount,
        learningMotivation: formData.learningMotivation,
        homeworkEngagement: formData.homeworkEngagement,
        reviewEngagement: formData.reviewEngagement,
        lessonContent: formData.lessonContent,
        comprehension: formData.comprehension,
        overallComment: formData.overallComment,
      })

      if (result.success) {
        // フォームをリセット
        setFormData({
          studentId: '',
          teacherId: '',
          subject: '',
          year: currentYear,
          month: currentMonth - 1 || 12,
          totalLessons: 0,
          absences: 0,
          lateCount: 0,
          learningMotivation: 2,
          homeworkEngagement: 2,
          reviewEngagement: 2,
          lessonContent: '',
          comprehension: '',
          overallComment: '',
        })

        toggleOpen()
        router.refresh() // ページをリフレッシュしてデータを再取得
      } else {
        setError(result.error || '月報の作成に失敗しました')
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
      studentId: '',
      teacherId: '',
      subject: '',
      year: currentYear,
      month: currentMonth - 1 || 12,
      totalLessons: 0,
      absences: 0,
      lateCount: 0,
      learningMotivation: 2,
      homeworkEngagement: 2,
      reviewEngagement: 2,
      lessonContent: '',
      comprehension: '',
      overallComment: '',
    })
    setError(null)
    toggleOpen()
  }

  return (
    <>
      <Dialog open={isOpen} onClose={handleCancel} maxWidth="md" fullWidth>
        <Container maxWidth="md" sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom align="center">
            月報を作成
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                select
                label="年"
                variant="outlined"
                fullWidth
                required
                value={formData.year}
                onChange={(e) => handleChange('year', Number(e.target.value))}
                disabled={loading}
              >
                {[currentYear - 1, currentYear, currentYear + 1].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}年
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                label="月"
                variant="outlined"
                fullWidth
                required
                value={formData.month}
                onChange={(e) => handleChange('month', Number(e.target.value))}
                disabled={loading}
              >
                {[...Array(12)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}月
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="生徒"
                variant="outlined"
                fullWidth
                required
                value={formData.studentId}
                onChange={(e) => handleChange('studentId', e.target.value)}
                disabled={loading}
              >
                {students.map((student) => (
                  <MenuItem key={student.id} value={student.id}>
                    {student.lastName} {student.firstName} ({student.grade})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="講師"
                variant="outlined"
                fullWidth
                required
                value={formData.teacherId}
                onChange={(e) => handleChange('teacherId', e.target.value)}
                disabled={loading}
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {teacher.lastName} {teacher.firstName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="科目"
                variant="outlined"
                fullWidth
                required
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                disabled={loading}
              >
                {availableSubjects.map((subject) => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={4}>
              <TextField
                type="number"
                label="授業回数"
                variant="outlined"
                fullWidth
                value={formData.totalLessons}
                onChange={(e) => handleChange('totalLessons', Number(e.target.value))}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                type="number"
                label="欠席"
                variant="outlined"
                fullWidth
                value={formData.absences}
                onChange={(e) => handleChange('absences', Number(e.target.value))}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                type="number"
                label="遅刻"
                variant="outlined"
                fullWidth
                value={formData.lateCount}
                onChange={(e) => handleChange('lateCount', Number(e.target.value))}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                select
                label="学習意欲"
                variant="outlined"
                fullWidth
                value={formData.learningMotivation}
                onChange={(e) => handleChange('learningMotivation', Number(e.target.value))}
                disabled={loading}
              >
                <MenuItem value={1}>低い</MenuItem>
                <MenuItem value={2}>普通</MenuItem>
                <MenuItem value={3}>高い</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={4}>
              <TextField
                select
                label="課題・宿題"
                variant="outlined"
                fullWidth
                value={formData.homeworkEngagement}
                onChange={(e) => handleChange('homeworkEngagement', Number(e.target.value))}
                disabled={loading}
              >
                <MenuItem value={1}>低い</MenuItem>
                <MenuItem value={2}>普通</MenuItem>
                <MenuItem value={3}>高い</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={4}>
              <TextField
                select
                label="復習の取り組み"
                variant="outlined"
                fullWidth
                value={formData.reviewEngagement}
                onChange={(e) => handleChange('reviewEngagement', Number(e.target.value))}
                disabled={loading}
              >
                <MenuItem value={1}>低い</MenuItem>
                <MenuItem value={2}>普通</MenuItem>
                <MenuItem value={3}>高い</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="授業内容"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={3}
                value={formData.lessonContent}
                onChange={(e) => handleChange('lessonContent', e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="理解度"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={3}
                value={formData.comprehension}
                onChange={(e) => handleChange('comprehension', e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="総評"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={3}
                value={formData.overallComment}
                onChange={(e) => handleChange('overallComment', e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                disabled={loading}
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

export default AddMonthlyReport
