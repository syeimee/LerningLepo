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

#### 1.1 新しいNext.jsプロジェクトの作成

```bash
npx create-next-app frontend
```

package.jsonに axios の依存関係を注入する場合は直接書くよりもコマンドで実行した方が楽

```bash
npm install axios
```