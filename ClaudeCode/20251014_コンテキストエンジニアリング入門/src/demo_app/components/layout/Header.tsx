'use client'

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Chip,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import type { Session } from 'next-auth'
import { dummySignOut } from '@/app/(auth)/signin/actions'

interface HeaderProps {
  onMenuClick: () => void
  session: Session
}

export default function Header({ onMenuClick, session }: HeaderProps) {
  const handleSignOut = async () => {
    await dummySignOut()
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return '管理者'
      case 'TEACHER':
        return '講　師'
      case 'STUDENT':
        return '生　徒'
      default:
        return ''
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'error' as const
      case 'TEACHER':
        return 'primary' as const
      case 'STUDENT':
        return 'success' as const
      default:
        return 'default' as const
    }
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar
          sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',}}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        {/* <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'white'}}>
          医進会
        </Typography> */}
                  {/* ▼ ロゴ画像部分 */}
          <Box
            component="img"
            src="/logo/logo.png"
            alt="医進館ロゴ"
            sx={{
              height: 40,
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={getRoleLabel(session.user?.role || '')}
            color={getRoleColor(session.user?.role || '')}
            size="small"
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          />
          <Button
            color="inherit"
            endIcon={<PersonIcon />}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            {session.user?.name}
          </Button>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleSignOut}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            ログアウト
          </Button>
          <IconButton color="inherit" onClick={handleSignOut} sx={{ display: { md: 'none' } }}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
