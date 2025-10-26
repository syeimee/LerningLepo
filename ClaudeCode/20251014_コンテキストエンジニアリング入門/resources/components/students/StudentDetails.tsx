import React from 'react'
import {
  Container,
  Typography,
  Grid,
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
} from '@mui/material'

interface StudentDetailsProps {
  isStudentDetailsModalOpen: boolean
  toggleStudentDetailsModalOpen: () => void
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

const StudentDetail = ({
  isStudentDetailsModalOpen,
  toggleStudentDetailsModalOpen,
}: StudentDetailsProps) => {
  const [tabValue, setTabValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Dialog
      open={isStudentDetailsModalOpen}
      onClose={toggleStudentDetailsModalOpen}
      maxWidth="sm"
      fullWidth
    >
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          生徒管理詳細
        </Typography>

        {/* タブメニュー */}
        <Tabs
          value={tabValue}
          onChange={handleChange}
          centered
          sx={{ mb: 3 }}
          textColor="primary"
          indicatorColor="primary"
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
                  <ListItemText primary="氏名" secondary="山田 太郎" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="性別" secondary="男" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="生年月日" secondary="2008年4月15日" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="学年" secondary="高校2年" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="所属学校" secondary="〇〇高等学校" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="備考"
                    secondary="数学が得意で理系志望。部活動はバスケットボール部。"
                  />
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
                  <ListItemText primary="志望校" secondary="東京大学 理科一類" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="苦手科目" secondary="国語" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="受講科目・コース"
                    secondary="数学（難関大対策コース）、英語（総合コース）"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="模試結果履歴"
                    secondary="2024年全国模試：偏差値72（数学）、65（英語）"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="備考" secondary="理科分野の理解度向上に重点を置く。" />
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
                    primary="授業スケジュール"
                    secondary="毎週 火・木・土 18:00〜20:00"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="出席" secondary="出席率：95%（直近3ヶ月）" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="補講・振替履歴" secondary="2024年5月10日 数学補講受講" />
                </ListItem>
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
                  <ListItemText primary="保護者氏名" secondary="山田 花子" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="住所" secondary="東京都新宿区〇〇1-2-3" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="メールアドレス" secondary="taro.yamada@example.com" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="電話番号" secondary="090-1234-5678" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="緊急連絡先" secondary="03-9876-5432（祖母宅）" />
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
                  <ListItemText primary="登録日" secondary="2024年4月10日" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="更新日" secondary="2025年3月5日" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="ステータス" secondary="在籍" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </TabPanel>
      </Container>
    </Dialog>
  )
}

export default StudentDetail
