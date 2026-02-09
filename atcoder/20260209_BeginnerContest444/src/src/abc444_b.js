"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://atcoder.jp/contests/abc444/tasks/abc444_b
var fs = require("fs");
var run = function () {
    var input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    var number = Number(input[0]);
    var targetSum = Number(input[1]);
    var count = 0;
    // 0からnumberまでの数をループ
    for (var i = 0; i <= number; i++) {
        // 各位の和を計算する
        var man = Math.floor(i / 10000) % 10; // 万の位
        var sen = Math.floor(i / 1000) % 10; // 千の位
        var hyaku = Math.floor(i / 100) % 10; // 百の位
        var jyu = Math.floor(i / 10) % 10; // 十の位
        var ichi = Math.floor(i) % 10; // 一の位
        var sum = man + sen + hyaku + jyu + ichi;
        // もし各位の和がtargetSumと一致していたらカウント+1
        if (sum === targetSum)
            count++;
    }
    //結果を出力
    console.log(count);
};
run();
