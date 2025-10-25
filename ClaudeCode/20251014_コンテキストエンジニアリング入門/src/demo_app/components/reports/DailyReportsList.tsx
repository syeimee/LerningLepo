'use client'

import { useState } from 'react'
import {
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
  Box,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import type { DailyReport, Student, Teacher, Lesson } from '@prisma/client'
import AddDailyReport from './AddDailyReport'

interface DailyReportWithRelations extends DailyReport {
  student: Student
  teacher: Teacher
  lesson: Lesson
}

interface DailyReportsListProps {
  initialReports: DailyReportWithRelations[]
}

export default function DailyReportsList({ initialReports }: DailyReportsListProps) {
  const [reports] = useState(initialReports)
  const [addReportOpen, setAddReportOpen] = useState(false)

  return (
    <>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddReportOpen(true)}>
          日報を作成
        </Button>
      </Box>

      <AddDailyReport isOpen={addReportOpen} toggleOpen={() => setAddReportOpen(!addReportOpen)} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>授業日</TableCell>
              <TableCell>生徒</TableCell>
              <TableCell>講師</TableCell>
              <TableCell>科目</TableCell>
              <TableCell>テーマ</TableCell>
              <TableCell>理解度</TableCell>
              <TableCell>授業内容</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body2" color="text.secondary">
                    日報がありません
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(report.lessonDate).toLocaleDateString('ja-JP')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {report.student.lastName} {report.student.firstName}
                  </TableCell>
                  <TableCell>
                    {report.teacher.lastName} {report.teacher.firstName}
                  </TableCell>
                  <TableCell>
                    <Chip label={report.subject} size="small" color="primary" />
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
                      {report.theme}
                    </Typography>
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
                      {report.content}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="outlined">
                      詳細
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
