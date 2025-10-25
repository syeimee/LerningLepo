# Supabaseセットアップガイド

このドキュメントでは、医療系予備校管理システムのためのSupabaseデータベースの詳細なセットアップ手順を説明します。

---

## 目次

1. [Supabaseとは](#1-supabaseとは)
2. [アカウント作成](#2-アカウント作成)
3. [プロジェクト作成](#3-プロジェクト作成)
4. [データベース接続の設定](#4-データベース接続の設定)
5. [Prismaとの統合](#5-prismaとの統合)
6. [セキュリティ設定](#6-セキュリティ設定)
7. [バックアップ設定](#7-バックアップ設定)
8. [モニタリングとログ](#8-モニタリングとログ)
9. [トラブルシューティング](#9-トラブルシューティング)

---

## 1. Supabaseとは

Supabaseは、PostgreSQLベースのオープンソースのBackend as a Service (BaaS)です。

### 主な機能
- **PostgreSQL Database**: フルマネージドのPostgreSQLデータベース
- **Authentication**: 組み込み認証システム（今回はNextAuthを使用）
- **Row Level Security (RLS)**: 行レベルのセキュリティ
- **Realtime**: リアルタイムデータ同期（オプション）
- **Storage**: ファイルストレージ（オプション）

### 本プロジェクトでの使用
- **データベースのみ**: PostgreSQLデータベースとしてSupabaseを使用
- **認証**: NextAuth.jsを使用（Supabase Authは使用しない）
- **ORM**: Prismaを使用してデータベースアクセス

---

## 2. アカウント作成

### 2.1 Supabaseアカウントの作成

1. [Supabase公式サイト](https://supabase.com/)にアクセス
2. 右上の「Start your project」または「Sign Up」をクリック
3. 以下のいずれかでサインアップ：
   - GitHub アカウント（推奨）
   - GitLab アカウント
   - Bitbucket アカウント
   - メールアドレス

**推奨**: GitHubアカウントでのサインアップ
- プロジェクトとの連携が簡単
- CI/CDとの統合がスムーズ

### 2.2 認証の完了

1. GitHubでサインアップした場合、GitHubの認証画面が表示される
2. 「Authorize Supabase」をクリック
3. Supabaseダッシュボードにリダイレクトされる

---

## 3. プロジェクト作成

### 3.1 新規プロジェクトの作成

1. Supabaseダッシュボードで「New Project」をクリック
2. Organization（組織）の選択または作成
   - 初回の場合は自動的に作成されます
   - 既存のOrganizationがある場合は選択

### 3.2 プロジェクト設定

以下の情報を入力：

| 項目 | 入力内容 | 説明 |
|------|----------|------|
| **Name** | `medical-school-management` | プロジェクト名（後で変更可能） |
| **Database Password** | 強力なパスワード | 自動生成を推奨（コピーして保存） |
| **Region** | `Northeast Asia (Tokyo)` | 日本からのアクセスの場合 |
| **Pricing Plan** | `Free` または `Pro` | 開発環境はFreeでOK |

**重要**: Database Passwordは必ず安全な場所に保存してください！

### 3.3 推奨パスワード生成方法

```bash
# ランダムな強力なパスワードを生成（macOS/Linux）
openssl rand -base64 32

# または、パスワード管理ツールで生成
# 1Password, Bitwarden, LastPass など
```

### 3.4 プロジェクト作成の完了

「Create new project」をクリックすると、プロジェクトの初期化が始まります。
- 所要時間: 約1〜2分
- 完了すると、プロジェクトダッシュボードが表示されます

---

## 4. データベース接続の設定

### 4.1 接続情報の取得

1. プロジェクトダッシュボードで「Project Settings」（歯車アイコン）をクリック
2. 左サイドバーから「Database」を選択
3. 「Connection string」セクションを確認

### 4.2 接続文字列のコピー

**接続モード**を選択：

#### Session mode（推奨 - Prisma用）
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres
```

**または**

#### Transaction mode（高負荷環境用）
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**または**

#### Direct connection（Prismaマイグレーション用）
```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### 4.3 本プロジェクトでの推奨設定

#### 開発環境（.env.local）
```env
# Direct connection - Prismaマイグレーション用
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

#### 本番環境（Vercel環境変数）
```env
# Session pooling - 本番環境用
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"

# Direct connection - マイグレーション専用
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

### 4.4 `.env.local`ファイルの設定

プロジェクトルートに`.env.local`を作成：

```env
# Supabase Database
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""  # openssl rand -base64 32 で生成

# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Google Sheets API
GOOGLE_SERVICE_ACCOUNT_EMAIL=""
GOOGLE_PRIVATE_KEY=""

# Supabase API Keys（オプション - 直接APIを使う場合のみ）
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
```

**パスワードの置換**:
- `[YOUR-PASSWORD]`: 先ほど設定したデータベースパスワード
- `[PROJECT-REF]`: プロジェクト固有の参照ID（接続文字列に含まれる）

### 4.5 環境変数の検証

```bash
# 環境変数が正しく読み込まれるか確認
node -e "console.log(process.env.DATABASE_URL)"
```

---

## 5. Prismaとの統合

### 5.1 Prismaのインストール

```bash
# 既にインストール済みの場合はスキップ
npm install @prisma/client
npm install -D prisma
```

### 5.2 Prismaの初期化

```bash
npx prisma init
```

これにより以下が作成されます：
- `prisma/schema.prisma`: Prismaスキーマファイル
- `.env`: 環境変数ファイル（既にある場合は上書きされない）

### 5.3 Prismaスキーマの設定

`prisma/schema.prisma`を以下のように設定：

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ========================================
// 以下、docs/database.mdのモデル定義をコピー
// ========================================
```

**完全なスキーマ**: `docs/database.md`を参照

### 5.4 マイグレーションの実行

```bash
# 初回マイグレーション
npx prisma migrate dev --name init

# 出力:
# ✔ Generated Prisma Client
# ✔ The migration has been created
```

### 5.5 Prisma Clientの生成

```bash
npx prisma generate
```

### 5.6 接続テスト

簡易的な接続テストスクリプトを作成：

`scripts/test-db-connection.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Database connection successful!')

    // バージョン確認
    const result = await prisma.$queryRaw`SELECT version();`
    console.log('PostgreSQL version:', result)
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
```

実行：

```bash
npx ts-node scripts/test-db-connection.ts
```

### 5.7 Prisma Studioでデータベースを確認

```bash
npx prisma studio
```

ブラウザで `http://localhost:5555` が開き、データベースのテーブルを確認できます。

---

## 6. セキュリティ設定

### 6.1 データベースパスワードの管理

**絶対にやってはいけないこと**:
- ❌ `.env`ファイルをGitにコミットする
- ❌ パスワードをコードに直接書く
- ❌ パスワードを共有チャットに貼り付ける

**推奨**:
- ✅ `.env.local`を使用（`.gitignore`に含まれている）
- ✅ パスワード管理ツール（1Password等）で管理
- ✅ 環境変数管理サービス（Vercel等）で本番環境を管理

### 6.2 `.gitignore`の確認

```gitignore
# 環境変数ファイル
.env
.env*.local
.env.production

# Supabaseの機密情報
supabase/.env
```

### 6.3 Row Level Security (RLS) の設定

Supabaseでは、Row Level Security (RLS)を使ってテーブルレベルのアクセス制御が可能です。

**本プロジェクトでの方針**:
- **RLSは無効化**: Prismaを使用し、アプリケーション層で認可制御を行う
- NextAuth + Server Actionsで権限チェックを実装

#### RLSの無効化確認（デフォルトは無効）

Supabaseダッシュボード:
1. 「Database」→「Tables」
2. 各テーブルの「RLS」列が「Disabled」であることを確認

必要に応じて、Supabase SQL Editorで以下を実行：

```sql
-- 全テーブルのRLSを無効化
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE students DISABLE ROW LEVEL SECURITY;
ALTER TABLE teachers DISABLE ROW LEVEL SECURITY;
ALTER TABLE lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE daily_reports DISABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_reports DISABLE ROW LEVEL SECURITY;
```

### 6.4 接続プールの設定

大規模なアプリケーションでは、Prismaの接続プール設定を調整：

`lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 6.5 IPホワイトリスト（Proプラン限定）

Supabase Proプランでは、特定のIPアドレスからのみ接続を許可できます。

1. 「Project Settings」→「Database」
2. 「Connection Pooling」セクション
3. 「Restrict to IP addresses」で設定

---

## 7. バックアップ設定

### 7.1 自動バックアップ

Supabaseは自動的にデータベースをバックアップします。

**Freeプラン**:
- 毎日自動バックアップ
- 7日間保持

**Proプラン**:
- 毎日自動バックアップ
- 30日間保持
- Point-in-Time Recovery（任意の時点への復元）

### 7.2 手動バックアップ（エクスポート）

#### 方法1: Supabase Dashboard

1. 「Database」→「Backups」
2. 「Export Database」をクリック
3. SQLダンプファイルがダウンロードされる

#### 方法2: pg_dumpコマンド

```bash
# pg_dumpを使用したバックアップ
pg_dump -h db.[PROJECT-REF].supabase.co \
  -U postgres \
  -d postgres \
  -F c \
  -f backup_$(date +%Y%m%d).dump
```

### 7.3 バックアップの復元

```bash
# pg_restoreを使用した復元
pg_restore -h db.[PROJECT-REF].supabase.co \
  -U postgres \
  -d postgres \
  -c \
  backup_20251014.dump
```

---

## 8. モニタリングとログ

### 8.1 ダッシュボードでのモニタリング

Supabaseダッシュボード:
1. 「Database」→「Reports」
2. 以下の情報を確認：
   - データベースサイズ
   - 接続数
   - クエリパフォーマンス
   - トランザクション数

### 8.2 スロークエリの確認

「Database」→「Query Performance」で遅いクエリを特定できます。

### 8.3 Prismaのログ設定

開発環境でクエリログを有効化：

```typescript
// lib/prisma.ts
new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'stdout' },
    { level: 'warn', emit: 'stdout' },
  ],
})

// クエリログの出力
prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Duration: ' + e.duration + 'ms')
})
```

### 8.4 アラート設定（Proプラン）

Proプランでは、以下のアラートを設定可能：
- データベース使用量の閾値
- 接続数の上限
- クエリパフォーマンスの低下

---

## 9. トラブルシューティング

### 9.1 接続エラー

#### エラー: "Can't reach database server"

**原因**:
- DATABASE_URLが間違っている
- ネットワーク接続の問題
- Supabaseのメンテナンス中

**解決方法**:
```bash
# 接続文字列の確認
echo $DATABASE_URL

# pingテスト
ping db.[PROJECT-REF].supabase.co

# Supabaseのステータス確認
# https://status.supabase.com/
```

#### エラー: "Authentication failed"

**原因**:
- パスワードが間違っている
- 接続文字列にパスワードが含まれていない

**解決方法**:
1. Supabaseダッシュボードでパスワードをリセット
   - 「Project Settings」→「Database」→「Reset database password」
2. `.env.local`を更新

### 9.2 マイグレーションエラー

#### エラー: "Migration failed to apply"

**解決方法**:
```bash
# マイグレーション履歴の確認
npx prisma migrate status

# データベースをリセット（開発環境のみ）
npx prisma migrate reset

# 再度マイグレーション
npx prisma migrate dev
```

### 9.3 接続数の上限エラー

#### エラー: "Too many connections"

**原因**:
- Freeプランの同時接続数制限（最大60接続）
- 接続プールの設定ミス

**解決方法**:

1. **Connection Poolingを使用**:
```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"
```

2. **Prismaの接続プール設定**:
```typescript
new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})
```

3. **開発環境でPrismaの接続を適切にクローズ**:
```typescript
// Server Actionやルートハンドラーで
try {
  // データベース操作
} finally {
  await prisma.$disconnect()
}
```

### 9.4 スロークエリのデバッグ

```bash
# Prisma Studioでクエリの確認
npx prisma studio

# ログレベルを上げてデバッグ
# .env.local
LOG_LEVEL=debug
```

### 9.5 データベースのリセット（開発環境のみ）

```bash
# 全データを削除してマイグレーションを再実行
npx prisma migrate reset

# 確認メッセージが表示される
# Are you sure? (y/N) y
```

**警告**: 本番環境では絶対に実行しないでください！

---

## 10. 環境別の設定

### 10.1 開発環境

`.env.local`:
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
NEXTAUTH_URL="http://localhost:3000"
```

### 10.2 ステージング環境

Vercel環境変数:
```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
NEXTAUTH_URL="https://staging.yourdomain.com"
```

### 10.3 本番環境

Vercel環境変数:
```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
NEXTAUTH_URL="https://yourdomain.com"
```

---

## 11. パフォーマンス最適化

### 11.1 インデックスの確認

`prisma/schema.prisma`で定義したインデックスを確認：

```prisma
model Student {
  // ...
  @@index([status])
  @@index([lastName, firstName])
}
```

### 11.2 実行計画の確認

Supabase SQL Editorで：

```sql
EXPLAIN ANALYZE
SELECT * FROM students WHERE status = 'ACTIVE';
```

### 11.3 接続プーリング

本番環境では必ずSession poolingを使用：

```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"
```

---

## 12. セキュリティチェックリスト

- [ ] `.env.local`が`.gitignore`に含まれている
- [ ] データベースパスワードが強力（32文字以上）
- [ ] パスワード管理ツールで機密情報を管理
- [ ] 本番環境の環境変数がVercelで設定されている
- [ ] RLSの設定を確認（無効化または適切に設定）
- [ ] バックアップが自動で実行されている
- [ ] 接続プーリングが有効化されている（本番環境）

---

## 13. 次のステップ

1. ✅ Supabaseプロジェクトの作成
2. ✅ データベース接続の設定
3. ✅ Prismaマイグレーションの実行
4. ⬜ シードデータの投入（`docs/setup.md`参照）
5. ⬜ NextAuthの設定（`docs/setup.md`参照）
6. ⬜ 開発開始（`docs/tasks.md`参照）

---

## 参考リンク

- [Supabase公式ドキュメント](https://supabase.com/docs)
- [Prisma公式ドキュメント](https://www.prisma.io/docs)
- [Supabaseステータスページ](https://status.supabase.com/)
- [Prisma + Supabase統合ガイド](https://supabase.com/docs/guides/integrations/prisma)

---

**作成日**: 2025-10-25
**バージョン**: 1.0
**最終更新**: 2025-10-25
