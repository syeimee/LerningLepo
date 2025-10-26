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
  CircularProgress,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import AddStudents from './AddStudents'
import StudentDetails from './StudentDetails'
import { getStudentDetails } from '@/app/(dashboard)/students/actions'
import type { Student, Lesson, DailyReport, MonthlyReport, Teacher } from '@prisma/client'

interface StudentsListProps {
  initialStudents: Student[]
}

type StudentWithDetails = Student & {
  lessons: (Lesson & { teacher: Teacher; dailyReport: DailyReport | null })[]
  dailyReports: DailyReport[]
  monthlyReports: MonthlyReport[]
}

export default function StudentsList({ initialStudents }: StudentsListProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<StudentWithDetails | null>(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleViewDetails = async (studentId: string) => {
    setIsLoadingDetails(true)
    try {
      const result = await getStudentDetails(studentId)
      if (result.success && result.data) {
        setSelectedStudent(result.data)
        setDetailsOpen(true)
      } else {
        console.error('生徒詳細の取得に失敗しました:', result.error)
      }
    } catch (error) {
      console.error('生徒詳細の取得中にエラーが発生しました:', error)
    } finally {
      setIsLoadingDetails(false)
    }
  }

  const handleCloseDetails = () => {
    setDetailsOpen(false)
    setSelectedStudent(null)
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
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleViewDetails(student.id)}
                    disabled={isLoadingDetails}
                  >
                    {isLoadingDetails ? <CircularProgress size={20} /> : '詳細'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddStudents isOpen={isOpen} toggleOpen={toggleOpen} />
      {selectedStudent && (
        <StudentDetails
          student={selectedStudent}
          isOpen={detailsOpen}
          onClose={handleCloseDetails}
        />
      )}
    </Container>
  )
}
