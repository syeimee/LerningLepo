'use client'

import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Chip } from '@mui/material'

export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT'

export interface DemoUser {
  id: string
  name: string
  email: string
  role: UserRole
}

interface UserRoleSelectorProps {
  currentUser: DemoUser
  onUserChange: (user: DemoUser) => void
}

// デモ用のユーザーリスト
const demoUsers: DemoUser[] = [
  { id: 'admin-1', name: '管理者', email: 'admin@school.example.com', role: 'ADMIN' },
  { id: 'teacher-1', name: '山田太郎（講師）', email: 'yamada.taro@school.example.com', role: 'TEACHER' },
  { id: 'student-1', name: '田中太郎（生徒）', email: 'tanaka.taro@example.com', role: 'STUDENT' },
]

const getRoleLabel = (role: UserRole): string => {
  switch (role) {
    case 'ADMIN':
      return '管理者'
    case 'TEACHER':
      return '講師'
    case 'STUDENT':
      return '生徒'
  }
}

const getRoleColor = (role: UserRole): 'primary' | 'success' | 'warning' => {
  switch (role) {
    case 'ADMIN':
      return 'primary'
    case 'TEACHER':
      return 'success'
    case 'STUDENT':
      return 'warning'
  }
}

export default function UserRoleSelector({ currentUser, onUserChange }: UserRoleSelectorProps) {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedUser = demoUsers.find((u) => u.id === event.target.value)
    if (selectedUser) {
      onUserChange(selectedUser)
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
      <FormControl sx={{ minWidth: 300 }} size="small">
        <InputLabel id="user-role-selector-label">デモユーザー切り替え</InputLabel>
        <Select
          labelId="user-role-selector-label"
          id="user-role-selector"
          value={currentUser.id}
          label="デモユーザー切り替え"
          onChange={handleChange}
        >
          {demoUsers.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label={getRoleLabel(user.role)} size="small" color={getRoleColor(user.role)} />
                <span>{user.name}</span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Chip label={getRoleLabel(currentUser.role)} color={getRoleColor(currentUser.role)} />
    </Box>
  )
}
