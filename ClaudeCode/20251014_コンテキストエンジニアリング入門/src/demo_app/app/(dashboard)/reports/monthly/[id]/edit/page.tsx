'use client'

import {
  Container,
  Typography,
  Box,
  Paper,
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
  CircularProgress,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

// ダミーデータ
const dummyStudents = [
  { id: '1', name: '田中太郎' },
  { id: '2', name: '山田花子' },
  { id: '3', name: '鈴木一郎' },
]

const dummySubjects = ['数学', '英語', '物理', '化学', '生物', '国語']

interface WeeklyTest {
  date: string
  topic: string
  score: number
  passingScore: number
}

// ダミーの月報データ（実際はAPIから取得）
const getDummyReport = (id: string) => ({
  id,
  studentId: '1',
  subject: '数学',
  year: 2025,
  month: 10,
  totalLessons: 4,
  absences: 0,
  lateCount: 0,
  learningMotivation: 3,
  homeworkEngagement: 2,
  reviewEngagement: 3,
  lessonContent: '二次方程式の基礎から応用まで学習しました。',
  comprehension: '基礎的な問題は解けるようになりましたが、応用問題にはまだ課題があります。',
  weeklyTests: [
    {
      date: '2025-10-07',
      topic: '二次方程式の解法',
      score: 85,
      passingScore: 70,
    },
    {
      date: '2025-10-14',
      topic: '二次方程式の応用',
      score: 78,
      passingScore: 70,
    },
  ] as WeeklyTest[],
  overallComment: '着実に実力をつけています。次月は応用問題に重点を置く予定です。',
})

export default function EditMonthlyReportPage() {
  const router = useRouter()
  const params = useParams()
  const reportId = params?.id as string

  const [isLoading, setIsLoading] = useState(true)

  // 基本情報
  const [studentId, setStudentId] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [year, setYear] = useState<number>(2025)
  const [month, setMonth] = useState<number>(10)

  // 出席情報
  const [totalLessons, setTotalLessons] = useState<number>(0)
  const [absences, setAbsences] = useState<number>(0)
  const [lateCount, setLateCount] = useState<number>(0)

  // 評価項目（1-3）
  const [learningMotivation, setLearningMotivation] = useState<number>(2)
  const [homeworkEngagement, setHomeworkEngagement] = useState<number>(2)
  const [reviewEngagement, setReviewEngagement] = useState<number>(2)

  // 授業内容・理解度
  const [lessonContent, setLessonContent] = useState<string>('')
  const [comprehension, setComprehension] = useState<string>('')

  // 週テスト情報（最大4回分）
  const [weeklyTests, setWeeklyTests] = useState<WeeklyTest[]>([])

  // 総評
  const [overallComment, setOverallComment] = useState<string>('')

  // データの読み込み
  useEffect(() => {
    const loadReport = async () => {
      try {
        // TODO: 実際のAPI呼び出し
        const report = getDummyReport(reportId)

        setStudentId(report.studentId)
        setSubject(report.subject)
        setYear(report.year)
        setMonth(report.month)
        setTotalLessons(report.totalLessons)
        setAbsences(report.absences)
        setLateCount(report.lateCount)
        setLearningMotivation(report.learningMotivation)
        setHomeworkEngagement(report.homeworkEngagement)
        setReviewEngagement(report.reviewEngagement)
        setLessonContent(report.lessonContent)
        setComprehension(report.comprehension)
        setWeeklyTests(report.weeklyTests)
        setOverallComment(report.overallComment)
      } catch (error) {
        // エラー時の処理
      } finally {
        setIsLoading(false)
      }
    }

    loadReport()
  }, [reportId])

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

  const handleSubmit = () => {
    // TODO: フォームバリデーションとServer Actionの呼び出し

    // 一覧ページに戻る
    router.push('/reports/monthly')
  }

  const handleCancel = () => {
    router.push('/reports/monthly')
  }

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          月報編集
        </Typography>
        <Typography variant="body2" color="text.secondary">
          月報の内容を編集します
        </Typography>
      </Box>

      {/* 基本情報 */}
      <Paper sx={{ p: 3, mb: 3 }}>
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
      </Paper>

      {/* 出席情報 */}
      <Paper sx={{ p: 3, mb: 3 }}>
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
      </Paper>

      {/* 評価項目 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          評価項目（三段階評価）
        </Typography>
        <Grid container spacing={3}>
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
      </Paper>

      {/* 授業内容・理解度 */}
      <Paper sx={{ p: 3, mb: 3 }}>
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
      </Paper>

      {/* 週テスト情報 */}
      <Paper sx={{ p: 3, mb: 3 }}>
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
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Typography variant="subtitle2">週テスト {index + 1}</Typography>
              <IconButton
                size="small"
                color="error"
                onClick={() => handleRemoveWeeklyTest(index)}
              >
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
      </Paper>

      {/* 総評 */}
      <Paper sx={{ p: 3, mb: 3 }}>
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
      </Paper>

      {/* アクションボタン */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<CancelIcon />}
          onClick={handleCancel}
        >
          キャンセル
        </Button>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmit}>
          保存
        </Button>
      </Box>
    </Container>
  )
}
