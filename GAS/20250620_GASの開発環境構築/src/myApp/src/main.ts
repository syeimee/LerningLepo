const main = (): void =>{
    //htmlを取得
    const url = "https://qiita.com/advent-calendar/2016/crawler";
    const res = UrlFetchApp.fetch(url);
    const html = res.getContentText();

    /**
     * リンクとタイトルを取得
     * <div class="style-mpez5z">
     *  <a href="http://amacbee.hatenablog.com/entry/2016/12/01/210436" class="style-14mbwqe">
     *      scrapy-splashを使ってJavaScript利用ページを簡単スクレイピング
     *  </a>
     * </div>
     */
    const dateRegex: RegExp = /<div class="style-mpez5z.*?"><a href="(.*?)".*?>(.*?)<\/a><\/div>/g;//fetchしたhtmlには改行を含まない
    const matches: RegExpExecArray[] = [...html.matchAll(dateRegex)];
    const urls:string [] = matches.map((m) => {
        return m[1].replace(/<br>/g, '').replace(/\s+/g, '')
    });
    const titles = matches.map((m) => {
        return m[2].replace(/<br>/g, '').replace(/\s+/g, '')
    });

    // ログ出力
    for (let i = 0; i < Math.min(urls.length, titles.length); i++) {
        Logger.log(`${urls[i]}: ${titles[i]}`);
    }

    //スプレッドシートの存在確認
    const fileName: string = "スクレイピングの練習"
    const files: GoogleAppsScript.Drive.FileIterator = DriveApp.getFilesByName(fileName);
    let ss: GoogleAppsScript.Spreadsheet.Spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    if(files.hasNext()){
        const file: GoogleAppsScript.Drive.File = files.next();
        ss = SpreadsheetApp.open(file);
        Logger.log(`「${ss.getName()}」を開きました`);
    }else{
        ss = SpreadsheetApp.create(fileName);
        Logger.log(`「${ss.getName()}」を新規作成しました`);
    }

    //アクティブなシートの存在確認
    const sheetName = "出力結果";
    let sheet = ss.getSheetByName(sheetName);
    Logger.log(`スクレイピングの取得結果をシートに書き込みます。`);

    if(!sheet){
        sheet = ss.insertSheet(sheetName);
        Logger.log(`${sheetName}が存在しなかったため、新規で作成を行いました。`);
    }else{
        Logger.log(`すでに出力済みのデータをクリアします`);
        sheet.clear();
    }

    //値の書き込み
    // sheet.getRange(1, 1).setValue("URL");
    // sheet.getRange(1, 2).setValue("タイトル");

    // for (let i = 0; i < Math.min(urls.length, titles.length); i++) {
    //     sheet.getRange(i + 2, 1).setValue(urls[i]);
    //     sheet.getRange(i + 2, 2).setValue(titles[i]);
    // }

    const rows: string[][] = urls.map((url, i) => [url, titles[i]]);
    rows.unshift(["URL", "タイトル"]); // 見出しを先頭に追加
    sheet.getRange(1, 1, rows.length, 2).setValues(rows);
}
