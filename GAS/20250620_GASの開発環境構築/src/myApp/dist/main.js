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
    // ログ出力
    for (var i = 0; i < Math.min(urls.length, titles.length); i++) {
        Logger.log("".concat(urls[i], ": ").concat(titles[i]));
    }
    //スプレッドシートの存在確認
    var fileName = "スクレイピングの練習";
    var files = DriveApp.getFilesByName(fileName);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (files.hasNext()) {
        var file = files.next();
        ss = SpreadsheetApp.open(file);
        Logger.log("\u300C".concat(ss.getName(), "\u300D\u3092\u958B\u304D\u307E\u3057\u305F"));
    }
    else {
        ss = SpreadsheetApp.create(fileName);
        Logger.log("\u300C".concat(ss.getName(), "\u300D\u3092\u65B0\u898F\u4F5C\u6210\u3057\u307E\u3057\u305F"));
    }
    //アクティブなシートの存在確認
    var sheetName = "出力結果";
    var sheet = ss.getSheetByName(sheetName);
    Logger.log("\u30B9\u30AF\u30EC\u30A4\u30D4\u30F3\u30B0\u306E\u53D6\u5F97\u7D50\u679C\u3092\u30B7\u30FC\u30C8\u306B\u66F8\u304D\u8FBC\u307F\u307E\u3059\u3002");
    if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        Logger.log("".concat(sheetName, "\u304C\u5B58\u5728\u3057\u306A\u304B\u3063\u305F\u305F\u3081\u3001\u65B0\u898F\u3067\u4F5C\u6210\u3092\u884C\u3044\u307E\u3057\u305F\u3002"));
    }
    else {
        Logger.log("\u3059\u3067\u306B\u51FA\u529B\u6E08\u307F\u306E\u30C7\u30FC\u30BF\u3092\u30AF\u30EA\u30A2\u3057\u307E\u3059");
        sheet.clear();
    }
    //値の書き込み
    // sheet.getRange(1, 1).setValue("URL");
    // sheet.getRange(1, 2).setValue("タイトル");
    // for (let i = 0; i < Math.min(urls.length, titles.length); i++) {
    //     sheet.getRange(i + 2, 1).setValue(urls[i]);
    //     sheet.getRange(i + 2, 2).setValue(titles[i]);
    // }
    var rows = urls.map(function (url, i) { return [url, titles[i]]; });
    rows.unshift(["URL", "タイトル"]); // 見出しを先頭に追加
    sheet.getRange(1, 1, rows.length, 2).setValues(rows);
};
