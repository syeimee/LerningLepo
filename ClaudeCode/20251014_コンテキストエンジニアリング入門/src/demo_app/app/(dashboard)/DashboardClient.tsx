'use client'

import { useState } from 'react'
import { Box, Toolbar } from '@mui/material'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import type { Session } from 'next-auth'
import { SessionProvider } from '@/contexts/SessionContext'
import { DataProvider } from '@/contexts/DataContext'

interface DashboardClientProps {
  children: React.ReactNode
  session: Session
}

export default function DashboardClient({ children, session: initialSession }: DashboardClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  return (
    <SessionProvider session={initialSession}>
      <DataProvider>
        <Box sx={{ display: 'flex' }}>
          <Header
            onMenuClick={handleSidebarToggle}
            session={initialSession}
          />
          <Sidebar
            open={sidebarOpen}
            onClose={handleSidebarClose}
            userRole={initialSession.user?.role}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: '100%',
              minHeight: '100vh',
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>
      </DataProvider>
    </SessionProvider>
  )
}
