'use client'

import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  Collapse,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { useState } from 'react'
import { dummyUsers } from '@/lib/dummyUsers'
import { dummySignIn } from './actions'

const isDevelopment = process.env.NODE_ENV === 'development'

export default function SignInPage() {
  const [selectedUser, setSelectedUser] = useState('')
  const [showDevTools, setShowDevTools] = useState(false)

  const handleGoogleSignIn = async () => {
    // 本番環境では実際のGoogle OAuth認証を実装
    // 開発環境ではダミーユーザーでログイン
    if (isDevelopment && selectedUser) {
      await dummySignIn(selectedUser)
    } else {
      // TODO: 本番環境でのGoogle OAuth実装
      alert('本番環境でのGoogle認証は未実装です')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 5, width: '100%', maxWidth: 450 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 600, color: 'primary.main' }}
            >
              中田学習会
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 2 }}>
              医学部受験予備校管理システム
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Googleアカウントでログインしてください
            </Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              disabled={isDevelopment && !selectedUser}
              sx={{
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              Googleでログイン
            </Button>
          </Box>

          {/* 開発用のダミーユーザー選択 */}
          {isDevelopment && (
            <Box sx={{ mt: 4 }}>
              <Box
                sx={{
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  pt: 3,
                }}
              >
                <Button
                  size="small"
                  onClick={() => setShowDevTools(!showDevTools)}
                  sx={{
                    textTransform: 'none',
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                  }}
                >
                  {showDevTools ? '開発ツールを隠す' : '開発ツールを表示'}
                </Button>
                <Collapse in={showDevTools}>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary" gutterBottom>
                      開発用: ログインユーザーを選択
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      placeholder="ユーザーを選択"
                      sx={{ mt: 1 }}
                    >
                      {dummyUsers.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.name} ({user.role})
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Collapse>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  )
}
