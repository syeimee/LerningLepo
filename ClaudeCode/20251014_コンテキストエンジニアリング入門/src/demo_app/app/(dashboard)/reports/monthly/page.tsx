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
  IconButton,
  Chip,
  TextField,
  MenuItem,
  Stack,
  Checkbox,
  TableSortLabel,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { useState, useMemo } from 'react'
import MonthlyReportModal from '@/components/reports/MonthlyReportModal'
import ExportLoadingModal from '@/components/reports/ExportLoadingModal'
import { useSession } from '@/contexts/SessionContext'

// ダミーデータ型定義
interface DummyMonthlyReport {
  id: string
  studentId: string
  studentName: string
  subject: string
  teacherId: string
  teacherName: string
  year: number
  month: number
  totalLessons: number
  absences: number
  lateCount: number
  learningMotivation: number
  homeworkEngagement: number
  reviewEngagement: number
  lessonContent: string
  comprehension: string
  weeklyTestDates: string[]
  weeklyTestTopics: string[]
  weeklyTestScores: number[]
  weeklyTestPassingScores: number[]
  overallComment: string
  createdAt: string
  exportedAt?: string
  googleSheetUrl?: string
}

// ダミーデータ - 保存されたデータを想定（初期値）
const initialDummyMonthlyReports: DummyMonthlyReport[] = [
  {
    id: '1',
    studentId: '1',
    studentName: '田中太郎',
    subject: '数学',
    teacherId: 'teacher-1',
    teacherName: '佐藤先生',
    year: 2025,
    month: 10,
    totalLessons: 4,
    absences: 0,
    lateCount: 0,
    learningMotivation: 3,
    homeworkEngagement: 3,
    reviewEngagement: 2,
    lessonContent: '微分積分の基礎を学習しました。',
    comprehension: '概ね理解できています。',
    weeklyTestDates: ['2025-10-05', '2025-10-12'],
    weeklyTestTopics: ['微分の基本', '積分の基本'],
    weeklyTestScores: [85, 90],
    weeklyTestPassingScores: [80, 80],
    overallComment: '順調に成長しています。',
    createdAt: '2025-10-15',
  },
  {
    id: '2',
    studentId: '1',
    studentName: '田中太郎',
    subject: '英語',
    teacherId: 'teacher-2',
    teacherName: '鈴木先生',
    year: 2025,
    month: 10,
    totalLessons: 3,
    absences: 1,
    lateCount: 0,
    learningMotivation: 2,
    homeworkEngagement: 2,
    reviewEngagement: 2,
    lessonContent: '英文読解を学習しました。',
    comprehension: '基本的な理解は十分です。',
    weeklyTestDates: ['2025-10-08'],
    weeklyTestTopics: ['長文読解'],
    weeklyTestScores: [75],
    weeklyTestPassingScores: [70],
    overallComment: '継続して頑張ってください。',
    createdAt: '2025-10-16',
  },
  {
    id: '3',
    studentId: '2',
    studentName: '山田花子',
    subject: '数学',
    teacherId: 'teacher-1',
    teacherName: '佐藤先生',
    year: 2025,
    month: 10,
    totalLessons: 4,
    absences: 0,
    lateCount: 1,
    learningMotivation: 3,
    homeworkEngagement: 3,
    reviewEngagement: 3,
    lessonContent: '二次関数の応用を学習しました。',
    comprehension: '非常に良く理解しています。',
    weeklyTestDates: ['2025-10-06', '2025-10-13'],
    weeklyTestTopics: ['二次関数', '二次方程式'],
    weeklyTestScores: [95, 92],
    weeklyTestPassingScores: [85, 85],
    overallComment: '素晴らしい成長です。',
    createdAt: '2025-10-17',
  },
  {
    id: '4',
    studentId: '3',
    studentName: '鈴木一郎',
    subject: '化学',
    teacherId: 'teacher-2',
    teacherName: '鈴木先生',
    year: 2025,
    month: 9,
    totalLessons: 3,
    absences: 0,
    lateCount: 0,
    learningMotivation: 2,
    homeworkEngagement: 2,
    reviewEngagement: 2,
    lessonContent: '有機化学の基礎を学習しました。',
    comprehension: '基本は理解できています。',
    weeklyTestDates: ['2025-09-10', '2025-09-17', '2025-09-24'],
    weeklyTestTopics: ['アルカン', 'アルケン', 'アルキン'],
    weeklyTestScores: [80, 82, 85],
    weeklyTestPassingScores: [75, 75, 75],
    overallComment: '着実に進歩しています。',
    createdAt: '2025-09-30',
  },
]

const allDummyStudents = [
  { id: '1', name: '田中太郎' },
  { id: '2', name: '山田花子' },
  { id: '3', name: '鈴木一郎' },
  { id: '4', name: '佐藤美咲' },
]

const allDummySubjects = ['数学', '英語', '物理', '化学', '生物', '国語']

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

type SortKey = 'year' | 'month' | 'studentName' | 'subject' | 'teacherName' | 'totalLessons' | 'createdAt'
type SortOrder = 'asc' | 'desc'

export default function MonthlyReportsPage() {
  // 現在の年月を取得
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1

  // 月報データをステート管理
  const [reports, setReports] = useState<DummyMonthlyReport[]>(initialDummyMonthlyReports)

  // フィルター状態
  const [filterStartDate, setFilterStartDate] = useState<string>(
    `${currentYear}-${String(currentMonth).padStart(2, '0')}`
  )
  const [filterEndDate, setFilterEndDate] = useState<string>(
    `${currentYear}-${String(currentMonth).padStart(2, '0')}`
  )
  const [filterStudent, setFilterStudent] = useState<string>('all')
  const [filterSubject, setFilterSubject] = useState<string>('all')

  // チェックボックス状態
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set())

  // ソート状態
  const [sortKey, setSortKey] = useState<SortKey>('createdAt')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  // モーダル状態
  const [modalOpen, setModalOpen] = useState(false)
  const [editingReport, setEditingReport] = useState<DummyMonthlyReport | null>(null)

  // 出力モーダル状態
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [exportStatus, setExportStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [exportProgress, setExportProgress] = useState(0)

  // セッションから現在のユーザー情報を取得
  const { session } = useSession()
  const userRole = session.user?.role || 'ADMIN'
  const currentTeacherId = (session.user && 'teacherId' in session.user ? session.user.teacherId : null) || 'teacher-1'

  // ロールに基づいて月報をフィルタリング
  const getFilteredReports = () => {
    let filtered = reports

    // 講師の場合は担当生徒のみ
    if (userRole === 'TEACHER') {
      filtered = filtered.filter((report) => report.teacherId === currentTeacherId)
    }

    // 生徒の場合は空配列（月報は表示されない）
    if (userRole === 'STUDENT') {
      return []
    }

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
  }

  // ソート機能
  const sortedReports = useMemo(() => {
    const filteredReports = [...getFilteredReports()]

    filteredReports.sort((a, b) => {
      let aValue: string | number = a[sortKey]
      let bValue: string | number = b[sortKey]

      // 年月の場合は数値として比較
      if (sortKey === 'year' || sortKey === 'month') {
        aValue = a.year * 100 + a.month
        bValue = b.year * 100 + b.month
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return filteredReports
  }, [reports, filterStartDate, filterEndDate, filterStudent, filterSubject, sortKey, sortOrder, userRole])

  // 利用可能な生徒リスト（講師の場合は担当生徒のみ）
  const availableStudents = useMemo(() => {
    if (userRole === 'TEACHER') {
      // 講師が担当する生徒をスケジュールから取得（ここではダミーで実装）
      const assignedStudentIds = new Set(
        reports
          .filter((r) => r.teacherId === currentTeacherId)
          .map((r) => r.studentId)
      )
      return allDummyStudents.filter((s) => assignedStudentIds.has(s.id))
    }
    return allDummyStudents
  }, [userRole, reports])

  // 全選択/クリア
  const handleSelectAll = () => {
    if (selectedReports.size === sortedReports.length) {
      setSelectedReports(new Set())
    } else {
      setSelectedReports(new Set(sortedReports.map((r) => r.id)))
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

  // ソートハンドラー
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  // モーダルを開く（新規作成）
  const handleOpenCreateModal = () => {
    setEditingReport(null)
    setModalOpen(true)
  }

  // モーダルを開く（編集）
  const handleOpenEditModal = (report: DummyMonthlyReport) => {
    setEditingReport(report)
    setModalOpen(true)
  }

  // モーダルを閉じる
  const handleCloseModal = () => {
    setModalOpen(false)
    setEditingReport(null)
  }

  // 保存ハンドラー
  const handleSaveReport = (data: DummyMonthlyReport) => {
    // TODO: Server Actionで保存処理を実装
    // 成功メッセージなどを表示
  }

  // 削除ハンドラー
  const handleDelete = (id: string) => {
    if (confirm('この月報を削除してもよろしいですか?')) {
      // TODO: 削除処理を実装
    }
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
      // TODO: 実際のGoogle Sheets API呼び出し
      // ここではダミーの処理をシミュレート
      const totalReports = selectedReports.size
      let currentProgress = 0
      const exportedAt = new Date().toISOString()

      // 選択されたレポートIDの配列を作成
      const selectedIds = Array.from(selectedReports)

      for (let i = 0; i < totalReports; i++) {
        // 各月報を処理（ダミー）
        await new Promise((resolve) => setTimeout(resolve, 500))
        currentProgress = Math.round(((i + 1) / totalReports) * 100)
        setExportProgress(currentProgress)
      }

      // 選択されたレポートのexportedAtとgoogleSheetUrlを更新
      setReports((prevReports) =>
        prevReports.map((report) => {
          if (selectedIds.includes(report.id)) {
            return {
              ...report,
              exportedAt: exportedAt,
              googleSheetUrl: `https://docs.google.com/spreadsheets/d/${report.id}/edit`,
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
      }, 3000)
    } catch (error) {
      setExportStatus('error')
    }
  }

  // 出力キャンセルハンドラー
  const handleCancelExport = () => {
    // TODO: 実際の処理をキャンセル
    setExportModalOpen(false)
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          月報一覧
        </Typography>
        <Typography variant="body2" color="text.secondary">
          作成済みの月報の確認・編集・削除ができます
        </Typography>
      </Box>

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
            {allDummySubjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>

      {/* アクションボタン */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        {(userRole === 'ADMIN' || userRole === 'TEACHER') && (
          <>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreateModal}>
              月報作成
            </Button>
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={handleExport}
              disabled={selectedReports.size === 0}
            >
              Google Sheetsに出力 ({selectedReports.size}件)
            </Button>
            <Button variant="text" onClick={handleSelectAll}>
              {selectedReports.size === sortedReports.length ? 'クリア' : '全選択'}
            </Button>
          </>
        )}
      </Box>

      {/* 月報一覧テーブル */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedReports.size === sortedReports.length && sortedReports.length > 0}
                  indeterminate={selectedReports.size > 0 && selectedReports.size < sortedReports.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortKey === 'year' || sortKey === 'month'}
                  direction={sortOrder}
                  onClick={() => handleSort('month')}
                >
                  対象月
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortKey === 'studentName'}
                  direction={sortOrder}
                  onClick={() => handleSort('studentName')}
                >
                  生徒名
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortKey === 'subject'}
                  direction={sortOrder}
                  onClick={() => handleSort('subject')}
                >
                  科目
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortKey === 'teacherName'}
                  direction={sortOrder}
                  onClick={() => handleSort('teacherName')}
                >
                  講師名
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={sortKey === 'totalLessons'}
                  direction={sortOrder}
                  onClick={() => handleSort('totalLessons')}
                >
                  授業回数
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">欠席</TableCell>
              <TableCell align="center">遅刻</TableCell>
              <TableCell align="center">学習意欲</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortKey === 'createdAt'}
                  direction={sortOrder}
                  onClick={() => handleSort('createdAt')}
                >
                  作成日
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">出力日時</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedReports.map((report) => (
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
                <TableCell>{report.studentName}</TableCell>
                <TableCell>{report.subject}</TableCell>
                <TableCell>{report.teacherName}</TableCell>
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
                <TableCell>{report.createdAt}</TableCell>
                <TableCell align="center">
                  {report.exportedAt ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(report.exportedAt).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Typography>
                      {report.googleSheetUrl && (
                        <IconButton
                          component="a"
                          href={report.googleSheetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          title="Google Sheetsで開く"
                          color="success"
                        >
                          <FileDownloadIcon />
                        </IconButton>
                      )}
                    </Box>
                  ) : (
                    <Typography variant="caption" color="text.disabled">
                      -
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleOpenEditModal(report)}
                    color="primary"
                    size="small"
                    title="編集"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(report.id)}
                    color="error"
                    size="small"
                    title="削除"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {sortedReports.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center', mt: 3 }}>
          <Typography color="text.secondary">月報データがありません</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreateModal}
            sx={{ mt: 2 }}
          >
            月報を作成
          </Button>
        </Paper>
      )}

      {/* 月報作成/編集モーダル */}
      <MonthlyReportModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveReport}
        initialData={editingReport}
        mode={editingReport ? 'edit' : 'create'}
      />

      {/* Google Sheets出力ローディングモーダル */}
      <ExportLoadingModal
        open={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        onCancel={handleCancelExport}
        status={exportStatus}
        progress={exportProgress}
      />
    </Container>
  )
}
