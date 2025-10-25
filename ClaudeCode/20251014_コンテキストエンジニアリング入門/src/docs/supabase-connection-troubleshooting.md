# Supabase接続トラブルシューティング

## IPv4/IPv6接続問題の解決方法

共同開発者の環境でSupabaseに接続できない場合、IPv4とIPv6の兼ね合いで問題が発生している可能性があります。

### 解決策1: Supabase接続設定の変更（推奨）

#### 方法A: IPv4を優先する（Node.js設定）

`.env`ファイルに以下を追加：
```env
NODE_OPTIONS=--dns-result-order=ipv4first
```

または、`package.json`のスクリプトを変更：
```json
{
  "scripts": {
    "dev": "NODE_OPTIONS='--dns-result-order=ipv4first' next dev",
    "build": "NODE_OPTIONS='--dns-result-order=ipv4first' next build"
  }
}
```

#### 方法B: DATABASE_URLでIPv6を明示的に使用

1. Supabaseプロジェクトの接続情報からIPv6アドレスを取得
2. `.env`ファイルを更新：
```env
# IPv6アドレスを角括弧で囲む
DATABASE_URL="postgresql://postgres:PASSWORD@[2001:db8::1]:5432/postgres"
```

### 解決策2: Supabase CLIでローカル開発環境を構築（開発環境のみ）

ローカルでPostgreSQLを実行し、ネットワーク接続の問題を回避します。

#### 手順

1. **Supabase CLIをインストール**
```bash
npm install -g supabase
# または
brew install supabase/tap/supabase
```

2. **プロジェクトでSupabaseを初期化**
```bash
cd demo_app
supabase init
```

3. **ローカルSupabaseを起動**
```bash
supabase start
```

これにより、Docker経由でローカルPostgreSQLが起動します。

4. **.envファイルを更新**
```env
# ローカル開発用
DATABASE_URL="postgresql://postgres:postgres@localhost:54322/postgres"

# 本番用（デプロイ時に使用）
# DATABASE_URL="postgresql://postgres:PASSWORD@db.xxx.supabase.co:5432/postgres"
```

5. **マイグレーションを実行**
```bash
npx prisma migrate dev
npx prisma db seed
```

### 解決策3: pgBouncerを使用（SupabaseのConnection Pooling）

Supabaseは接続プーリングを提供しており、これを使用することで接続の安定性が向上します。

#### 手順

1. **Supabase Dashboard → Project Settings → Database → Connection Pooling**を開く

2. **Connection pooling**の接続文字列を取得（ポート6543）

3. `.env`ファイルを更新：
```env
# Connection Pooling を使用
DATABASE_URL="postgresql://postgres.xxxxx:PASSWORD@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Prisma Migrateの実行時は直接接続を使用
DIRECT_URL="postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres"
```

4. `prisma/schema.prisma`を更新：
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")  // マイグレーション実行時に使用
}
```

### 解決策4: ネットワーク設定の確認

#### macOS/Linuxの場合

1. **DNS解決を確認**
```bash
# ホスト名を解決
nslookup db.xxxxx.supabase.co

# IPv4とIPv6のどちらが返されるか確認
dig db.xxxxx.supabase.co A
dig db.xxxxx.supabase.co AAAA
```

2. **接続テスト**
```bash
# PostgreSQLに直接接続してテスト
psql "postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres"
```

3. **IPv6を無効化（一時的な対応）**

`/etc/hosts`に以下を追加してIPv4を強制：
```
# IPv4アドレスを取得して追加
xxx.xxx.xxx.xxx db.xxxxx.supabase.co
```

#### Windowsの場合

1. **コマンドプロンプトで確認**
```cmd
nslookup db.xxxxx.supabase.co
```

2. **IPv6を無効化（一時的な対応）**

`C:\Windows\System32\drivers\etc\hosts`に以下を追加：
```
xxx.xxx.xxx.xxx db.xxxxx.supabase.co
```

### 解決策5: プロキシまたはVPNの使用

企業ネットワークやファイアウォールの制限がある場合：

1. **Supabaseのポート5432が開いているか確認**
```bash
telnet db.xxxxx.supabase.co 5432
```

2. **HTTPSトンネリングツールを使用**
- ngrok
- Cloudflare Tunnel
- Tailscale

### 推奨アプローチ

**開発環境の場合：**
1. まず**解決策1-A（IPv4優先）**を試す
2. それでもダメなら**解決策2（Supabase CLI）**でローカル開発環境を構築

**本番環境の場合：**
1. **解決策3（pgBouncer）**を使用して接続の安定性を向上

**チーム開発の場合：**
- 全員が同じ接続方法を使えるよう、`.env.example`を更新
- ローカル開発環境（Supabase CLI）を標準化することを推奨

### トラブルシューティングコマンド

```bash
# 1. 接続テスト用スクリプトを作成
# test-connection.js
const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
})

async function testConnection() {
  try {
    await client.connect()
    console.log('✅ Database connection successful!')
    const res = await client.query('SELECT version()')
    console.log('PostgreSQL version:', res.rows[0].version)
    await client.end()
  } catch (err) {
    console.error('❌ Database connection failed:', err.message)
    console.error('Full error:', err)
  }
}

testConnection()
```

```bash
# 2. 実行
node test-connection.js
```

### 参考リンク

- [Supabase Database Connection Documentation](https://supabase.com/docs/guides/database/connecting-to-postgres)
- [Prisma Connection Management](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
- [Node.js DNS Options](https://nodejs.org/api/cli.html#--dns-result-orderorder)
