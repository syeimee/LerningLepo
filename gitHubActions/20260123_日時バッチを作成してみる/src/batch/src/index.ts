// メインエントリポイント（オーケストレーター）
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import type { Config, BatchResult } from './types';
import { getTodayEvents } from './googleCal';
import { searchJobs } from './xSearch';
import { getNewsArticles } from './news';
import { formatBatchResult } from './line';
import { sendLineMessage } from './sendLine';

/**
 * 設定ファイルを読み込む
 */
function loadConfig(): Config {
  const configPath = path.join(__dirname, '../config/job-search.yml');
  const configContent = fs.readFileSync(configPath, 'utf-8');
  return yaml.load(configContent) as Config;
}

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
    second: '2-digit',
  });
}

/**
 * メイン処理
 */
async function main(): Promise<void> {
  console.log('バッチ処理を開始します...');
  console.log(`実行時刻: ${getCurrentDateTime()}`);

  try {
    // 設定読み込み
    const config = loadConfig();
    console.log('設定ファイルを読み込みました');

    // 全データソースを並列実行（Promise.allSettled）
    const [calendarResult, jobsResult, newsResult] = await Promise.allSettled([
      getTodayEvents(),
      searchJobs(config),
      getNewsArticles(config.news),
    ]);

    // 結果を整形
    const batchResult: BatchResult = {
      calendar:
        calendarResult.status === 'fulfilled'
          ? calendarResult.value
          : { success: false, error: `カレンダー取得エラー: ${calendarResult.reason}` },
      jobs:
        jobsResult.status === 'fulfilled'
          ? jobsResult.value
          : { success: false, error: `案件検索エラー: ${jobsResult.reason}` },
      news:
        newsResult.status === 'fulfilled'
          ? newsResult.value
          : { success: false, error: `ニュース取得エラー: ${newsResult.reason}` },
      executedAt: getCurrentDateTime(),
    };

    // 結果をログ出力
    console.log('データ取得結果:');
    console.log(`  カレンダー: ${batchResult.calendar.success ? '成功' : '失敗'} (${batchResult.calendar.data?.length || 0}件)`);
    console.log(`  案件検索: ${batchResult.jobs.success ? '成功' : '失敗'} (${batchResult.jobs.data?.length || 0}件)`);
    console.log(`  ニュース: ${batchResult.news.success ? '成功' : '失敗'} (${batchResult.news.data?.length || 0}件)`);

    // メッセージをフォーマット
    const message = formatBatchResult(batchResult);
    console.log('メッセージを生成しました');

    // LINEに送信
    await sendLineMessage(message);
    console.log('バッチ処理が正常に完了しました');

    process.exit(0);
  } catch (error) {
    console.error('バッチ処理でエラーが発生しました:', error);
    process.exit(1);
  }
}

// スクリプト実行
main();
