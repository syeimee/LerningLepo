# 学習テーマ
作業日時: 2025-06-18

React・React Native・Expo Routerの導入と違いの理解

## 目的・背景 
- WebのReactとモバイルのReact Nativeの違いを把握しつつ、Expo Routerを用いた画面遷移の構造を理解する
- Reactの「コンポーネント思考」を理解する。

## 実装内容・学んだ技術

### Reactの特徴
- UI を「コンポーネント」という小さな部品で分割して組み合わせて作る。
- HTML を JavaScript（TypeScript）に埋め込める： JSX / TSX
- 状態管理や副作用などに「Hooks」を使う(いろいろあるので調べてみてください！（useState,useEffect...)
- React自体は「表示をどうするか」だけを担当しているライブラリ（ルーティングや通信などは別）

#### ★　JSX / TSX の構文とは？
return の中身は「UIとして描画したいこと」を定義
```tsx
// Hello.tsx
const Hello = () => {
  return (
    <div>Hello, World!</div>
  )
}
export default Hello;
```

#### ★　コンポーネントを組み込む
 Hello は再利用できる「部品」。このように UI を組み合わせて構成する。
```tsx
// Home.tsx
import Hello from './Hello';

const Home = () => {
  return (
    <div>
      <Hello />
    </div>
  );
};
```

### ReactNativeについて
- Webではないので、HTMLタグや、CSSを直接記述することができない。Reactとは記載方法が異なる点がある。

`（React Web vs React Native）`

| 項目         | Web (React)            | React Native          |
| ---------- | ---------------------- | --------------------- |
| HTMLタグ     | `<div>`, `<p>`         | `<View>`, `<Text>`    |
| CSSの書き方    | `className`, `CSSファイル` | `StyleSheet.create()` |
| ルーティング     | `react-router`         | `Expo Router` など      |
| 実行プラットフォーム | ブラウザ                   | スマホアプリ（iOS / Android） |
<br>

`React Nativeの基本コンポーネント`
```tsx
import { View, Text, StyleSheet } from 'react-native';

const Hello = () => {
  return (
    <View style={styles.container}>
      <Text>Hello, World!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
```

#### Expo Routerとは
フォルダとファイル名で画面遷移が決まる仕組み

```bash
app/
├── (stack)/
│   ├── index.tsx   ← ホーム画面(/)
│   └── about.tsx   ← アバウト画面(/about)
└── _layout.tsx     ← Stackナビゲーションの設定

```

`Stack ナビゲーション（_layout.tsx）`
- 画面遷移のルールをここで定義
- expo-router が Next.js のようにファイルベースでルーティングを解釈
```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
    </Stack>
  );
}
```



## 課題・問題点  




## 気づき・改善案  
### 🚀nativewind を入れてみる
##### Tailwind CSS と NativeWindのインストール
Tailwind CSS、NativeWind、そしてTypeScriptの型定義をインストール。

```bash
npm i tailwindcss
npm i nativewind
npm i --save-dev @types/react-native
```

#### Tailwind CSSの設定ファイルを作成し編集する
Tailwind CSSの設定ファイルを生成。
```bash
npx tailwindcss init
```
プロジェクトのルートにtailwind.config.jsファイルが追加されるので、そこにTailwind CSSを適用する対象を記載する

```js
//tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
+ content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{tsx,jsx,ts,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

```

babel.config.jsがexpo routerにはないので、作成する必要がある
Babel は、最新の JavaScriptコードを、古いブラウザや環境でも動くように変換（トランスパイル）するツールらしい。


```js
//babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
+   sourceMaps: true,
+   plugins: ["nativewind/babel"],
  };
};
```
※設定内容の補足説明
- sourceMapsの設定：sourceMaps: trueでデバッグ時にソースコードを追跡できるようにします

- pluginsの設定：["nativewind/babel"]でNativeWindを使用し、Tailwind CSS風のクラス名をReact Nativeに適用します

