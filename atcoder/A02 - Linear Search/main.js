"use strict";
/**
 * ====================================================================
 * ##　Memo
 * ①TSファイルのコンパイルコマンド
 *  tsc main.ts
 * ②コンパイルJSの実行コマンド
 *  node main.js
 * ③標準入力の受け取り
 * const input = require('fs').readFileSync('/dev/stdin', 'utf8');
 * ④標準入力の終了
 *  Ctrl + D
 *
 * ## 参考
 * URL : https://atcoder.jp/contests/tessoku-book/tasks/tessoku_book_b
 * ====================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
var main = function () {
    // step1 :標準入力でNを受け取る
    var input = require('fs').readFileSync('/dev/stdin', 'utf8');
    // step2 :入力行ごとに分割する
    var lines = input.split('\n');
    // step3 :1行目のNとXを分割代入する
    var _a = lines[0].split(' ').map(function (str) { return parseInt(str); }), N = _a[0], X = _a[1];
    // step4 :2行目の配列を取得する
    var A = lines[1].trim().split(' ').map(function (str) { return parseInt(str); });
    // step5 :線形探索を実行する
    var result = linearSearch(A, X);
    // step6 :結果を出力する
    console.log(result);
};
/**
 * linearSearch
 * @description　線形探索
 * @param {number[]} targetArray
 * @param {number} targetValue
 */
var linearSearch = function (targetArray, targetValue) {
    console.log(targetValue);
    console.log(targetArray);
    //mapはreturnで新しい配列を作るだけなので線形に不適
    //forEachはreturnできないので線形に不適
    //for文で線形探索を実行する
    for (var i = 0; i < targetArray.length; i++) {
        if (targetArray[i] === targetValue) {
            return "Yes";
        }
    }
    return "No";
};
main();
