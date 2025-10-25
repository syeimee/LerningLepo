# カラーシステム

## 概要

このプロジェクトでは、ブランドカラーと補助色を一元管理しています。
`lib/colors.ts` ですべての色を定義し、`lib/theme.ts` でMUIテーマに適用しています。

## ブランドカラー

メインのブランドカラーは **#00839B (RGB: 0, 131, 155)** です。

```typescript
import { BRAND_COLOR } from '@/lib/colors'

// 使用例
const style = {
  backgroundColor: BRAND_COLOR.main,      // #00839B
  borderColor: BRAND_COLOR.light,         // #33A0B5
  color: BRAND_COLOR.dark,                // #005C6D
}
```

## 補助色

### Primary（プライマリー）
- ブランドカラーと同じ
- `COLORS.primary.main` = `#00839B`

### Success（成功）
- メイン: `#27AE60`
- 用途: 成功メッセージ、完了状態など

### Warning（警告）
- メイン: `#F39C12`
- 用途: 警告メッセージ、注意が必要な状態など

### Error / Danger（エラー・危険）
- メイン: `#E74C3C`
- 用途: エラーメッセージ、削除ボタンなど

### Info（情報）
- メイン: `#3498DB`
- 用途: 情報メッセージ、ヒントなど

### Secondary（セカンダリー）
- メイン: `#95A5A6`
- 用途: 副次的なUI要素、無効化状態など

## 使い方

### 1. MUIコンポーネントで使用

MUIのコンポーネントでは、`color`プロパティで自動的に適用されます。

```tsx
import { Button, Chip, Alert } from '@mui/material'

// ブランドカラーが適用される
<Button variant="contained">保存</Button>

// 補助色を使用
<Button color="success">完了</Button>
<Button color="error">削除</Button>
<Chip label="予定" color="primary" />
<Alert severity="warning">注意が必要です</Alert>
```

### 2. カスタムコンポーネントで使用

カスタムスタイルで色を使用する場合は、`colors.ts`から直接インポートします。

```tsx
import { COLORS, BRAND_COLOR } from '@/lib/colors'

const CustomComponent = () => {
  return (
    <div
      style={{
        backgroundColor: BRAND_COLOR.main,
        color: BRAND_COLOR.contrastText,
        border: `1px solid ${COLORS.border}`,
      }}
    >
      コンテンツ
    </div>
  )
}
```

### 3. ヘルパー関数を使用

```typescript
import { getColor, withOpacity } from '@/lib/colors'

// 色を取得
const primaryColor = getColor('primary', 'main')  // #00839B
const successLight = getColor('success', 'light') // #52C77A

// 透明度を追加
const transparentPrimary = withOpacity(BRAND_COLOR.main, 0.5) // rgba(0, 131, 155, 0.5)
```

## カラーパレット一覧

| カテゴリ | main | light | dark | 用途 |
|---------|------|-------|------|------|
| **Primary** | #00839B | #33A0B5 | #005C6D | ブランドカラー、主要なアクション |
| **Success** | #27AE60 | #52C77A | #1E8449 | 成功、完了状態 |
| **Warning** | #F39C12 | #F5B041 | #DC7633 | 警告、注意 |
| **Error** | #E74C3C | #EC7063 | #C0392B | エラー、削除 |
| **Info** | #3498DB | #5DADE2 | #2874A6 | 情報、ヒント |
| **Secondary** | #95A5A6 | #BDC3C7 | #7F8C8D | 副次的な要素 |

## テキストカラー

```typescript
COLORS.text.primary    // #2C3E50 - メインのテキスト
COLORS.text.secondary  // #7F8C8D - 副次的なテキスト
COLORS.text.disabled   // #BDC3C7 - 無効化されたテキスト
```

## 背景色

```typescript
COLORS.background.default // #FAFAFA - デフォルトの背景
COLORS.background.paper   // #FFFFFF - カード、ペーパーの背景
```

## 新しい色を追加する場合

1. `lib/colors.ts` に色を定義
2. `lib/theme.ts` で必要に応じてMUIテーマに追加
3. このドキュメントを更新

## 注意事項

- 色を直接ハードコードせず、必ず `colors.ts` から参照してください
- ブランドカラーを変更する場合は、`BRAND_COLOR` の定義のみを変更すれば全体に反映されます
- MUIコンポーネントのカスタマイズは `theme.ts` の `components` セクションで行います
