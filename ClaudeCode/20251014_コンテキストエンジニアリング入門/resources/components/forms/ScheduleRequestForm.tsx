'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { scheduleRequestSchema, type ScheduleRequestFormData } from '@/lib/validations/scheduleRequest'
import { TIME_PERIODS } from '@/lib/utils/schedule'

interface ScheduleRequestFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: ScheduleRequestFormData) => void
  userRole: 'TEACHER' | 'STUDENT'
}

const SUBJECTS = ['数学', '物理', '化学', '生物', '英語', '国語', '小論文']

export default function ScheduleRequestForm({
  open,
  onClose,
  onSubmit,
  userRole,
}: ScheduleRequestFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ScheduleRequestFormData>({
    resolver: zodResolver(scheduleRequestSchema),
    defaultValues: {
      subject: '',
      preferredDates: [],
      preferredTimeSlots: [],
      notes: '',
    },
  })

  const handleFormSubmit = (data: ScheduleRequestFormData) => {
    onSubmit(data)
    reset()
    onClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  // 次の2週間の日付を生成
  const getNext14Days = (): string[] => {
    const dates: string[] = []
    const today = new Date()
    for (let i = 0; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      dates.push(dateStr)
    }
    return dates
  }

  const availableDates = getNext14Days()

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    const weekdays = ['日', '月', '火', '水', '木', '金', '土']
    return `${date.getMonth() + 1}/${date.getDate()}(${weekdays[date.getDay()]})`
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {userRole === 'TEACHER' ? '授業希望申請（講師）' : '授業希望申請（生徒）'}
      </DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* 科目選択 */}
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.subject}>
                  <InputLabel>科目</InputLabel>
                  <Select {...field} label="科目">
                    {SUBJECTS.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        {subject}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.subject && (
                    <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                      {errors.subject.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            {/* 希望日選択 */}
            <Controller
              name="preferredDates"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.preferredDates}>
                  <InputLabel>希望日（複数選択可）</InputLabel>
                  <Select
                    {...field}
                    multiple
                    input={<OutlinedInput label="希望日（複数選択可）" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={formatDate(value)} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {availableDates.map((date) => (
                      <MenuItem key={date} value={date}>
                        {formatDate(date)}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.preferredDates && (
                    <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                      {errors.preferredDates.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            {/* 希望時限選択 */}
            <Controller
              name="preferredTimeSlots"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.preferredTimeSlots}>
                  <InputLabel>希望時限（複数選択可）</InputLabel>
                  <Select
                    {...field}
                    multiple
                    input={<OutlinedInput label="希望時限（複数選択可）" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={`${value}時限`} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {TIME_PERIODS.map((tp) => (
                      <MenuItem key={tp.period} value={tp.period}>
                        {tp.period}時限 ({tp.startTime} - {tp.endTime})
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.preferredTimeSlots && (
                    <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                      {errors.preferredTimeSlots.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            {/* 備考 */}
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="備考"
                  error={!!errors.notes}
                  helperText={errors.notes?.message}
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="その他の希望や条件などを入力してください"
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button type="submit" variant="contained">
            申請する
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
