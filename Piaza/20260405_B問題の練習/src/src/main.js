"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var readInput = function (callback) {
    var rl = readline.createInterface({ input: process.stdin });
    var lines = [];
    rl.on("line", function (line) { return lines.push(line); });
    rl.on("close", function () { return callback(lines); });
};
function run() {
    readInput(function (lines) {
        var _a = lines[0].split(" ").map(Number), _actionCount = _a[0], rowCount = _a[1], _colCount = _a[2];
        var startPos = lines[1].split(" ").map(Number);
        var directions = lines[2].split("").map(String);
        var grid = [];
        for (var i = 3; i < 3 + rowCount; i++) {
            grid.push(lines[i].split(" ").map(Number));
        }
        var chocoCount = calcChocoCount(directions, grid, startPos);
        chocoCount.map(function (cc) { return console.log(cc); });
    });
}
var calcChocoCount = function (directions, grid, startPos) {
    var FORWARD = "F";
    var BACK = "B";
    var LEFT = "L";
    var RIGHT = "R";
    var row = startPos[0] - 1;
    var col = startPos[1] - 1;
    var chocoCount = [];
    if (directions.length === 0 || grid.length === 0 || startPos.length === 0) {
        return [0];
    }
    for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
        var dir = directions_1[_i];
        switch (dir) {
            case FORWARD:
                row = row - 1;
                if (row < 0)
                    break;
                chocoCount.push(grid[row][col]);
                break;
            case BACK:
                row = row + 1;
                if (row >= grid.length)
                    break;
                chocoCount.push(grid[row][col]);
                break;
            case LEFT:
                col = col - 1;
                if (col < 0)
                    break;
                chocoCount.push(grid[row][col]);
                break;
            case RIGHT:
                col = col + 1;
                if (col >= grid[0].length)
                    break;
                chocoCount.push(grid[row][col]);
                break;
            default:
                break;
        }
    }
    return chocoCount;
};
run();
