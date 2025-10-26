'use client'

import React from 'react'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { Student, Lesson, DailyReport, MonthlyReport, Teacher } from '@prisma/client'

interface StudentDetailsProps {
  student: Student & {
    lessons: (Lesson & { teacher: Teacher; dailyReport: DailyReport | null })[]
    dailyReports: DailyReport[]
    monthlyReports: MonthlyReport[]
  }
  isOpen: boolean
  onClose: () => void
}

interface TabPanelProps {
  children: React.ReactNode
  value: number
  index: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>{value === index && <Box sx={{ p: 2 }}>{children}</Box>}</div>
  )
}

const StudentDetails = ({ student, isOpen, onClose }: StudentDetailsProps) => {
  const [tabValue, setTabValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // 出席率の計算
  const completedLessons = student.lessons.filter((lesson) => lesson.status === 'COMPLETED').length
  const totalLessons = student.lessons.filter((lesson) => lesson.status !== 'CANCELLED').length
  const attendanceRate = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  // 日付フォーマット
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return '未設定'
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">生徒詳細情報</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Container maxWidth="md" sx={{ py: 2 }}>
          {/* タブメニュー */}
          <Tabs
            value={tabValue}
            onChange={handleChange}
            centered
            sx={{ mb: 3 }}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="基本情報" />
            <Tab label="学習関連情報" />
            <Tab label="出席情報" />
            <Tab label="連絡先情報" />
            <Tab label="管理情報" />
          </Tabs>

          {/* ===== 基本情報 ===== */}
          <TabPanel value={tabValue} index={0}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  基本情報
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  <ListItem>
                    <ListItemText
                      primary="氏名"
                      secondary={`${student.lastName} ${student.firstName}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="ふりがな"
                      secondary={
                        student.lastNameKana && student.firstNameKana
                          ? `${student.lastNameKana} ${student.firstNameKana}`
                          : '未設定'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="性別" secondary={student.gender || '未設定'} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="生年月日" secondary={formatDate(student.birthDate)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="学年" secondary={student.grade || '未設定'} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="所属学校" secondary={student.schoolName || '未設定'} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="備考" secondary={student.notes || 'なし'} />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </TabPanel>

          {/* ===== 学習関連情報 ===== */}
          <TabPanel value={tabValue} index={1}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  学習関連情報
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  <ListItem>
                    <ListItemText
                      primary="志望校"
                      secondary={student.targetUniversity || '未設定'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="苦手科目"
                      secondary={
                        student.weakSubjects && student.weakSubjects.length > 0
                          ? student.weakSubjects.join('、')
                          : '未設定'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="受講科目・コース"
                      secondary={
                        student.courses && student.courses.length > 0
                          ? student.courses.join('、')
                          : '未設定'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="模試結果履歴"
                      secondary={student.examResults || '未登録'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="日報件数"
                      secondary={`${student.dailyReports.length}件`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="月報件数"
                      secondary={`${student.monthlyReports.length}件`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </TabPanel>

          {/* ===== 出席情報 ===== */}
          <TabPanel value={tabValue} index={2}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  出席情報
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  <ListItem>
                    <ListItemText
                      primary="総授業数"
                      secondary={`${totalLessons}回（完了: ${completedLessons}回）`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="出席率" secondary={`${attendanceRate}%`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="最新の授業"
                      secondary={
                        student.lessons.length > 0
                          ? `${formatDate(student.lessons[0].date)} - ${student.lessons[0].subject}`
                          : '授業履歴なし'
                      }
                    />
                  </ListItem>
                  {student.lessons.length > 0 && (
                    <ListItem>
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          最近の授業履歴（最新5件）
                        </Typography>
                        {student.lessons.slice(0, 5).map((lesson) => (
                          <Typography key={lesson.id} variant="caption" display="block">
                            {formatDate(lesson.date)} - {lesson.subject} (
                            {lesson.teacher.lastName} {lesson.teacher.firstName}講師) -{' '}
                            {lesson.status === 'COMPLETED'
                              ? '完了'
                              : lesson.status === 'CANCELLED'
                                ? 'キャンセル'
                                : '予定'}
                          </Typography>
                        ))}
                      </Box>
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </TabPanel>

          {/* ===== 連絡先情報 ===== */}
          <TabPanel value={tabValue} index={3}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  連絡先情報
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  <ListItem>
                    <ListItemText primary="保護者氏名" secondary={student.parentName || '未設定'} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="住所" secondary={student.address || '未設定'} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="メールアドレス"
                      secondary={student.email || '未設定'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="電話番号" secondary={student.phone || '未設定'} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="保護者メール"
                      secondary={student.parentEmail || '未設定'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="保護者電話番号"
                      secondary={student.parentPhone || '未設定'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="緊急連絡先"
                      secondary={student.emergencyContact || '未設定'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="緊急連絡先電話"
                      secondary={student.emergencyContactPhone || '未設定'}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </TabPanel>

          {/* ===== 管理情報 ===== */}
          <TabPanel value={tabValue} index={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  管理情報
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  <ListItem>
                    <ListItemText primary="登録日" secondary={formatDate(student.createdAt)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="更新日" secondary={formatDate(student.updatedAt)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="ステータス"
                      secondary={
                        student.status === 'ACTIVE'
                          ? '在籍'
                          : student.status === 'SUSPENDED'
                            ? '休会'
                            : '退会'
                      }
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </TabPanel>
        </Container>
      </DialogContent>
    </Dialog>
  )
}

export default StudentDetails
