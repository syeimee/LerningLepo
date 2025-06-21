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
    //htmlを取得
    var url = "https://qiita.com/advent-calendar/2016/crawler";
    var res = UrlFetchApp.fetch(url);
    var html = res.getContentText();
    /**
     * リンクとタイトルを取得
     * <div class="style-mpez5z">
     *  <a href="http://amacbee.hatenablog.com/entry/2016/12/01/210436" class="style-14mbwqe">
     *      scrapy-splashを使ってJavaScript利用ページを簡単スクレイピング
     *  </a>
     * </div>
     */
    var dateRegex = /<div class="style-mpez5z.*?"><a href="(.*?)".*?>(.*?)<\/a><\/div>/g; //fetchしたhtmlには改行を含まない
    var matches = __spreadArray([], __read(html.matchAll(dateRegex)), false);
    var urls = matches.map(function (m) {
        return m[1].replace(/<br>/g, '').replace(/\s+/g, '');
    });
    var titles = matches.map(function (m) {
        return m[2].replace(/<br>/g, '').replace(/\s+/g, '');
    });
    // 表示
    for (var i = 0; i < Math.min(urls.length, titles.length); i++) {
        Logger.log("".concat(urls[i], ": ").concat(titles[i]));
    }
};
