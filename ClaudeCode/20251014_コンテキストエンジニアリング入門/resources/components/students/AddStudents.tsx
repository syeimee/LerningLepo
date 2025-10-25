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
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  Box,
} from '@mui/material'
import { useState } from 'react'
import type { Student } from '@/lib/data'

interface AddStudentsProps {
  isOpen: boolean
  toggleOpen: () => void
  onAddStudent: (student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => void
}

const AddStudents = ({ isOpen, toggleOpen, onAddStudent }: AddStudentsProps) => {
  const grades = ['中1', '中2', '中3', '高1', '高2', '高3']
  const subjects = ['数学', '英語', '国語', '理科', '社会']

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    targetUniversity: '',
    weakSubjects: [] as string[],
  })

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.grade) {
      alert('名前と学年は必須です')
      return
    }

    onAddStudent(formData)

    // フォームをリセット
    setFormData({
      name: '',
      email: '',
      phone: '',
      grade: '',
      targetUniversity: '',
      weakSubjects: [],
    })

    toggleOpen()
  }

  const handleCancel = () => {
    // フォームをリセット
    setFormData({
      name: '',
      email: '',
      phone: '',
      grade: '',
      targetUniversity: '',
      weakSubjects: [],
    })
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

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="名前"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  label="学年"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.grade}
                  onChange={(e) => handleChange('grade', e.target.value)}
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
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>苦手科目</InputLabel>
                  <Select
                    multiple
                    value={formData.weakSubjects}
                    onChange={(e) => handleChange('weakSubjects', e.target.value as string[])}
                    input={<OutlinedInput label="苦手科目" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        {subject}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="メールアドレス"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
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
                />
              </Grid>

              <Grid item xs={12} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleSubmit}
                >
                  登録する
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  sx={{ ml: 2 }}
                  onClick={handleCancel}
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
