import * as readline from "readline";

const readInput = (callback: (lines: string[]) => void) => {
    const rl = readline.createInterface({ input: process.stdin });
    const lines: string[] = [];
    rl.on("line", (line) => lines.push(line));
    rl.on("close", () => callback(lines))
}

function run() {
    readInput((lines) => {
        const [_actionCount, rowCount, _colCount] = lines[0].split(" ").map(Number);
        const startPos = lines[1].split(" ").map(Number);
        const directions = lines[2].split("").map(String);

        let grid: number[][] = [];
        for (let i = 3; i < 3 + rowCount; i++) {
            grid.push(lines[i].split(" ").map(Number));
        }
        const chocoCount = calcChocoCount(directions, grid, startPos);

        console.log(calcChocoCount.join("\n"));
    })

}

const calcChocoCount = (directions: string[], grid: number[][], startPos: number[]): number[] => {

    const move: Record<string, [number, number]> = {
        F: [-1, 0], B: [1, 0], L: [0, -1], R: [0, 1]
    }
    let row = startPos[0] - 1;
    let col = startPos[1] - 1;
    let chocoCount = [];

    if (directions.length === 0 || grid.length === 0 || startPos.length === 0) {
        return [0];
    }
    for (const dir of directions) {
        const [dr, dc] = move[dir];
        row += dr;
        col += dc;
        chocoCount.push(grid[row][col])
    }
    return chocoCount;
}

run();