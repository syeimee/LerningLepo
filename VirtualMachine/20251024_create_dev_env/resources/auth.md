# Phase 3: ユーザー認証とアクセス制御

## 目的
Basic認証を使用して、各開発者が自分に割り当てられたアプリケーションのみにアクセスできるようにする

## 実現する認証・認可の仕組み

```
開発者A → Basic認証 → アプリケーションAのみアクセス可能
開発者B → Basic認証 → アプリケーションBのみアクセス可能
開発者C → Basic認証 → アプリケーションCのみアクセス可能
管理者   → Basic認証 → すべてのアプリケーション + Traefik管理画面 + DB管理画面
```

---

## 1. 認証の概要

### 1.1 使用する認証方式

- **Basic認証**: HTTPの標準的な認証方式
- **Traefik Middleware**: Traefikの認証機能を使用
- **ユーザー毎に異なる権限**: 各開発者は自分のアプリのみアクセス可能

### 1.2 セキュリティレベル

**開発環境向けの設定:**
- Basic認証による基本的なアクセス制御
- VPN接続との組み合わせでセキュリティ強化

**本番環境では:**
- OAuth2/OIDC（Keycloak、Auth0など）
- JWT認証
- SSLによる通信の暗号化

---

## 2. 認証用ユーザーの作成

### 2.1 htpasswdツールのインストール

```bash
# htpasswdコマンドのインストール
sudo apt install -y apache2-utils
```

### 2.2 認証用ディレクトリの作成

```bash
# 作業ディレクトリに移動
cd ~/docker-dev-env

# 認証ファイル用ディレクトリを作成
mkdir -p traefik/auth
```

### 2.3 ユーザーとパスワードの生成

```bash
# 強力なパスワードを生成
openssl rand -base64 32

# 開発者A用（最初のユーザーは -c オプションでファイル作成）
htpasswd -bc traefik/auth/app-a-users developerA $(openssl rand -base64 16)

# 開発者B用
htpasswd -bc traefik/auth/app-b-users developerB $(openssl rand -base64 16)

# 開発者C用
htpasswd -bc traefik/auth/app-c-users developerC $(openssl rand -base64 16)

# 管理者用（すべてにアクセス可能）
htpasswd -bc traefik/auth/admin-users admin $(openssl rand -base64 16)

# データベース管理者用
htpasswd -bc traefik/auth/db-users dbadmin $(openssl rand -base64 16)
```

**パスワードについて:**
- 上記のようにopenssl rand等で強力なパスワードを生成してください
- `-b`オプション: コマンドラインでパスワードを指定
- `-c`オプション: ファイルを新規作成

### 2.4 生成されたファイルの確認

```bash
# 各ファイルの内容を確認
cat traefik/auth/app-a-users
cat traefik/auth/app-b-users
cat traefik/auth/app-c-users
cat traefik/auth/admin-users
cat traefik/auth/db-users
```

**出力例:**
```
developerA:$apr1$xyz123$abc...
```
（パスワードはハッシュ化されて保存されます）

---

## 3. Traefik認証ミドルウェアの設定

### 3.1 動的設定ファイルの作成

```bash
# Traefik動的設定ファイルを作成
vim traefik/config/middlewares.yml
```

以下の内容を入力：

```yaml
# 認証ミドルウェアの定義

http:
  middlewares:
    # アプリケーションA用の認証
    auth-app-a:
      basicAuth:
        usersFile: "/etc/traefik/auth/app-a-users"
        realm: "Application A - Developer A Only"
    
    # アプリケーションB用の認証
    auth-app-b:
      basicAuth:
        usersFile: "/etc/traefik/auth/app-b-users"
        realm: "Application B - Developer B Only"
    
    # アプリケーションC用の認証
    auth-app-c:
      basicAuth:
        usersFile: "/etc/traefik/auth/app-c-users"
        realm: "Application C - Developer C Only"
    
    # 管理者用の認証
    auth-admin:
      basicAuth:
        usersFile: "/etc/traefik/auth/admin-users"
        realm: "Admin Area"
    
    # データベース管理用の認証
    auth-db:
      basicAuth:
        usersFile: "/etc/traefik/auth/db-users"
        realm: "Database Management"
```

保存（`:wq`）

### 3.2 traefik.ymlの更新

```bash
# Traefik静的設定を更新
vim traefik/traefik.yml
```

既存の内容に**以下を追加**（providersセクションを更新）：

```yaml
# Traefikの静的設定ファイル

# APIとダッシュボードの有効化
api:
  dashboard: true
  insecure: false  # 認証を追加するためfalseに変更

# エントリーポイント（受け付けるポート）の定義
entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

# プロバイダーの設定
providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
    network: dev-network
  
  # ファイルベースの設定を追加
  file:
    directory: "/etc/traefik/config"
    watch: true

# ログ設定
log:
  level: INFO

# アクセスログ
accessLog: {}
```

保存（`:wq`）

---

## 4. docker-compose.ymlの更新

### 4.1 Traefikコンテナの設定更新

```bash
vim docker-compose.yml
```

**traefikセクション**を以下のように更新：

```yaml
  # Traefikロードバランサ
  traefik:
    image: traefik:v2.10
    container_name: traefik
    restart: unless-stopped
    
    # ポートマッピング
    ports:
      - "80:80"        # HTTP
      - "443:443"      # HTTPS
      - "8080:8080"    # Traefikダッシュボード
    
    # ボリュームマウント
    volumes:
      # Dockerソケット（コンテナの検出に必要）
      - /var/run/docker.sock:/var/run/docker.sock:ro
      # Traefik設定ファイル
      - ./traefik/traefik.yml:/etc/traefik/traefik.yml:ro
      # 動的設定ファイル（認証設定）
      - ./traefik/config:/etc/traefik/config:ro
      # 認証ファイル
      - ./traefik/auth:/etc/traefik/auth:ro
    
    # ネットワーク
    networks:
      - dev-network
    
    # ラベル（Traefik自身の設定）
    labels:
      - "traefik.enable=true"
      # ダッシュボード用のルーター（管理者認証付き）
      - "traefik.http.routers.dashboard.rule=Host(`traefik.localhost`)"
      - "traefik.http.routers.dashboard.service=api@internal"
      - "traefik.http.routers.dashboard.middlewares=auth-admin@file"
```

### 4.2 各アプリケーションに認証を追加

**app-aセクション**を更新：

```yaml
  # アプリケーションA（Nginx）
  app-a:
    image: nginx:alpine
    container_name: app-a
    restart: unless-stopped
    
    volumes:
      - ./app-a/html:/usr/share/nginx/html:ro
    
    networks:
      - dev-network
    
    labels:
      - "traefik.enable=true"
      # HTTPルーター（認証ミドルウェア追加）
      - "traefik.http.routers.app-a.rule=Host(`app-a.localhost`)"
      - "traefik.http.routers.app-a.entrypoints=web"
      - "traefik.http.routers.app-a.middlewares=auth-app-a@file"
      - "traefik.http.services.app-a.loadbalancer.server.port=80"
```

**app-bセクション**を更新：

```yaml
  # アプリケーションB（Apache）
  app-b:
    image: httpd:alpine
    container_name: app-b
    restart: unless-stopped
    
    volumes:
      - ./app-b/html:/usr/local/apache2/htdocs:ro
    
    networks:
      - dev-network
    
    labels:
      - "traefik.enable=true"
      # HTTPルーター（認証ミドルウェア追加）
      - "traefik.http.routers.app-b.rule=Host(`app-b.localhost`)"
      - "traefik.http.routers.app-b.entrypoints=web"
      - "traefik.http.routers.app-b.middlewares=auth-app-b@file"
      - "traefik.http.services.app-b.loadbalancer.server.port=80"
```

**app-cセクション**を更新：

```yaml
  # アプリケーションC（Node.js）
  app-c:
    build: ./app-c
    container_name: app-c
    restart: unless-stopped
    
    networks:
      - dev-network
    
    labels:
      - "traefik.enable=true"
      # HTTPルーター（認証ミドルウェア追加）
      - "traefik.http.routers.app-c.rule=Host(`app-c.localhost`)"
      - "traefik.http.routers.app-c.entrypoints=web"
      - "traefik.http.routers.app-c.middlewares=auth-app-c@file"
      - "traefik.http.services.app-c.loadbalancer.server.port=3000"
```

**adminerセクション**を更新：

```yaml
  # Adminer（データベース管理ツール）
  adminer:
    image: adminer:latest
    container_name: adminer
    restart: unless-stopped
    
    environment:
      ADMINER_DESIGN: pepa-linha
    
    networks:
      - dev-network
    
    labels:
      - "traefik.enable=true"
      # HTTPルーター（データベース管理者認証追加）
      - "traefik.http.routers.adminer.rule=Host(`db.localhost`)"
      - "traefik.http.routers.adminer.entrypoints=web"
      - "traefik.http.routers.adminer.middlewares=auth-db@file"
      - "traefik.http.services.adminer.loadbalancer.server.port=8080"
    
    depends_on:
      postgres:
        condition: service_healthy
      mysql:
        condition: service_healthy
```

保存（`:wq`）

---

## 5. ディレクトリ構造の確認

```bash
cd ~/docker-dev-env
tree -L 3
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
├── postgres
│   ├── data
│   └── init
└── traefik
    ├── auth
    │   ├── admin-users
    │   ├── app-a-users
    │   ├── app-b-users
    │   ├── app-c-users
    │   └── db-users
    ├── config
    │   └── middlewares.yml
    └── traefik.yml
```

---

## 6. 認証設定の適用

### 6.1 設定ファイルの検証

```bash
# docker-compose.ymlの構文チェック
docker compose config
```

### 6.2 コンテナの再起動

```bash
# すべてのコンテナを停止
docker compose down

# すべてのコンテナを再起動
docker compose up -d

# 起動確認
docker compose ps
```

### 6.3 Traefikログで認証設定の読み込みを確認

```bash
# Traefikのログを確認
docker compose logs traefik | grep middleware

# リアルタイムでログ監視
docker compose logs -f traefik
```

---

## 7. 認証のテスト

### 7.1 VM内での認証テスト

#### 認証なしでアクセス（拒否されることを確認）

```bash
# 認証なしでアクセス（401エラーが返る）
curl -H "Host: app-a.localhost" http://localhost

# 期待される出力: 401 Unauthorized
```

#### 正しい認証情報でアクセス

```bash
# 開発者AでアプリケーションAにアクセス（成功）
curl -u developerA:<password> -H "Host: app-a.localhost" http://localhost

# 期待される出力: HTMLコンテンツ
```

#### 間違った認証情報でアクセス

```bash
# 開発者BでアプリケーションAにアクセス（失敗）
curl -u developerB:<password> -H "Host: app-a.localhost" http://localhost

# 期待される出力: 401 Unauthorized
```

### 7.2 各ユーザーのアクセス権限テスト

```bash
# 開発者A: アプリAのみアクセス可能
curl -u developerA:<password> -H "Host: app-a.localhost" http://localhost  # ✓ 成功
curl -u developerA:<password> -H "Host: app-b.localhost" http://localhost  # ✗ 失敗
curl -u developerA:<password> -H "Host: app-c.localhost" http://localhost  # ✗ 失敗

# 開発者B: アプリBのみアクセス可能
curl -u developerB:<password> -H "Host: app-b.localhost" http://localhost  # ✓ 成功
curl -u developerB:<password> -H "Host: app-a.localhost" http://localhost  # ✗ 失敗
curl -u developerB:<password> -H "Host: app-c.localhost" http://localhost  # ✗ 失敗

# 開発者C: アプリCのみアクセス可能
curl -u developerC:<password> -H "Host: app-c.localhost" http://localhost  # ✓ 成功
curl -u developerC:<password> -H "Host: app-a.localhost" http://localhost  # ✗ 失敗
curl -u developerC:<password> -H "Host: app-b.localhost" http://localhost  # ✗ 失敗
```

---

## 8. ブラウザでの認証テスト

### 8.1 アプリケーションAへのアクセス

1. ブラウザで `http://app-a.localhost:8000` を開く
2. Basic認証ダイアログが表示される
3. 以下の情報を入力：
   ```
   ユーザー名: developerA
   パスワード: <設定したパスワード>
   ```
4. 「OK」をクリック
5. アプリケーションAのページが表示される ✓

**間違った認証情報の場合:**
```
ユーザー名: developerB
パスワード: <developerBのパスワード>
```
→ 「401 Unauthorized」エラーが表示される

### 8.2 アプリケーションBへのアクセス

1. ブラウザで `http://app-b.localhost:8000` を開く
2. 認証ダイアログで以下を入力：
   ```
   ユーザー名: developerB
   パスワード: <設定したパスワード>
   ```
3. アプリケーションBのページが表示される ✓

### 8.3 アプリケーションCへのアクセス

1. ブラウザで `http://app-c.localhost:8000` を開く
2. 認証ダイアログで以下を入力：
   ```
   ユーザー名: developerC
   パスワード: <設定したパスワード>
   ```
3. アプリケーションCのページが表示される ✓

### 8.4 Traefikダッシュボードへのアクセス

1. ブラウザで `http://traefik.localhost:9090` を開く
2. 認証ダイアログで以下を入力：
   ```
   ユーザー名: admin
   パスワード: <設定したパスワード>
   ```
3. Traefikダッシュボードが表示される ✓
4. ミドルウェアが正しく設定されているか確認

### 8.5 データベース管理画面へのアクセス

1. ブラウザで `http://db.localhost:8000` を開く
2. 認証ダイアログで以下を入力：
   ```
   ユーザー名: dbadmin
   パスワード: <設定したパスワード>
   ```
3. Adminerのログイン画面が表示される ✓

---

## 9. ユーザーの追加・変更

### 9.1 既存ユーザーのパスワード変更

```bash
# アプリAのユーザーのパスワードを変更
htpasswd -b traefik/auth/app-a-users developerA $(openssl rand -base64 16)

# 変更を反映（Traefikが自動で検出）
# ファイル監視が有効なので、再起動は不要
```

### 9.2 新しいユーザーの追加

```bash
# アプリAに新しいユーザーを追加（-cオプションは付けない）
htpasswd -b traefik/auth/app-a-users developerA2 $(openssl rand -base64 16)

# 確認
cat traefik/auth/app-a-users
```

**注意:** `-c`オプションを付けるとファイルが上書きされます。追加する場合は付けないでください。

### 9.3 ユーザーの削除

```bash
# ユーザーを削除
htpasswd -D traefik/auth/app-a-users developerA2

# 確認
cat traefik/auth/app-a-users
```

---

## 10. 複数ユーザーが同じアプリにアクセスする設定

### 10.1 チーム用の認証ファイル作成

```bash
# チームA用（複数の開発者）
htpasswd -bc traefik/auth/team-a-users dev1 $(openssl rand -base64 16)
htpasswd -b traefik/auth/team-a-users dev2 $(openssl rand -base64 16)
htpasswd -b traefik/auth/team-a-users dev3 $(openssl rand -base64 16)
```

### 10.2 ミドルウェアの追加

```bash
vim traefik/config/middlewares.yml
```

以下を追加：

```yaml
    # チームA用の認証
    auth-team-a:
      basicAuth:
        usersFile: "/etc/traefik/auth/team-a-users"
        realm: "Team A Area"
```

### 10.3 アプリケーションへの適用

docker-compose.ymlでミドルウェアを変更：

```yaml
      - "traefik.http.routers.app-a.middlewares=auth-team-a@file"
```

---

## 11. 高度な認証設定

### 11.1 複数のミドルウェアを組み合わせる

```yaml
# middlewares.yml
http:
  middlewares:
    # IPアドレス制限
    ip-whitelist:
      ipWhiteList:
        sourceRange:
          - "192.168.1.0/24"
          - "10.0.0.0/8"
    
    # レート制限
    rate-limit:
      rateLimit:
        average: 100
        burst: 50
```

docker-compose.ymlで適用：

```yaml
      - "traefik.http.routers.app-a.middlewares=auth-app-a@file,ip-whitelist@file,rate-limit@file"
```

### 11.2 カスタムエラーページ

```yaml
# middlewares.yml
http:
  middlewares:
    custom-errors:
      errors:
        status:
          - "401-404"
        service: error-page
        query: "/{status}.html"
```

---

## 12. 認証ログの確認

### 12.1 認証成功・失敗のログ確認

```bash
# 認証関連のログをフィルタリング
docker compose logs traefik | grep "401"
docker compose logs traefik | grep "authentication"

# アクセスログから特定のユーザーを検索
docker compose logs traefik | grep "developerA"
```

---

## 13. トラブルシューティング

### 認証ダイアログが表示されない

```bash
# ミドルウェアが正しく読み込まれているか確認
docker compose logs traefik | grep middleware

# 認証ファイルのパスを確認
docker compose exec traefik ls -la /etc/traefik/auth/

# ミドルウェア設定ファイルを確認
docker compose exec traefik cat /etc/traefik/config/middlewares.yml
```

### 正しいパスワードで認証に失敗する

```bash
# htpasswdファイルの形式を確認
cat traefik/auth/app-a-users

# ファイルの権限を確認
ls -l traefik/auth/

# パスワードを再生成
htpasswd -bc traefik/auth/app-a-users developerA $(openssl rand -base64 16)
```

### ミドルウェアが適用されない

```bash
# Traefikを再起動
docker compose restart traefik

# 設定ファイルの構文エラーを確認
docker compose config

# ラベルが正しく設定されているか確認
docker inspect app-a | grep traefik
```

---

## 14. セキュリティのベストプラクティス

### 14.1 強力なパスワードの使用

```bash
# ランダムなパスワードを生成
openssl rand -base64 32

# またはpwgenを使用
sudo apt install -y pwgen
pwgen 32 1
```

### 14.2 認証ファイルの権限設定

```bash
# 認証ファイルを読み取り専用に
chmod 600 traefik/auth/*

# 所有者を確認
ls -l traefik/auth/
```

### 14.3 環境変数を使用したパスワード管理

```bash
# .envファイルを作成
vim .env
```

以下を入力：

```bash
DEV_A_PASSWORD=your_secure_password_here
DEV_B_PASSWORD=your_secure_password_here
DEV_C_PASSWORD=your_secure_password_here
ADMIN_PASSWORD=your_secure_admin_password_here
```

**.gitignore**に追加：

```bash
echo ".env" >> .gitignore
```

---

## 15. 本番環境への移行準備

### 15.1 SSL/TLS証明書の設定

本番環境では、HTTPS通信を使用してください：

```yaml
# traefik.yml
certificatesResolvers:
  letsencrypt:
    acme:
      email: your-email@example.com
      storage: /etc/traefik/acme.json
      httpChallenge:
        entryPoint: web
```

### 15.2 OAuth2/OIDCへの移行

より高度な認証が必要な場合：

- **Keycloak**: オープンソースのIdentity Provider
- **Auth0**: マネージドサービス
- **Authentik**: モダンなIDプロバイダー

---

## チェックリスト

- [ ] htpasswdのインストール完了
- [ ] 認証用ディレクトリの作成完了
- [ ] すべてのユーザーのパスワードファイル作成完了
- [ ] middlewares.ymlの作成完了
- [ ] traefik.ymlの更新完了
- [ ] docker-compose.ymlの更新完了
- [ ] コンテナの再起動成功
- [ ] VM内での認証テスト成功
- [ ] 各開発者が自分のアプリのみアクセス可能
- [ ] ブラウザでの認証ダイアログ表示確認
- [ ] 管理者でTraefikダッシュボードアクセス可能
- [ ] DB管理者でAdminerアクセス可能

すべて完了したら、開発環境の構築は完了です！

---

## 次のステップ

これで開発環境の基本構築が完了しました。次は：

1. **実際のアプリケーション開発**
   - 既存のアプリケーションをコンテナ化
   - データベースとの連携実装

2. **VPSへの移行**
   - VPSサーバーを借りる
   - VirtualBoxで検証した構成をVPSに展開
   - VPN設定の追加

3. **CI/CDパイプラインの構築**
   - GitLab CI/CD
   - GitHub Actions
   - 自動デプロイの実装

4. **監視とロギング**
   - Prometheus + Grafana
   - ログ集約（ELKスタック）

---

## まとめ

これまでに構築した環境：

```
VirtualBox VM
├── Traefik（ロードバランサ + 認証）
├── アプリケーションA（開発者A専用）
├── アプリケーションB（開発者B専用）
├── アプリケーションC（開発者C専用）
├── PostgreSQL（データベース）
├── MySQL（データベース）
└── Adminer（DB管理ツール）
```

**実現した機能：**
- ✓ コンテナベースの開発環境
- ✓ ロードバランサによるルーティング
- ✓ ユーザー別のアクセス制御
- ✓ データベースの分離と管理
- ✓ 開発者ごとのアプリケーション割り当て

お疲れ様でした！