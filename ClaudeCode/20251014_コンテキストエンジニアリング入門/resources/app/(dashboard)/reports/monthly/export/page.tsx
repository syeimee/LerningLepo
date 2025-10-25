'use client'

import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Chip,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import CancelIcon from '@mui/icons-material/Cancel'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { SelectChangeEvent } from '@mui/material'

// ダミーデータ
const dummyStudents = [
  { id: '1', name: '田中太郎' },
  { id: '2', name: '山田花子' },
  { id: '3', name: '鈴木一郎' },
  { id: '4', name: '佐藤美咲' },
]

const dummySubjects = ['数学', '英語', '物理', '化学', '生物', '国語']

const months = [
  { value: '2025-01', label: '2025年1月' },
  { value: '2025-02', label: '2025年2月' },
  { value: '2025-03', label: '2025年3月' },
  { value: '2025-04', label: '2025年4月' },
  { value: '2025-05', label: '2025年5月' },
  { value: '2025-06', label: '2025年6月' },
  { value: '2025-07', label: '2025年7月' },
  { value: '2025-08', label: '2025年8月' },
  { value: '2025-09', label: '2025年9月' },
  { value: '2025-10', label: '2025年10月' },
  { value: '2025-11', label: '2025年11月' },
  { value: '2025-12', label: '2025年12月' },
]

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export default function ExportMonthlyReportsPage() {
  const router = useRouter()

  // 仮のユーザーロール（実際はsessionから取得）
  // TODO: sessionから取得するように修正
  const userRole = 'ADMIN' // 'ADMIN' | 'TEACHER' | 'STUDENT'
  const currentTeacherId = 'teacher-1' // 講師の場合のID

  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const [isExporting, setIsExporting] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)

  // 講師の場合、自分が担当する生徒のみ表示
  const getAvailableStudents = () => {
    if (userRole === 'TEACHER') {
      // TODO: 実際は担当生徒のみフィルタリング
      return dummyStudents.filter((s) => ['1', '2'].includes(s.id)) // 仮のフィルタリング
    }
    return dummyStudents
  }

  const availableStudents = getAvailableStudents()

  const handleStudentChange = (event: SelectChangeEvent<typeof selectedStudents>) => {
    const {
      target: { value },
    } = event
    setSelectedStudents(typeof value === 'string' ? value.split(',') : value)
  }

  const handleSubjectChange = (event: SelectChangeEvent<typeof selectedSubjects>) => {
    const {
      target: { value },
    } = event
    setSelectedSubjects(typeof value === 'string' ? value.split(',') : value)
  }

  const handleMonthChange = (event: SelectChangeEvent<typeof selectedMonths>) => {
    const {
      target: { value },
    } = event
    setSelectedMonths(typeof value === 'string' ? value.split(',') : value)
  }

  const handleExport = async () => {
    if (selectedStudents.length === 0 || selectedSubjects.length === 0 || selectedMonths.length === 0) {
      alert('生徒、教科、月をそれぞれ選択してください')
      return
    }

    setIsExporting(true)
    setExportSuccess(false)

    try {
      // TODO: Google Sheets API呼び出し
      console.log('Export data:', {
        students: selectedStudents,
        subjects: selectedSubjects,
        months: selectedMonths,
      })

      // ダミーAPI呼び出し
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setExportSuccess(true)

      // 3秒後に一覧ページに戻る
      setTimeout(() => {
        router.push('/reports/monthly')
      }, 3000)
    } catch (error) {
      console.error('Export failed:', error)
      alert('エクスポートに失敗しました')
    } finally {
      setIsExporting(false)
    }
  }

  const handleCancel = () => {
    router.push('/reports/monthly')
  }

  const getStudentName = (id: string) => {
    return dummyStudents.find((s) => s.id === id)?.name || ''
  }

  const getMonthLabel = (value: string) => {
    return months.find((m) => m.value === value)?.label || ''
  }

  // 生徒ユーザーの場合はアクセス不可
  if (userRole === 'STUDENT') {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          この機能へのアクセス権限がありません。
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          月報出力
          {userRole === 'TEACHER' && (
            <Chip label="担当分のみ" color="primary" size="small" sx={{ ml: 2 }} />
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {userRole === 'ADMIN'
            ? '複数の月報を選択してGoogle Sheetsに一括出力します'
            : '担当する生徒の月報をGoogle Sheetsに出力します'}
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          出力対象の選択
        </Typography>

        <Grid container spacing={3}>
          {/* 生徒選択 */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="student-select-label">生徒（複数選択可）</InputLabel>
              <Select
                labelId="student-select-label"
                id="student-select"
                multiple
                value={selectedStudents}
                onChange={handleStudentChange}
                input={<OutlinedInput label="生徒（複数選択可）" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={getStudentName(value)} size="small" />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {availableStudents.map((student) => (
                  <MenuItem key={student.id} value={student.id}>
                    <Checkbox checked={selectedStudents.indexOf(student.id) > -1} />
                    <ListItemText primary={student.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* 教科選択 */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="subject-select-label">教科（複数選択可）</InputLabel>
              <Select
                labelId="subject-select-label"
                id="subject-select"
                multiple
                value={selectedSubjects}
                onChange={handleSubjectChange}
                input={<OutlinedInput label="教科（複数選択可）" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {dummySubjects.map((subject) => (
                  <MenuItem key={subject} value={subject}>
                    <Checkbox checked={selectedSubjects.indexOf(subject) > -1} />
                    <ListItemText primary={subject} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* 月選択 */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="month-select-label">月（複数選択可）</InputLabel>
              <Select
                labelId="month-select-label"
                id="month-select"
                multiple
                value={selectedMonths}
                onChange={handleMonthChange}
                input={<OutlinedInput label="月（複数選択可）" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={getMonthLabel(value)} size="small" />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {months.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    <Checkbox checked={selectedMonths.indexOf(month.value) > -1} />
                    <ListItemText primary={month.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* 選択内容のサマリー */}
        {(selectedStudents.length > 0 || selectedSubjects.length > 0 || selectedMonths.length > 0) && (
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              選択内容
            </Typography>
            <Typography variant="body2" color="text.secondary">
              生徒: {selectedStudents.length}名 / 教科: {selectedSubjects.length}科目 / 月: {selectedMonths.length}ヶ月
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              出力予定件数: 約 {selectedStudents.length * selectedSubjects.length * selectedMonths.length} 件
            </Typography>
          </Box>
        )}
      </Paper>

      {/* 成功メッセージ */}
      {exportSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          月報のエクスポートが完了しました。まもなく一覧ページに戻ります...
        </Alert>
      )}

      {/* アクションボタン */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<CancelIcon />}
          onClick={handleCancel}
          disabled={isExporting}
        >
          キャンセル
        </Button>
        <Button
          variant="contained"
          startIcon={isExporting ? <CircularProgress size={20} /> : <FileDownloadIcon />}
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? 'エクスポート中...' : 'Google Sheetsに出力'}
        </Button>
      </Box>

      {/* 注意事項 */}
      <Paper sx={{ p: 3, bgcolor: 'info.light', color: 'info.contrastText' }}>
        <Typography variant="subtitle2" gutterBottom>
          注意事項
        </Typography>
        <Typography variant="body2" component="ul" sx={{ m: 0, pl: 2 }}>
          <li>選択した条件に合致する月報が全て出力されます</li>
          <li>出力されたスプレッドシートのURLは各月報に記録されます</li>
          <li>出力には数分かかる場合があります</li>
        </Typography>
      </Paper>
    </Container>
  )
}
