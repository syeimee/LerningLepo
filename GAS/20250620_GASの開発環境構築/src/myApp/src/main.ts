const main = (): void =>{
    const url = "https://www.jma.go.jp/bosai/forecast/#area_type=offices&area_code=330000";
    const res = UrlFetchApp.fetch(url);
    const html = res.getContentText();

    // 日付を取得
    //example: <th class="forecast-date">今夜<br>20日(金)</th> →　今夜<br>20日(金)
    const dateRegex: RegExp = /<th class="forecast-date.*?">(.*?)<\/th>/g;
    const dates = [...html.matchAll(dateRegex)].map((m) =>
        m[1].replace(/<br>/g, '').replace(/\s+/g, '')
    );
    // 天気（アイコンの直前のテキスト）を取得
    const weatherRegex = /<td><div>(.*?)<\/div><img.*?class="forecast-icon">/g;
    const weathers = [...html.matchAll(weatherRegex)].map((m) => m[1]);

    // 表示
    for (let i = 0; i < Math.min(dates.length, weathers.length); i++) {
        console.log(`${dates[i]}: ${weathers[i]}`);
    }

}
