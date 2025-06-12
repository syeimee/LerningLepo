// case1 :標準入力でNを受け取る
var input = require('fs').readFileSync('/dev/stdin', 'utf8');
// case2 :面積を計算する
var N = parseInt(input);
var area = N * N;
// case3 :面積を出力する
console.log(area);
