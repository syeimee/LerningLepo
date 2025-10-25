# Phase 2-1: ロードバランサの構築

## 目的
Traefikを使用してロードバランサ兼リバースプロキシを構築し、後続のアプリケーションへのアクセスを制御する基盤を作る

## なぜTraefikを使うのか
- Docker対応が優れている
- 自動的にコンテナを検出してルーティング
- Basic認証などのアクセス制御機能が組み込まれている
- ダッシュボードで状態を可視化できる
- 設定がシンプル

---

## 1. 作業ディレクトリの準備

```bash
# ホームディレクトリに作業フォルダを作成
cd ~
mkdir -p docker-dev-env
cd docker-dev-env

# ディレクトリ構成を作成
mkdir -p traefik/config
```

---

## 2. Traefik設定ファイルの作成

### 2.1 traefik.ymlの作成

```bash
# Traefik用の静的設定ファイルを作成
vim traefik/traefik.yml
```

以下の内容を入力：

```yaml
# Traefikの静的設定ファイル

# APIとダッシュボードの有効化
api:
  dashboard: true
  insecure: true  # 開発環境のため（本番では false にする）

# エントリーポイント（受け付けるポート）の定義
entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

# Dockerプロバイダーの設定
providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false  # 明示的に指定したコンテナのみ公開
    network: dev-network

# ログ設定
log:
  level: INFO

# アクセスログ
accessLog: {}
```

保存して終了（`:wq`）

---

## 3. Docker Composeファイルの作成

### 3.1 docker-compose.ymlの作成

```bash
# docker-compose.ymlを作成
vim docker-compose.yml
```

以下の内容を入力：

```yaml
version: '3.8'

# ネットワークの定義
networks:
  dev-network:
    driver: bridge

services:
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
    
    # ネットワーク
    networks:
      - dev-network
    
    # ラベル（Traefik自身の設定）
    labels:
      - "traefik.enable=true"
      # ダッシュボード用のルーター
      - "traefik.http.routers.dashboard.rule=Host(`traefik.localhost`)"
      - "traefik.http.routers.dashboard.service=api@internal"
```

保存して終了（`:wq`）

---

## 4. Traefikの起動

### 4.1 コンテナの起動

```bash
# docker-compose.ymlがあるディレクトリで実行
cd ~/docker-dev-env

# コンテナをバックグラウンドで起動
docker compose up -d
```

### 4.2 起動確認

```bash
# コンテナの状態確認
docker compose ps

# ログの確認
docker compose logs traefik

# リアルタイムでログを監視（Ctrl+Cで終了）
docker compose logs -f traefik
```

**期待される出力:**
```
NAME      IMAGE           STATUS    PORTS
traefik   traefik:v2.10   Up        0.0.0.0:80->80/tcp, 
                                    0.0.0.0:443->443/tcp,
                                    0.0.0.0:8080->8080/tcp
```

---

## 5. VirtualBoxのポートフォワーディング設定

Traefikにホストマシンからアクセスするため、VirtualBoxの設定を追加します。

### 5.1 ポートフォワーディングの追加

1. VirtualBoxマネージャーで仮想マシンを選択
2. 「設定」→「ネットワーク」→「アダプター1」
3. 「高度」→「ポートフォワーディング」

以下のルールを追加：

```
名前              プロトコル  ホストIP      ホストポート  ゲストポート
Traefik-HTTP      TCP        127.0.0.1     8000          80
Traefik-HTTPS     TCP        127.0.0.1     8443          443
Traefik-Dashboard TCP        127.0.0.1     8080          8080
```

---

## 6. 動作確認

### 6.1 ダッシュボードへのアクセス

ホストマシン（Windows）のブラウザで以下のURLを開く：

```
http://localhost:8080
```

**確認ポイント:**
- Traefikのダッシュボードが表示される
- 「HTTP Routers」に1つのルーター（dashboard）が表示される
- 「HTTP Services」にサービスが表示される

### 6.2 ヘルスチェック

VM内で以下のコマンドを実行：

```bash
# Traefikのヘルスチェック
curl http://localhost:8080/ping

# 期待される出力: OK
```

### 6.3 ネットワークの確認

```bash
# 作成されたネットワークを確認
docker network ls

# dev-networkの詳細を確認
docker network inspect docker-dev-env_dev-network
```

---

## 7. テスト用簡易Webサーバーの追加

Traefikが正しく動作しているか確認するため、簡単なWebサーバーを追加します。

### 7.1 docker-compose.ymlに追加

```bash
vim docker-compose.yml
```

既存の内容の下に以下を追加：

```yaml
  # テスト用Webサーバー
  whoami:
    image: traefik/whoami
    container_name: whoami
    restart: unless-stopped
    
    networks:
      - dev-network
    
    labels:
      - "traefik.enable=true"
      # HTTPルーター
      - "traefik.http.routers.whoami.rule=Host(`whoami.localhost`)"
      - "traefik.http.routers.whoami.entrypoints=web"
      - "traefik.http.services.whoami.loadbalancer.server.port=80"
```

### 7.2 変更を反映

```bash
# 設定を再読み込みして起動
docker compose up -d

# 状態確認
docker compose ps
```

### 7.3 テストサーバーへのアクセス

VM内で確認：

```bash
# curlでアクセステスト
curl -H "Host: whoami.localhost" http://localhost

# 期待される出力: ホスト名、IPアドレスなどの情報
```

ホストマシンのブラウザから（hosts設定後）：
```
http://localhost:8000
```

※ブラウザで `whoami.localhost` にアクセスするには、ホストマシンのhostsファイル編集が必要です（後述）

---

## 8. ホストマシンのhosts設定（Windows）

### 8.1 hostsファイルの編集

1. メモ帳を**管理者として実行**
2. ファイル→開く
3. `C:\Windows\System32\drivers\etc\hosts` を開く
4. 最後に以下を追加：

```
127.0.0.1 traefik.localhost
127.0.0.1 whoami.localhost
```

5. 保存

### 8.2 ブラウザで確認

ブラウザで以下のURLを開く：

1. **Traefikダッシュボード:**
   ```
   http://traefik.localhost:8080
   ```

2. **テストWebサーバー:**
   ```
   http://whoami.localhost:8000
   ```

**成功の確認:**
- Traefikダッシュボードが表示される
- whoamiサーバーがホスト名などの情報を表示する

---

## 9. トラブルシューティング

### コンテナが起動しない場合

```bash
# エラーログの詳細を確認
docker compose logs traefik

# コンテナを停止して再起動
docker compose down
docker compose up -d
```

### ポートが使用中の場合

```bash
# ポート使用状況の確認
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :8080

# 競合しているプロセスを停止
sudo systemctl stop apache2  # Apacheが動いている場合
```

### Dockerソケットのパーミッションエラー

```bash
# dockerグループの確認
groups $USER

# dockerグループにユーザーが含まれていない場合
sudo usermod -aG docker $USER

# 再ログインして反映
exit
# 再度SSH接続
```

### ブラウザでアクセスできない場合

1. VirtualBoxのポートフォワーディング設定を再確認
2. VM内でコンテナが起動しているか確認：`docker compose ps`
3. VM内からアクセスできるか確認：`curl http://localhost:8080`
4. ホストマシンのファイアウォール設定を確認

---

## 10. 便利なコマンド集

```bash
# コンテナの起動
docker compose up -d

# コンテナの停止
docker compose down

# コンテナの再起動
docker compose restart

# ログの確認（全コンテナ）
docker compose logs

# ログの確認（特定のコンテナ）
docker compose logs traefik

# リアルタイムログ監視
docker compose logs -f

# コンテナの状態確認
docker compose ps

# 設定ファイルの検証
docker compose config
```

---

## チェックリスト

- [ ] 作業ディレクトリの作成完了
- [ ] traefik.ymlの作成完了
- [ ] docker-compose.ymlの作成完了
- [ ] Traefikコンテナの# Phase 2-1: ロードバランサの構築

## 目的
Traefikを使用してロードバランサ兼リバースプロキシを構築し、後続のアプリケーションへのアクセスを制御する基盤を作る

## なぜTraefikを使うのか
- Docker対応が優れている
- 自動的にコンテナを検出してルーティング
- Basic認証などのアクセス制御機能が組み込まれている
- ダッシュボードで状態を可視化できる
- 設定がシンプル

---

## 1. 作業ディレクトリの準備

```bash
# ホームディレクトリに作業フォルダを作成
cd ~
mkdir -p docker-dev-env
cd docker-dev-env

# ディレクトリ構成を作成
mkdir -p traefik/config
```

---

## 2. Traefik設定ファイルの作成

### 2.1 traefik.ymlの作成

```bash
# Traefik用の静的設定ファイルを作成
vim traefik/traefik.yml
```

以下の内容を入力：

```yaml
# Traefikの静的設定ファイル

# APIとダッシュボードの有効化
api:
  dashboard: true
  insecure: true  # 開発環境のため（本番では false にする）

# エントリーポイント（受け付けるポート）の定義
entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

# Dockerプロバイダーの設定
providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false  # 明示的に指定したコンテナのみ公開
    network: dev-network

# ログ設定
log:
  level: INFO

# アクセスログ
accessLog: {}
```

保存して終了（`:wq`）

---

## 3. Docker Composeファイルの作成

### 3.1 docker-compose.ymlの作成

```bash
# docker-compose.ymlを作成
vim docker-compose.yml
```

以下の内容を入力：

```yaml
version: '3.8'

# ネットワークの定義
networks:
  dev-network:
    driver: bridge

services:
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
    
    # ネットワーク
    networks:
      - dev-network
    
    # ラベル（Traefik自身の設定）
    labels:
      - "traefik.enable=true"
      # ダッシュボード用のルーター
      - "traefik.http.routers.dashboard.rule=Host(`traefik.localhost`)"
      - "traefik.http.routers.dashboard.service=api@internal"
```

保存して終了（`:wq`）

---

## 4. Traefikの起動

### 4.1 コンテナの起動

```bash
# docker-compose.ymlがあるディレクトリで実行
cd ~/docker-dev-env

# コンテナをバックグラウンドで起動
docker compose up -d
```

### 4.2 起動確認

```bash
# コンテナの状態確認
docker compose ps

# ログの確認
docker compose logs traefik

# リアルタイムでログを監視（Ctrl+Cで終了）
docker compose logs -f traefik
```

**期待される出力:**
```
NAME      IMAGE           STATUS    PORTS
traefik   traefik:v2.10   Up        0.0.0.0:80->80/tcp, 
                                    0.0.0.0:443->443/tcp,
                                    0.0.0.0:8080->8080/tcp
```

---

## 5. VirtualBoxのポートフォワーディング設定

Traefikにホストマシンからアクセスするため、VirtualBoxの設定を追加します。

### 5.1 ポートフォワーディングの追加

1. VirtualBoxマネージャーで仮想マシンを選択
2. 「設定」→「ネットワーク」→「アダプター1」
3. 「高度」→「ポートフォワーディング」

以下のルールを追加：

```
名前              プロトコル  ホストIP      ホストポート  ゲストポート
Traefik-HTTP      TCP        127.0.0.1     8000          80
Traefik-HTTPS     TCP        127.0.0.1     8443          443
Traefik-Dashboard TCP        127.0.0.1     8080          8080
```

---

## 6. 動作確認

### 6.1 ダッシュボードへのアクセス

ホストマシン（Windows）のブラウザで以下のURLを開く：

```
http://localhost:8080
```

**確認ポイント:**
- Traefikのダッシュボードが表示される
- 「HTTP Routers」に1つのルーター（dashboard）が表示される
- 「HTTP Services」にサービスが表示される

### 6.2 ヘルスチェック

VM内で以下のコマンドを実行：

```bash
# Traefikのヘルスチェック
curl http://localhost:8080/ping

# 期待される出力: OK
```

### 6.3 ネットワークの確認

```bash
# 作成されたネットワークを確認
docker network ls

# dev-networkの詳細を確認
docker network inspect docker-dev-env_dev-network
```

---

## 7. テスト用簡易Webサーバーの追加

Traefikが正しく動作しているか確認するため、簡単なWebサーバーを追加します。

### 7.1 docker-compose.ymlに追加

```bash
vim docker-compose.yml
```

既存の内容の下に以下を追加：

```yaml
  # テスト用Webサーバー
  whoami:
    image: traefik/whoami
    container_name: whoami
    restart: unless-stopped
    
    networks:
      - dev-network
    
    labels:
      - "traefik.enable=true"
      # HTTPルーター
      - "traefik.http.routers.whoami.rule=Host(`whoami.localhost`)"
      - "traefik.http.routers.whoami.entrypoints=web"
      - "traefik.http.services.whoami.loadbalancer.server.port=80"
```

### 7.2 変更を反映

```bash
# 設定を再読み込みして起動
docker compose up -d

# 状態確認
docker compose ps
```

### 7.3 テストサーバーへのアクセス

VM内で確認：

```bash
# curlでアクセステスト
curl -H "Host: whoami.localhost" http://localhost

# 期待される出力: ホスト名、IPアドレスなどの情報
```

ホストマシンのブラウザから（hosts設定後）：
```
http://localhost:8000
```

※ブラウザで `whoami.localhost` にアクセスするには、ホストマシンのhostsファイル編集が必要です（後述）

---

## 8. ホストマシンのhosts設定（Windows）

### 8.1 hostsファイルの編集

1. メモ帳を**管理者として実行**
2. ファイル→開く
3. `C:\Windows\System32\drivers\etc\hosts` を開く
4. 最後に以下を追加：

```
127.0.0.1 traefik.localhost
127.0.0.1 whoami.localhost
```

5. 保存

### 8.2 ブラウザで確認

ブラウザで以下のURLを開く：

1. **Traefikダッシュボード:**
   ```
   http://traefik.localhost:8080
   ```

2. **テストWebサーバー:**
   ```
   http://whoami.localhost:8000
   ```

**成功の確認:**
- Traefikダッシュボードが表示される
- whoamiサーバーがホスト名などの情報を表示する

---

## 9. トラブルシューティング

### コンテナが起動しない場合

```bash
# エラーログの詳細を確認
docker compose logs traefik

# コンテナを停止して再起動
docker compose down
docker compose up -d
```

### ポートが使用中の場合

```bash
# ポート使用状況の確認
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :8080

# 競合しているプロセスを停止
sudo systemctl stop apache2  # Apacheが動いている場合
```

### Dockerソケットのパーミッションエラー

```bash
# dockerグループの確認
groups $USER

# dockerグループにユーザーが含まれていない場合
sudo usermod -aG docker $USER

# 再ログインして反映
exit
# 再度SSH接続
```

### ブラウザでアクセスできない場合

1. VirtualBoxのポートフォワーディング設定を再確認
2. VM内でコンテナが起動しているか確認：`docker compose ps`
3. VM内からアクセスできるか確認：`curl http://localhost:8080`
4. ホストマシンのファイアウォール設定を確認

---

## 10. 便利なコマンド集

```bash
# コンテナの起動
docker compose up -d

# コンテナの停止
docker compose down

# コンテナの再起動
docker compose restart

# ログの確認（全コンテナ）
docker compose logs

# ログの確認（特定のコンテナ）
docker compose logs traefik

# リアルタイムログ監視
docker compose logs -f

# コンテナの状態確認
docker compose ps

# 設定ファイルの検証
docker compose config
```

---

## チェックリスト

- [ ] 作業ディレクトリの作成完了
- [ ] traefik.ymlの作成完了
- [ ] docker-compose.ymlの作成完了
- [ ] Traefikコンテナの起動成功
- [ ] VirtualBoxのポートフォワーディング設定完了
- [ ] Traefikダッシュボードにアクセス可能
- [ ] テスト用whoamiサーバーの起動成功
- [ ] ホストマシンのhosts設定完了
- [ ] whoamiサーバーにブラウザからアクセス可能

すべて完了したら、Phase 2-2（アプリケーションサーバーの追加）に進む準備が整っています。

---

## 次のステップ

Phase 2-1が完了したら：
- Phase 2-2: アプリケーションサーバーの追加
- Phase 2-3: データベースサーバーの追加
- Phase 3: ユーザー認証とアクセス制御の実装
起動成功
- [ ] VirtualBoxのポートフォワーディング設定完了
- [ ] Traefikダッシュボードにアクセス可能
- [ ] テスト用whoamiサーバーの起動成功
- [ ] ホストマシンのhosts設定完了
- [ ] whoamiサーバーにブラウザからアクセス可能

すべて完了したら、Phase 2-2（アプリケーションサーバーの追加）に進む準備が整っています。

---

## 次のステップ

Phase 2-1が完了したら：
- Phase 2-2: アプリケーションサーバーの追加
- Phase 2-3: データベースサーバーの追加
- Phase 3: ユーザー認証とアクセス制御の実装
