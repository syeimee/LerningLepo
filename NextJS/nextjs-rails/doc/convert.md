# システム設計書

## 変更履歴

| 日付       | バージョン | 更新内容          | 担当者 |
| ---------- | ---------- | ----------------- | ------ |
| 2024-09-03 | 1.0        | 初版作成          | syeimee   |

---

## 1. システム概要

### 1.1 システム名
- システム名: **Markdown形式変換アプリケーション**

### 1.2 システムの目的
- 指定されたURLからHTMLを取得し、md形式に変換を行う。

---

## 2. 機能概要

### 2.1 機能名: **HTML→Markdown変換機能**

#### 2.1.1 機能概要
- 入力画面から受け取ったURLからHTMLを取得し、Markdownに書き換える処理を行う。

#### 2.1.2 機能要件
- 画面に入力したURLからMarkdownを生成する。

#### 2.1.3 非機能要件
- frontでのリクエストデータに対して、HTMLを取得し、Markdownを生成する。
- DBとの連携は今回は行わないこととする。

---

## 3. 詳細設計

### 3.1 画面設計
今回はcontrollerなので画面設計は行わない
<!-- 
#### 3.1.1 画面一覧
| 画面ID  | 画面名           | 説明                      |
| ------- | ---------------- | ------------------------- |
| 001     | ユーザー登録画面   | ユーザー情報入力画面       |
| 002     | 登録完了画面       | 登録が成功した際の完了画面 |
| 003     | エラーメッセージ画面 | 入力エラー時のメッセージ表示 |

#### 3.1.2 画面詳細

- **001: ユーザー登録画面**
  - 入力項目:
    - メールアドレス (必須)
    - パスワード (必須)
  - バリデーション:
    - メールアドレス: 有効な形式であること
    - パスワード: 8文字以上であること

- **002: 登録完了画面**
  - 表示内容:
    - "登録が完了しました"のメッセージを表示する。
  - 次のステップへのリンク:
    - ログインページへのリンクを表示する。
-->
---


### 3.2 処理フロー

#### 3.2.1 対象PG
- route.rb(/backend/config/routes.rb)
- markdown_controller.rb(/backend/app/controllers/api/markdown_controller.rb)

#### 3.2.2 概要フロー
1. frontendからPOSTでAPIを受け取る →
2. URLパラメータを受け取る →
3. HTMLを取得 → 
4. Markdownに変換 →
5. frondendに変換したmarkdownをjsonで返す

#### 3.2.2 フローチャート
`route.rb`

```ruby
Rails.application.routes.draw do
  namespace :api do # APIのエンドポイントが/apiで始まるようにする
  
    #url:api/convertに対して、markdown_controllerのconvertメソッドを実行する
    post 'convert', to: 'markdown#convert'
  end
end

```

`markdown_controller.rb`
```ruby
require 'html2markdown'
class Api::MarkdownController < ApplicationController

  # paramsで受け取ったURLからmdを生成するメソッド
  def convert
    url = params[:url] #paramsでurlを受け取る

    #renderメソッドはRailsのアクションでレスポンスを生成する。
    # json: { error: 'URLを入力してください。' }:
    # JSON形式で{ error: 'URLを入力してください。' }という
    # エラーメッセージをレスポンスとして返す。
    # status: :bad_requestはHTTPステータスコード400を設定する。
    return render json:{error: 'URLを入力してください。'}, status: :bad_request if url.blank? 

    begin
      html.fetch_html(url)
      markdown = html2markdown.convert(html)
      render json:{markdown: markdown}
    rescue StandardError => e
      render json:{error: e.message}, status: :unprocessable_entity

    end
  end

  private
  
  def fetch_html(url)
    # Net::HTTP.get_responseメソッドで、URLからHTTPレスポンスを取得
    response = Net::HTTP.get_response(URI(url))

    # HTTPレスポンスが成功（200系ステータスコード）であるかをチェック
    if response.is_a?(Net::HTTPSuccess)
      response.body
    end

    # エラーメッセージを返すためのロジックをコントローラで実装
    raise StandardError, 'URLの変換エラー'

  end

end

```

<!--
### 3.3 データベース設計

#### 3.3.1 テーブル定義

| テーブル名 | カラム名       | データ型       | 制約               |
| ---------- | -------------- | -------------- | ------------------ |
| users      | id             | INT            | PRIMARY KEY        |
| users      | email          | VARCHAR(255)   | UNIQUE, NOT NULL   |
| users      | password_hash  | VARCHAR(255)   | NOT NULL           |
| users      | created_at     | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP |
| users      | verified       | BOOLEAN        | DEFAULT FALSE      |

#### 3.3.2 リレーション
- `users`テーブルと他のテーブル（例: `profiles`, `roles`）のリレーションを定義。

---

### 3.4 API設計

#### 3.4.1 エンドポイント

- **POST /api/users**
  - 説明: ユーザー登録API
  - パラメータ:
    - `email`: メールアドレス (必須)
    - `password`: パスワード (必須)
  - レスポンス:
    - ステータスコード: 201 (Created)
    - 内容: 登録完了メッセージ

#### 3.4.2 サンプルリクエスト

```json
{
  "email": "example@example.com",
  "password": "secure_password"
}
```
#### 3.4.3 サンプルレスポンス

```json
{
  "message": "User successfully created",
  "status": 201
}
```
-->
