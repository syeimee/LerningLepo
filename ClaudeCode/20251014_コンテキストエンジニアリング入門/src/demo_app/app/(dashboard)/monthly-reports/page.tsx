'use client'

import { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DownloadIcon from '@mui/icons-material/Download'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {
  monthlyReports as initialMonthlyReports,
  getStudentById,
  getTeacherById,
  type MonthlyReport,
} from '@/lib/data'
import MonthlyReportForm from '@/components/forms/MonthlyReportForm'
import type { MonthlyReportFormData } from '@/lib/validations/monthlyReport'
import { exportMonthlyReportsToCSV } from '@/lib/utils/csvExport'

// デモ用: 現在ログイン中の講師IDを仮定
const CURRENT_TEACHER_ID = 'teacher-1'

export default function MonthlyReportsPage() {
  const [monthlyReports, setMonthlyReports] = useState<MonthlyReport[]>(initialMonthlyReports)
  const [formOpen, setFormOpen] = useState(false)

  const handleFormSubmit = (data: MonthlyReportFormData) => {
    const newReport: MonthlyReport = {
      id: `report-${Date.now()}`,
      month: data.month,
      studentId: data.studentId,
      teacherId: CURRENT_TEACHER_ID,
      subject: data.subject,
      lessonCount: data.lessonCount,
      absenceCount: data.absenceCount,
      lateCount: data.lateCount,
      learningMotivation: data.learningMotivation,
      homeworkEngagement: data.homeworkEngagement,
      reviewEngagement: data.reviewEngagement,
      lessonContent: data.lessonContent,
      understanding: data.understanding,
      weeklyTestDates: data.weeklyTestDates,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setMonthlyReports([newReport, ...monthlyReports])
  }

  const handleExportCSV = () => {
    exportMonthlyReportsToCSV(
      monthlyReports,
      (id) => getStudentById(id)?.name || '不明',
      (id) => getTeacherById(id)?.name || '不明'
    )
  }

  const formatMonth = (month: string): string => {
    const [year, monthNum] = month.split('-')
    return `${year}年${monthNum}月`
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            月報管理
          </Typography>
          <Typography variant="body2" color="text.secondary">
            担当している生徒の月報を作成・管理します
          </Typography>
        </div>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExportCSV}
            disabled={monthlyReports.length === 0}
          >
            CSV出力
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setFormOpen(true)}>
            月報作成
          </Button>
        </Box>
      </Box>

      <MonthlyReportForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        teacherId={CURRENT_TEACHER_ID}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>対象月</TableCell>
              <TableCell>生徒名</TableCell>
              <TableCell>科目</TableCell>
              <TableCell align="center">授業回数</TableCell>
              <TableCell align="center">欠席</TableCell>
              <TableCell align="center">遅刻</TableCell>
              <TableCell align="center">学習意欲</TableCell>
              <TableCell align="center">宿題</TableCell>
              <TableCell align="center">復習</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monthlyReports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    月報がまだ作成されていません。「月報作成」ボタンから作成してください。
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              monthlyReports.map((report) => {
                const student = getStudentById(report.studentId)
                return (
                  <TableRow key={report.id} hover>
                    <TableCell>{formatMonth(report.month)}</TableCell>
                    <TableCell>{student?.name || '不明'}</TableCell>
                    <TableCell>
                      <Chip label={report.subject} size="small" color="primary" />
                    </TableCell>
                    <TableCell align="center">{report.lessonCount}回</TableCell>
                    <TableCell align="center">{report.absenceCount}回</TableCell>
                    <TableCell align="center">{report.lateCount}回</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={report.learningMotivation}
                        size="small"
                        color={
                          report.learningMotivation === '◎'
                            ? 'success'
                            : report.learningMotivation === '○'
                              ? 'default'
                              : 'warning'
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={report.homeworkEngagement}
                        size="small"
                        color={
                          report.homeworkEngagement === '◎'
                            ? 'success'
                            : report.homeworkEngagement === '○'
                              ? 'default'
                              : 'warning'
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={report.reviewEngagement}
                        size="small"
                        color={
                          report.reviewEngagement === '◎'
                            ? 'success'
                            : report.reviewEngagement === '○'
                              ? 'default'
                              : 'warning'
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="詳細表示">
                        <IconButton size="small">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
