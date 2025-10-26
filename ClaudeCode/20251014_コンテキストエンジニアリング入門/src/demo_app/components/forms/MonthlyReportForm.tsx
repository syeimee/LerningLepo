'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  Divider,
  Grid,
  FormHelperText,
} from '@mui/material'
import { monthlyReportSchema, type MonthlyReportFormData } from '@/lib/validations/monthlyReport'
import { students, type Evaluation } from '@/lib/data'

interface MonthlyReportFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: MonthlyReportFormData) => void
  teacherId: string
}

const SUBJECTS = ['数学', '物理', '化学', '生物', '英語', '国語', '小論文']
const EVALUATIONS: Evaluation[] = ['◎', '○', '△']

export default function MonthlyReportForm({
  open,
  onClose,
  onSubmit,
  teacherId: _teacherId,
}: MonthlyReportFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(monthlyReportSchema),
    defaultValues: {
      studentId: '',
      teacherId: _teacherId || '',
      subject: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      totalLessons: 0,
      absences: 0,
      lateCount: 0,
      learningMotivation: 2,
      homeworkEngagement: 2,
      reviewEngagement: 2,
      lessonContent: '',
      comprehension: '',
      weeklyTestDates: [],
      weeklyTestTopics: [],
      weeklyTestScores: [],
      weeklyTestPassingScores: [],
      overallComment: '',
    },
  })

  const handleFormSubmit = (data: any) => {
    onSubmit(data as MonthlyReportFormData)
    reset()
    onClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  // 現在の月を取得
  const getCurrentMonth = () => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>月報作成</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {/* 基本情報 */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                基本情報
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="month"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="対象月"
                    type="month"
                    fullWidth
                    error={!!errors.month}
                    helperText={errors.month?.message}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ max: getCurrentMonth() }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="studentId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="生徒"
                    fullWidth
                    error={!!errors.studentId}
                    helperText={errors.studentId?.message}
                  >
                    {students.map((student) => (
                      <MenuItem key={student.id} value={student.id}>
                        {student.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="科目"
                    fullWidth
                    error={!!errors.subject}
                    helperText={errors.subject?.message}
                  >
                    {SUBJECTS.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        {subject}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            {/* 授業統計 */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                授業統計
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="totalLessons"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="授業回数"
                    type="number"
                    fullWidth
                    error={!!errors.totalLessons}
                    helperText={errors.totalLessons?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="absences"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="欠席回数"
                    type="number"
                    fullWidth
                    error={!!errors.absences}
                    helperText={errors.absences?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="lateCount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="遅刻回数"
                    type="number"
                    fullWidth
                    error={!!errors.lateCount}
                    helperText={errors.lateCount?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Grid>

            {/* 評価 */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                評価
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="learningMotivation"
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.learningMotivation} fullWidth>
                    <FormLabel>学習意欲</FormLabel>
                    <RadioGroup {...field} row>
                      {EVALUATIONS.map((evaluation) => (
                        <FormControlLabel
                          key={evaluation}
                          value={evaluation}
                          control={<Radio />}
                          label={evaluation}
                        />
                      ))}
                    </RadioGroup>
                    {errors.learningMotivation && (
                      <FormHelperText>{errors.learningMotivation.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="homeworkEngagement"
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.homeworkEngagement} fullWidth>
                    <FormLabel>課題・宿題の取り組み</FormLabel>
                    <RadioGroup {...field} row>
                      {EVALUATIONS.map((evaluation) => (
                        <FormControlLabel
                          key={evaluation}
                          value={evaluation}
                          control={<Radio />}
                          label={evaluation}
                        />
                      ))}
                    </RadioGroup>
                    {errors.homeworkEngagement && (
                      <FormHelperText>{errors.homeworkEngagement.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="reviewEngagement"
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.reviewEngagement} fullWidth>
                    <FormLabel>復習の取り組み</FormLabel>
                    <RadioGroup {...field} row>
                      {EVALUATIONS.map((evaluation) => (
                        <FormControlLabel
                          key={evaluation}
                          value={evaluation}
                          control={<Radio />}
                          label={evaluation}
                        />
                      ))}
                    </RadioGroup>
                    {errors.reviewEngagement && (
                      <FormHelperText>{errors.reviewEngagement.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            {/* 詳細記述 */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                詳細記述
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="lessonContent"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="授業内容"
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.lessonContent}
                    helperText={
                      errors.lessonContent?.message ||
                      `${field.value?.length || 0}/500文字`
                    }
                    inputProps={{ maxLength: 500 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="comprehension"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="理解度"
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.comprehension}
                    helperText={
                      errors.comprehension?.message ||
                      `${(field.value as string)?.length || 0}/500文字`
                    }
                    inputProps={{ maxLength: 500 }}
                  />
                )}
              />
            </Grid>

            {/* 週テスト実施日 */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                週テスト実施日
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            {[0, 1, 2, 3].map((index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Controller
                  name={`weeklyTestDates.${index}`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`第${index + 1}回`}
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value || null)}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button onClick={handleSubmit(handleFormSubmit)} variant="contained">
          作成
        </Button>
      </DialogActions>
    </Dialog>
  )
}
