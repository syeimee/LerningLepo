'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  TextField,
  MenuItem,
  Alert,
} from '@mui/material'
import type { Student, Teacher } from '@prisma/client'
import {
  type ScheduleRequest,
  getStudentById,
  getTeacherById,
} from '@/lib/data'
import { TIME_PERIODS } from '@/lib/utils/schedule'
import { useState } from 'react'

interface MatchingDialogProps {
  open: boolean
  onClose: () => void
  scheduleRequests: ScheduleRequest[]
  onMatch: (
    requestId: string,
    matchedTeacherId: string,
    matchedStudentId: string,
    date: string,
    timeSlot: number
  ) => void
  students: Student[]
  teachers: (Teacher & { user: { id: string; email: string; name: string | null; role: string } })[]
}

export default function MatchingDialog({
  open,
  onClose,
  scheduleRequests,
  onMatch,
  students,
  teachers,
}: MatchingDialogProps) {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [matchedTeacherId, setMatchedTeacherId] = useState('')
  const [matchedStudentId, setMatchedStudentId] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number>(0)

  const pendingRequests = scheduleRequests.filter((r) => r.status === 'PENDING')

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    const weekdays = ['日', '月', '火', '水', '木', '金', '土']
    return `${date.getMonth() + 1}/${date.getDate()}(${weekdays[date.getDay()]})`
  }

  const handleSelectRequest = (requestId: string) => {
    const request = pendingRequests.find((r) => r.id === requestId)
    if (request) {
      setSelectedRequest(requestId)

      // データベースから取得した正しいIDを使用するため、自動設定はしない
      // 管理者が手動で選択する
      setMatchedTeacherId('')
      setMatchedStudentId('')

      // 希望日と時限の最初の候補を設定
      if (request.preferredDates.length > 0) {
        setSelectedDate(request.preferredDates[0])
      }
      if (request.preferredTimeSlots.length > 0) {
        setSelectedTimeSlot(request.preferredTimeSlots[0])
      }
    }
  }

  const handleMatch = () => {
    if (selectedRequest && matchedTeacherId && matchedStudentId && selectedDate && selectedTimeSlot) {
      onMatch(selectedRequest, matchedTeacherId, matchedStudentId, selectedDate, selectedTimeSlot)
      // リセット
      setSelectedRequest(null)
      setMatchedTeacherId('')
      setMatchedStudentId('')
      setSelectedDate('')
      setSelectedTimeSlot(0)
    }
  }

  const selectedRequestData = pendingRequests.find((r) => r.id === selectedRequest)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>マッチング管理</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          ペンディング中の希望申請: {pendingRequests.length}件
        </Typography>

        {pendingRequests.length === 0 ? (
          <Alert severity="info">現在、ペンディング中の希望申請はありません。</Alert>
        ) : (
          <Box sx={{ display: 'flex', gap: 3 }}>
            {/* 左側: 希望申請一覧 */}
            <Box sx={{ flex: 1, maxHeight: 500, overflowY: 'auto' }}>
              <Typography variant="subtitle2" gutterBottom>
                希望申請一覧
              </Typography>
              {pendingRequests.map((request) => {
                const isTeacher = request.requesterRole === 'TEACHER'

                const person = isTeacher
                  ? getTeacherById(request.teacherId || '')
                  : getStudentById(request.studentId || '')

                return (
                  <Card
                    key={request.id}
                    sx={{
                      mb: 2,
                      cursor: 'pointer',
                      border: selectedRequest === request.id ? '2px solid' : '1px solid',
                      borderColor: selectedRequest === request.id ? 'primary.main' : 'divider',
                    }}
                    onClick={() => handleSelectRequest(request.id)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Chip
                          label={isTeacher ? '講師' : '生徒'}
                          color={isTeacher ? 'success' : 'warning'}
                          size="small"
                        />
                        <Chip label={request.subject} size="small" />
                      </Box>
                      <Typography variant="body2" fontWeight="bold">
                        {person?.name || '不明'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        希望日: {request.preferredDates.map(formatDate).join(', ')}
                      </Typography>
                      <br />
                      <Typography variant="caption" color="text.secondary">
                        希望時限: {request.preferredTimeSlots.join(', ')}時限
                      </Typography>
                    </CardContent>
                  </Card>
                )
              })}
            </Box>

            {/* 右側: マッチング設定 */}
            <Box sx={{ flex: 1 }}>
              {selectedRequestData ? (
                <>
                  <Typography variant="subtitle2" gutterBottom>
                    マッチング設定
                  </Typography>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      選択された希望申請
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ mb: 2 }}>
                      {selectedRequestData.subject} -{' '}
                      {selectedRequestData.requesterRole === 'TEACHER' ? '講師' : '生徒'}からの希望
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* 講師選択 */}
                    <TextField
                      select
                      label="講師"
                      value={matchedTeacherId}
                      onChange={(e) => setMatchedTeacherId(e.target.value)}
                      fullWidth
                      sx={{ mb: 2 }}
                      size="small"
                    >
                      {teachers.map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id}>
                          {teacher.lastName} {teacher.firstName} ({teacher.subjects.join(', ')})
                        </MenuItem>
                      ))}
                    </TextField>

                    {/* 生徒選択 */}
                    <TextField
                      select
                      label="生徒"
                      value={matchedStudentId}
                      onChange={(e) => setMatchedStudentId(e.target.value)}
                      fullWidth
                      sx={{ mb: 2 }}
                      size="small"
                    >
                      {students.map((student) => (
                        <MenuItem key={student.id} value={student.id}>
                          {student.lastName} {student.firstName}
                        </MenuItem>
                      ))}
                    </TextField>

                    {/* 日付選択 */}
                    <TextField
                      select
                      label="日付"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      fullWidth
                      sx={{ mb: 2 }}
                      size="small"
                    >
                      {selectedRequestData.preferredDates.map((date) => (
                        <MenuItem key={date} value={date}>
                          {formatDate(date)}
                        </MenuItem>
                      ))}
                    </TextField>

                    {/* 時限選択 */}
                    <TextField
                      select
                      label="時限"
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(Number(e.target.value))}
                      fullWidth
                      sx={{ mb: 2 }}
                      size="small"
                    >
                      {selectedRequestData.preferredTimeSlots.map((slot) => {
                        const timePeriod = TIME_PERIODS.find((tp) => tp.period === slot)
                        return (
                          <MenuItem key={slot} value={slot}>
                            {slot}時限 ({timePeriod?.startTime} - {timePeriod?.endTime})
                          </MenuItem>
                        )
                      })}
                    </TextField>

                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                      備考: {selectedRequestData.notes}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleMatch}
                      disabled={!matchedTeacherId || !matchedStudentId || !selectedDate || !selectedTimeSlot}
                    >
                      マッチングして授業を登録
                    </Button>
                  </Card>
                </>
              ) : (
                <Alert severity="info">左側の希望申請を選択してください</Alert>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>閉じる</Button>
      </DialogActions>
    </Dialog>
  )
}
