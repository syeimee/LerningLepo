'use client'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
} from '@mui/material'
import { TIME_PERIODS, WEEKDAYS, type TimetableData } from '@/lib/utils/schedule'
import { COLORS } from '@/lib/colors'

interface TimetableGridProps {
  timetableData: TimetableData
  weekDates: Date[]
}

export default function TimetableGrid({ timetableData, weekDates }: TimetableGridProps) {
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const getDateLabel = (date: Date, index: number): string => {
    return `${date.getMonth() + 1}/${date.getDate()} (${WEEKDAYS[index]})`
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                backgroundColor: COLORS.primary.main,
                color: COLORS.primary.contrastText,
                fontWeight: 'bold',
                minWidth: 120,
              }}
            >
              時限
            </TableCell>
            {weekDates.map((date, index) => (
              <TableCell
                key={formatDate(date)}
                align="center"
                sx={{
                  backgroundColor: COLORS.primary.main,
                  color: COLORS.primary.contrastText,
                  fontWeight: 'bold',
                  minWidth: 150,
                }}
              >
                {getDateLabel(date, index)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {TIME_PERIODS.map((timePeriod) => (
            <TableRow key={timePeriod.period} hover>
              <TableCell
                sx={{
                  backgroundColor: COLORS.background.default,
                  fontWeight: 600,
                  verticalAlign: 'top',
                }}
              >
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    {timePeriod.period}時限
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {timePeriod.startTime} - {timePeriod.endTime}
                  </Typography>
                </Box>
              </TableCell>
              {weekDates.map((date) => {
                const dateStr = formatDate(date)
                const cell = timetableData[dateStr]?.[timePeriod.period]

                return (
                  <TableCell
                    key={`${dateStr}-${timePeriod.period}`}
                    sx={{
                      verticalAlign: 'top',
                      p: 1,
                    }}
                  >
                    {cell && cell.length > 0 ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {cell.map((lessonData) => {
                          const isCompleted = lessonData.lesson.status === 'COMPLETED'
                          const bgColor = isCompleted ? COLORS.secondary.main : COLORS.primary.main
                          const textColor = isCompleted ? COLORS.secondary.contrastText : COLORS.primary.contrastText

                          return (
                            <Box
                              key={lessonData.lesson.id}
                              sx={{
                                p: 0.75,
                                borderRadius: 1,
                                backgroundColor: bgColor,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                  transform: 'translateY(-1px)',
                                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                },
                              }}
                            >
                              <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5, flexWrap: 'wrap' }}>
                                <Chip
                                  label={lessonData.lesson.subject}
                                  size="small"
                                  sx={{
                                    height: 20,
                                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                    color: textColor,
                                    fontWeight: 600,
                                    fontSize: '0.7rem',
                                    '& .MuiChip-label': {
                                      px: 1,
                                    },
                                  }}
                                />
                                {isCompleted && (
                                  <Chip
                                    label="完了"
                                    size="small"
                                    sx={{
                                      height: 20,
                                      backgroundColor: COLORS.success.main,
                                      color: COLORS.success.contrastText,
                                      fontWeight: 600,
                                      fontSize: '0.7rem',
                                      '& .MuiChip-label': {
                                        px: 1,
                                      },
                                    }}
                                  />
                                )}
                              </Box>
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                sx={{
                                  mb: 0.25,
                                  fontSize: '0.85rem',
                                  color: textColor,
                                }}
                              >
                                {lessonData.studentName}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                sx={{
                                  color: `rgba(255, 255, 255, ${isCompleted ? 0.7 : 0.85})`,
                                  fontWeight: 400,
                                  fontSize: '0.7rem',
                                }}
                              >
                                講師: {lessonData.teacherName}
                              </Typography>
                            </Box>
                          )
                        })}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          p: 1,
                          color: 'text.disabled',
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="caption">-</Typography>
                      </Box>
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
