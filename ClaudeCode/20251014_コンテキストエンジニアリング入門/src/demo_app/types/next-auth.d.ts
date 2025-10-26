import { DefaultSession } from 'next-auth'
import { UserRole } from '@prisma/client'
import { JWT as DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: UserRole
    } & DefaultSession['user']
  }

  interface User {
    role: UserRole
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    role: UserRole
  }
}

declare module '@auth/core/adapters' {
  interface AdapterUser {
    role: UserRole
  }
}
