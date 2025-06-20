"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var main = function () {
    var url = "https://www.jma.go.jp/bosai/forecast/#area_type=offices&area_code=330000";
    var res = UrlFetchApp.fetch(url);
    var html = res.getContentText();
    // 日付を取得
    //example: <th class="forecast-date">今夜<br>20日(金)</th> →　今夜<br>20日(金)
    var dateRegex = /<th class="forecast-date.*?">(.*?)<\/th>/g;
    var dates = __spreadArray([], __read(html.matchAll(dateRegex)), false).map(function (m) {
        return m[1].replace(/<br>/g, '').replace(/\s+/g, '');
    });
    // 天気（アイコンの直前のテキスト）を取得
    var weatherRegex = /<td><div>(.*?)<\/div><img.*?class="forecast-icon">/g;
    var weathers = __spreadArray([], __read(html.matchAll(weatherRegex)), false).map(function (m) { return m[1]; });
    // 表示
    for (var i = 0; i < Math.min(dates.length, weathers.length); i++) {
        console.log("".concat(dates[i], ": ").concat(weathers[i]));
    }
};
main();
