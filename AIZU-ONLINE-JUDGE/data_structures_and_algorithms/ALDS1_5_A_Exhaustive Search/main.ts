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
 * ## 課題
 * URL : https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ALDS1_5_A&lang=ja
 * 
 * ## 問題概要
 * 長さ n の数列 A と整数 m に対して、A の要素の中のいくつかの要素を足し合わせて m が作れるかどうかを判定するプログラムを作成してください。
 * A の各要素は1度だけ使用できます。
 * 
 * 数列 A が与えられたうえで、質問として q 個の mi が与えられるので、それぞれについて "yes" または "no" と出力してください。
 * 
 * ## 入力
 * 1. 1行目に整数 n（数列の長さ）
 * 2. 2行目に数列 A を表す n 個の整数
 * 3. 3行目に整数 q（質問の数）
 * 4. 4行目に q 個の整数 mi（質問の値）
 * 
 * ## 出力
 * 各質問について、A の要素を足し合わせて mi を作ることができれば "yes"、できなければ "no" を出力してください。
 * 
 * ## 制約
 * - n ≤ 20
 * - q ≤ 200
 * - 1 ≤ A の要素 ≤ 2,000
 * 
 * ====================================================================
 */

const main = () =>{
    const input: string = require('fs').readFileSync('/dev/stdin', 'utf8');
    const lines:string[] = input.split('\n');
    
    try{
        // step1 Aの要素数nを受け取る
        const n: number = parseInt(lines[0].trim())
        // step2 Aの要素を受け取る
        const A: number[] = lines[1].trim().split(' ').map((str: string) => parseInt(str));

        checkCorrectArray(A, n);
        // step3 mの要素数qを受け取る
        const q: number = parseInt(lines[2].trim())
        // step4 mの要素を受け取る
        const m: number[] = lines[3].trim().split(' ').map((str: string) => parseInt(str));

        checkCorrectArray(m, q);

        const INDEX: number = 0;
        for(let i = 0; i < m.length; i++){
            const result:string = solve(INDEX, m[i], n, A) ? "yes" : "no";
            console.log(result);
        }

    }catch(e){
        console.error(e);
    }

}

/**
 * 部分和問題：配列の中からいくつかの要素を選んで targetSum を作れるか判定する関数
 *
 * @param index 現在見ている targetArray のインデックス
 * @param targetSum 現時点で目指している合計値
 * @param inputTargetArrayLength 配列の長さ（固定値）
 * @param targetArray 対象の整数配列
 * @returns 合計 targetSum を作れるなら true、無理なら false
 */

    //処理の流れ(solve(0, 8, 3, [1, 5, 7])を実行した場合)
    //    solve(0, 8) = solve(1, 8)     (使わない)
    //                || solve(1, 7)     (使う: 8-1)
    //
    //    solve(1, 8) = solve(2, 8)     (使わない)
    //                || solve(2, 3)     (使う: 8-5)
    //
    //    solve(2, 8) = solve(3, 8) => false index >= inputTargetArrayLength
    //               || solve(3, 1) => false 
    //
    //    solve(2, 3) = solve(3, 3) => false
    //                || solve(3, -4) => false
    //
    //    solve(1, 7) = solve(2, 7)
    //                || solve(2, 2)
    //
    //    solve(2, 7) = solve(3, 7) => false
    //                || solve(3, 0) => true ✔️ ← ここで成功！
    //
    //    solve(2, 2) = solve(3, 2) => false
    //                || solve(3, -5) => false

    const solve = (  
        index: number,
        targetSum: number,
        inputTargetArrayLength: number,
        targetArray: number[]
    ): boolean => {

    //case1 targetSumから要素を引いていき、ちょうど targetSum が 0 になった → 成功
    if (targetSum === 0) {
        return true;
    }

    //case2 targetSumから要素を引いていき、配列の最後まで見たけど、targetSum に届かなかった → 失敗
    if (index >= inputTargetArrayLength) {
        return false;
    }
    
    //[1, 5, 7]で和が8を探す場合
    //recursive1 現在の要素を使わず次へ(1,7を使って5を使わない場合true)
    const withoutCurrent: boolean = solve(index + 1, targetSum, inputTargetArrayLength, targetArray);

    //recursive2 現在の要素を使用して次へ
    const withCurrent: boolean = solve(index + 1, targetSum - targetArray[index], inputTargetArrayLength, targetArray);
    
    const res: boolean = withoutCurrent || withCurrent;

    return res;
}

/**
 * 配列の要素数が正しいかチェックする
 */
const checkCorrectArray = (arr: number[],inputIndex: number):void => {
    if(arr.length !== inputIndex){
        throw new Error(`配列の要素数が正しくありません。`);
    }
}

main();