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
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import AddStudents from './AddStudents'
import type { Student } from '@prisma/client'

interface StudentsListProps {
  initialStudents: Student[]
}

export default function StudentsList({ initialStudents }: StudentsListProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            生徒管理
          </Typography>
          <Typography variant="body2" color="text.secondary">
            登録生徒数: {initialStudents.length}名
          </Typography>
        </div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={toggleOpen}>
          生徒を追加
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>名前</TableCell>
              <TableCell>学年</TableCell>
              <TableCell>志望大学</TableCell>
              <TableCell>連絡先</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {initialStudents.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>
                  {student.lastName} {student.firstName}
                </TableCell>
                <TableCell>{student.grade || '-'}</TableCell>
                <TableCell>{student.targetUniversity || '-'}</TableCell>
                <TableCell>
                  <Typography variant="body2">{student.email || '-'}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {student.phone || '-'}
                  </Typography>
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
      <AddStudents isOpen={isOpen} toggleOpen={toggleOpen} />
    </Container>
  )
}
