import { Container, Typography, Box } from '@mui/material'
import { getMonthlyReports } from './actions'
import MonthlyReportsList from '@/components/reports/MonthlyReportsList'

export default async function MonthlyReportsPage() {
  const result = await getMonthlyReports()

  if (!result.success || !result.data) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            月報管理
          </Typography>
          <Typography color="error">
            {result.error || '月報の取得に失敗しました'}
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          月報管理
        </Typography>
        <Typography variant="body2" color="text.secondary">
          月報総数: {result.data.length}件
        </Typography>
      </Box>

      <MonthlyReportsList initialReports={result.data} />
    </Container>
  )
}
