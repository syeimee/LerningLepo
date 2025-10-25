/**
 * カラーパレット定義
 * ブランドカラーと補助色を一元管理
 */

// ブランドカラー
export const BRAND_COLOR = {
  main: '#0395AA',
  light: '#33A0B5',
  dark: '#005C6D',
  contrastText: '#FFFFFF',
}

// 補助色
export const COLORS = {
  // プライマリー（ブランドカラー）
  primary: BRAND_COLOR,

  // 成功
  success: {
    main: '#27AE60',
    light: '#52C77A',
    dark: '#1E8449',
    contrastText: '#FFFFFF',
  },

  // 警告
  warning: {
    main: '#F39C12',
    light: '#F5B041',
    dark: '#DC7633',
    contrastText: '#FFFFFF',
  },

  // エラー・危険
  error: {
    main: '#E74C3C',
    light: '#EC7063',
    dark: '#C0392B',
    contrastText: '#FFFFFF',
  },
  danger: {
    main: '#E74C3C',
    light: '#EC7063',
    dark: '#C0392B',
    contrastText: '#FFFFFF',
  },

  // 情報
  info: {
    main: '#3498DB',
    light: '#5DADE2',
    dark: '#2874A6',
    contrastText: '#FFFFFF',
  },

  // セカンダリー（グレー系）
  secondary: {
    main: '#95A5A6',
    light: '#BDC3C7',
    dark: '#7F8C8D',
    contrastText: '#FFFFFF',
  },

  // 背景色
  background: {
    default: '#FAFAFA',
    paper: '#FFFFFF',
  },

  // テキスト色
  text: {
    primary: '#2C3E50',
    secondary: '#7F8C8D',
    disabled: '#BDC3C7',
  },

  // その他
  divider: '#E0E0E0',
  border: '#E0E0E0',
}

// 色を取得するヘルパー関数
export const getColor = (colorName: keyof typeof COLORS, shade: 'main' | 'light' | 'dark' = 'main') => {
  const color = COLORS[colorName]
  if (typeof color === 'object' && 'main' in color) {
    return color[shade]
  }
  return color
}

// 透明度を追加するヘルパー関数
export const withOpacity = (color: string, opacity: number): string => {
  // RGB形式の場合
  if (color.startsWith('rgb')) {
    return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`)
  }

  // HEX形式の場合
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
