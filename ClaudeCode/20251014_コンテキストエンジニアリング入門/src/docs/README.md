# 医学部受験専門個別指導予備校 管理システム

医学部受験を目指す生徒のための個別指導予備校の管理システムです。生徒・講師管理、授業スケジュール管理、日報・月報管理を効率化します。

---

## 📋 目次

- [概要](#概要)
- [主な機能](#主な機能)
- [技術スタック](#技術スタック)
- [ドキュメント](#ドキュメント)
- [セットアップ](#セットアップ)
- [開発](#開発)
- [デプロイ](#デプロイ)
- [ライセンス](#ライセンス)

---

## 🎯 概要

このシステムは、医学部受験専門の個別指導予備校（生徒20名、講師30名規模）を対象とした管理システムです。

### 主な利用者
- **管理者（事務スタッフ）**: 全機能へのアクセス
- **講師**: 自分の授業・日報の管理

### 対象規模
- 生徒数: 約20名
- 講師数: 約30名

---

## ✨ 主な機能

### 1. 認証機能
- Google OAuthによるログイン
- ロールベースのアクセス制御（管理者/講師）

### 2. 生徒管理
- 生徒情報の登録・編集・削除
- 志望校・保護者情報の管理
- 生徒一覧の検索・フィルタリング

### 3. 講師管理
- 講師情報の登録・編集・削除
- 指導可能科目の管理
- 講師一覧の検索・フィルタリング

### 4. 授業スケジュール管理
- 授業コマの作成・編集・削除
- 生徒と講師のマッチング
- スケジュール重複チェック
- カレンダービュー
- 生徒別・講師別時間割表示

### 5. 日報管理
- 講師による授業後の日報作成
- 授業内容・理解度・宿題の記録
- 日報提出による授業ステータスの自動更新
- 日報の閲覧・編集・削除

### 6. 月報管理
- 日報データの月次集約
- 月報の自動生成
- Google Spreadsheetsへの出力
- 月報の閲覧・管理

---

## 🛠 技術スタック

### フロントエンド
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: Material-UI (MUI v5)
- **Language**: TypeScript
- **Styling**: Emotion

### バックエンド
- **Framework**: Next.js API Routes / Server Actions
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: Supabase (PostgreSQL)

### 認証
- **Provider**: NextAuth.js v5
- **Method**: Google OAuth 2.0

### 外部API
- **Google Sheets API**: 月報出力

### インフラ・デプロイ
- **Hosting**: Vercel
- **Database**: Supabase

---

## 📚 ドキュメント

プロジェクトの詳細なドキュメントは`docs/`ディレクトリに格納されています。

| ドキュメント | 説明 | リンク |
|------------|------|--------|
| 要件定義書 | システムの要件と機能の詳細 | [requirement.md](./requirement.md) |
| システム設計書 | アーキテクチャとディレクトリ構成 | [architecture.md](./architecture.md) |
| データベース設計書 | ERDとPrismaスキーマ | [database.md](./database.md) |
| API仕様書 | Server ActionsとAPI Routesの仕様 | [api-spec.md](./api-spec.md) |
| セットアップガイド | 開発環境のセットアップ手順 | [setup.md](./setup.md) |
| タスク管理 | 開発タスクと進捗管理 | [tasks.md](./tasks.md) |

---

## 🚀 セットアップ

詳細なセットアップ手順は [setup.md](./setup.md) を参照してください。

### 前提条件
- Node.js v18.17.0以上
- npm v9.0.0以上
- Supabaseアカウント
- Google Cloud Platformアカウント

### クイックスタート

```bash
# リポジトリのクローン
git clone https://github.com/your-username/medical-school-management.git
cd medical-school-management

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env.local
# .env.localを編集して必要な環境変数を設定

# Prismaのセットアップ
npx prisma migrate dev
npx prisma generate

# 開発サーバーの起動
npm run dev
```

ブラウザで `http://localhost:3000` を開く

---

## 💻 開発

### スクリプト

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# リント
npm run lint

# 型チェック
npm run type-check

# Prisma Studio起動
npx prisma studio
```

### コード規約

- **TypeScript**: 厳密な型定義を使用
- **ESLint**: コードの静的解析
- **Prettier**: コードフォーマット
- **Zod**: バリデーション

### ディレクトリ構成

```
src/
├── app/              # Next.js App Router
├── components/       # Reactコンポーネント
├── lib/              # ライブラリとユーティリティ
├── hooks/            # カスタムフック
├── types/            # 型定義
├── prisma/           # Prismaスキーマとマイグレーション
└── docs/             # ドキュメント
```

---

## 🌐 デプロイ

### Vercelへのデプロイ

```bash
# Vercel CLIのインストール
npm install -g vercel

# デプロイ
vercel
```

### 環境変数の設定

Vercelダッシュボードで以下の環境変数を設定:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

---

## 📝 開発フェーズ

### Phase 1: 基盤構築（Week 1-2）
- プロジェクトセットアップ
- 認証機能実装
- データベース設計・構築
- 基本レイアウト・ナビゲーション

### Phase 2: 基本機能実装（Week 3-4）
- 生徒管理機能
- 講師管理機能
- 授業コマ管理機能

### Phase 3: スケジュール機能（Week 5-6）
- カレンダービュー実装
- 時間割表示機能
- マッチング機能

### Phase 4: 日報・月報機能（Week 7-8）
- 日報作成・編集機能
- 月報生成機能
- Google Sheets連携

### Phase 5: テスト・改善（Week 9-10）
- 単体テスト
- 統合テスト
- UI/UX改善
- パフォーマンスチューニング

---

## 🤝 コントリビューション

このプロジェクトへの貢献を歓迎します。

1. フォークする
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

---

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

---

## 🔗 リンク

- **GitHub**: [リポジトリURL]
- **Vercel**: [デプロイURL]
- **ドキュメント**: [docs/](./docs/)

---

## 📞 お問い合わせ

質問や提案がある場合は、[Issues](https://github.com/your-username/medical-school-management/issues)を作成してください。

---

**作成日**: 2025-10-14
**バージョン**: 1.0
