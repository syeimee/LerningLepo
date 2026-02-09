//https://atcoder.jp/contests/abc444/tasks/abc444_a

import * as fs from 'fs';

const run = () => {
    // すべての入力を標準入力（0）から読み込む
    const input = fs.readFileSync(0, 'utf-8').split('\n')[0].trim();
    if (!input) return;
    const nums = input.split('').map(Number);

    let isSame = true;
    let fistNum = nums[0];

    for (const num of nums) {
        if (num !== fistNum){
            isSame = false;
            break;
        };
    }
    if (isSame) {
        console.log("Yes");
    } else {
        console.log("No");
    }
}
run();
