import { Container, Typography, Box } from '@mui/material'
import { getDailyReports } from './actions'
import DailyReportsList from '@/components/reports/DailyReportsList'

export default async function DailyReportsPage() {
  const result = await getDailyReports()

  if (!result.success || !result.data) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            日報管理
          </Typography>
          <Typography color="error">
            {result.error || '日報の取得に失敗しました'}
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          日報管理
        </Typography>
        <Typography variant="body2" color="text.secondary">
          日報総数: {result.data.length}件
        </Typography>
      </Box>

      <DailyReportsList initialReports={result.data} />
    </Container>
  )
}
