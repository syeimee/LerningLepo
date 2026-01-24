// nitter.net スクレイピングモジュール
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import type { JobResult, DataSourceResult, Config } from './types';

/**
 * nitterインスタンスから検索結果を取得
 */
async function searchNitter(
  instance: string,
  keyword: string,
  maxResults: number
): Promise<JobResult[]> {
  const encodedKeyword = encodeURIComponent(keyword);
  const url = `${instance}/search?f=tweets&q=${encodedKeyword}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const results: JobResult[] = [];

    // nitterの検索結果をパース
    $('.timeline-item').each((_, element) => {
      if (results.length >= maxResults) return false;

      const $item = $(element);
      const tweetContent = $item.find('.tweet-content').text().trim();
      const tweetLink = $item.find('.tweet-link').attr('href');
      const timestamp = $item.find('.tweet-date a').attr('title') || '';

      if (tweetContent && tweetLink) {
        results.push({
          keyword,
          title: tweetContent.slice(0, 100) + (tweetContent.length > 100 ? '...' : ''),
          url: `${instance}${tweetLink}`,
          date: timestamp,
        });
      }
    });

    return results;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * 複数インスタンスでフォールバック検索
 */
async function searchWithFallback(
  instances: string[],
  keyword: string,
  maxResults: number
): Promise<JobResult[]> {
  for (const instance of instances) {
    try {
      const results = await searchNitter(instance, keyword, maxResults);
      if (results.length > 0) {
        return results;
      }
    } catch (error) {
      console.warn(`${instance} failed for "${keyword}":`, error instanceof Error ? error.message : error);
      // 次のインスタンスを試行
    }
  }
  return [];
}

/**
 * 設定に基づいて案件検索を実行
 */
export async function searchJobs(config: Config): Promise<DataSourceResult<JobResult[]>> {
  const allResults: JobResult[] = [];
  const errors: string[] = [];

  const enabledSearches = config.jobSearches.filter((s) => s.enabled);

  for (const search of enabledSearches) {
    for (const keyword of search.keywords) {
      try {
        const results = await searchWithFallback(
          config.nitterInstances,
          keyword,
          config.maxResultsPerSearch
        );
        allResults.push(...results);
      } catch (error) {
        const message = error instanceof Error ? error.message : '不明なエラー';
        errors.push(`${keyword}: ${message}`);
      }
    }
  }

  // 重複除去（URLベース）
  const uniqueResults = allResults.filter(
    (result, index, self) => index === self.findIndex((r) => r.url === result.url)
  );

  if (uniqueResults.length > 0) {
    return {
      success: true,
      data: uniqueResults,
      error: errors.length > 0 ? errors.join(', ') : undefined,
    };
  }

  if (errors.length > 0) {
    return {
      success: false,
      error: `案件検索失敗: ${errors.join(', ')}`,
    };
  }

  return {
    success: true,
    data: [],
  };
}
