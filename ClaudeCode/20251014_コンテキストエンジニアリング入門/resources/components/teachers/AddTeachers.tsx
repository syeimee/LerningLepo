import React from 'react'
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button,
  CardContent,
  Dialog,
} from '@mui/material'

interface AddTeachersProps {
  isOpen: boolean
  toggleOpen: () => void
}

const AddTeachers = ({ isOpen, toggleOpen }: AddTeachersProps) => {
  const subjects = ['数学', '英語', '国語', '理科', '社会', '情報']

  return (
    <>
      <Dialog open={isOpen} onClose={toggleOpen}>
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom align="center">
                講師追加フォーム
              </Typography>

              <Grid container spacing={3}>
                {/* 名前 */}
                <Grid item xs={12}>
                  <TextField label="名前" variant="outlined" fullWidth required />
                </Grid>

                {/* 担当教科 */}
                <Grid item xs={12}>
                  <TextField select label="担当教科" variant="outlined" fullWidth required>
                    {subjects.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        {subject}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* 経歴 */}
                <Grid item xs={12}>
                  <TextField
                    label="経歴"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    placeholder="例：〇〇大学卒業、〇〇高校で5年間指導経験あり など"
                  />
                </Grid>

                {/* メールアドレス */}
                <Grid item xs={12}>
                  <TextField label="メールアドレス" type="email" variant="outlined" fullWidth />
                </Grid>

                {/* 電話番号 */}
                <Grid item xs={12}>
                  <TextField label="電話番号" type="tel" variant="outlined" fullWidth />
                </Grid>

                {/* ボタン */}
                <Grid item xs={12} textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mr: 2 }}
                    onClick={toggleOpen}
                  >
                    登録する
                  </Button>
                  <Button variant="outlined" color="secondary" size="large" onClick={toggleOpen}>
                    キャンセル
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
        </Container>
      </Dialog>
    </>
  )
}

export default AddTeachers
