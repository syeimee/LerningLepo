/**
 * ====================================================================
 * Memo
 * ①TSファイルのコンパイルコマンド
 *  tsc main.ts
 * ②コンパイルJSの実行コマンド
 *  node main.js
 * ③標準入力の受け取り
 * const input = require('fs').readFileSync('/dev/stdin', 'utf8');
 * ④標準入力の終了
 *  Ctrl + D
 * ====================================================================
 */

// step1 :標準入力でNを受け取る
const input = require('fs').readFileSync('/dev/stdin', 'utf8');
// step2 :面積を計算する
const N = parseInt(input);
const area = N * N;
// step3 :面積を出力する
console.log(area);

