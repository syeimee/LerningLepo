'use client'

import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material'
import { useState, useEffect, useMemo } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Link from 'next/link'
import { COLORS } from '@/lib/colors'
import { useSession } from '@/contexts/SessionContext'
import { useData } from '@/contexts/DataContext'
import { getStudentById, getTeacherById, students, teachers } from '@/lib/data'

// ダミーデータ
const dummyStats = {
  students: students.length,
  teachers: teachers.length,
}

// クイックアクションの定義
const quickActionsConfig = {
  ADMIN: [
    { label: '生徒を管理', href: '/students', color: 'primary' },
    { label: '講師を管理', href: '/teachers', color: 'primary' },
    { label: '授業をスケジュール', href: '/schedule', color: 'primary' },
    { label: '日報を確認', href: '/reports/daily', color: 'primary' },
  ],
  TEACHER: [
    { label: 'スケジュールを確認', href: '/schedule', color: 'primary' },
    { label: '日報を作成', href: '/reports/daily', color: 'primary' },
    { label: '月報を作成', href: '/reports/monthly', color: 'primary' },
  ],
  STUDENT: [
    { label: 'スケジュールを確認', href: '/schedule', color: 'primary' },
    { label: '日報を確認', href: '/reports/daily', color: 'primary' },
    { label: '月報を確認', href: '/reports/monthly', color: 'primary' },
  ],
}

export default function DashboardPage() {
  // 現在の日時
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  // セッションから現在のユーザー情報を取得
  const { session } = useSession()
  const { lessons, dailyReports } = useData()
  const userRole = (session.user?.role || 'ADMIN') as 'ADMIN' | 'TEACHER' | 'STUDENT'
  const currentUser = session.user

  // 日時を1秒ごとに更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 今後の授業数を計算（今日以降の予定されている授業）
  const upcomingLessons = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return lessons.filter((lesson) => {
      const lessonDate = new Date(lesson.date)
      return lessonDate >= today && lesson.status === 'SCHEDULED'
    })
  }, [lessons])

  // 未提出日報を計算（マッチング済み、今日より前、SCHEDULED状態、日報なし）
  const unsubmittedReports = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // 講師の場合は自分の担当分のみ
    const currentTeacherId = userRole === 'TEACHER' && currentUser && 'teacherId' in currentUser ? currentUser.teacherId : null

    return lessons.filter((lesson) => {
      const lessonDate = new Date(lesson.date)
      // マッチング済み（生徒と講師が割り当てられている）
      const isMatched = lesson.studentId && lesson.teacherId
      // 今日より前
      const isPast = lessonDate < today
      // SCHEDULED状態（日報未作成）
      const isScheduled = lesson.status === 'SCHEDULED'
      // 日報が存在しない
      const hasNoReport = !dailyReports.some((report) => report.lessonId === lesson.id)
      // 講師の場合は自分の担当授業のみ
      const isMyLesson = currentTeacherId ? lesson.teacherId === currentTeacherId : true

      return isMatched && isPast && isScheduled && hasNoReport && isMyLesson
    })
  }, [lessons, dailyReports, userRole, currentUser])

  // 本日の授業（講師用）
  const todaysLessons = useMemo(() => {
    if (userRole !== 'TEACHER') return []

    const teacherId = currentUser && 'teacherId' in currentUser ? currentUser.teacherId : null
    if (!teacherId) return []

    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]

    return lessons
      .filter((lesson) => lesson.date === todayStr && lesson.teacherId === teacherId)
      .map((lesson) => {
        const student = getStudentById(lesson.studentId)
        const hasReport = dailyReports.some((report) => report.lessonId === lesson.id)
        return {
          id: lesson.id,
          studentName: student?.name || '不明',
          subject: lesson.subject,
          time: `${lesson.startTime}-${lesson.endTime}`,
          status: hasReport ? 'COMPLETED' : lesson.status,
        }
      })
  }, [lessons, dailyReports, userRole, currentUser])

  // 日時のフォーマット
  const formatDateTime = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const weekdays = ['日', '月', '火', '水', '木', '金', '土']
    const weekday = weekdays[date.getDay()]
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return {
      date: `${year}年${month}月${day}日（${weekday}）`,
      time: `${hours}:${minutes}:${seconds}`,
    }
  }

  const { date, time } = formatDateTime(currentDateTime)

  // クイックアクションの取得
  const quickActions = quickActionsConfig[userRole]

  return (
    <Container maxWidth="lg">
      {/* 日付・時刻表示 */}
      <Paper
        sx={{
          mb: 4,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: COLORS.primary.main,
          color: COLORS.primary.contrastText,
        }}
      >
        <AccessTimeIcon fontSize="large" />
        <Box>
          <Typography variant="h6" color={COLORS.primary.contrastText}>{date}</Typography>
          <Typography variant="h4" fontWeight="bold" color={COLORS.primary.contrastText}>
            {time}
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ダッシュボード
        </Typography>
        <Typography variant="body1" color="text.secondary">
          学習塾向け管理システムへようこそ
        </Typography>
      </Box>

      {/* 管理者用の統計カード */}
      {userRole === 'ADMIN' && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  生徒数
                </Typography>
                <Typography variant="h3">{dummyStats.students}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  講師数
                </Typography>
                <Typography variant="h3">{dummyStats.teachers}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  今後の授業
                </Typography>
                <Typography variant="h3">{upcomingLessons.length}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  未提出日報
                </Typography>
                <Typography variant="h3">{unsubmittedReports.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* 講師用の本日の授業 */}
      {userRole === 'TEACHER' && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">本日の授業</Typography>
            <Button
              variant="outlined"
              size="small"
              endIcon={<NavigateNextIcon />}
              component={Link}
              href="/schedule"
            >
              スケジュールを見る
            </Button>
          </Box>
          {todaysLessons.length > 0 ? (
            <List>
              {todaysLessons.map((lesson) => (
                <ListItem
                  key={lesson.id}
                  sx={{
                    bgcolor: lesson.status === 'COMPLETED' ? COLORS.success.light : 'background.paper',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" fontWeight="bold">
                          {lesson.time}
                        </Typography>
                        <Chip label={lesson.subject} size="small" color="primary" />
                        {lesson.status === 'COMPLETED' && (
                          <Chip label="完了" size="small" color="success" />
                        )}
                      </Box>
                    }
                    secondary={`生徒: ${lesson.studentName}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              本日の授業はありません
            </Typography>
          )}
        </Paper>
      )}

      {/* 未提出日報 */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">未提出日報</Typography>
          <Button
            variant="outlined"
            size="small"
            endIcon={<NavigateNextIcon />}
            component={Link}
            href="/reports/daily"
          >
            日報一覧を見る
          </Button>
        </Box>
        {unsubmittedReports.length > 0 ? (
          <List>
            {unsubmittedReports.map((lesson) => {
              const student = getStudentById(lesson.studentId)
              const teacher = getTeacherById(lesson.teacherId)
              return (
                <ListItem
                  key={lesson.id}
                  sx={{
                    bgcolor: COLORS.warning.light,
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" fontWeight="bold">
                          {lesson.date}
                        </Typography>
                        <Chip label={lesson.subject} size="small" />
                      </Box>
                    }
                    secondary={`生徒: ${student?.name || '不明'}${
                      userRole === 'ADMIN' ? ` | 講師: ${teacher?.name || '不明'}` : ''
                    }`}
                  />
                </ListItem>
              )
            })}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            未提出の日報はありません
          </Typography>
        )}
      </Paper>

      {/* クイックアクション */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          クイックアクション
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          よく使う機能にすばやくアクセスできます
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
          {quickActions.map((action) => (
            <Button
              key={action.href}
              variant="contained"
              color={action.color as 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
              component={Link}
              href={action.href}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      </Paper>
    </Container>
  )
}
