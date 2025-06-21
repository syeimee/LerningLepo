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
    const matches = [...html.matchAll(dateRegex)];
    const urls = matches.map((m) => {
        return m[1].replace(/<br>/g, '').replace(/\s+/g, '')
    });
    const titles = matches.map((m) => {
        return m[2].replace(/<br>/g, '').replace(/\s+/g, '')
    });

    // 表示
    for (let i = 0; i < Math.min(urls.length, titles.length); i++) {
        Logger.log(`${urls[i]}: ${titles[i]}`);
    }

}
