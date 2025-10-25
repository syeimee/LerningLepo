# Phase 2-3: データベースサーバーの追加

## 目的
PostgreSQLとMySQLのデータベースサーバーを追加し、アプリケーションから接続できる環境を構築する

## 構成イメージ
```
ブラウザ → Traefik (ロードバランサ)
              ├→ app-a.localhost → アプリケーションA → PostgreSQL
              ├→ app-b.localhost → アプリケーションB → MySQL
              └→ app-c.localhost → アプリケーションC → PostgreSQL/MySQL
```

---

## 1. データベース用ディレクトリの準備

```bash
# 作業ディレクトリに移動
cd ~/docker-dev-env

# データベース用のディレクトリを作成
mkdir -p postgres/data
mkdir -p postgres/init
mkdir -p mysql/data
mkdir -p mysql/init
```

---

## 2. PostgreSQL初期化スクリプトの作成

### 2.1 初期データベースとテーブルの作成

```bash
# PostgreSQL初期化スクリプトを作成
vim postgres/init/01-init.sql
```

以下の内容を入力：

```sql
-- データベースの作成
CREATE DATABASE app_a_db;
CREATE DATABASE app_c_db;

-- app_a_dbに接続してテーブル作成
\c app_a_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- サンプルデータの挿入
INSERT INTO users (username, email) VALUES
    ('developer_a', 'dev-a@example.com'),
    ('user_a1', 'user-a1@example.com'),
    ('user_a2', 'user-a2@example.com');

-- app_c_dbに接続してテーブル作成
\c app_c_db;

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- サンプルデータの挿入
INSERT INTO tasks (title, description, status) VALUES
    ('環境構築', 'VirtualBoxとDockerの設定', 'completed'),
    ('アプリ開発', 'Node.jsアプリケーションの実装', 'in_progress'),
    ('テスト', '統合テストの実施', 'pending');

-- 確認用
\c app_a_db;
SELECT * FROM users;

\c app_c_db;
SELECT * FROM tasks;
```

保存（`:wq`）

---

## 3. MySQL初期化スクリプトの作成

### 3.1 初期データベースとテーブルの作成

```bash
# MySQL初期化スクリプトを作成
vim mysql/init/01-init.sql
```

以下の内容を入力：

```sql
-- データベースの作成
CREATE DATABASE IF NOT EXISTS app_b_db;

-- データベースを使用
USE app_b_db;

-- テーブルの作成
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- サンプルデータの挿入
INSERT INTO products (name, price, stock) VALUES
    ('ノートパソコン', 89800.00, 15),
    ('マウス', 2980.00, 50),
    ('キーボード', 5480.00, 30),
    ('モニター', 32800.00, 20);

-- 確認用
SELECT * FROM products;
```

保存（`:wq`）

---

## 4. データベース管理ツール用のディレクトリ作成

```bash
# Adminer用（軽量なDB管理ツール）
mkdir -p adminer
```

---

## 5. docker-compose.ymlの更新

既存のdocker-compose.ymlにデータベースサーバーを追加します。

```bash
vim docker-compose.yml
```

**既存の内容を残したまま**、最後に以下を追加：

```yaml
  # PostgreSQLデータベース
  postgres:
    image: postgres:15-alpine
    container_name: postgres
    restart: unless-stopped
    
    environment:
      # ルートパスワード
      POSTGRES_PASSWORD: postgres_password
      # デフォルトデータベース
      POSTGRES_DB: postgres
      # 文字コード
      POSTGRES_INITDB_ARGS: "--encoding=UTF-8 --locale=C"
    
    volumes:
      # データの永続化
      - ./postgres/data:/var/lib/postgresql/data
      # 初期化スクリプト
      - ./postgres/init:/docker-entrypoint-initdb.d
    
    networks:
      - dev-network
    
    # ヘルスチェック
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
  
  # MySQLデータベース
  mysql:
    image: mysql:8.0
    container_name: mysql
    restart: unless-stopped
    
    environment:
      # ルートパスワード
      MYSQL_ROOT_PASSWORD: mysql_root_password
      # デフォルトデータベース
      MYSQL_DATABASE: mysql
      # 文字コード
      MYSQL_CHARACTER_SET_SERVER: utf8mb4
      MYSQL_COLLATION_SERVER: utf8mb4_unicode_ci
    
    volumes:
      # データの永続化
      - ./mysql/data:/var/lib/mysql
      # 初期化スクリプト
      - ./mysql/init:/docker-entrypoint-initdb.d
    
    networks:
      - dev-network
    
    # ヘルスチェック
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-pmysql_root_password"]
      interval: 10s
      timeout: 5s
      retries: 5
  
  # Adminer（データベース管理ツール）
  adminer:
    image: adminer:latest
    container_name: adminer
    restart: unless-stopped
    
    environment:
      # デザインテーマ
      ADMINER_DESIGN: pepa-linha
    
    networks:
      - dev-network
    
    labels:
      - "traefik.enable=true"
      # HTTPルーター
      - "traefik.http.routers.adminer.rule=Host(`db.localhost`)"
      - "traefik.http.routers.adminer.entrypoints=web"
      - "traefik.http.services.adminer.loadbalancer.server.port=8080"
    
    # PostgreSQLとMySQLの起動を待つ
    depends_on:
      postgres:
        condition: service_healthy
      mysql:
        condition: service_healthy
```

保存（`:wq`）

---

## 6. ディレクトリ構造の確認

```bash
# ディレクトリ構造を確認
cd ~/docker-dev-env
tree -L 2
```

**期待される出力:**
```
.
├── app-a
│   └── html
├── app-b
│   └── html
├── app-c
│   ├── Dockerfile
│   └── server.js
├── docker-compose.yml
├── mysql
│   ├── data
│   └── init
│       └── 01-init.sql
├── postgres
│   ├── data
│   └── init
│       └── 01-init.sql
└── traefik
    └── traefik.yml
```

---

## 7. データベースの起動

### 7.1 設定ファイルの検証

```bash
# docker-compose.ymlの構文チェック
docker compose config
```

### 7.2 データベースコンテナの起動

```bash
# データベースコンテナを起動
docker compose up -d postgres mysql adminer

# 起動確認
docker compose ps
```

**期待される出力:**
```
NAME      IMAGE               STATUS          PORTS
postgres  postgres:15-alpine  Up (healthy)
mysql     mysql:8.0           Up (healthy)
adminer   adminer:latest      Up
```

### 7.3 初期化の確認

```bash
# PostgreSQLの初期化ログを確認
docker compose logs postgres | grep "database system is ready"

# MySQLの初期化ログを確認
docker compose logs mysql | grep "ready for connections"
```

---

## 8. VM内でのデータベース接続確認

### 8.1 PostgreSQLへの接続

```bash
# PostgreSQLコンテナに入る
docker compose exec postgres psql -U postgres

# データベース一覧を表示
\l

# app_a_dbに接続
\c app_a_db

# テーブル一覧を表示
\dt

# usersテーブルのデータを確認
SELECT * FROM users;

# app_c_dbに切り替え
\c app_c_db

# tasksテーブルのデータを確認
SELECT * FROM tasks;

# 終了
\q
```

### 8.2 MySQLへの接続

```bash
# MySQLコンテナに入る
docker compose exec mysql mysql -u root -pmysql_root_password

# データベース一覧を表示
SHOW DATABASES;

# app_b_dbを使用
USE app_b_db;

# テーブル一覧を表示
SHOW TABLES;

# productsテーブルのデータを確認
SELECT * FROM products;

# 終了
EXIT;
```

---

## 9. ホストマシン（Windows）での確認

### 9.1 hostsファイルの更新

Windowsのhostsファイル（`C:\Windows\System32\drivers\etc\hosts`）に以下を追加：

```
127.0.0.1 db.localhost
```

### 9.2 Adminerにブラウザでアクセス

ブラウザで以下のURLを開く：

```
http://db.localhost:8000
```

### 9.3 PostgreSQLへのログイン

Adminerのログイン画面で以下を入力：

```
データベース種類: PostgreSQL
サーバー: postgres
ユーザー名: postgres
パスワード: postgres_password
データベース: app_a_db
```

「ログイン」をクリック

**確認事項:**
- usersテーブルが表示される
- サンプルデータ（3件）が確認できる
- テーブル構造が確認できる

### 9.4 MySQLへのログイン

Adminerで別タブを開き、以下を入力：

```
データベース種類: MySQL
サーバー: mysql
ユーザー名: root
パスワード: mysql_root_password
データベース: app_b_db
```

「ログイン」をクリック

**確認事項:**
- productsテーブルが表示される
- サンプルデータ（4件）が確認できる
- テーブル構造が確認できる

---

## 10. アプリケーションからの接続例

### 10.1 Node.jsからPostgreSQLへの接続

アプリケーションCを更新して、PostgreSQLに接続する例：

```bash
# 接続用パッケージをインストールするためのpackage.json作成
vim app-c/package.json
```

以下を入力：

```json
{
  "name": "app-c",
  "version": "1.0.0",
  "dependencies": {
    "pg": "^8.11.0"
  }
}
```

保存後、Dockerfileを更新：

```bash
vim app-c/Dockerfile
```

以下に変更：

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY server.js .

EXPOSE 3000

CMD ["node", "server.js"]
```

### 10.2 接続確認用のコード例

```bash
vim app-c/server-with-db.js
```

以下を入力（参考用）：

```javascript
const http = require('http');
const { Pool } = require('pg');

// PostgreSQL接続設定
const pool = new Pool({
  host: 'postgres',
  port: 5432,
  database: 'app_c_db',
  user: 'postgres',
  password: 'postgres_password'
});

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  try {
    // データベースからタスク一覧を取得
    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    const tasks = result.rows;
    
    const taskList = tasks.map(task => `
      <tr>
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td>${task.description || '-'}</td>
        <td>${task.status}</td>
      </tr>
    `).join('');
    
    const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>アプリケーションC - DB連携</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 50px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #4CAF50; color: white; }
    </style>
</head>
<body>
    <h1>⚡ アプリケーションC - PostgreSQL連携</h1>
    <h2>タスク一覧（PostgreSQLから取得）</h2>
    <table>
      <tr>
        <th>ID</th>
        <th>タイトル</th>
        <th>説明</th>
        <th>ステータス</th>
      </tr>
      ${taskList}
    </table>
    <p><small>データベース: PostgreSQL (app_c_db)</small></p>
</body>
</html>
    `;
    
    res.end(html);
  } catch (err) {
    res.end(`<h1>エラー</h1><p>${err.message}</p>`);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

保存（`:wq`）

**注意:** これは参考例です。実際に使用する場合は、server.jsをserver-with-db.jsに置き換えて、コンテナを再ビルドしてください。

---

## 11. データベースのバックアップ

### 11.1 PostgreSQLのバックアップ

```bash
# データベース全体をバックアップ
docker compose exec postgres pg_dumpall -U postgres > backup_postgres_$(date +%Y%m%d).sql

# 特定のデータベースをバックアップ
docker compose exec postgres pg_dump -U postgres app_a_db > backup_app_a_db_$(date +%Y%m%d).sql
```

### 11.2 MySQLのバックアップ

```bash
# データベース全体をバックアップ
docker compose exec mysql mysqldump -u root -pmysql_root_password --all-databases > backup_mysql_$(date +%Y%m%d).sql

# 特定のデータベースをバックアップ
docker compose exec mysql mysqldump -u root -pmysql_root_password app_b_db > backup_app_b_db_$(date +%Y%m%d).sql
```

---

## 12. トラブルシューティング

### データベースコンテナが起動しない

```bash
# ログの詳細確認
docker compose logs postgres
docker compose logs mysql

# データディレクトリの権限問題がある場合
sudo chown -R 999:999 postgres/data  # PostgreSQL
sudo chown -R 999:999 mysql/data     # MySQL

# コンテナを完全に削除して再作成
docker compose down -v
docker compose up -d
```

### 初期化スクリプトが実行されない

```bash
# データディレクトリを削除して再初期化
docker compose down
sudo rm -rf postgres/data/*
sudo rm -rf mysql/data/*
docker compose up -d postgres mysql
```

### Adminerにアクセスできない

```bash
# Adminerのログ確認
docker compose logs adminer

# Traefikがルーティングしているか確認
curl -H "Host: db.localhost" http://localhost
```

### データベースに接続できない

```bash
# ネットワークの確認
docker network inspect docker-dev-env_dev-network

# データベースコンテナが同じネットワークにいるか確認
docker compose exec app-c ping postgres
docker compose exec app-c ping mysql
```

---

## 13. セキュリティに関する注意事項

**本番環境では以下を必ず変更してください:**

1. **強力なパスワードを使用**
   ```yaml
   environment:
     POSTGRES_PASSWORD: [複雑なパスワード]
     MYSQL_ROOT_PASSWORD: [複雑なパスワード]
   ```

2. **専用ユーザーの作成**
   - rootユーザーを使わず、アプリケーション専用のユーザーを作成

3. **ポートの公開制限**
   - データベースポート（5432、3306）を外部に公開しない
   - docker-compose.ymlで`ports`セクションを追加しない

4. **環境変数の管理**
   - `.env`ファイルを使用してパスワードを管理
   - `.gitignore`に`.env`を追加

---

## 14. 便利なコマンド集

```bash
# データベースコンテナの再起動
docker compose restart postgres
docker compose restart mysql

# データベース内のコマンド実行
docker compose exec postgres psql -U postgres -c "SELECT version();"
docker compose exec mysql mysql -u root -pmysql_root_password -e "SELECT version();"

# データベースのログ監視
docker compose logs -f postgres
docker compose logs -f mysql

# リソース使用状況
docker stats postgres mysql

# データベースコンテナ内でシェルを起動
docker compose exec postgres sh
docker compose exec mysql bash
```

---

## 15. 開発ワークフロー例

### 新しいテーブルを追加する場合

1. 初期化スクリプトに追記
   ```bash
   vim postgres/init/02-add-table.sql
   ```

2. データベースを再初期化
   ```bash
   docker compose down
   sudo rm -rf postgres/data/*
   docker compose up -d postgres
   ```

3. Adminerで確認

---

## チェックリスト

- [ ] データベース用ディレクトリの作成完了
- [ ] PostgreSQL初期化スクリプトの作成完了
- [ ] MySQL初期化スクリプトの作成完了
- [ ] docker-compose.ymlの更新完了
- [ ] PostgreSQLコンテナの起動成功
- [ ] MySQLコンテナの起動成功
- [ ] Adminerコンテナの起動成功
- [ ] VM内からPostgreSQLに接続確認
- [ ] VM内からMySQLに接続確認
- [ ] hostsファイルの更新完了
- [ ] ブラウザからAdminerにアクセス可能
- [ ] Adminerから両方のDBに接続確認

すべて完了したら、Phase 3（ユーザー認証とアクセス制御）に進む準備が整っています。

---

## 次のステップ

Phase 3では、以下を実装します：
- Basic認証の追加
- ユーザー別のアクセス制御
- 開発者AはアプリケーションAのみアクセス可能
- 開発者BはアプリケーションBのみアクセス可能
- など