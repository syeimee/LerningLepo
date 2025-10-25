'use client'

import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Chip } from '@mui/material'
import { users, type User, type UserRole } from '@/lib/data'

interface UserRoleSelectorProps {
  currentUser: User
  onUserChange: (user: User) => void
}

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
    const selectedUser = users.find((u) => u.id === event.target.value)
    if (selectedUser) {
      onUserChange(selectedUser)
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      <FormControl sx={{ minWidth: 300 }} size="small">
        <InputLabel id="user-role-selector-label">デモユーザー切り替え</InputLabel>
        <Select
          labelId="user-role-selector-label"
          id="user-role-selector"
          value={currentUser.id}
          label="デモユーザー切り替え"
          onChange={handleChange}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label={getRoleLabel(user.role)} size="small" color={getRoleColor(user.role)} />
                <span>{user.email}</span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Chip label={getRoleLabel(currentUser.role)} color={getRoleColor(currentUser.role)} />
    </Box>
  )
}
