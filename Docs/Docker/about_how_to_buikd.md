## Dockerによるbuild手順

### カレントディレクトリを<html><code>demo_app</code></html>にして、プラットホームを指定してビルドを行う

```bash
docker build --platform linux/amd64 -t demo_app-backend ./backend
```
```bash
docker build --platform linux/amd64 -t demo_app-frontend ./frontend
```


###  docker-composeを使用してすべてのサービスを一括起動

```bash
docker-compose up
```
```bash
docker-compose up -d
```

### 個別にコンテナを起動

バックエンド

```bash
docker run -p 8080:8080 demo_app-backend
```
フロントエンド

```bash
docker run -p 3000:3000 demo_app-frontend
```
### コンテナの管理
起動中のコンテナの一覧表示

```bash
docker ps
```
### 特定のコンテナに接続（シェルに入る）

```bash
docker exec -it <container_id> /bin/sh
```

### コンテナの停止

```bash
docker stop <container_id>
```
```bash
docker rm <container_id>
```

### docker-composeの操作
サービスの停止と削除

```bash
docker-compose down
```
### 再ビルドと再起動

```bash
docker-compose up --build
```
### 特定のサービスだけを再ビルド

```bash
docker-compose up --build <service_name>
```
