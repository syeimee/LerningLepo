import { Container, Typography, Box } from '@mui/material'
import { getLessons } from './actions'
import ScheduleView from '@/components/schedule/ScheduleView'

export default async function SchedulePage() {
  const result = await getLessons()

  if (!result.success || !result.data) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            授業スケジュール
          </Typography>
          <Typography color="error">
            {result.error || 'スケジュールの取得に失敗しました'}
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl">
      <ScheduleView initialLessons={result.data} />
    </Container>
  )
}
