'use client'

import { useState } from 'react'
import { Box, Toolbar } from '@mui/material'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import type { Session } from 'next-auth'
import { getDummyUserById } from '@/lib/dummyUsers'
import { SessionProvider } from '@/contexts/SessionContext'
import { DataProvider } from '@/contexts/DataContext'

interface DashboardClientProps {
  children: React.ReactNode
  session: Session
}

export default function DashboardClient({ children, session: initialSession }: DashboardClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentSession, setCurrentSession] = useState<Session>(initialSession)

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  const handleUserChange = (userId: string) => {
    const newUser = getDummyUserById(userId)
    if (newUser) {
      setCurrentSession({
        ...currentSession,
        user: {
          id: newUser.id,
          name: newUser.name || undefined,
          email: newUser.email || undefined,
          image: newUser.image || undefined,
          role: newUser.role,
          ...(newUser.teacherId && { teacherId: newUser.teacherId }),
          ...(newUser.studentId && { studentId: newUser.studentId }),
        },
        expires: '2099-12-31',
      })
    }
  }

  return (
    <SessionProvider session={currentSession}>
      <DataProvider>
        <Box sx={{ display: 'flex' }}>
          <Header
            onMenuClick={handleSidebarToggle}
            session={currentSession}
            onUserChange={handleUserChange}
          />
          <Sidebar
            open={sidebarOpen}
            onClose={handleSidebarClose}
            userRole={currentSession.user?.role as 'ADMIN' | 'TEACHER' | 'STUDENT'}
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
