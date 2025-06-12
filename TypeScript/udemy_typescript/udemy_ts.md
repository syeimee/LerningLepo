## TSのコンパイルに関して
・typescriptの言語は読むことができないので、"tsc ファイル名.ts"を実行してコンパイルを行う必要がある。
コンパイルを自動で行う際には"tsc ファイル名.ts -watch"で自動化できる。

・大規模な開発の際にはnpm initを使用してpackege.jsonを作成し、自動化を行う

## 開発用のローカルサーバーを作成する
・npm install --save-dev lite-serverを実行
・packege.jsonのscriptsに  

"scripts": {
    "start":"lite-server"
  },

と書くことでnpm run startでlite-serverを起動することだできる

## tsconfig.jsonの作成
tsc initを実行
tsconfig.jsonを設定することでproject内のtsファイルを一括してコンパイルできる
この状態でtsc -wをしておく

## ディレクトリ構造
tsファイルをsrcに格納　jsファイルをdistに格納
tsconfigの設定
 "compilerOptions"の後に  "include":["./src/*.ts"]と記述
　"compilerOptions"の内に"outDir": "./dist"と記述

## tsでの型宣言

// 数値型の変数
let age: number = 30;

// 文字列型の変数
let name: string = "Alice";

// 真偽値型の変数
let isActive: boolean = true;

// 配列型の変数
let numbers: number[] = [1, 2, 3, 4, 5];

// タプル型の変数（異なる型の要素を持つ配列）
let user: [string, number] = ["Alice", 30];

// オブジェクト型の変数
let person: { name: string; age: number } = { name: "Alice", age: 30 };
