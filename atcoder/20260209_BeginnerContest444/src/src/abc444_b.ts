//https://atcoder.jp/contests/abc444/tasks/abc444_b
import * as fs from 'fs';

const run = () =>{
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    const number = Number(input[0]);
    const targetSum = Number(input[1]);
    let count = 0;
    // 0からnumberまでの数をループ
    for(let i = 0; i <= number; i++){
        // 各位の和を計算する
        const man   = Math.floor(i / 10000) % 10; // 万の位
        const sen   = Math.floor(i / 1000) % 10;  // 千の位
        const hyaku = Math.floor(i / 100) % 10;   // 百の位
        const jyu = Math.floor(i / 10) % 10;   // 十の位
        const ichi = Math.floor(i) % 10;   // 一の位
        const sum = man + sen + hyaku + jyu + ichi;
        // もし各位の和がtargetSumと一致していたらカウント+1
        if(sum === targetSum) count ++;
    }    

    //結果を出力
    console.log(count)
}

run();