import * as readline from "readline";

/**
 * case:
 * 6 3 →合計6人の３グループのお客さんいらっしゃい
 * 3 2 →１グループ目は２番目の座席から3人座る (F,T,T,T,F,F)
 * 1 6 →２グループ目は6番目の座席から1人座る(F,T,T,T,F,T)
 * 2 5 →３グループ目は5番目の座席から2人座る
 * */

/**
 * 標準入力を受け付ける
 */
const readInput = (callback:(lines: string[])=> void) =>{
    const rl = readline.createInterface({ input: process.stdin });
    const lines: string[] = [];
    rl.on("line",(line) => lines.push(line));
    rl.on("close",() => callback(lines))
}

function run() {
    readInput((lines)=>{
        //総人数とグループ数を受け取る
        const [m, n] = lines[0].split(" ").map(Number);
        const map = new Map<number, boolean>(
            Array.from({ length: m }, (_, i) => [i, false])
        );
        //座る人数と座る位置を受け取る
        const data = lines.slice(1);

        //mグループ分のループ処理をする
        for(let t = 0; t < data.length; t++){
            const [width, start] = data[t].split(" ").map(Number);
            const end = start-1 + width
            let isTarget = true;

            //更新する対象かチェック
            for(let i = start-1; i <= end-1; i++){
                if(map.get(i)) isTarget = false;
            }

            //更新対象のみ更新
            for(let i = start-1; i <= end-1; i++){
                if(!isTarget) break;
                map.set(i, true);
            }
        }

        //結果を集計
        let count = 0;
        for(const value of map.values()){
            if(value) count++;
        }

        //結果を出力
        console.log(count);
    })
    

}
run();