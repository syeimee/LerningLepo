# UI/UXデザインシステム

## 1. デザインコンセプト

### 1.1 基本方針
- **文字を使わない**: すべてアイコンと音声で完結
- **大きく、触りやすく**: 幼児の小さな手でも操作しやすい
- **楽しく、分かりやすく**: カラフルだが統一感のあるデザイン
- **安心感**: 柔らかい形状、優しい配色

### 1.2 対象ユーザー特性
- 3-4歳児の視覚認知能力
- 文字が読めない
- 色や形での識別が得意
- 大きな動きやアニメーションに惹かれる

---

## 2. カラーシステム

### 2.1 ブランドカラー定義

#### プライマリカラー（主要色）
```css
/* メインブランドカラー */
--color-primary-50: #E3F2FD;   /* 背景用 */
--color-primary-100: #BBDEFB;  /* ホバー状態 */
--color-primary-200: #90CAF9;  /* ボーダー */
--color-primary-300: #64B5F6;  /* 非アクティブ */
--color-primary-400: #42A5F5;  /* デフォルト */
--color-primary-500: #2196F3;  /* メインブルー（ボタン、アクセント） */
--color-primary-600: #1E88E5;  /* ホバー */
--color-primary-700: #1976D2;  /* アクティブ */
--color-primary-800: #1565C0;  /* テキスト */
--color-primary-900: #0D47A1;  /* 強調 */
```

#### セカンダリカラー（補助色）
```css
/* 成功・ポジティブアクション */
--color-secondary-50: #F1F8E9;
--color-secondary-100: #DCEDC8;
--color-secondary-200: #C5E1A5;
--color-secondary-300: #AED581;
--color-secondary-400: #9CCC65;
--color-secondary-500: #8BC34A;  /* メイングリーン（成功、実行ボタン） */
--color-secondary-600: #7CB342;
--color-secondary-700: #689F38;
--color-secondary-800: #558B2F;
--color-secondary-900: #33691E;
```

#### アクセントカラー（強調色）
```css
/* 楽しさ・達成感の演出 */
--color-accent-yellow-500: #FFD54F;  /* スター、報酬 */
--color-accent-orange-500: #FF9800;  /* 警告、ヒント */
--color-accent-pink-500: #EC407A;    /* お気に入り、特別 */
--color-accent-purple-500: #AB47BC;  /* プレミアム機能 */
```

#### セマンティックカラー（意味を持つ色）
```css
/* 成功 */
--color-success-light: #C8E6C9;
--color-success: #66BB6A;
--color-success-dark: #388E3C;

/* エラー・失敗（優しい表現） */
--color-error-light: #FFCCBC;
--color-error: #FF7043;  /* 強すぎない赤 */
--color-error-dark: #E64A19;

/* 警告・注意 */
--color-warning-light: #FFE082;
--color-warning: #FFA726;
--color-warning-dark: #F57C00;

/* 情報 */
--color-info-light: #B3E5FC;
--color-info: #29B6F6;
--color-info-dark: #0277BD;
```

#### ニュートラルカラー（背景・テキスト）
```css
/* グレースケール */
--color-gray-50: #FAFAFA;   /* 背景 */
--color-gray-100: #F5F5F5;  /* カード背景 */
--color-gray-200: #EEEEEE;  /* ボーダー */
--color-gray-300: #E0E0E0;  /* 区切り線 */
--color-gray-400: #BDBDBD;  /* 非アクティブ */
--color-gray-500: #9E9E9E;  /* アイコン */
--color-gray-600: #757575;  /* サブテキスト */
--color-gray-700: #616161;  /* テキスト */
--color-gray-800: #424242;  /* 見出し */
--color-gray-900: #212121;  /* 強調テキスト */

/* ホワイト・ブラック */
--color-white: #FFFFFF;
--color-black: #000000;
```

### 2.2 カラー使用ガイドライン

#### 各要素への適用

| 要素 | カラー | 用途 |
|------|--------|------|
| メインボタン | Primary-500 | プログラム実行、重要アクション |
| 成功ボタン | Secondary-500 | 完了、次へ進む |
| キャンセル/リセット | Gray-400 | 取り消し、やり直し |
| 背景 | Gray-50 / White | メイン背景 |
| カード | White / Gray-100 | コンテンツエリア |
| 命令ブロック（前進） | Primary-400 | 基本動作 |
| 命令ブロック（回転） | Accent-Orange-500 | 方向転換 |
| 命令ブロック（ループ） | Accent-Purple-500 | 繰り返し |
| 命令ブロック（条件） | Accent-Pink-500 | 条件分岐 |
| スター・報酬 | Accent-Yellow-500 | 達成感 |

#### カラーコントラスト（アクセシビリティ）
- テキストと背景のコントラスト比: 最低4.5:1
- 重要なボタン: 7:1以上推奨
- 色だけに頼らない設計（形やアイコンも併用）

---

## 3. タイポグラフィ

### 3.1 フォント選定

#### 日本語フォント
```css
font-family:
  'Hiragino Maru Gothic ProN',  /* 丸ゴシック（優しい印象） */
  'Hiragino Sans',
  'Yu Gothic UI',
  'Meiryo',
  sans-serif;
```

#### 英数字フォント（補助）
```css
font-family:
  'Rounded Mplus 1c',           /* 丸みのあるフォント */
  'Quicksand',
  sans-serif;
```

### 3.2 フォントサイズ

幼児向けのため、通常より大きめに設定:

```css
/* 基本設定 */
--font-size-xs: 14px;    /* 補足テキスト（保護者向け） */
--font-size-sm: 18px;    /* 小さいラベル */
--font-size-base: 24px;  /* 基本サイズ */
--font-size-lg: 32px;    /* 大きなボタン */
--font-size-xl: 40px;    /* 見出し */
--font-size-2xl: 48px;   /* タイトル */
--font-size-3xl: 64px;   /* 大きな数字（ステージ番号など） */

/* フォントウェイト */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;
--font-weight-black: 900;
```

### 3.3 行間・字間

```css
/* 行間（ゆったりめ） */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.8;

/* 字間 */
--letter-spacing-tight: -0.02em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.05em;
```

---

## 4. スペーシング

### 4.1 余白システム

8pxベースのスペーシングシステム:

```css
--spacing-0: 0px;
--spacing-1: 8px;
--spacing-2: 16px;
--spacing-3: 24px;
--spacing-4: 32px;
--spacing-5: 40px;
--spacing-6: 48px;
--spacing-8: 64px;
--spacing-10: 80px;
--spacing-12: 96px;
--spacing-16: 128px;
```

### 4.2 タッチターゲット

```css
/* 最小タッチサイズ（Appleガイドライン: 44x44px以上） */
--touch-target-min: 80px;      /* 幼児向けはさらに大きく */
--touch-target-recommended: 96px;
--touch-target-large: 120px;   /* 重要なボタン */

/* ボタン間の余白 */
--button-gap: 16px;           /* 最小 */
--button-gap-recommended: 24px;
```

---

## 5. アイコンシステム

### 5.1 アイコン設計原則

- **シンプル**: 余計な装飾を避ける
- **太い線**: 最低3px以上の線幅
- **カラフル**: 各命令ごとに色分け
- **アニメーション**: タップ時の視覚的フィードバック

### 5.2 命令アイコン定義

#### 基本移動命令

```
前に進む:
  アイコン: ↑（太い上矢印）
  カラー: Primary-500（青）
  サイズ: 64x64px

後ろに進む:
  アイコン: ↓（太い下矢印）
  カラー: Primary-300（薄い青）
  サイズ: 64x64px

左に曲がる:
  アイコン: ↰（左カーブ矢印）
  カラー: Accent-Orange-500（オレンジ）
  サイズ: 64x64px

右に曲がる:
  アイコン: ↱（右カーブ矢印）
  カラー: Accent-Orange-500（オレンジ）
  サイズ: 64x64px
```

#### 制御構文

```
ループ（繰り返し）:
  アイコン: ⟳（円形矢印） + 数字
  カラー: Accent-Purple-500（紫）
  サイズ: 80x80px

条件分岐:
  アイコン: 分岐記号 + 絵文字（障害物など）
  カラー: Accent-Pink-500（ピンク）
  サイズ: 80x80px
```

#### システムアイコン

```
実行ボタン:
  アイコン: ▶（再生マーク）
  カラー: Secondary-500（緑）
  サイズ: 96x96px

リセットボタン:
  アイコン: ↺（リセット矢印）
  カラー: Gray-600
  サイズ: 64x64px

ヒントボタン:
  アイコン: 💡（電球）
  カラー: Accent-Yellow-500
  サイズ: 64x64px

設定ボタン:
  アイコン: ⚙（歯車）
  カラー: Gray-600
  サイズ: 48x48px
```

### 5.3 アイコンライブラリ

**使用ライブラリ**:
- Heroicons（基本アイコン）
- カスタムSVG（命令ブロック専用）

**SVG最適化**:
```xml
<!-- 例: 前進アイコン -->
<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
  <path
    d="M32 8L32 56M32 8L20 20M32 8L44 20"
    stroke="currentColor"
    stroke-width="4"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

---

## 6. コンポーネント設計

### 6.1 ボタンコンポーネント

#### プライマリボタン

```css
.button-primary {
  background-color: var(--color-primary-500);
  color: var(--color-white);
  min-width: 96px;
  min-height: 96px;
  border-radius: 24px;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  box-shadow: 0 8px 16px rgba(33, 150, 243, 0.3);
  transition: all 0.2s ease;
}

.button-primary:hover {
  background-color: var(--color-primary-600);
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(33, 150, 243, 0.4);
}

.button-primary:active {
  transform: scale(0.95);
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.3);
}
```

#### セカンダリボタン

```css
.button-secondary {
  background-color: var(--color-secondary-500);
  color: var(--color-white);
  min-width: 96px;
  min-height: 96px;
  border-radius: 24px;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  box-shadow: 0 8px 16px rgba(139, 195, 74, 0.3);
}
```

#### アウトラインボタン

```css
.button-outline {
  background-color: transparent;
  color: var(--color-primary-500);
  border: 4px solid var(--color-primary-500);
  min-width: 96px;
  min-height: 96px;
  border-radius: 24px;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}
```

### 6.2 命令ブロックコンポーネント

```css
.command-block {
  background-color: var(--color-white);
  border: 4px solid var(--block-color); /* 命令ごとに変わる */
  border-radius: 20px;
  min-width: 120px;
  min-height: 120px;
  padding: var(--spacing-3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: grab;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.command-block:active {
  cursor: grabbing;
  transform: rotate(2deg) scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.command-block--forward {
  --block-color: var(--color-primary-500);
}

.command-block--turn {
  --block-color: var(--color-accent-orange-500);
}

.command-block--loop {
  --block-color: var(--color-accent-purple-500);
}

.command-block--condition {
  --block-color: var(--color-accent-pink-500);
}
```

### 6.3 カードコンポーネント

```css
.card {
  background-color: var(--color-white);
  border-radius: 32px;
  padding: var(--spacing-6);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.card--elevated {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.card--stage {
  border: 6px solid var(--color-gray-200);
  transition: all 0.3s ease;
}

.card--stage:hover {
  border-color: var(--color-primary-500);
  transform: translateY(-4px);
}

.card--stage.completed {
  border-color: var(--color-secondary-500);
}
```

---

## 7. レイアウト

### 7.1 グリッドシステム

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

.grid {
  display: grid;
  gap: var(--spacing-4);
}

.grid--2-cols {
  grid-template-columns: repeat(2, 1fr);
}

.grid--3-cols {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 768px) {
  .grid--2-cols,
  .grid--3-cols {
    grid-template-columns: 1fr;
  }
}
```

### 7.2 メイン画面レイアウト

```
┌─────────────────────────────────────────┐
│  Header (80px height)                   │  ← 固定ヘッダー
├─────────────────────────────────────────┤
│                                         │
│         3D Viewport                     │  ← Three.js Canvas
│         (60vh)                          │     可変高さ
│                                         │
├─────────────────────────────────────────┤
│  Command Palette (120px height)         │  ← 命令選択エリア
│  [▲] [◄] [►] [🔁]                     │
├─────────────────────────────────────────┤
│  Program Area (Min 200px)               │  ← ドロップゾーン
│  ┌───────────────────────────────┐     │     可変高さ
│  │ Drop blocks here...           │     │
│  └───────────────────────────────┘     │
├─────────────────────────────────────────┤
│  Action Bar (120px height)              │  ← 実行ボタンエリア
│  [▶実行] [↺リセット] [💡ヒント]      │
└─────────────────────────────────────────┘
```

### 7.3 レスポンシブブレークポイント

```css
/* モバイル */
@media (max-width: 767px) {
  /* スマホ縦向き */
}

/* タブレット */
@media (min-width: 768px) and (max-width: 1023px) {
  /* タブレット（iPad, Fire） */
}

/* デスクトップ */
@media (min-width: 1024px) {
  /* PC */
}
```

---

## 8. アニメーション

### 8.1 トランジション

```css
/* 標準的なトランジション */
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 400ms ease;

/* イージング */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 8.2 キーフレームアニメーション

#### 成功時のセレブレーション

```css
@keyframes celebrate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2) rotate(5deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

.success-animation {
  animation: celebrate 0.6s var(--ease-bounce);
}
```

#### キラキラエフェクト

```css
@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
}

.sparkle {
  animation: sparkle 1s ease-in-out infinite;
}
```

#### ドラッグ中のフィードバック

```css
@keyframes drag-feedback {
  0% {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
  }
}

.dragging {
  animation: drag-feedback 0.2s ease forwards;
}
```

### 8.3 マイクロインタラクション

#### ボタンタップ時

```css
.button-tap {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}
```

#### ホバー時の拡大

```css
.hover-grow {
  transition: transform var(--transition-base);
}

.hover-grow:hover {
  transform: scale(1.05);
}
```

---

## 9. 音声・効果音ガイドライン

### 9.1 音声ガイド

| シーン | 音声メッセージ | トーン |
|--------|--------------|--------|
| アプリ起動 | 「プログラミングであそぼう！」 | 明るく元気 |
| ステージ選択 | 「どこへいく？」 | 優しく問いかけ |
| 命令配置 | 「いいね！」「そうそう！」 | 励まし |
| 実行前 | 「うごかしてみよう！」 | ワクワク感 |
| 成功 | 「やったね！すごい！」 | 大げさに褒める |
| 失敗 | 「もういちどやってみよう！」 | 優しく励ます |
| ヒント | 「ここをみてごらん」 | ヒント的 |

### 9.2 効果音

| アクション | 効果音 | 音量 |
|----------|--------|------|
| ボタンタップ | ポン（高音） | 70% |
| ブロック配置 | カチッ | 60% |
| ブロック削除 | シュッ | 50% |
| プログラム実行 | ピロリーン（上昇音） | 80% |
| キャラクター移動 | タッタッタッ（足音） | 40% |
| 成功 | ファンファーレ | 90% |
| 失敗 | プー（低音） | 60% |
| スター獲得 | キラーン | 85% |

---

## 10. アクセシビリティ

### 10.1 カラーユニバーサルデザイン

- 色覚特性への配慮
- 色だけに頼らない（形状、アイコン併用）
- コントラスト比の確保

### 10.2 タッチ操作の最適化

- 最小タッチサイズ: 80x80px
- ボタン間の余白: 最低24px
- ドラッグ操作の許容範囲を広く

### 10.3 エラー防止

- 重要な操作には確認ダイアログ
- アンドゥ機能の実装
- 優しいエラーメッセージ

---

## 11. Tailwind CSS設定

### 11.1 tailwind.config.js

```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // プライマリ
        primary: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3', // メイン
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
        },
        // セカンダリ
        secondary: {
          50: '#F1F8E9',
          500: '#8BC34A', // メイン
          900: '#33691E',
        },
        // アクセント
        accent: {
          yellow: '#FFD54F',
          orange: '#FF9800',
          pink: '#EC407A',
          purple: '#AB47BC',
        },
        // セマンティック
        success: '#66BB6A',
        error: '#FF7043',
        warning: '#FFA726',
        info: '#29B6F6',
      },
      fontSize: {
        'xs': '14px',
        'sm': '18px',
        'base': '24px',
        'lg': '32px',
        'xl': '40px',
        '2xl': '48px',
        '3xl': '64px',
      },
      spacing: {
        '0': '0px',
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '8': '64px',
        '10': '80px',
        '12': '96px',
        '16': '128px',
        'touch': '80px',
        'touch-lg': '96px',
      },
      borderRadius: {
        'none': '0',
        'sm': '8px',
        'base': '16px',
        'lg': '24px',
        'xl': '32px',
        'full': '9999px',
      },
      boxShadow: {
        'button': '0 8px 16px rgba(0, 0, 0, 0.15)',
        'button-hover': '0 12px 24px rgba(0, 0, 0, 0.2)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '400ms',
      },
    },
  },
  plugins: [],
};
```

---

**文書バージョン**: 1.0
**作成日**: 2025-10-20
**最終更新日**: 2025-10-20
