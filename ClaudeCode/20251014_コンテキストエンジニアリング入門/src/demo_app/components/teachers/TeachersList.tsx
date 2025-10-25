'use client'

import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import AddTeacher from './AddTeacher'
import type { Teacher, User } from '@prisma/client'

interface TeachersListProps {
  initialTeachers: (Teacher & { user: User })[]
}

export default function TeachersList({ initialTeachers }: TeachersListProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            講師管理
          </Typography>
          <Typography variant="body2" color="text.secondary">
            登録講師数: {initialTeachers.length}名
          </Typography>
        </div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={toggleOpen}>
          講師を追加
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>名前</TableCell>
              <TableCell>担当科目</TableCell>
              <TableCell>連絡先</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {initialTeachers.map((teacher) => (
              <TableRow key={teacher.id} hover>
                <TableCell>
                  {teacher.lastName} {teacher.firstName}
                  {teacher.lastNameKana && teacher.firstNameKana && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      {teacher.lastNameKana} {teacher.firstNameKana}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {teacher.subjects.map((subject) => (
                      <Chip key={subject} label={subject} size="small" color="primary" variant="outlined" />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{teacher.email}</Typography>
                  {teacher.phone && (
                    <Typography variant="caption" color="text.secondary">
                      {teacher.phone}
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Button size="small" variant="outlined">
                    詳細
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddTeacher isOpen={isOpen} toggleOpen={toggleOpen} />
    </Container>
  )
}
