"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var run = function () {
    // すべての入力を標準入力（0）から読み込む
    var input = fs.readFileSync(0, 'utf-8').split('\n')[0].trim();
    if (!input)
        return;
    var nums = input.split('').map(Number);
    var isSame = false;
    var fistNum = nums[0];
    for (var _i = 0, nums_1 = nums; _i < nums_1.length; _i++) {
        var num = nums_1[_i];
        isSame = (num === fistNum);
    }
    if (isSame) {
        console.log("Yes");
    }
    else {
        console.log("No");
    }
};
run();
