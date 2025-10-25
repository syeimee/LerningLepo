'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Stack,
  Alert,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { COLORS } from '@/lib/colors'

// ダミーデータ
const dummyStudents = [
  { id: '1', name: '田中太郎' },
  { id: '2', name: '山田花子' },
  { id: '3', name: '鈴木一郎' },
  { id: '4', name: '佐藤美咲' },
]

const dummySubjects = ['数学', '英語', '物理', '化学', '生物', '国語']

interface WeeklyTest {
  date: string
  topic: string
  score: number
  passingScore: number
}

interface MonthlyReportData {
  studentId: string
  subject: string
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
  weeklyTests: WeeklyTest[]
  overallComment: string
}

interface MonthlyReportModalProps {
  open: boolean
  onClose: () => void
  onSave?: (data: MonthlyReportData) => void
  initialData?: Partial<MonthlyReportData>
  mode?: 'create' | 'edit'
}

export default function MonthlyReportModal({
  open,
  onClose,
  onSave,
  initialData,
  mode = 'create',
}: MonthlyReportModalProps) {
  // 基本情報
  const [studentId, setStudentId] = useState<string>(initialData?.studentId || '')
  const [subject, setSubject] = useState<string>(initialData?.subject || '')
  const [year, setYear] = useState<number>(initialData?.year || 2025)
  const [month, setMonth] = useState<number>(initialData?.month || 10)

  // 出席情報
  const [totalLessons, setTotalLessons] = useState<number>(initialData?.totalLessons || 0)
  const [absences, setAbsences] = useState<number>(initialData?.absences || 0)
  const [lateCount, setLateCount] = useState<number>(initialData?.lateCount || 0)

  // 評価項目（1-3）
  const [learningMotivation, setLearningMotivation] = useState<number>(
    initialData?.learningMotivation || 2
  )
  const [homeworkEngagement, setHomeworkEngagement] = useState<number>(
    initialData?.homeworkEngagement || 2
  )
  const [reviewEngagement, setReviewEngagement] = useState<number>(
    initialData?.reviewEngagement || 2
  )

  // 授業内容・理解度
  const [lessonContent, setLessonContent] = useState<string>(initialData?.lessonContent || '')
  const [comprehension, setComprehension] = useState<string>(initialData?.comprehension || '')

  // 週テスト情報（最大4回分）
  const [weeklyTests, setWeeklyTests] = useState<WeeklyTest[]>(initialData?.weeklyTests || [])

  // 総評
  const [overallComment, setOverallComment] = useState<string>(initialData?.overallComment || '')

  // バリデーションエラー
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleAddWeeklyTest = () => {
    if (weeklyTests.length < 4) {
      setWeeklyTests([
        ...weeklyTests,
        {
          date: '',
          topic: '',
          score: 0,
          passingScore: 0,
        },
      ])
    }
  }

  const handleRemoveWeeklyTest = (index: number) => {
    setWeeklyTests(weeklyTests.filter((_, i) => i !== index))
  }

  const handleWeeklyTestChange = (
    index: number,
    field: keyof WeeklyTest,
    value: string | number
  ) => {
    const updated = [...weeklyTests]
    updated[index] = { ...updated[index], [field]: value }
    setWeeklyTests(updated)
  }

  const validateForm = (): boolean => {
    const errors: string[] = []

    if (!studentId) errors.push('生徒を選択してください')
    if (!subject) errors.push('科目を選択してください')
    if (!year || year < 2020) errors.push('有効な年を入力してください')
    if (!month || month < 1 || month > 12) errors.push('有効な月を入力してください')
    if (totalLessons < 0) errors.push('授業回数は0以上で入力してください')
    if (absences < 0) errors.push('欠席数は0以上で入力してください')
    if (lateCount < 0) errors.push('遅刻数は0以上で入力してください')
    if (!lessonContent || lessonContent.length === 0) errors.push('授業内容を入力してください')
    if (!comprehension || comprehension.length === 0) errors.push('理解度を入力してください')
    if (!overallComment || overallComment.length === 0) errors.push('総評を入力してください')

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    const formData = {
      studentId,
      subject,
      year,
      month,
      totalLessons,
      absences,
      lateCount,
      learningMotivation,
      homeworkEngagement,
      reviewEngagement,
      lessonContent,
      comprehension,
      weeklyTests,
      overallComment,
    }

    if (onSave) {
      onSave(formData)
    }

    onClose()
  }

  const handleCancel = () => {
    // バリデーションエラーをクリア
    setValidationErrors([])
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{mode === 'create' ? '月報作成' : '月報編集'}</Typography>
          <IconButton onClick={handleCancel} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* バリデーションエラー表示 */}
        {validationErrors.length > 0 && (
          <Alert
            severity="warning"
            sx={{ mb: 3, bgcolor: COLORS.warning.light, color: COLORS.warning.dark }}
          >
            <Typography variant="subtitle2" gutterBottom>
              以下の項目を確認してください：
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}

        {/* 基本情報 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            基本情報
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                required
                label="生徒"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              >
                {dummyStudents.map((student) => (
                  <MenuItem key={student.id} value={student.id}>
                    {student.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                required
                label="科目"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                {dummySubjects.map((subj) => (
                  <MenuItem key={subj} value={subj}>
                    {subj}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                fullWidth
                required
                label="年"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                required
                label="月"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}月
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* 出席情報 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            出席情報
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                type="number"
                fullWidth
                required
                label="授業回数"
                value={totalLessons}
                onChange={(e) => setTotalLessons(Number(e.target.value))}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="number"
                fullWidth
                required
                label="欠席数"
                value={absences}
                onChange={(e) => setAbsences(Number(e.target.value))}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="number"
                fullWidth
                required
                label="遅刻数"
                value={lateCount}
                onChange={(e) => setLateCount(Number(e.target.value))}
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* 評価項目 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            評価項目（三段階評価）
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">学習意欲</FormLabel>
                <RadioGroup
                  row
                  value={learningMotivation}
                  onChange={(e) => setLearningMotivation(Number(e.target.value))}
                >
                  <FormControlLabel value={1} control={<Radio />} label="低い" />
                  <FormControlLabel value={2} control={<Radio />} label="普通" />
                  <FormControlLabel value={3} control={<Radio />} label="高い" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">課題・宿題の取り組み</FormLabel>
                <RadioGroup
                  row
                  value={homeworkEngagement}
                  onChange={(e) => setHomeworkEngagement(Number(e.target.value))}
                >
                  <FormControlLabel value={1} control={<Radio />} label="低い" />
                  <FormControlLabel value={2} control={<Radio />} label="普通" />
                  <FormControlLabel value={3} control={<Radio />} label="高い" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">復習の取り組み</FormLabel>
                <RadioGroup
                  row
                  value={reviewEngagement}
                  onChange={(e) => setReviewEngagement(Number(e.target.value))}
                >
                  <FormControlLabel value={1} control={<Radio />} label="低い" />
                  <FormControlLabel value={2} control={<Radio />} label="普通" />
                  <FormControlLabel value={3} control={<Radio />} label="高い" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* 授業内容・理解度 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            授業内容・理解度
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={4}
                label="授業内容"
                value={lessonContent}
                onChange={(e) => setLessonContent(e.target.value)}
                helperText={`${lessonContent.length}/500文字`}
                inputProps={{ maxLength: 500 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={4}
                label="理解度"
                value={comprehension}
                onChange={(e) => setComprehension(e.target.value)}
                helperText={`${comprehension.length}/500文字`}
                inputProps={{ maxLength: 500 }}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* 週テスト情報 */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">週テスト情報（最大4回分）</Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleAddWeeklyTest}
              disabled={weeklyTests.length >= 4}
            >
              追加
            </Button>
          </Box>

          {weeklyTests.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              週テストの記録を追加してください
            </Typography>
          )}

          {weeklyTests.map((test, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: 'center' }}>
                <Typography variant="subtitle2">週テスト {index + 1}</Typography>
                <IconButton size="small" color="error" onClick={() => handleRemoveWeeklyTest(index)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    type="date"
                    label="実施日"
                    value={test.date}
                    onChange={(e) => handleWeeklyTestChange(index, 'date', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="出題内容"
                    value={test.topic}
                    onChange={(e) => handleWeeklyTestChange(index, 'topic', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    type="number"
                    label="得点"
                    value={test.score}
                    onChange={(e) => handleWeeklyTestChange(index, 'score', Number(e.target.value))}
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    type="number"
                    label="合格点"
                    value={test.passingScore}
                    onChange={(e) =>
                      handleWeeklyTestChange(index, 'passingScore', Number(e.target.value))
                    }
                    inputProps={{ min: 0 }}
                  />
                </Grid>
              </Grid>
              {index < weeklyTests.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* 総評 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            総評
          </Typography>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="総評"
            value={overallComment}
            onChange={(e) => setOverallComment(e.target.value)}
            helperText={`${overallComment.length}/500文字`}
            inputProps={{ maxLength: 500 }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button startIcon={<CancelIcon />} onClick={handleCancel}>
          キャンセル
        </Button>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmit}>
          保存
        </Button>
      </DialogActions>
    </Dialog>
  )
}
