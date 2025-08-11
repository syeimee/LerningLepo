# 学習テーマ
作業日時: 2025-06-29

コンポーネントにCSSを当ててみる。
## 目的・背景 
Fの社内研修を行うことになったので、Reactの基本に関するドキュメントを作成する。


## 実装内容・学んだ技術  

## Next.jsのプロジェクトを作成する

```bash
npx create-next-app@latest demo-app
```
`http://localhost:3000`を確認してアプリケーションが正しく起動することを確認できたら
`/demo-app/src/app/page.tsx`を開いてみよう。
このファイルが、Next.jsアプリケーションで最初に表示されるページになる。

ここに書かれているJSXを以下の内容に変更してみよう。
```ts
const Greet = ()=> {
  return (
    <div>
      <h3>Hello World</h3>
    </div>
  );
}

export default Greet;
```

## スタイルを当ててみる
ReactではHTMLで言うところのclassは`className`として記述する。
違いはこれだけ！意外と簡単。
```html
// HTML
<div class="component">

// React (JSX)
<div className="component">
```

`div`に対して`className="component"`を定義して、スタイルを当ててみる。

CSSファイルを読み込むので、先頭に`import "./Greet.css"`をつけておこう。

```ts
import "./Greet.css" //cssのインポート
const Greet = ()=> {
  return (
    <div className="component">
      <h3>Hello World</h3>
    </div>
  );
}

export default Greet;
```

CSSファイルを新規作成して、`/demo-app/src/app/Greet.css`にCSSを書いてみよう。
```bash
demo-app/
├── src/
│   └── app/
│       ├── page.tsx
│       └── Greet.css ←　新しく作る

```
今回は以下のように書きますが、自分の好きなように当ててみてください！

```css
.component{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size:100px;
    color: pink;
}
```

上記のCSSの場合は、以下のような画面になる。
<img src="./resources/1.png">

基本的なスタイルの当て方はここまで。
他にもスタイルを当てる方法（CSS Modules、Tailwind CSSなど）がある。また後日説明するかも・・・
どうしても気になって夜も寝れなくなりそうな人は調べてみてくださいね。

第4回はここまで。

次回はコンポーネントに分割する方法を勉強していくよ！

## 課題・問題点  




## 気づき・改善案  




