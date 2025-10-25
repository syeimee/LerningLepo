'use client'

import { useState, useMemo } from 'react'
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
  Rating,
  Chip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import {
  getStudentById,
  getTeacherById,
  getLessonById,
  type DailyReport,
} from '@/lib/data'
import DailyReportForm from '@/components/forms/DailyReportForm'
import type { DailyReportFormData } from '@/lib/validations/dailyReport'
import { useData } from '@/contexts/DataContext'
import { useSession } from '@/contexts/SessionContext'

export default function DailyReportsPage() {
  const { session } = useSession()
  const { dailyReports, addDailyReport } = useData()
  const [formOpen, setFormOpen] = useState(false)
  const currentUser = session.user

  // ロール別にフィルタリングしてソート（新しい順）
  const sortedReports = useMemo(() => {
    let filtered = dailyReports

    // 講師の場合は自分の担当分のみ表示
    if (currentUser?.role === 'TEACHER') {
      const currentTeacherId = currentUser && 'teacherId' in currentUser ? currentUser.teacherId : null
      if (currentTeacherId) {
        filtered = dailyReports.filter((report) => report.teacherId === currentTeacherId)
      }
    }

    // 作成日時順にソート（新しい順）
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return dateB.getTime() - dateA.getTime()
    })
  }, [dailyReports, currentUser])

  const handleCreateReport = (data: DailyReportFormData) => {
    const newReport: DailyReport = {
      id: `report-${Date.now()}`,
      lessonId: data.lessonId,
      studentId: data.studentId,
      teacherId: data.teacherId,
      understanding: data.understanding,
      progress: data.progress,
      homework: data.homework || '',
      nextGoal: data.nextGoal,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    addDailyReport(newReport)
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            日報管理
          </Typography>
          <Typography variant="body2" color="text.secondary">
            日報総数: {sortedReports.length}件
          </Typography>
        </div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setFormOpen(true)}>
          日報を作成
        </Button>
      </Box>

      <DailyReportForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreateReport}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>作成日</TableCell>
              <TableCell>生徒</TableCell>
              <TableCell>講師</TableCell>
              <TableCell>科目</TableCell>
              <TableCell>理解度</TableCell>
              <TableCell>進捗</TableCell>
              <TableCell>次の目標</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedReports.map((report) => {
              const student = getStudentById(report.studentId)
              const teacher = getTeacherById(report.teacherId)
              const lesson = getLessonById(report.lessonId)

              return (
                <TableRow key={report.id} hover>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(report.createdAt).toLocaleDateString('ja-JP')}
                    </Typography>
                  </TableCell>
                  <TableCell>{student?.name || '不明'}</TableCell>
                  <TableCell>{teacher?.name || '不明'}</TableCell>
                  <TableCell>
                    <Chip label={lesson?.subject || '不明'} size="small" />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating value={report.understanding} readOnly size="small" />
                      <Typography variant="caption">({report.understanding}/5)</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        maxWidth: 200,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {report.progress}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        maxWidth: 150,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {report.nextGoal}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="outlined">
                      詳細
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
