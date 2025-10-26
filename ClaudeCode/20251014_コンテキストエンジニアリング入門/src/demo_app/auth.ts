import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import type { NextAuthConfig } from 'next-auth'

// 環境変数のチェック
const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

if (!googleClientId || !googleClientSecret) {
  console.warn('⚠️ GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is not set')
}

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: googleClientId || 'dummy-client-id',
      clientSecret: googleClientSecret || 'dummy-client-secret',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // 初回サインイン時にuserオブジェクトが渡される
      if (user?.id) {
        token.id = user.id
        // データベースからロールを取得
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { role: true },
          })
          token.role = dbUser?.role || 'TEACHER'
        } catch (error) {
          console.error('Error fetching user role:', error)
          token.role = 'TEACHER'
        }
      }
      return token
    },
    async session({ session, token }) {
      // JWTトークンからセッションにデータを追加
      if (token?.id && session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  trustHost: true,
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
