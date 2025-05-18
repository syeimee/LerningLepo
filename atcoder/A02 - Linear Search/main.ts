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

import { MeasureMemoryMode } from "vm";

const main = () =>{
    // step1 :標準入力でNを受け取る
    const input:string = require('fs').readFileSync('/dev/stdin', 'utf8');
    // step2 :入力行ごとに分割する
    const lines:string[] = input.split('\n');
    // step3 :1行目のNとXを分割代入する
    const [N, X]: [number, number] = lines[0].split(' ').map((str: string) => parseInt(str)) as [number, number];

    // step4 :2行目の配列を取得する
    const A: number[] = lines[1].trim().split(' ').map((str: string) => parseInt(str));
    // step5 :線形探索を実行する
    const result:string = linearSearch(A, X);
    // step6 :結果を出力する
    console.log(result);}
/**
 * linearSearch
 * @description　線形探索
 * @param {number[]} targetArray
 * @param {number} targetValue
 */
const linearSearch = (
    targetArray :number[], 
    targetValue :number
    ):string => {
        //mapはreturnで新しい配列を作るだけなので線形に不適
        //forEachはreturnできないので線形に不適
        //for文で線形探索を実行する
        for(let i = 0; i < targetArray.length; i++){
            if(targetArray[i] === targetValue){
                return "Yes";
            }
        }
        return "No";
    }

main();
