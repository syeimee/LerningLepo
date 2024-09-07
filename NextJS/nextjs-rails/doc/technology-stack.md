# Aplication Architecture
<img src="./doc-images/front_and_back.png">

### Backend
URLからHTMLを取得し、それをMarkdownに変換してフロントエンドに返すAPIを作成

### Frontend
BackendからのAPIを受け取り画面に表示する

# ディレクトリ構成

```
root-directory/
│
├── backend/              # バックエンド（Rails API）
│   ├── app/              # RailsのMVC構造
│   │   ├── controllers/  # APIコントローラ
│   │   │   └── markdown_controller.rb
│   │   ├── models/       # モデル
│   │   └── views/        # ビュー（今回は使わない）
│   ├── config/           # Railsの設定ファイル
│   │   └── routes.rb     # APIルート設定
│   ├── db/               # データベース関連ファイル
│   ├── Gemfile           # Rubyの依存関係
│   └── .env              # 環境変数設定（APIキーなど）
│
├── frontend/             # フロントエンド（Next.js）
│   ├── node_modules/     # Next.jsの依存パッケージ
│   ├── pages/            # Next.jsのページコンポーネント
│   │   ├── index.js      # ホームページ（URL入力フォーム）
│   │   └── result.js     # Markdown表示ページ
│   ├── components/       # UIコンポーネント
│   │   └── MarkdownViewer.js
│   ├── styles/           # CSSやスタイルシート
│   ├── next.config.js    # Next.jsの設定ファイル
│   ├── package.json      # Next.jsの依存関係とスクリプト
│   └── .env.local        # 環境変数設定（APIエンドポイントなど）
│
├── docker-compose.yml    # Docker Composeファイル（必要に応じて）
└── README.md             # プロジェクト概要
```

# APIエンドポイント

<table>
    <thead>
        <tr>
            <th>URI</th>
            <th>説明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>http://localhost:3000/api/convert</td>
            <td>HTMLを取得しMarkdownにコンバートを行う</td>
        </tr>
    </tbody>
</table>