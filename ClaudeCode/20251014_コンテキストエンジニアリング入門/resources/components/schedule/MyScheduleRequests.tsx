'use client'

import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  Alert,
  Grid,
} from '@mui/material'
import { type ScheduleRequest } from '@/lib/data'
import { TIME_PERIODS } from '@/lib/utils/schedule'

interface MyScheduleRequestsProps {
  scheduleRequests: ScheduleRequest[]
  userId: string
}

export default function MyScheduleRequests({ scheduleRequests, userId }: MyScheduleRequestsProps) {
  // ログインユーザーの希望申請をフィルタリング
  const myRequests = scheduleRequests.filter((request) => request.requesterId === userId)

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    const weekdays = ['日', '月', '火', '水', '木', '金', '土']
    return `${date.getMonth() + 1}/${date.getDate()}(${weekdays[date.getDay()]})`
  }

  const getStatusColor = (status: string): 'default' | 'warning' | 'success' | 'error' => {
    switch (status) {
      case 'PENDING':
        return 'warning'
      case 'MATCHED':
        return 'success'
      case 'REJECTED':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'PENDING':
        return '申請中'
      case 'MATCHED':
        return 'マッチング完了'
      case 'REJECTED':
        return '却下'
      default:
        return status
    }
  }

  if (myRequests.length === 0) {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          希望申請一覧
        </Typography>
        <Alert severity="info">現在、希望申請はありません。</Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        希望申請一覧 ({myRequests.length}件)
      </Typography>

      <Grid container spacing={2}>
        {myRequests.map((request) => (
          <Grid item xs={12} sm={6} md={4} key={request.id}>
            <Card
              sx={{
                height: '100%',
                border: '1px solid',
                borderColor: request.status === 'PENDING' ? 'warning.main' : 'divider',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                  <Chip label={request.subject} color="primary" size="small" />
                  <Chip
                    label={getStatusLabel(request.status)}
                    color={getStatusColor(request.status)}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>希望日:</strong>
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                  {request.preferredDates.map((date) => (
                    <Chip key={date} label={formatDate(date)} size="small" variant="outlined" />
                  ))}
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>希望時限:</strong>
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                  {request.preferredTimeSlots.map((slot) => {
                    const timePeriod = TIME_PERIODS.find((tp) => tp.period === slot)
                    return (
                      <Chip
                        key={slot}
                        label={`${slot}時限 (${timePeriod?.startTime})`}
                        size="small"
                        variant="outlined"
                      />
                    )
                  })}
                </Box>

                {request.notes && (
                  <>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>備考:</strong>
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {request.notes}
                    </Typography>
                  </>
                )}

                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                  申請日: {new Date(request.createdAt).toLocaleDateString('ja-JP')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
