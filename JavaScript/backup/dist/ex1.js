"use strict";
// 練習問題
// Aさんの体重は60kg,身長は1.7mです
// ①AさんのBMIを求めて出力
// ②BMIの結果を元に以下の条件で出力内容を変える
// 18.5未満「痩せ」
// 18.5以上25未満「普通」
// 25以上「肥満」
const weight = 10;
const height = 1.7;
const BMI = weight / height / height;
console.log(BMI);
// if(BMI< 18.5){
//     console.log("痩せ");
// }else if(BMI < 25 && BMI>18.5){
//     console.log("普通");
// }else{
//     console.log("肥満");
// }
// リファクタリング
if (BMI >= 25) {
    console.log("肥満");
}
else if (BMI >= 18.5) {
    console.log("普通");
}
else {
    console.log('痩せ');
}
