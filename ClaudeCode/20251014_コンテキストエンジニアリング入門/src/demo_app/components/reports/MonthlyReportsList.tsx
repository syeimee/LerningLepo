'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Box,
  Typography,
  Link,
  Checkbox,
  IconButton,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import LaunchIcon from '@mui/icons-material/Launch'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import type { MonthlyReport, Student, Teacher } from '@prisma/client'
import AddMonthlyReport from './AddMonthlyReport'
import ExportLoadingModal from './ExportLoadingModal'
import { useRouter } from 'next/navigation'

interface MonthlyReportWithRelations extends MonthlyReport {
  student: Student
  teacher: Teacher
}

interface MonthlyReportsListProps {
  initialReports: MonthlyReportWithRelations[]
}

const motivationLabels = {
  1: '低い',
  2: '普通',
  3: '高い',
}

const motivationColors = {
  1: 'error' as const,
  2: 'warning' as const,
  3: 'success' as const,
}

const availableSubjects = ['数学', '英語', '国語', '物理', '化学', '生物', '地理', '歴史', '現代社会']

export default function MonthlyReportsList({ initialReports }: MonthlyReportsListProps) {
  const router = useRouter()
  const [reports, setReports] = useState(initialReports)
  const [addReportOpen, setAddReportOpen] = useState(false)
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set())
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [exportStatus, setExportStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [exportProgress, setExportProgress] = useState(0)

  // initialReportsが変わったらreportsを更新（Server Componentからの再検証時）
  useEffect(() => {
    setReports(initialReports)
  }, [initialReports])

  // 現在の年月を取得
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1

  // フィルター状態
  const [filterStartDate, setFilterStartDate] = useState<string>(
    `${currentYear}-${String(currentMonth).padStart(2, '0')}`
  )
  const [filterEndDate, setFilterEndDate] = useState<string>(
    `${currentYear}-${String(currentMonth).padStart(2, '0')}`
  )
  const [filterStudent, setFilterStudent] = useState<string>('all')
  const [filterSubject, setFilterSubject] = useState<string>('all')

  // フィルタリング処理
  const filteredReports = useMemo(() => {
    let filtered = reports

    // 期間フィルター
    if (filterStartDate) {
      const [startYear, startMonth] = filterStartDate.split('-').map(Number)
      filtered = filtered.filter((report) => {
        const reportDate = report.year * 100 + report.month
        const startDateNum = startYear * 100 + startMonth
        return reportDate >= startDateNum
      })
    }

    if (filterEndDate) {
      const [endYear, endMonth] = filterEndDate.split('-').map(Number)
      filtered = filtered.filter((report) => {
        const reportDate = report.year * 100 + report.month
        const endDateNum = endYear * 100 + endMonth
        return reportDate <= endDateNum
      })
    }

    // 生徒フィルター
    if (filterStudent !== 'all') {
      filtered = filtered.filter((report) => report.studentId === filterStudent)
    }

    // 科目フィルター
    if (filterSubject !== 'all') {
      filtered = filtered.filter((report) => report.subject === filterSubject)
    }

    return filtered
  }, [reports, filterStartDate, filterEndDate, filterStudent, filterSubject])

  // 生徒リスト（重複を除く）
  const availableStudents = useMemo(() => {
    const students = reports.map((r) => ({
      id: r.studentId,
      name: `${r.student.lastName} ${r.student.firstName}`,
    }))
    // 重複を除く
    const uniqueStudents = Array.from(
      new Map(students.map((s) => [s.id, s])).values()
    )
    return uniqueStudents
  }, [reports])

  // 全選択/クリア（フィルタリングされた結果に対して）
  const handleSelectAll = () => {
    if (selectedReports.size === filteredReports.length) {
      setSelectedReports(new Set())
    } else {
      setSelectedReports(new Set(filteredReports.map((r) => r.id)))
    }
  }

  // チェックボックスのトグル
  const handleToggleSelect = (id: string) => {
    const newSelected = new Set(selectedReports)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedReports(newSelected)
  }

  // Google Sheets出力ハンドラー
  const handleExport = async () => {
    if (selectedReports.size === 0) {
      return
    }

    // 出力モーダルを開く
    setExportStatus('loading')
    setExportProgress(0)
    setExportModalOpen(true)

    try {
      const totalReports = selectedReports.size
      let currentProgress = 0

      // 選択されたレポートIDの配列を作成
      const selectedIds = Array.from(selectedReports)

      // Google Sheets APIに送信
      const response = await fetch('/api/google-sheets/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportIds: selectedIds,
        }),
      })

      // プログレスのシミュレーション（実際のAPIは進捗を返すことができる）
      for (let i = 0; i < totalReports; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        currentProgress = Math.round(((i + 1) / totalReports) * 100)
        setExportProgress(currentProgress)
      }

      if (!response.ok) {
        throw new Error('Export failed')
      }

      const data = await response.json()

      // 選択されたレポートのgoogleSheetUrlを更新
      setReports((prevReports) =>
        prevReports.map((report) => {
          if (selectedIds.includes(report.id)) {
            return {
              ...report,
              googleSheetUrl: data.spreadsheetUrls?.[report.id] || `https://docs.google.com/spreadsheets/d/${report.id}/edit`,
            }
          }
          return report
        })
      )

      // 成功
      setExportStatus('success')

      // 3秒後にモーダルを閉じる
      setTimeout(() => {
        setExportModalOpen(false)
        setSelectedReports(new Set()) // 選択をクリア
        router.refresh() // データを再取得
      }, 3000)
    } catch (error) {
      console.error('Export error:', error)
      setExportStatus('error')
    }
  }

  // 出力キャンセルハンドラー
  const handleCancelExport = () => {
    setExportModalOpen(false)
  }

  return (
    <>
      {/* フィルター */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          絞り込み
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <TextField
            type="month"
            label="開始月"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
            sx={{ minWidth: 150 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="month"
            label="終了月"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
            sx={{ minWidth: 150 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            label="生徒名"
            value={filterStudent}
            onChange={(e) => setFilterStudent(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">すべて</MenuItem>
            {availableStudents.map((student) => (
              <MenuItem key={student.id} value={student.id}>
                {student.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="科目"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="all">すべて</MenuItem>
            {availableSubjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={handleExport}
            disabled={selectedReports.size === 0}
          >
            Google Sheetsに出力 ({selectedReports.size}件)
          </Button>
          {selectedReports.size > 0 && (
            <Button variant="text" onClick={handleSelectAll}>
              クリア
            </Button>
          )}
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddReportOpen(true)}>
          月報を作成
        </Button>
      </Box>

      <AddMonthlyReport isOpen={addReportOpen} toggleOpen={() => setAddReportOpen(!addReportOpen)} />

      <ExportLoadingModal
        open={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        onCancel={handleCancelExport}
        status={exportStatus}
        progress={exportProgress}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedReports.size === filteredReports.length && filteredReports.length > 0}
                  indeterminate={selectedReports.size > 0 && selectedReports.size < filteredReports.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>対象年月</TableCell>
              <TableCell>生徒</TableCell>
              <TableCell>講師</TableCell>
              <TableCell>科目</TableCell>
              <TableCell align="center">授業回数</TableCell>
              <TableCell align="center">欠席</TableCell>
              <TableCell align="center">遅刻</TableCell>
              <TableCell align="center">学習意欲</TableCell>
              <TableCell>総評</TableCell>
              <TableCell align="center">Google Sheets</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  <Typography variant="body2" color="text.secondary">
                    月報がありません
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredReports.map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedReports.has(report.id)}
                      onChange={() => handleToggleSelect(report.id)}
                    />
                  </TableCell>
                  <TableCell>
                    {report.year}年{report.month}月
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
                  <TableCell align="center">{report.totalLessons}</TableCell>
                  <TableCell align="center">{report.absences}</TableCell>
                  <TableCell align="center">{report.lateCount}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={motivationLabels[report.learningMotivation as 1 | 2 | 3]}
                      color={motivationColors[report.learningMotivation as 1 | 2 | 3]}
                      size="small"
                    />
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
                      {report.overallComment}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {report.googleSheetUrl ? (
                      <Link
                        href={report.googleSheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}
                      >
                        開く <LaunchIcon fontSize="small" />
                      </Link>
                    ) : (
                      <Typography variant="caption" color="text.disabled">
                        -
                      </Typography>
                    )}
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
