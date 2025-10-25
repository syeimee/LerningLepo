'use client'

import { createContext, useContext } from 'react'
import type { Session } from 'next-auth'

interface SessionContextType {
  session: Session
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session
}) {
  return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}
