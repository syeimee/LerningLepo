# 開発セットアップガイド

## 1. 前提条件

### 1.1 必要なツール
- **Node.js**: v18.17.0以上
- **npm**: v9.0.0以上（またはyarn, pnpm）
- **Git**: 最新版
- **VSCode**（推奨エディタ）

### 1.2 必要なアカウント
- **GitHub**: コード管理
- **Supabase**: データベース
- **Vercel**: デプロイ
- **Google Cloud Platform**: OAuth & Sheets API

---

## 2. プロジェクトのセットアップ

### 2.1 Next.jsプロジェクトの作成

```bash
# プロジェクトディレクトリに移動
cd /path/to/project

# Next.jsプロジェクトの作成
npx create-next-app@latest . --typescript --tailwind --app --use-npm

# または既存ディレクトリで
npx create-next-app@latest medical-school-management --typescript --tailwind --app --use-npm
cd medical-school-management
```

**設定オプション**:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Import alias: Yes (@/*)

### 2.2 必要なパッケージのインストール

```bash
# UI Framework
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-date-pickers

# データベース・ORM
npm install @prisma/client
npm install -D prisma

# 認証
npm install next-auth@beta  # Next.js 14対応のv5
npm install @auth/prisma-adapter

# バリデーション
npm install zod react-hook-form @hookform/resolvers

# Google API
npm install googleapis

# Supabase
npm install @supabase/supabase-js

# 日付操作
npm install date-fns

# 環境変数管理
npm install dotenv

# 開発ツール
npm install -D @types/node typescript
```

### 2.3 ディレクトリ構造の作成

```bash
mkdir -p src/app/(auth)/login
mkdir -p src/app/(dashboard)/{dashboard,students,teachers,schedule,reports/daily,reports/monthly}
mkdir -p src/app/api/{auth,students,teachers,lessons,reports,google-sheets}
mkdir -p src/components/{ui,layout,students,teachers,schedule,reports}
mkdir -p src/lib/{validations,utils}
mkdir -p src/hooks
mkdir -p src/types
mkdir -p prisma/migrations
```

---

## 3. Supabaseのセットアップ

### 3.1 Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com/)にアクセス
2. 「New Project」をクリック
3. プロジェクト情報を入力
   - Name: `school-management`
   - Database Password: 強力なパスワードを設定　_Y.tAHBGk6i&z*D
   - Region: 最寄りのリージョン（日本の場合は`Northeast Asia (Tokyo)`）

### 3.2 接続情報の取得

1. プロジェクトダッシュボード → Settings → Database
2. 「Connection string」セクションから `DATABASE_URL` をコピー

```
postgresql://postgres:[YOUR_PASSWORD]@db.dnotlkxjgxdxpescmzwf.supabase.co:5432/postgres
```

---

## 4. Prismaのセットアップ

### 4.1 Prismaの初期化

```bash
npx prisma init
```

### 4.2 `.env`ファイルの設定

`.env`ファイルを編集:

```env
# Database
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@db.dnotlkxjgxdxpescmzwf.supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # openssl rand -base64 32 で生成

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Google Sheets API
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@project-id.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 4.3 Prismaスキーマの作成

`prisma/schema.prisma` に`docs/database.md`のスキーマをコピー

### 4.4 マイグレーションの実行

```bash
# マイグレーションファイルの生成
npx prisma migrate dev --name init

# Prisma Clientの生成
npx prisma generate
```

### 4.5 Prisma Studioでデータベースを確認

```bash
npx prisma studio
```

ブラウザで `http://localhost:5555` を開く

---

## 5. Google Cloud Platformのセットアップ

### 5.1 Google Cloud Projectの作成

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成

### 5.2 OAuth 2.0の設定

1. 「APIとサービス」→「認証情報」
2. 「認証情報を作成」→「OAuthクライアントID」
3. アプリケーションの種類: `ウェブアプリケーション`
4. 承認済みのリダイレクトURI:
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google
   ```
5. クライアントIDとシークレットを`.env`に設定

### 5.3 Google Sheets APIの有効化

1. 「APIとサービス」→「ライブラリ」
2. 「Google Sheets API」を検索して有効化
3. 「Google Drive API」も有効化（オプション）

### 5.4 サービスアカウントの作成

1. 「APIとサービス」→「認証情報」
2. 「認証情報を作成」→「サービスアカウント」
3. サービスアカウント名を入力
4. 作成後、サービスアカウントをクリック
5. 「キー」タブ→「鍵を追加」→「新しい鍵を作成」
6. JSON形式でダウンロード
7. JSONファイルから`client_email`と`private_key`を`.env`に設定

---

## 6. NextAuthの設定

### 6.1 認証設定ファイルの作成

`src/lib/auth.ts`:

```typescript
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
        // ユーザーロールを取得
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });
        session.user.role = dbUser?.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
```

### 6.2 API Routeの作成

`src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

---

## 7. MUIのセットアップ

### 7.1 テーマの作成

`src/lib/theme.ts`:

```typescript
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});
```

### 7.2 ルートレイアウトの設定

`src/app/layout.tsx`:

```typescript
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/lib/theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

---

## 8. 環境変数の完全版

`.env.local`:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."

# Google OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Google Sheets API
GOOGLE_SERVICE_ACCOUNT_EMAIL="..."
GOOGLE_PRIVATE_KEY="..."

# Supabase (オプション)
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
```

`.env.example`（Gitにコミット）:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""

# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Google Sheets API
GOOGLE_SERVICE_ACCOUNT_EMAIL=""
GOOGLE_PRIVATE_KEY=""
```

---

## 9. 開発サーバーの起動

```bash
# 開発サーバーを起動
npm run dev

# ブラウザで確認
# http://localhost:3000
```

---

## 10. VSCodeの推奨設定

### 10.1 推奨拡張機能

`.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### 10.2 VSCode設定

`.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  }
}
```

---

## 11. Gitの設定

### 11.1 `.gitignore`の確認

```gitignore
# dependencies
/node_modules

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# prisma
prisma/migrations/**/migration.sql
```

### 11.2 初期コミット

```bash
git init
git add .
git commit -m "feat: プロジェクトの初期セットアップ"
```

---

## 12. シードデータの投入（オプション）

### 12.1 シードファイルの作成

`prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 管理者ユーザーの作成
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: '管理者',
      role: 'ADMIN',
    },
  });

  console.log('Seed data created:', { adminUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### 12.2 シードの実行

`package.json`に追加:

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

```bash
# ts-nodeのインストール
npm install -D ts-node

# シードの実行
npx prisma db seed
```

---

## 13. トラブルシューティング

### 13.1 Prismaマイグレーションエラー

```bash
# データベースをリセット
npx prisma migrate reset

# 再度マイグレーション
npx prisma migrate dev
```

### 13.2 NextAuthエラー

- `NEXTAUTH_SECRET`が設定されているか確認
- `NEXTAUTH_URL`が正しいか確認
- Google OAuthのリダイレクトURIが正しいか確認

### 13.3 MUIスタイルエラー

- `AppRouterCacheProvider`が正しく設定されているか確認
- `ThemeProvider`の位置を確認

---

## 14. デプロイ準備

### 14.1 Vercelへのデプロイ

```bash
# Vercel CLIのインストール
npm install -g vercel

# ログイン
vercel login

# デプロイ
vercel
```

### 14.2 環境変数の設定

Vercelダッシュボードで以下を設定:
- `DATABASE_URL`
- `NEXTAUTH_URL` (本番URL)
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

---

**作成日**: 2025-10-14
**バージョン**: 1.0
