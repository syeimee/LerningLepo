// 型定義

/** 案件検索設定 */
export interface JobSearch {
  name: string;
  keywords: string[];
  enabled: boolean;
}

/** ニュース設定 */
export interface NewsConfig {
  enabled: boolean;
  maxArticles: number;
}

/** 設定ファイル全体の型 */
export interface Config {
  jobSearches: JobSearch[];
  nitterInstances: string[];
  maxResultsPerSearch: number;
  news: {
    zenn: NewsConfig;
    qiita: NewsConfig;
  };
}

/** 案件情報 */
export interface JobResult {
  keyword: string;
  title: string;
  url: string;
  date?: string;
}

/** カレンダーイベント */
export interface CalendarEvent {
  title: string;
  startTime: string;
  endTime?: string;
  location?: string;
}

/** ニュース記事 */
export interface NewsArticle {
  title: string;
  url: string;
  author?: string;
  likes?: number;
  source: 'zenn' | 'qiita';
}

/** 各データソースの結果 */
export interface DataSourceResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/** バッチ実行結果 */
export interface BatchResult {
  calendar: DataSourceResult<CalendarEvent[]>;
  jobs: DataSourceResult<JobResult[]>;
  news: DataSourceResult<NewsArticle[]>;
  executedAt: string;
}
