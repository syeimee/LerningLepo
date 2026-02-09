# API設計の流れ

## 1. ユースケースを考える

### 1-1. 機能の列挙
アプリケーションの画面とその遷移から、どのような機能をAPIとして提供しないとならないかを列挙する。

**例:**
- ユーザー情報の取得
- ユーザー情報の更新
- 商品の検索
- 商品の一覧表示

### 1-2. 機能の整理
列挙した機能を整理する。

上記の例だと「商品の検索」と「商品の一覧」は一つにまとめられそう。

---

## 2. エンドポイントを設計する

### 基本方針
「**覚えやすく、どんな機能を持つURIなのかが一目でわかる**」

### URIを考える上でのポイント

#### 1. 短く入力しやすいか
| NG | OK |
|---|---|
| `http://api.hogehoge/service/search` | `http://api.hogehoge/search` |

シンプルにするのがベスト。

#### 2. 人間が読んで理解できるか
| NG | OK |
|---|---|
| `http://api.hogehoge/sv/u` | `http://api.hogehoge/service/user` |

- 略語を使用しない
- エンドポイントに含む英単語が正しいかもチェックする

#### 3. 大文字小文字が混在していないか
すべて小文字とするのがベスト。

> **補足:** HTTPのURLは「スキーマとホスト名を除いては大文字と小文字は区別される」仕様（RFC7230）になっているため、`user` を `User` と打った場合はエラーを返すのが妥当（GitHubだと404エラー）

#### 4. 改造しやすいか
| NG | OK |
|---|---|
| idが1〜30000: `http://api.hogehoge/users/alpha/:id`<br>idが30001〜60000: `http://api.hogehoge/users/beta/:id` | `http://api.hogehoge/users/:id` |

クライアント側で場合分けしないといけない設計は避ける。APIサーバー側で処理をするのがベスト。

#### 5. サーバー側のアーキテクチャが反映されていないか
| NG | OK |
|---|---|
| `http://api.hogehoge/search.php?cd=2` | `http://api.hogehoge/search?cd=2` |

- PHPを使用しているというのはクライアント側では不要な情報
- 不必要にアーキテクチャを公開すると脆弱性を生むことがある

#### 6. ルールが統一されているか
| NG | OK |
|---|---|
| `http://api.hogehoge/product?id=10`<br>`http://api.hogehoge/products/100/detail` | `http://api.hogehoge/products/10`<br>`http://api.hogehoge/products/100/detail` |

統一感がないとトラブルの温床になる。

---

## 3. HTTPメソッド

| メソッド | 説明 | SQLとの対応 |
|---------|------|------------|
| GET | リソースの取得 | SELECT |
| POST | リソースの新規登録 | INSERT |
| PUT | 既存リソースの更新 | UPDATE |
| DELETE | リソースの削除 | DELETE |
| PATCH | リソースの一部変更 | - |
| HEAD | リソースのメタ情報の取得 | - |

### 各メソッドの詳細

#### GET
- リソースの取得
- SQLで言うと `SELECT`

#### POST
- リソースの新規登録
- SQLで言うと `INSERT`

#### PUT
- 既存リソースの更新（全体を上書き）
- SQLで言うと `UPDATE`
- URIに対象を指定する必要がある
  ```
  PUT https://api.hogehoge/friends/12345
  ```

#### DELETE
- リソースの削除
- SQLで言うと `DELETE`
- URIに対象を指定する

#### PATCH
- リソースの**一部分だけ**を変更
- PUTとの違い：PUTは全体を上書きするため、データ量が多いと負荷がかかる

---

## 4. ページネーション

大量のデータの一部を取得する手法。SQLの `LIMIT` と `OFFSET` に相当する。

### よく使われるパラメータ

| 用途 | パラメータ名 |
|-----|-------------|
| 取得数 | `per_page` / `limit` |
| 取得位置 | `page` / `offset` |

### 例：1ページ50件で3ページ目を取得

| 方式 | クエリパラメータ | 説明 |
|-----|-----------------|------|
| limit/offset | `limit=50&offset=100` | 101件目から50件取得 |
| per_page/page | `per_page=50&page=3` | 3ページ目を取得 |
