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
import { createLesson } from '@/app/(dashboard)/schedule/actions'
import { getStudents } from '@/app/(dashboard)/students/actions'
import { getTeachers } from '@/app/(dashboard)/teachers/actions'
import { useRouter } from 'next/navigation'
import type { Student, Teacher } from '@prisma/client'

interface AddLessonProps {
  isOpen: boolean
  toggleOpen: () => void
}

const availableSubjects = ['数学', '英語', '国語', '物理', '化学', '生物', '地理', '歴史', '現代社会']

const timeSlots = [
  { value: '09:00-10:00', label: '1限 (09:00-10:00)' },
  { value: '10:10-11:10', label: '2限 (10:10-11:10)' },
  { value: '11:20-12:20', label: '3限 (11:20-12:20)' },
  { value: '13:20-14:20', label: '4限 (13:20-14:20)' },
  { value: '14:30-15:30', label: '5限 (14:30-15:30)' },
  { value: '15:40-16:40', label: '6限 (15:40-16:40)' },
  { value: '16:50-17:50', label: '7限 (16:50-17:50)' },
  { value: '18:00-19:00', label: '8限 (18:00-19:00)' },
]

const AddLesson = ({ isOpen, toggleOpen }: AddLessonProps) => {
  const router = useRouter()

  const [students, setStudents] = useState<Student[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    studentId: '',
    teacherId: '',
    subject: '',
    date: '',
    timeSlot: '',
    location: '',
    notes: '',
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

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!formData.studentId || !formData.teacherId || !formData.subject || !formData.date || !formData.timeSlot) {
      setError('必須項目を入力してください')
      return
    }

    const [startTime, endTime] = formData.timeSlot.split('-')

    setLoading(true)
    setError(null)

    try {
      const result = await createLesson({
        studentId: formData.studentId,
        teacherId: formData.teacherId,
        subject: formData.subject,
        date: formData.date,
        startTime,
        endTime,
        location: formData.location,
        notes: formData.notes,
      })

      if (result.success) {
        // フォームをリセット
        setFormData({
          studentId: '',
          teacherId: '',
          subject: '',
          date: '',
          timeSlot: '',
          location: '',
          notes: '',
        })

        toggleOpen()
        router.refresh() // ページをリフレッシュしてデータを再取得
      } else {
        setError(result.error || '授業の追加に失敗しました')
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
      date: '',
      timeSlot: '',
      location: '',
      notes: '',
    })
    setError(null)
    toggleOpen()
  }

  return (
    <>
      <Dialog open={isOpen} onClose={handleCancel} maxWidth="sm" fullWidth>
        <Container maxWidth="sm" sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom align="center">
            授業を追加
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
                    {teacher.lastName} {teacher.firstName} ({teacher.subjects.join(', ')})
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

            <Grid item xs={12}>
              <TextField
                type="date"
                label="授業日"
                variant="outlined"
                fullWidth
                required
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                disabled={loading}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="時限"
                variant="outlined"
                fullWidth
                required
                value={formData.timeSlot}
                onChange={(e) => handleChange('timeSlot', e.target.value)}
                disabled={loading}
              >
                {timeSlots.map((slot) => (
                  <MenuItem key={slot.value} value={slot.value}>
                    {slot.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="場所"
                variant="outlined"
                fullWidth
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="備考"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
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
                {loading ? '追加中...' : '追加する'}
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

export default AddLesson
