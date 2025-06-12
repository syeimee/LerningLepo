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
`markdown_controller.rb`

```ruby

class Api::MarkdownController < ApplicationController

  # URLからHTMLコンテンツを取得し、Markdown記号を埋め込んだHTMLとしてJSONレスポンスとして返す。
  #
  # @return [JSON] JSON形式で変換後のMarkdownコンテンツまたはエラーメッセージを返す。
  #
  def convert
    url = params[:url]  # URLパラメータを取得
    return render json: { error: 'URLを入力してください。' }, status: :bad_request if url.blank?  # URLが空の場合、エラーメッセージを返す

    begin
      content = extract_content(url)  # URLからコンテンツを抽出
      html = convert_markdown_to_html(content)  # MarkdownコンテンツをHTMLに変換
      render json: { html: html }  # 変換後のHTMLをJSONとして返す
    rescue OpenURI::HTTPError => e
      render json: { error: "URLの取得に失敗しました: #{e.message}" }, status: :unprocessable_entity  # URL取得の失敗時にエラーメッセージを返す
    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity  # その他のエラーが発生した場合のエラーメッセージを返す
    end
  end

  private

  # 指定されたURLからHTMLを抽出し、許可されたHTMLタグをMarkdown形式に変換する。
  #
  # @param url [String] HTMLコンテンツを取得するためのURL。
  # @return [String] Markdown形式に変換されたコンテンツをdivでラップして返す。
  #
  def extract_content(url)
    html = URI.open(url).read  # URLからHTMLを取得
    doc = Nokogiri::HTML(html)  # NokogiriでHTMLをパース
    allowed_tags = %w[ul li h1 h2 h3 h4 h5 h6 p em strong i b blockquote code img hr table tr th td br figure a]  # 許可するタグのリスト
    
    content = doc.css(allowed_tags.join(', ')).map do |element|
      cleaned_element = clean_element(element)  # HTML要素から不要な属性を削除
      
      case element.name
      when 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
        level = element.name[1].to_i
        "\n\n#{cleaned_element.to_html.sub('>', ">#{('#' * level)} ")}"  # 見出しをMarkdown形式に変換
      when 'li'
        "\n\n#{cleaned_element.to_html.sub('>', "> - ")}"  # リストアイテムをMarkdown形式に変換
      when 'p'
        text = cleaned_element.inner_html.gsub(/<code>(.*?)<\/code>/, '`\1`')
        "\n\n<p>#{text}</p>"  # 段落をMarkdown形式に変換し、コードをインラインコードに変換
      when 'blockquote'
        "\n\n#{cleaned_element.to_html.sub('>', '>> ')}"  # 引用をMarkdown形式に変換
      when 'img'
        alt_text = element['alt'] || 'Image'
        "[Image: #{alt_text}]"  # 画像をMarkdown形式に変換
      end
    end.join
  
    "<div class='markdown-content'>#{content}</div>"  # 変換後のMarkdownコンテンツをdivでラップ
  end

  # HTML要素から不要な属性を削除する。
  #
  # @param element [Nokogiri::XML::Element] クリーンアップするHTML要素。
  # @return [Nokogiri::XML::Element] 不要な属性が削除されたHTML要素。
  #
  def clean_element(element)
    case element.name
    when 'a'
      element.attributes.each { |attr, _| element.remove_attribute(attr) unless ['href'].include?(attr) }  # リンクのhref属性のみ残す
    when 'img'
      element.attributes.each { |attr, _| element.remove_attribute(attr) unless ['src', 'alt'].include?(attr) }  # 画像のsrcとalt属性のみ残す
    else
      element.attributes.each { |attr, _| element.remove_attribute(attr) }  # その他の要素の属性を削除
    end
    element
  end

  # Markdown形式のコンテンツをHTML形式に変換する。
  #
  # @param content [String] 変換するMarkdownコンテンツ。
  # @return [String] 変換されたHTMLコンテンツ。
  #
  def convert_markdown_to_html(content)
    Kramdown::Document.new(content).to_html  # Kramdownを使ってMarkdownをHTMLに変換
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
