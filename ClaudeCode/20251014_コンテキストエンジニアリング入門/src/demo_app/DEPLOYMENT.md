# Vercelデプロイガイド

## 1. 事前準備

### Google OAuthの設定

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. プロジェクトを作成または選択
3. 「APIとサービス」→「認証情報」に移動
4. 「認証情報を作成」→「OAuthクライアントID」を選択
5. アプリケーションの種類：「ウェブアプリケーション」
6. 承認済みのリダイレクトURIに以下を追加：
   - `https://YOUR_DOMAIN.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google`（開発用）
7. クライアントIDとクライアントシークレットをメモ

### NextAuth Secretの生成

ターミナルで以下を実行：
```bash
openssl rand -base64 32
```
## 2. Vercelへのデプロイ

### 方法1: Vercel CLIを使用

```bash
# demo_appディレクトリに移動
cd demo_app

# Vercel CLIをインストール（未インストールの場合）
npm i -g vercel

# デプロイ
vercel

# プロダクションデプロイ
vercel --prod
```

### 方法2: Vercel Webダッシュボード

1. [Vercel](https://vercel.com)にアクセスしてログイン
2. 「New Project」をクリック
3. GitHubリポジトリをインポート
4. Root Directoryを `demo_app` に設定
5. 環境変数を設定（下記参照）
6. 「Deploy」をクリック

## 3. 環境変数の設定

Vercelダッシュボードの「Settings」→「Environment Variables」で以下を設定：

### 必須の環境変数

```bash
# Database (Supabase)
DATABASE_URL=<Supabase PostgreSQL接続文字列>

# NextAuth
NEXTAUTH_URL=https://YOUR_DOMAIN.vercel.app
NEXTAUTH_SECRET=<openssl rand -base64 32で生成した値>

# Google OAuth
GOOGLE_CLIENT_ID=<Google Cloud Consoleから取得>
GOOGLE_CLIENT_SECRET=<Google Cloud Consoleから取得>

# Google Sheets API（オプション：月次レポート機能を使う場合）
GOOGLE_SERVICE_ACCOUNT_EMAIL=<サービスアカウントのメールアドレス>
GOOGLE_PRIVATE_KEY=<サービスアカウントの秘密鍵（改行を\nに置換）>
```

### 環境変数の適用範囲

- すべての環境変数を「Production」「Preview」「Development」の3つの環境に設定してください

## 4. デプロイ後の確認事項

### データベースのマイグレーション

初回デプロイ後、データベースのマイグレーションを実行：

```bash
# ローカルから実行
npx prisma migrate deploy

# または Vercel の Functions から実行
# Vercelダッシュボード → Functions → Run Command で以下を実行
npx prisma migrate deploy
```

### シードデータの投入（オプション）

開発用のユーザーデータを投入する場合：

```bash
npx prisma db seed
```

### 動作確認

1. デプロイされたURLにアクセス
2. Google OAuth でサインイン
3. 各機能が正常に動作するか確認：
   - ダッシュボード表示
   - 生徒・先生一覧
   - スケジュール管理
   - レポート機能

## 5. セキュリティ設定

### 検索エンジン対策

すでに以下が設定済みです：

- `public/robots.txt`: すべての検索エンジンをブロック
- `app/layout.tsx`: noindex, nofollow メタタグ

### 認証

- すべてのページで認証が必須（middleware.tsで制御）
- サインインページ以外は未認証ではアクセス不可

## 6. トラブルシューティング

### デプロイが失敗する場合

1. ビルドログを確認
2. 環境変数が正しく設定されているか確認
3. DATABASE_URLが正しいか確認
4. Prisma Clientが生成されているか確認

### Google OAuthが動作しない場合

1. Google Cloud Consoleのリダイレクト URIが正しいか確認
2. NEXTAUTH_URLがVercelのドメインと一致しているか確認
3. クライアントIDとシークレットが正しいか確認

### データベースに接続できない場合

1. Supabaseのダッシュボードでデータベースが稼働しているか確認
2. DATABASE_URLの形式が正しいか確認
3. パスワードに特殊文字が含まれる場合、URLエンコードが必要

## 7. 本番運用時の推奨設定

### カスタムドメインの設定

1. Vercelダッシュボード → Settings → Domains
2. カスタムドメインを追加
3. DNSレコードを設定
4. Google OAuth のリダイレクト URIを更新

### モニタリング

- Vercelの Analytics を有効化
- エラートラッキングの設定（Sentry等）
- データベースのバックアップ設定（Supabase）

### パフォーマンス最適化

- 画像の最適化（Next.js Image コンポーネント使用）
- キャッシュ戦略の設定
- ISR（Incremental Static Regeneration）の活用

## 8. 継続的デプロイ（CI/CD）

GitHubリポジトリと連携している場合：

- mainブランチへのpushで自動デプロイ
- プルリクエストでプレビュー環境が自動作成
- ブランチ毎のデプロイURL発行

## 参考リンク

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
