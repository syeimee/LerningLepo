# 日時バッチシステム

定時（9時、12時、16時、20時 JST）に複数ソースから情報を取得し、LINE Messaging APIで通知するバッチシステム。

## 機能概要

- **Googleカレンダー連携**: 当日の予定を取得
- **案件情報検索**: nitterインスタンス経由でTwitter/X上の案件情報を検索
- **技術ニュース**: Zenn/Qiitaのトレンド記事を取得
- **LINE通知**: 収集した情報を整形してLINEに送信

## ディレクトリ構成

```
src/batch/
├── .github/
│   └── workflows/
│       └── batch_env.yml     # GitHub Actions ワークフロー
├── config/
│   └── job-search.yml        # 案件検索設定ファイル
├── src/
│   ├── index.ts              # メインエントリポイント（オーケストレーター）
│   ├── sendLine.ts           # LINE送信モジュール
│   ├── line.ts               # メッセージフォーマッター
│   ├── xSearch.ts            # nitter.netスクレイパー
│   ├── googleCal.ts          # Googleカレンダー連携
│   ├── news.ts               # Zenn/Qiita記事取得
│   └── types/
│       └── index.ts          # 型定義
├── package.json
├── tsconfig.json
└── README.md
```

## 実行スケジュール

GitHub Actionsで以下のスケジュールで自動実行されます：

| 時刻 (JST) | cron (UTC) |
|------------|------------|
| 9:00       | `0 0 * * *` |
| 12:00      | `0 3 * * *` |
| 16:00      | `0 7 * * *` |
| 20:00      | `0 11 * * *` |

## 設定ファイル

### config/job-search.yml

```yaml
jobSearches:
  - name: "GoogleAppScript"
    keywords: ["GAS 案件", "GoogleAppScript 募集"]
    enabled: true
  - name: "React"
    keywords: ["React 案件", "React.js 募集"]
    enabled: true
  - name: "Ruby"
    keywords: ["Ruby 案件", "Ruby on Rails 募集"]
    enabled: true

nitterInstances:
  - "https://xcancel.com"
  - "https://nitter.privacydev.net"

maxResultsPerSearch: 5

news:
  zenn:
    enabled: true
    maxArticles: 5
  qiita:
    enabled: true
    maxArticles: 5
```

## 環境変数 / GitHub Secrets

| 変数名 | 必須 | 説明 |
|--------|------|------|
| `LINE_CHANNEL_ACCESS_TOKEN` | 必須 | LINE Messaging APIのチャネルアクセストークン |
| `LINE_USER_ID` | 必須 | LINE送信先ユーザーID |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | 必須 | Base64エンコードしたGoogleサービスアカウントJSON |
| `GOOGLE_CALENDAR_ID` | 任意 | カレンダーID（省略時は`primary`） |
| `QIITA_ACCESS_TOKEN` | 任意 | Qiita APIトークン（レート制限緩和用） |

### Googleサービスアカウントキーの設定方法

1. Google Cloud Consoleでサービスアカウントを作成
2. Calendar APIを有効化
3. サービスアカウントのJSONキーをダウンロード
4. Base64エンコード:
   ```bash
   base64 -i service-account.json | tr -d '\n'
   ```
5. 出力された文字列を`GOOGLE_SERVICE_ACCOUNT_KEY`に設定
6. カレンダーの共有設定でサービスアカウントのメールアドレスに閲覧権限を付与

## ローカル実行

```bash
# 依存関係インストール
npm install

# 環境変数を設定
export LINE_CHANNEL_ACCESS_TOKEN="your_token"
export LINE_USER_ID="your_user_id"
export GOOGLE_SERVICE_ACCOUNT_KEY="base64_encoded_key"
export GOOGLE_CALENDAR_ID="primary"

# 実行
npm run dev
```

## NPMスクリプト

| コマンド | 説明 |
|----------|------|
| `npm run dev` | バッチ処理を実行 |
| `npm run start` | バッチ処理を実行 |
| `npm run build` | TypeScriptをビルド |
| `npm run send-only` | LINE送信のみ（旧機能） |

## アーキテクチャ

### データフロー

```
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ GoogleCal   │   │  xSearch    │   │    news     │
│ (カレンダー) │   │ (案件検索)  │   │ (Zenn/Qiita)│
└──────┬──────┘   └──────┬──────┘   └──────┬──────┘
       │                 │                 │
       └────────┬────────┴────────┬────────┘
                │                 │
                ▼                 │
         ┌──────────────┐         │
         │   index.ts   │◀────────┘
         │(オーケストレーター)│
         └──────┬───────┘
                │ Promise.allSettled
                ▼
         ┌──────────────┐
         │   line.ts    │
         │(フォーマッター)│
         └──────┬───────┘
                │
                ▼
         ┌──────────────┐
         │ sendLine.ts  │
         │ (LINE送信)   │
         └──────────────┘
```

### エラーハンドリング

- 各データソースは独立して実行（`Promise.allSettled`）
- 1つの失敗で全体を止めない
- エラーはメッセージ末尾にまとめて表示
- 部分的な成功も許容（例: Zennのみ成功、Qiita失敗）

## LINE通知フォーマット

```
日時通知 2026/01/24(金) 09:00
────────────────────

【今日の予定】
  09:00 朝会
  14:00 定例MTG @会議室A

【案件情報】
[GAS 案件]
  - GoogleAppScript開発の案件です...
  - GAS経験者募集中...

[React 案件]
  - React.js開発...

【Tech News】
[Zenn]
  - TypeScript入門記事 (125)
  - Next.js最新機能 (89)

[Qiita]
  - AWS Lambda活用術 (56)

【エラー】
Googleカレンダー: 認証エラー
```

## 依存関係

| パッケージ | バージョン | 用途 |
|------------|------------|------|
| `node-fetch` | ^3.3.2 | HTTP リクエスト |
| `googleapis` | ^144.0.0 | Google Calendar API |
| `cheerio` | ^1.0.0 | HTMLパース（nitter用） |
| `js-yaml` | ^4.1.0 | YAML設定読み込み |
| `ts-node` | ^10.9.2 | TypeScript実行 |
| `typescript` | ^5.9.3 | TypeScriptコンパイラ |

## トラブルシューティング

### Googleカレンダーが取得できない

1. サービスアカウントがカレンダーの共有設定に追加されているか確認
2. Calendar APIが有効になっているか確認
3. `GOOGLE_SERVICE_ACCOUNT_KEY`が正しくBase64エンコードされているか確認

### nitter検索結果が0件

- nitterインスタンスが稼働しているか確認
- `config/job-search.yml`でインスタンスURLを更新

### LINE通知が届かない

1. `LINE_CHANNEL_ACCESS_TOKEN`が有効か確認
2. `LINE_USER_ID`が正しいか確認（LINE Developers Console参照）
3. Messaging APIのプランを確認

## ライセンス

MIT
