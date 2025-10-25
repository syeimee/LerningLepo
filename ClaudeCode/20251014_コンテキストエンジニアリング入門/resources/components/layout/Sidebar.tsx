'use client'

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import SchoolIcon from '@mui/icons-material/School'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DescriptionIcon from '@mui/icons-material/Description'
import AssessmentIcon from '@mui/icons-material/Assessment'
import Link from 'next/link'

const drawerWidth = 240

interface SidebarProps {
  open: boolean
  onClose: () => void
  userRole?: 'ADMIN' | 'TEACHER' | 'STUDENT'
}

const menuItems = [
  { text: 'ダッシュボード', icon: <DashboardIcon />, href: '/dashboard', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
  { text: '生徒管理', icon: <PeopleIcon />, href: '/students', roles: ['ADMIN'] },
  { text: '講師管理', icon: <SchoolIcon />, href: '/teachers', roles: ['ADMIN'] },
  { text: 'スケジュール', icon: <CalendarMonthIcon />, href: '/schedule', roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
]

const reportItems = [
  { text: '日報', icon: <DescriptionIcon />, href: '/reports/daily', roles: ['ADMIN', 'TEACHER'] },
  { text: '月報', icon: <AssessmentIcon />, href: '/reports/monthly', roles: ['ADMIN', 'TEACHER'] },
]

export default function Sidebar({ open, onClose, userRole = 'ADMIN' }: SidebarProps) {
  // ロールに基づいてメニューアイテムをフィルター
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(userRole)
  )

  const filteredReportItems = reportItems.filter((item) =>
    item.roles.includes(userRole)
  )

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        {filteredMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} href={item.href} onClick={onClose}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {filteredReportItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} href={item.href} onClick={onClose}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
