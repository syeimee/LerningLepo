# API一覧

- [API一覧](#api一覧)
  - [1. 概要](#1-概要)
  - [2. API一覧](#2-api一覧)
  - [3. 全体方針](#3-全体方針)
    - [3.1 メソッド](#31-メソッド)
    - [3.2 リクエストパラメータ](#32-リクエストパラメータ)
    - [3.3 レスポンスパラメータ](#33-レスポンスパラメータ)


## 1. 概要
本資料では、ECサイトシステムで使用するAPI一覧をまとめる。

## 2. API一覧
| ID | API名 | URL | 主な処理 | 備考 |
|---|----------------|----------------|---------|-----|
| ID001001 | 商品一覧情報取得 | `/products/list/get` | 商品情報を取得 | |
| ID001002 | 商品詳細情報取得 | `/products/detail/get` | 商品の詳細情報を取得する | step1 |
| ID002001 | カート情報取得 | `/user/cart/get` | ユーザーのカート情報を取得する | step1(モック) |
| ID002002 | おきにいり情報取得 | `/user/favorite/get` | ユーザーお気に入り商品を取得する | step1 |
| ID002003 | おきにいり情報登録 | `/user/favorite/reg` | ユーザーお気に入り商品を登録する | step1 |
| ID002004 | ユーザー情報取得 | `/user/detail/get` | ユーザの情報を取得する | |
| ID003001 | 生産者情報取得 | `/producer/detail/get` | 生産者の情報を取得する | |
| ID003002 | 生産者情報登録 | `/producer/detail/reg` | 生産者の情報を登録する | |
| ID004001 | 業務日時取得 | `/sys/bizdate/get` | 業務日時を取得する | |
| ID004002 | ログイン情報取得 | `/sys/login/get` | ユーザーのログインおよびログイン情報を取得する | |
| ID004003 | クレジット認可情報取得 | `/sys/credit/auth/get` | クレジットカードの認可情報を取得する | |


## 3. 全体方針

### 3.1 メソッド
通信はPOST通信で行われる。

### 3.2 リクエストパラメータ
例：生産者情報取得
```json
{
  "producerId": "pd00000001"
}
```

### 3.3 レスポンスパラメータ
例：生産者情報取得
```json
{
  "producerId": "pd00000001",
  "name": "桑田果樹園",
  "area": "岡山県",
  "regDt": "2025/07/01",
  "message": "岡山県でぶどうを生産する農家です。本当です。",
  "kodawari": [
    {
      "imageUrl": "https://www.hoge.co.jp/aaa.png",
      "titleText": "こだわってます！嘘じゃありません！",
      "text": "すーだららったすーだららったーすいすい",
      "followCnt": 2
    },
    {
      "imageUrl": "https://www.hoge.co.jp/bbb.png",
      "titleText": "先月子猫が生まれました",
      "text": "あああああああ",
      "followCnt": 3
    }
  ],
  "follow": true,
  "anotherProducts": [
    {
      "productId": "p00000000001",
      "imageUrl": "https://www.hoge.co.jp/aaa.png",
      "productName": "【岡山県産】巨峰",
      "stock": 5,
      "price": 3000,
      "weight": "約10kg",
      "reviewCnt": 10
    }
  ]
}
```
