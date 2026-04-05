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

        chocoCount.map(cc => console.log(cc))
    })

}

const calcChocoCount = (directions: string[], grid: number[][], startPos: number[]): number[] => {

    const FORWARD = "F";
    const BACK = "B";
    const LEFT = "L";
    const RIGHT = "R";
    let row = startPos[0] - 1;
    let col = startPos[1] - 1;
    let chocoCount = [];

    if (directions.length === 0 || grid.length === 0 || startPos.length === 0) {
        return [0];
    }
    for (const dir of directions) {
        switch (dir) {
            case FORWARD:
                row = row - 1;
                if (row < 0) break;
                chocoCount.push(grid[row][col]);
                break;
            case BACK:
                row = row + 1;
                if (row >= grid.length) break;
                chocoCount.push(grid[row][col]);
                break;
            case LEFT:
                col = col - 1;
                if (col < 0) break;
                chocoCount.push(grid[row][col]);
                break;
            case RIGHT:
                col = col + 1;
                if (col >= grid[0].length) break;
                chocoCount.push(grid[row][col]);
                break;
            default:
                break;
        }
    }
    return chocoCount;
}

run();