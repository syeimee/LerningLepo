"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
// 3 3 3 → ３回移動できる 3行3列
// 2 1 → 今座っている位置は2行1列目
// FRB　前方向に移動する場合 "F"、後方向に移動する場合 "B"、左方向に移動する場合 "L"、右方向に移動する場合 "R" → 
// 3 6 2
// 0 4 1
// 5 0 7
//出力する期待値は　3,6,4
const readInput = (callback) => {
    const rl = readline.createInterface({ input: process.stdin });
    const lines = [];
    rl.on("line", (line) => lines.push(line));
    rl.on("close", () => callback(lines));
};
function run() {
    readInput((lines) => {
        const [actionCount, rowCount, colCount] = lines[0].split(" ").map(Number);
        const startPos = lines[1].split(" ").map(Number);
        const directions = lines[2].split("").map(String);
        let gird = [];
        for (let i = 3; i < 3 + rowCount; i++) {
            gird.push(lines[i].split(" ").map(Number));
        }
        console.log(directions);
        console.log(gird);
        console.log(startPos);
        const chocoCount = calcChocoCount(directions, gird, startPos);
        chocoCount.map(cc => {
            console.log(cc);
        });
    });
}
const calcChocoCount = (directions, grid, startPos) => {
    const FORWARD = "F";
    const BACK = "B";
    const LEFT = "L";
    const RIGHT = "R";
    let row = startPos[0] - 1;
    let col = startPos[1] - 1;
    let chocoCount = [];
    for (const dir of directions) {
        switch (dir) {
            case FORWARD:
                row = row - 1;
                chocoCount.push(grid[row][col]);
                break;
            case BACK:
                row = row + 1;
                chocoCount.push(grid[row][col]);
                break;
            case LEFT:
                col = col - 1;
                chocoCount.push(grid[row][col]);
                break;
            case RIGHT:
                col = col + 1;
                chocoCount.push(grid[row][col]);
                break;
            default:
                break;
        }
    }
    return chocoCount;
};
run();
