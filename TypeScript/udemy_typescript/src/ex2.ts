//練習問題
// あみだくじプログラムの作成。
// swich文を利用
// 変数numの値によってコンソールにへの出力を変える

// 1 大吉 2 中吉 3 小吉 4 吉 5 凶　それ以外なら「想定外の数値です」を出力

// const num :number= 5;

//ランダム値の生成(Math.random(Max - min +1) + min )
let num :number = Math.floor(Math.random() * 5)+1;

switch (num) {
    case 1:
        console.log("大吉");
        break;
    case 2:
        console.log("中吉");
        break;
    case 3:
        console.log("小吉");
        break;
    case 4:
        console.log("吉");
        break;
    case 5:
        console.log("凶");
        break;
    default:
        console.log("想定外の値")
}