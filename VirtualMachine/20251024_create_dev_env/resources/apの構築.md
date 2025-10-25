# Phase 2-2: アプリケーションサーバーの追加

## 目的
複数のアプリケーションサーバーをTraefikの背後に配置し、それぞれ異なるドメイン/パスでアクセスできるようにする

## 構成イメージ
```
ブラウザ → Traefik (ロードバランサ)
              ├→ app-a.localhost → アプリケーションA
              ├→ app-b.localhost → アプリケーションB
              └→ app-c.localhost → アプリケーションC
```

---

## 1. アプリケーションの準備

今回は簡単なWebアプリケーションとして以下を使用します：
- **nginx**: 静的ファイル配信用
- **httpd (Apache)**: 別のWebサーバー例
- **Node.js**: 簡単なAPIサーバー

実際の開発では、これらを独自のアプリケーションに置き換えます。

---

## 2. アプリケーション用ディレクトリの作成

```bash
# 作業ディレクトリに移動
cd ~/docker-dev-env

# 各アプリケーション用のディレクトリを作成
mkdir -p app-a/html
mkdir -p app-b/html
mkdir -p app-c
```

---

## 3. アプリケーションAの準備（Nginx）

### 3.1 HTMLファイルの作成

```bash
# アプリケーションAのHTMLファイルを作成
vim app-a/html/index.html
```

以下の内容を入力：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>アプリケーションA</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f0f8ff;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }
        .info {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <h1>🚀 アプリケーションA</h1>
    <div class="info">
        <p><strong>サーバー:</strong> Nginx</p>
        <p><strong>説明:</strong> これは開発者A専用のアプリケーションです</p>
        <p><strong>機能:</strong> 静的コンテンツの配信</p>
    </div>
</body>
</html>
```

保存（`:wq`）

---

## 4. アプリケーションBの準備（Apache）

### 4.1 HTMLファイルの作成

```bash
# アプリケーションBのHTMLファイルを作成
vim app-b/html/index.html
```

以下の内容を入力：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>アプリケーションB</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff5f5;
        }
        h1 {
            color: #c0392b;
            border-bottom: 3px solid #e74c3c;
            padding-bottom: 10px;
        }
        .info {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <h1>🎯 アプリケーションB</h1>
    <div class="info">
        <p><strong>サーバー:</strong> Apache</p>
        <p><strong>説明:</strong> これは開発者B専用のアプリケーションです</p>
        <p><strong>機能:</strong> Webアプリケーションホスティング</p>
    </div>
</body>
</html>
```

保存（`:wq`）

---

## 5. アプリケーションCの準備（Node.js）

### 5.1 簡単なNode.jsサーバーの作成

```bash
# アプリケーションCのJSファイルを作成
vim app-c/server.js
```

以下の内容を入力：

```javascript
const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>アプリケーションC</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f0fff0;
        }
        h1 {
            color: #27ae60;
            border-bottom: 3px solid #2ecc71;
            padding-bottom: 10px;
        }
        .info {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <h1>⚡ アプリケーションC</h1>
    <div class="info">
        <p><strong>サーバー:</strong> Node.js</p>
        <p><strong>説明:</strong> これは開発者C専用のアプリケーションです</p>
        <p><strong>機能:</strong> APIサーバー / バックエンド処理</p>
        <p><strong>アクセス時刻:</strong> ${new Date().toLocaleString('ja-JP')}</p>
    </div>
</body>
</html>
  `;
  
  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

保存（`:wq`）

### 5.2 Dockerfileの作成

```bash
# Node.js用のDockerfileを作成
vim app-c/Dockerfile
```

以下の内容を入力：

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY server.js .

EXPOSE 3000

CMD ["node", "server.js"]
```

保存（`:wq`）

---

## 6. docker-compose.ymlの更新

既存のdocker-compose.ymlにアプリケーションを追加します。

```bash
vim docker-compose.yml
```

**既存の内容を残したまま**、最後に以下を追加：

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
      # HTTPルーター
      - "traefik.http.routers.app-a.rule=Host(`app-a.localhost`)"
      - "traefik.http.routers.app-a.entrypoints=web"
      - "traefik.http.services.app-a.loadbalancer.server.port=80"
  
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
      # HTTPルーター
      - "traefik.http.routers.app-b.rule=Host(`app-b.localhost`)"
      - "traefik.http.routers.app-b.entrypoints=web"
      - "traefik.http.services.app-b.loadbalancer.server.port=80"
  
  # アプリケーションC（Node.js）
  app-c:
    build: ./app-c
    container_name: app-c
    restart: unless-stopped
    
    networks:
      - dev-network
    
    labels:
      - "traefik.enable=true"
      # HTTPルーター
      - "traefik.http.routers.app-c.rule=Host(`app-c.localhost`)"
      - "traefik.http.routers.app-c.entrypoints=web"
      - "traefik.http.services.app-c.loadbalancer.server.port=3000"
```

保存（`:wq`）

---

## 7. 完成したディレクトリ構造の確認

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
│       └── index.html
├── app-b
│   └── html
│       └── index.html
├── app-c
│   ├── Dockerfile
│   └── server.js
├── docker-compose.yml
└── traefik
    └── traefik.yml
```

---

## 8. アプリケーションの起動

### 8.1 設定ファイルの検証

```bash
# docker-compose.ymlの構文チェック
docker compose config
```

エラーが出なければOK。

### 8.2 コンテナのビルドと起動

```bash
# すべてのコンテナをビルド・起動
docker compose up -d --build

# 起動確認
docker compose ps
```

**期待される出力:**
```
NAME      IMAGE               STATUS    PORTS
traefik   traefik:v2.10       Up        0.0.0.0:80->80/tcp, ...
whoami    traefik/whoami      Up
app-a     nginx:alpine        Up
app-b     httpd:alpine        Up
app-c     docker-dev-env-app-c Up
```

### 8.3 ログの確認

```bash
# すべてのコンテナのログを確認
docker compose logs

# 特定のアプリケーションのログ
docker compose logs app-a
docker compose logs app-b
docker compose logs app-c
```

---

## 9. VM内での動作確認

### 9.1 各アプリケーションへのアクセステスト

```bash
# アプリケーションA
curl -H "Host: app-a.localhost" http://localhost

# アプリケーションB
curl -H "Host: app-b.localhost" http://localhost

# アプリケーションC
curl -H "Host: app-c.localhost" http://localhost
```

各コマンドでHTMLが返ってくればOK。

### 9.2 Traefikダッシュボードでの確認

```bash
# Traefikの状態確認
curl http://localhost:8080/api/http/routers
```

---

## 10. ホストマシン（Windows）での確認

### 10.1 hostsファイルの更新

Windowsのhostsファイル（`C:\Windows\System32\drivers\etc\hosts`）に以下を追加：

```
127.0.0.1 app-a.localhost
127.0.0.1 app-b.localhost
127.0.0.1 app-c.localhost
```

### 10.2 ブラウザでアクセス

以下のURLをブラウザで開く：

1. **アプリケーションA:**
   ```
   http://app-a.localhost:8000
   ```
   → 青い背景のページが表示される

2. **アプリケーションB:**
   ```
   http://app-b.localhost:8000
   ```
   → 赤い背景のページが表示される

3. **アプリケーションC:**
   ```
   http://app-c.localhost:8000
   ```
   → 緑の背景のページ（現在時刻付き）が表示される

4. **Traefikダッシュボード:**
   ```
   http://localhost:9090
   ```
   → 「HTTP Routers」に5つのルーター（dashboard, whoami, app-a, app-b, app-c）が表示される

---

## 11. トラブルシューティング

### コンテナが起動しない場合

```bash
# 特定のコンテナのログを詳細に確認
docker compose logs app-c

# コンテナを再ビルド
docker compose up -d --build app-c

# すべて停止して再起動
docker compose down
docker compose up -d --build
```

### ブラウザでアクセスできない場合

```bash
# VM内からアクセスできるか確認
curl -H "Host: app-a.localhost" http://localhost

# Traefikがアプリケーションを検出しているか確認
docker compose exec traefik cat /etc/traefik/traefik.yml
```

### ポート番号を忘れた場合

```bash
# ポートマッピングの確認
docker compose ps
```

---

## 12. 実際の開発での応用

### 独自アプリケーションへの置き換え例

**Python Flask アプリケーション:**

```yaml
  my-python-app:
    build: ./my-python-app
    container_name: my-python-app
    restart: unless-stopped
    
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    
    networks:
      - dev-network
    
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.my-python-app.rule=Host(`myapp.localhost`)"
      - "traefik.http.routers.my-python-app.entrypoints=web"
      - "traefik.http.services.my-python-app.loadbalancer.server.port=5000"
```

**React開発サーバー:**

```yaml
  react-app:
    build: ./react-app
    container_name: react-app
    restart: unless-stopped
    
    volumes:
      - ./react-app:/app
      - /app/node_modules
    
    networks:
      - dev-network
    
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.react-app.rule=Host(`frontend.localhost`)"
      - "traefik.http.routers.react-app.entrypoints=web"
      - "traefik.http.services.react-app.loadbalancer.server.port=3000"
```

---

## 13. 便利なコマンド集

```bash
# 特定のコンテナを再起動
docker compose restart app-a

# 特定のコンテナを停止
docker compose stop app-b

# 特定のコンテナだけ起動
docker compose up -d app-c

# コンテナ内でコマンド実行
docker compose exec app-a sh

# リソース使用状況の確認
docker stats

# すべてのコンテナのIPアドレス確認
docker network inspect docker-dev-env_dev-network
```

---

## チェックリスト

- [ ] アプリケーション用ディレクトリの作成完了
- [ ] アプリケーションA（Nginx）の準備完了
- [ ] アプリケーションB（Apache）の準備完了
- [ ] アプリケーションC（Node.js）の準備完了
- [ ] docker-compose.ymlの更新完了
- [ ] すべてのコンテナが起動成功
- [ ] VM内からアクセス確認完了
- [ ] hostsファイルの更新完了
- [ ] ブラウザから各アプリケーションにアクセス可能
- [ ] Traefikダッシュボードで全ルーター確認完了

すべて完了したら、Phase 2-3（データベースサーバーの追加）に進む準備が整っています。

---

## 次のステップ

- Phase 2-3: データベースサーバー（PostgreSQL/MySQL）の追加
- Phase 3: ユーザー認証とアクセス制御の実装