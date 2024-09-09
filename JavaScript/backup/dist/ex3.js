"use strict";
// 練習問題「みかんの値段を計算するプログラムの作成」
// Aさんが1個100円のみかんを20個買いました。
// みかんの単価と個数を関数の引数に渡すと、合計金額を計算して返す関数を作成
// 作成した関数を呼び出して、Aさんの支払い金額はいくらになるのかを計算して、コンソールに出力する。
// ただし、消費税は考えない
let daikin = 100;
let kosu = 20;
const feeCalc = (daikin, kosu) => {
    return daikin * kosu;
};
console.log(feeCalc(100, 20));
