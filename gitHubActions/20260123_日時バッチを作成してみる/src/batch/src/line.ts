// LINEメッセージフォーマッターモジュール
import type { BatchResult, CalendarEvent, JobResult, NewsArticle } from './types';

const MAX_MESSAGE_LENGTH = 5000;

/**
 * 現在の日時を日本語フォーマットで取得
 */
function getCurrentDateTime(): string {
  const now = new Date();
  return now.toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * 時刻を短縮フォーマットで表示
 */
function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * カレンダーイベントをフォーマット
 */
function formatCalendarEvents(events: CalendarEvent[]): string {
  if (events.length === 0) {
    return '予定なし';
  }

  return events
    .map((event) => {
      const time = formatTime(event.startTime);
      const location = event.location ? ` @${event.location}` : '';
      return `  ${time} ${event.title}${location}`;
    })
    .join('\n');
}

/**
 * 案件情報をフォーマット
 */
function formatJobs(jobs: JobResult[]): string {
  if (jobs.length === 0) {
    return '新着案件なし';
  }

  // キーワードごとにグループ化
  const grouped = jobs.reduce((acc, job) => {
    if (!acc[job.keyword]) {
      acc[job.keyword] = [];
    }
    acc[job.keyword].push(job);
    return acc;
  }, {} as Record<string, JobResult[]>);

  const sections: string[] = [];
  for (const [keyword, keywordJobs] of Object.entries(grouped)) {
    const jobLines = keywordJobs
      .slice(0, 3) // キーワードごとに最大3件
      .map((job) => `  - ${job.title}`)
      .join('\n');
    sections.push(`[${keyword}]\n${jobLines}`);
  }

  return sections.join('\n\n');
}

/**
 * ニュース記事をフォーマット
 */
function formatNews(articles: NewsArticle[]): string {
  if (articles.length === 0) {
    return '記事なし';
  }

  const zenn = articles.filter((a) => a.source === 'zenn');
  const qiita = articles.filter((a) => a.source === 'qiita');

  const sections: string[] = [];

  if (zenn.length > 0) {
    const zennLines = zenn
      .slice(0, 3)
      .map((a) => `  - ${a.title} (${a.likes})`)
      .join('\n');
    sections.push(`[Zenn]\n${zennLines}`);
  }

  if (qiita.length > 0) {
    const qiitaLines = qiita
      .slice(0, 3)
      .map((a) => `  - ${a.title} (${a.likes})`)
      .join('\n');
    sections.push(`[Qiita]\n${qiitaLines}`);
  }

  return sections.join('\n\n');
}

/**
 * エラーをフォーマット
 */
function formatErrors(result: BatchResult): string {
  const errors: string[] = [];

  if (!result.calendar.success && result.calendar.error) {
    errors.push(result.calendar.error);
  }
  if (!result.jobs.success && result.jobs.error) {
    errors.push(result.jobs.error);
  }
  if (!result.news.success && result.news.error) {
    errors.push(result.news.error);
  }

  // 部分的なエラーも含む
  if (result.calendar.success && result.calendar.error) {
    errors.push(`(部分) ${result.calendar.error}`);
  }
  if (result.jobs.success && result.jobs.error) {
    errors.push(`(部分) ${result.jobs.error}`);
  }
  if (result.news.success && result.news.error) {
    errors.push(`(部分) ${result.news.error}`);
  }

  return errors.length > 0 ? errors.join('\n') : '';
}

/**
 * バッチ結果からLINEメッセージを生成
 */
export function formatBatchResult(result: BatchResult): string {
  const sections: string[] = [];

  // ヘッダー
  sections.push(`日時通知 ${getCurrentDateTime()}`);
  sections.push('─'.repeat(20));

  // 今日の予定
  sections.push('【今日の予定】');
  sections.push(formatCalendarEvents(result.calendar.data || []));
  sections.push('');

  // 案件情報
  sections.push('【案件情報】');
  sections.push(formatJobs(result.jobs.data || []));
  sections.push('');

  // ニュース
  sections.push('【Tech News】');
  sections.push(formatNews(result.news.data || []));

  // エラーがあれば追加
  const errorSection = formatErrors(result);
  if (errorSection) {
    sections.push('');
    sections.push('【エラー】');
    sections.push(errorSection);
  }

  let message = sections.join('\n');

  // 文字数制限対応
  if (message.length > MAX_MESSAGE_LENGTH) {
    message = message.slice(0, MAX_MESSAGE_LENGTH - 50) + '\n\n...(省略)';
  }

  return message;
}
