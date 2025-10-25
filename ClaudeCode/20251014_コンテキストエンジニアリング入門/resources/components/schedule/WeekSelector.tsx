'use client'

import { Box, Typography, IconButton } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { getWeekRangeString } from '@/lib/utils/schedule'

interface WeekSelectorProps {
  currentWeekStart: Date
  onPrevWeek: () => void
  onNextWeek: () => void
}

export default function WeekSelector({ currentWeekStart, onPrevWeek, onNextWeek }: WeekSelectorProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        mb: 3,
      }}
    >
      <IconButton onClick={onPrevWeek} aria-label="前の週">
        <ChevronLeftIcon />
      </IconButton>

      <Typography variant="h6" component="div" sx={{ minWidth: 300, textAlign: 'center' }}>
        {getWeekRangeString(currentWeekStart)}
      </Typography>

      <IconButton onClick={onNextWeek} aria-label="次の週">
        <ChevronRightIcon />
      </IconButton>
    </Box>
  )
}
