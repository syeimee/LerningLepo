# 環境構築

## 変更履歴

| 日付       | バージョン | 更新内容          | 担当者 |
| ---------- | ---------- | ----------------- | ------ |
| 2024-09-03 | 1.0        | 初版作成          | syeimee   |

## 1. BACKENDの初回構築

#### 1.1 新しいRailsプロジェクトの作成

```bash
rails new backend --api
cd backend
```
--apiオプションを使うことで、API専用のRailsアプリケーションが作成され,不要なビューやアセットのセットアップを省略できる。

#### 1.2 必要なGemの追加
GemfileにMarkdown変換のためのライブラリ（html2markdown）を追加。

```ruby
# Gemfile
gem 'html2markdown'
```

Gemのインストール
```bash
bundle install
```

#### 1.3 コントローラの作成
```bash
rails generate controller api/markdown
```
## 2. FRONTENDの初回構築

#### 2.1 新しいNext.jsプロジェクトの作成

```bash
npx create-next-app frontend
```

package.jsonに axios の依存関係を注入する場合は直接書くよりもコマンドで実行した方が楽

```bash
npm install axios
```




## 3. Dockerの設定

#### 3.1 Backend
---
Ruby 3.2 の公式Dockerイメージをベースにして、新しいコンテナを作成
```docker
# ruby 3.2 イメージをベースに使用する
FROM ruby:3.2
```
---
パッケージリストを更新し、Node.js（フロントエンドやJavaScript関連処理のため）とPostgreSQLクライアント（データベースに接続するためのツール）をインストール
```docker
# 必要な依存パッケージをインストールする
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
```
---
npm（Node.jsのパッケージ管理ツール）をインストールして、Node.js依存のパッケージを管理
```docker
# npmがインストールされていることを確認
RUN apt-get install -y npm
```
---
コンテナ内での作業ディレクトリ（ファイル操作やコマンドの実行場所）を /app に設定
```docker
# 作業ディレクトリを/appに設定する
WORKDIR /app
```
---
ホストマシンの Gemfile と Gemfile.lock をコンテナ内の /app ディレクトリにコピーし、bundle install コマンドを実行してRubyの依存ライブラリをインストール
```docker
# Rails の依存関係をインストールするために Gemfile をコピーする
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install
```
---
ホストマシンの package.json と package-lock.json をコンテナ内にコピーし、npm install コマンドでNode.js依存のパッケージをインストール
```docker
# npmを使って Node.js の依存関係をインストールする
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
```
---
ホストマシンのプロジェクトフォルダ全体をコンテナ内の /app にコピー
```docker
# アプリケーションのソースコード全体をコピーする
COPY . /app
```
---
Rails サーバーが再起動できない原因となる古いPIDファイルを削除し、rails s コマンドでポート3001でサーバーを起動
```docker
# サーバーを起動する前に、PIDファイルが残っていたら削除し、Railsサーバーを起動する
CMD rm -f /app/tmp/pids/server.pid && rails s -b 0.0.0.0 -p 3001
```
#### 3.2 Frontend
Node.jsの公式Dockerイメージのバージョン18をベースにして、新しいコンテナを作成
```docker
# 使用するNode.jsのバージョンを指定
FROM node:18
```
---
コンテナ内での作業ディレクトリを /app に設定
```docker
# 作業ディレクトリを設定
WORKDIR /app
```
---
ホストマシンの package.json と package-lock.json をコンテナ内の /app ディレクトリにコピー
```docker
# package.jsonとpackage-lock.jsonをコピー
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
```
---
npm install コマンドを実行し、package.json に基づいてNode.jsの依存パッケージをインストール
```docker
# Node.jsの依存関係をインストール
RUN npm install
```
---
ホストマシン上のプロジェクトの全ファイルをコンテナ内の /app ディレクトリにコピー
```docker
# アプリケーションのソースコードをコピー
COPY . /app
```
---
npm run build コマンドを実行し、アプリケーションをビルド
```docker
# ビルドを実行
RUN npm run build
```
---
コンテナが起動した際に、npm start コマンドでNext.jsのサーバーを起動
```docker
# Next.jsのサーバーを起動
CMD ["npm", "start"]
```
---
コンテナが外部からアクセスできるように、ポート3000でリクエストを受け付けるように指定
```docker
# コンテナがリッスンするポートを指定
EXPOSE 3000
```