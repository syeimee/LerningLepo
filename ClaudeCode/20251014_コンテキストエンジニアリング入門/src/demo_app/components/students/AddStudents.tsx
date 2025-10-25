'use client'

import {
  Button,
  CardContent,
  Container,
  Dialog,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Alert,
} from '@mui/material'
import { useState } from 'react'
import { createStudent } from '@/app/(dashboard)/students/actions'
import { useRouter } from 'next/navigation'

interface AddStudentsProps {
  isOpen: boolean
  toggleOpen: () => void
}

const AddStudents = ({ isOpen, toggleOpen }: AddStudentsProps) => {
  const router = useRouter()
  const grades = ['中1', '中2', '中3', '高1', '高2', '高3']

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    email: '',
    phone: '',
    grade: '',
    targetUniversity: '',
    notes: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!formData.lastName || !formData.firstName) {
      setError('姓と名は必須です')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await createStudent(formData)

      if (result.success) {
        // フォームをリセット
        setFormData({
          lastName: '',
          firstName: '',
          lastNameKana: '',
          firstNameKana: '',
          email: '',
          phone: '',
          grade: '',
          targetUniversity: '',
          notes: '',
        })

        toggleOpen()
        router.refresh() // ページをリフレッシュしてデータを再取得
      } else {
        setError(result.error || '生徒の追加に失敗しました')
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
      lastName: '',
      firstName: '',
      lastNameKana: '',
      firstNameKana: '',
      email: '',
      phone: '',
      grade: '',
      targetUniversity: '',
      notes: '',
    })
    setError(null)
    toggleOpen()
  }

  return (
    <>
      <Dialog open={isOpen} onClose={handleCancel} maxWidth="sm" fullWidth>
        <Container maxWidth="sm" sx={{ mt: 3, mb: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center">
              新規生徒登録
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  label="姓"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="名"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="姓（カナ）"
                  variant="outlined"
                  fullWidth
                  value={formData.lastNameKana}
                  onChange={(e) => handleChange('lastNameKana', e.target.value)}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="名（カナ）"
                  variant="outlined"
                  fullWidth
                  value={formData.firstNameKana}
                  onChange={(e) => handleChange('firstNameKana', e.target.value)}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  label="学年"
                  variant="outlined"
                  fullWidth
                  value={formData.grade}
                  onChange={(e) => handleChange('grade', e.target.value)}
                  disabled={loading}
                >
                  {grades.map((grade) => (
                    <MenuItem key={grade} value={grade}>
                      {grade}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="志望大学"
                  variant="outlined"
                  fullWidth
                  value={formData.targetUniversity}
                  onChange={(e) => handleChange('targetUniversity', e.target.value)}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="メールアドレス"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="電話番号"
                  type="tel"
                  variant="outlined"
                  fullWidth
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="備考（苦手科目など）"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="苦手科目: 数学、物理"
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
                  {loading ? '登録中...' : '登録する'}
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
          </CardContent>
        </Container>
      </Dialog>
    </>
  )
}

export default AddStudents
