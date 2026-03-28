import * as readline from "readline";

//リファクタリング版

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

        //[開始位置, 終了位置]
        const intervals: [number, number] [] = [];
        let count = 0;

        //mグループ分のループ処理をする
        for(const line of lines.slice(1)){
            const [width, start] = line.split(" ").map(Number);
            const end = start - 1 + width;

            if(intervals.length === 0 || !hasOverlap(intervals, start, end)){
                intervals.push([start, end]);
                count += width;
            }
        }
        console.log(count);

    })
    

}
run();


const hasOverlap = (intervals: [number, number][], start: number, end: number): boolean => {
    for(const [a, b] of intervals){
        if(b >= start && a <= end) return true;
    }
    return false
}