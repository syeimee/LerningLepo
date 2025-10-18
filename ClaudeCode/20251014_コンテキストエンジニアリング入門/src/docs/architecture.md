# システム設計書

## 1. アーキテクチャ概要

### 1.1 全体構成
```
┌─────────────────────────────────────────────────────────────┐
│                      クライアント                              │
│                    (Next.js App Router)                      │
│                         + MUI                                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Backend                           │
│            (API Routes / Server Actions)                     │
└─────────────────────────────────────────────────────────────┘
         ↓                    ↓                    ↓
┌────────────────┐  ┌────────────────┐  ┌────────────────────┐
│   Supabase     │  │  NextAuth.js   │  │  Google Sheets API │
│   (PostgreSQL) │  │  (Google OAuth)│  │                    │
└────────────────┘  └────────────────┘  └────────────────────┘
         ↑
    Prisma ORM
```

### 1.2 技術スタック詳細

#### フロントエンド
- **Next.js 14+** (App Router)
  - React Server Components
  - Server Actions for mutations
- **TypeScript**
- **Material-UI (MUI v5)**
  - Emotion for styling
  - MUI Data Grid for tables
  - MUI Date Pickers for scheduling
- **React Hook Form** (フォーム管理)
- **Zod** (バリデーション)

#### バックエンド
- **Next.js API Routes / Server Actions**
- **Prisma ORM**
  - Type-safe database access
  - Migration management
- **Supabase Client SDK**

#### データベース
- **Supabase PostgreSQL**
  - Row Level Security (RLS)
  - Real-time subscriptions (オプション)

#### 認証
- **NextAuth.js v5** または **Supabase Auth**
  - Google OAuth Provider
  - Session management
  - JWT tokens

#### 外部API
- **Google APIs**
  - Google Sheets API v4
  - Google Drive API (optional)

## 2. ディレクトリ構成

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 認証関連のルートグループ
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/              # 認証後のルートグループ
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── students/
│   │   │   ├── page.tsx          # 生徒一覧
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx      # 生徒詳細
│   │   │   └── new/
│   │   │       └── page.tsx      # 生徒登録
│   │   ├── teachers/
│   │   │   ├── page.tsx          # 講師一覧
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx      # 講師詳細
│   │   │   └── new/
│   │   │       └── page.tsx      # 講師登録
│   │   ├── schedule/
│   │   │   ├── page.tsx          # スケジュール管理
│   │   │   └── [id]/
│   │   │       └── page.tsx      # 授業コマ詳細・編集
│   │   ├── reports/
│   │   │   ├── daily/
│   │   │   │   ├── page.tsx      # 日報一覧
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx  # 日報詳細・編集
│   │   │   │   └── new/
│   │   │   │       └── page.tsx  # 日報作成
│   │   │   └── monthly/
│   │   │       ├── page.tsx      # 月報一覧
│   │   │       └── [id]/
│   │   │           └── page.tsx  # 月報詳細
│   │   └── layout.tsx            # ダッシュボードレイアウト
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── students/
│   │   │   └── route.ts
│   │   ├── teachers/
│   │   │   └── route.ts
│   │   ├── lessons/
│   │   │   └── route.ts
│   │   ├── reports/
│   │   │   ├── daily/
│   │   │   │   └── route.ts
│   │   │   └── monthly/
│   │   │       └── route.ts
│   │   └── google-sheets/
│   │       └── route.ts
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # React Components
│   ├── ui/                       # 再利用可能なUIコンポーネント
│   │   ├── Button.tsx
│   │   ├── DataTable.tsx
│   │   ├── DatePicker.tsx
│   │   ├── Dialog.tsx
│   │   └── ...
│   ├── layout/                   # レイアウトコンポーネント
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── students/                 # 生徒関連コンポーネント
│   │   ├── StudentList.tsx
│   │   ├── StudentForm.tsx
│   │   ├── StudentCard.tsx
│   │   └── ...
│   ├── teachers/                 # 講師関連コンポーネント
│   │   ├── TeacherList.tsx
│   │   ├── TeacherForm.tsx
│   │   └── ...
│   ├── schedule/                 # スケジュール関連
│   │   ├── Calendar.tsx
│   │   ├── LessonForm.tsx
│   │   ├── TimeTable.tsx
│   │   └── ...
│   └── reports/                  # レポート関連
│       ├── DailyReportForm.tsx
│       ├── MonthlyReportView.tsx
│       └── ...
├── lib/                          # ライブラリとユーティリティ
│   ├── prisma.ts                 # Prisma client
│   ├── auth.ts                   # NextAuth config
│   ├── supabase.ts               # Supabase client
│   ├── google-sheets.ts          # Google Sheets API client
│   ├── validations/              # Zodスキーマ
│   │   ├── student.ts
│   │   ├── teacher.ts
│   │   ├── lesson.ts
│   │   └── report.ts
│   └── utils/                    # ユーティリティ関数
│       ├── date.ts
│       ├── format.ts
│       └── ...
├── hooks/                        # Custom React Hooks
│   ├── useStudents.ts
│   ├── useTeachers.ts
│   ├── useLessons.ts
│   ├── useReports.ts
│   └── useAuth.ts
├── types/                        # TypeScript型定義
│   ├── student.ts
│   ├── teacher.ts
│   ├── lesson.ts
│   ├── report.ts
│   └── index.ts
├── prisma/                       # Prisma関連
│   ├── schema.prisma             # データベーススキーマ
│   ├── migrations/               # マイグレーションファイル
│   └── seed.ts                   # シードデータ
├── docs/                         # ドキュメント
│   ├── requirement.md
│   ├── architecture.md
│   ├── database.md
│   ├── api-spec.md
│   └── setup.md
└── public/                       # 静的ファイル
    └── ...
```

## 3. データフロー

### 3.1 認証フロー
```
1. ユーザーがログインページにアクセス
2. Google OAuthボタンをクリック
3. Googleの認証画面へリダイレクト
4. ユーザーが認証を許可
5. NextAuth.jsがコールバックを処理
6. JWTトークンを生成しセッションに保存
7. ダッシュボードへリダイレクト
```

### 3.2 データ取得フロー（Server Components）
```
1. ページコンポーネントがサーバーサイドで実行
2. Prisma経由でデータベースからデータ取得
3. データをクライアントに送信
4. クライアントサイドでレンダリング
```

### 3.3 データ更新フロー（Server Actions）
```
1. フォームからServer Actionを呼び出し
2. Server Action内でバリデーション
3. Prisma経由でデータベースを更新
4. revalidatePath()でキャッシュを無効化
5. 自動的にUIが更新される
```

### 3.4 月報生成・出力フロー
```
1. 管理者が月報生成をリクエスト
2. 対象期間の日報データを集約
3. 月報データを生成
4. Google Sheets APIでスプレッドシート作成
5. データを書き込み
6. 生成されたシートのURLを返却
```

## 4. セキュリティ設計

### 4.1 認証・認可
- **NextAuth.js**によるセッション管理
- **JWT**トークンによる認証
- **Middleware**による認証チェック
- ロールベースのアクセス制御（RBAC）
  - ADMIN: 全権限
  - TEACHER: 限定的な権限

### 4.2 データ保護
- **HTTPS**通信の強制
- **環境変数**による機密情報の管理
- **Prisma**によるSQLインジェクション対策
- **Zod**によるバリデーション

### 4.3 Supabase Row Level Security (RLS)
```sql
-- 例: 講師は自分の日報のみアクセス可能
CREATE POLICY "Teachers can view own reports"
ON daily_reports FOR SELECT
USING (auth.uid() = teacher_id);
```

## 5. パフォーマンス最適化

### 5.1 Next.js最適化
- **Server Components**の活用（デフォルト）
- **Dynamic Import**による遅延ロード
- **Image Optimization**（next/image）
- **Font Optimization**（next/font）

### 5.2 データベース最適化
- **インデックス**の適切な設定
- **N+1問題**の回避（Prisma include）
- **ページネーション**の実装
- **Connection Pooling**

### 5.3 キャッシング戦略
- **Next.js Cache**の活用
- **revalidate**オプションの設定
- **revalidatePath**による選択的な再検証

## 6. エラーハンドリング

### 6.1 クライアントサイド
- **Error Boundary**の実装
- **Toast通知**によるユーザーフィードバック
- **フォームバリデーションエラー**の表示

### 6.2 サーバーサイド
- **try-catch**による例外処理
- **カスタムエラークラス**の定義
- **ログ記録**（開発時はconsole、本番はSentry等）

### 6.3 データベース
- **Prismaエラー**の適切な処理
- **トランザクション**の使用

## 7. テスト戦略

### 7.1 単体テスト
- **Jest** + **React Testing Library**
- コンポーネントテスト
- ユーティリティ関数テスト

### 7.2 統合テスト
- **Playwright** または **Cypress**
- E2Eテスト
- 主要フローのテスト

### 7.3 型チェック
- **TypeScript**による静的型チェック
- **Prisma**による型安全なDB操作

## 8. デプロイメント

### 8.1 Vercel設定
- **Environment Variables**の設定
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 8.2 環境変数
```env
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Google Sheets API
GOOGLE_SHEETS_API_KEY="..."
GOOGLE_SERVICE_ACCOUNT_EMAIL="..."
GOOGLE_PRIVATE_KEY="..."
```

### 8.3 CI/CD
- **GitHub Actions** (optional)
- 自動テスト
- 自動デプロイ

## 9. モニタリング・ログ

### 9.1 ログ戦略
- **開発環境**: console.log
- **本番環境**: Vercel Analytics / Sentry

### 9.2 パフォーマンスモニタリング
- **Vercel Analytics**
- **Web Vitals**の追跡

## 10. 今後の拡張性

### 10.1 スケーラビリティ
- Supabaseの有料プランへの移行
- CDNの活用
- データベースの最適化

### 10.2 機能拡張
- リアルタイム通知（Supabase Realtime）
- ファイルアップロード（Supabase Storage）
- メール送信（SendGrid/Resend）
- PDF生成（jsPDF/Puppeteer）

---

**作成日**: 2025-10-14
**バージョン**: 1.0
