'use client'

import { useState, useMemo } from 'react'
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
  TableSortLabel,
  TextField,
  MenuItem,
  Stack,
  Grid,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
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

const availableSubjects = ['数学', '英語', '国語', '物理', '化学', '生物', '地理', '歴史', '現代社会']

export default function DailyReportsList({ initialReports }: DailyReportsListProps) {
  const [addReportOpen, setAddReportOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // フィルター状態
  const [filterStartDate, setFilterStartDate] = useState<string>('')
  const [filterEndDate, setFilterEndDate] = useState<string>('')
  const [filterStudent, setFilterStudent] = useState<string>('all')
  const [filterTeacher, setFilterTeacher] = useState<string>('all')
  const [filterSubject, setFilterSubject] = useState<string>('all')

  // 生徒リスト（重複を除く）
  const availableStudents = useMemo(() => {
    const students = initialReports.map((r) => ({
      id: r.studentId,
      name: `${r.student.lastName} ${r.student.firstName}`,
    }))
    const uniqueStudents = Array.from(
      new Map(students.map((s) => [s.id, s])).values()
    )
    return uniqueStudents.sort((a, b) => a.name.localeCompare(b.name, 'ja'))
  }, [initialReports])

  // 講師リスト（重複を除く）
  const availableTeachers = useMemo(() => {
    const teachers = initialReports.map((r) => ({
      id: r.teacherId,
      name: `${r.teacher.lastName} ${r.teacher.firstName}`,
    }))
    const uniqueTeachers = Array.from(
      new Map(teachers.map((t) => [t.id, t])).values()
    )
    return uniqueTeachers.sort((a, b) => a.name.localeCompare(b.name, 'ja'))
  }, [initialReports])

  // フィルタリング処理
  const filteredReports = useMemo(() => {
    let filtered = initialReports

    // 日付範囲フィルター
    if (filterStartDate) {
      const startDate = new Date(filterStartDate)
      startDate.setHours(0, 0, 0, 0)
      filtered = filtered.filter((report) => {
        const reportDate = new Date(report.lessonDate)
        reportDate.setHours(0, 0, 0, 0)
        return reportDate >= startDate
      })
    }

    if (filterEndDate) {
      const endDate = new Date(filterEndDate)
      endDate.setHours(23, 59, 59, 999)
      filtered = filtered.filter((report) => {
        const reportDate = new Date(report.lessonDate)
        reportDate.setHours(0, 0, 0, 0)
        return reportDate <= endDate
      })
    }

    // 生徒フィルター
    if (filterStudent !== 'all') {
      filtered = filtered.filter((report) => report.studentId === filterStudent)
    }

    // 講師フィルター
    if (filterTeacher !== 'all') {
      filtered = filtered.filter((report) => report.teacherId === filterTeacher)
    }

    // 科目フィルター
    if (filterSubject !== 'all') {
      filtered = filtered.filter((report) => report.subject === filterSubject)
    }

    return filtered
  }, [initialReports, filterStartDate, filterEndDate, filterStudent, filterTeacher, filterSubject])

  // ソート処理
  const sortedReports = useMemo(() => {
    return [...filteredReports].sort((a, b) => {
      const dateA = new Date(a.lessonDate).getTime()
      const dateB = new Date(b.lessonDate).getTime()
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })
  }, [filteredReports, sortOrder])

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <>
      {/* フィルターセクション */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <SearchIcon color="action" />
            <Typography variant="h6">検索・フィルター</Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="開始日"
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="終了日"
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select
                fullWidth
                label="生徒"
                value={filterStudent}
                onChange={(e) => setFilterStudent(e.target.value)}
                size="small"
              >
                <MenuItem value="all">すべて</MenuItem>
                {availableStudents.map((student) => (
                  <MenuItem key={student.id} value={student.id}>
                    {student.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select
                fullWidth
                label="講師"
                value={filterTeacher}
                onChange={(e) => setFilterTeacher(e.target.value)}
                size="small"
              >
                <MenuItem value="all">すべて</MenuItem>
                {availableTeachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select
                fullWidth
                label="科目"
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                size="small"
              >
                <MenuItem value="all">すべて</MenuItem>
                {availableSubjects.map((subject) => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {sortedReports.length}件の日報が見つかりました
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setFilterStartDate('')
                setFilterEndDate('')
                setFilterStudent('all')
                setFilterTeacher('all')
                setFilterSubject('all')
              }}
            >
              フィルターをクリア
            </Button>
          </Box>
        </Stack>
      </Paper>

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
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={sortOrder}
                  onClick={handleSortToggle}
                >
                  授業日
                </TableSortLabel>
              </TableCell>
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
            {sortedReports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body2" color="text.secondary">
                    日報がありません
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              sortedReports.map((report) => (
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
