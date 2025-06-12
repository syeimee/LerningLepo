// 練習問題「みかんの値段を計算するプログラムの作成」
// Aさんが1個100円のみかんを20個買いました。
// みかんの単価と個数を関数の引数に渡すと、合計金額を計算して返す関数を作成

// 作成した関数を呼び出して、Aさんの支払い金額はいくらになるのかを計算して、コンソールに出力する。
// ただし、消費税は考えない

let daikin :number = 100;
let kosu : number = 20;

const feeCalc =(daikin :number, kosu :number)=>{
    return daikin * kosu;
}

console.log(feeCalc(100,20));