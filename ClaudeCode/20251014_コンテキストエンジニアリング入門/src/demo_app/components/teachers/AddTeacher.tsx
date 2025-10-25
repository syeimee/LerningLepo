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
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  Box,
} from '@mui/material'
import { useState } from 'react'
import { createTeacher } from '@/app/(dashboard)/teachers/actions'
import { useRouter } from 'next/navigation'

interface AddTeacherProps {
  isOpen: boolean
  toggleOpen: () => void
}

const AddTeacher = ({ isOpen, toggleOpen }: AddTeacherProps) => {
  const router = useRouter()
  const availableSubjects = ['数学', '英語', '国語', '物理', '化学', '生物', '地理', '歴史', '現代社会']

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    email: '',
    phone: '',
    subjects: [] as string[],
    notes: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: string, value: string | string[]) => {
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

    if (!formData.email) {
      setError('メールアドレスは必須です')
      return
    }

    if (formData.subjects.length === 0) {
      setError('少なくとも1つの担当科目を選択してください')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await createTeacher(formData)

      if (result.success) {
        // フォームをリセット
        setFormData({
          lastName: '',
          firstName: '',
          lastNameKana: '',
          firstNameKana: '',
          email: '',
          phone: '',
          subjects: [],
          notes: '',
        })

        toggleOpen()
        router.refresh() // ページをリフレッシュしてデータを再取得
      } else {
        setError(result.error || '講師の追加に失敗しました')
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
      subjects: [],
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
              新規講師登録
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
                  label="メールアドレス"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={loading}
                  helperText="ログインに使用されます"
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
                <FormControl fullWidth required>
                  <InputLabel>担当科目</InputLabel>
                  <Select
                    multiple
                    value={formData.subjects}
                    onChange={(e) => handleChange('subjects', e.target.value as string[])}
                    input={<OutlinedInput label="担当科目" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" color="primary" />
                        ))}
                      </Box>
                    )}
                    disabled={loading}
                  >
                    {availableSubjects.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        {subject}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                  placeholder="経歴、専門分野など"
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

export default AddTeacher
