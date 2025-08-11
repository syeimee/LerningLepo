# 厳選ギター - Guitar Landing Page

プロの音楽家が厳選した最高品質のギターを紹介するランディングページです。

## 技術スタック

- **Next.js 14** - App Router使用
- **TypeScript** - 型安全性の確保
- **Tailwind CSS** - モダンなスタイリング
- **React** - コンポーネントベースのUI

## プロジェクト構成

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # ホームページ
├── components/            # Reactコンポーネント
│   ├── HeroSection.tsx    # ヒーローセクション
│   ├── FeaturedGuitars.tsx # 厳選ギター紹介
│   ├── GuitarCategories.tsx # ギターカテゴリー
│   ├── Testimonials.tsx   # お客様の声
│   ├── ContactSection.tsx # お問い合わせ
│   └── Footer.tsx         # フッター
└── 設定ファイル各種
```

## 機能

### 🎸 主要セクション

1. **ヒーローセクション**
   - 魅力的なキャッチコピー
   - CTA（行動喚起）ボタン
   - 美しい背景画像

2. **厳選ギター紹介**
   - プロが選んだ高品質ギター
   - 詳細な仕様と特徴
   - 価格情報

3. **ギターカテゴリー**
   - アコースティック/エレキ/クラシック/ベース
   - 各カテゴリーの特徴説明
   - 用途別おすすめ情報

4. **お客様の声**
   - 実際の購入者レビュー
   - 星評価システム
   - 信頼性の向上

5. **お問い合わせ**
   - コンタクトフォーム
   - 店舗情報
   - 無料相談サービス

6. **フッター**
   - サイトナビゲーション
   - 会社情報
   - SNSリンク

### 📱 レスポンシブデザイン

- モバイル、タブレット、デスクトップに完全対応
- Tailwind CSSによる効率的なレスポンシブ実装
- 美しいアニメーションとホバーエフェクト

## 開発・起動方法

### 必要環境

- Node.js 18以上
- npm または yarn

### インストール

```bash
npm install
# または
yarn install
```

### 開発サーバー起動

```bash
npm run dev
# または
yarn dev
```

http://localhost:3000 でアプリケーションが起動します。

### ビルド

```bash
npm run build
# または
yarn build
```

### 本番サーバー起動

```bash
npm start
# または
yarn start
```

## カスタマイズ

### 色の変更

`tailwind.config.js` の `theme.extend.colors` セクションで色を変更できます：

```javascript
colors: {
  primary: {
    // オレンジ系カラーパレット
    50: '#fef7ee',
    500: '#f97316',
    600: '#ea580c',
  },
}
```

### コンテンツの変更

各コンポーネントファイル内のデータオブジェクトを編集してください：

- `components/FeaturedGuitars.tsx` - ギター情報
- `components/Testimonials.tsx` - お客様の声
- `components/ContactSection.tsx` - 連絡先情報

### 画像の変更

現在はUnsplashの画像を使用しています。本番環境では適切なライセンスの画像に変更してください。

## デプロイ

### Vercelでのデプロイ

1. GitHubにプッシュ
2. Vercelアカウントでリポジトリを連携
3. 自動デプロイ開始

### その他のプラットフォーム

Next.jsは様々なプラットフォームでデプロイできます：
- Netlify
- AWS Amplify
- Heroku
- 自分のサーバー

## ライセンス

このプロジェクトは教育・学習目的で作成されています。
商用利用の際は適切なライセンスの画像素材をご使用ください。