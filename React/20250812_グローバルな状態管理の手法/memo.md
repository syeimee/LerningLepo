# 学習テーマ
作業日時: 2025-08-12


## 目的・背景 

FでReactのプロジェクトに携わるにあたり、グローバルな状態管理の手法を学ぶ必要が出てきたため。

## 実装内容・学んだ技術  

1. useReducerによるuseStateの書き換え
```ts
  // dispatchを実行すると、useReducerの第一引数の関数がよばれる。第二引数は初期値。
  const [rstate, dispatch] = useReducer((prev, {type, step}) => {
switch (type) {
    case '+':
     return prev + step;
    case '-':
     return prev - step;
    default:
      throw new Error('Unknown action: ' + type);
  }
  }, 0);
  const rcountUp = () =>{
    dispatch({type:'+', step: 2});
  }
  const rcountDown = () =>{
    dispatch({type:'-', step: 2});
  }
```


## 課題・問題点  




## 気づき・改善案  




