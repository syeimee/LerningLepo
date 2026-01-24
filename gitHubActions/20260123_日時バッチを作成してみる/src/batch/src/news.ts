// Zenn/Qiita記事取得モジュール
import fetch from 'node-fetch';
import type { NewsArticle, DataSourceResult, Config } from './types';

/** Zenn APIレスポンスの型 */
interface ZennArticle {
  title: string;
  path: string;
  user: { username: string };
  liked_count: number;
}

interface ZennResponse {
  articles: ZennArticle[];
}

/** Qiita APIレスポンスの型 */
interface QiitaArticle {
  title: string;
  url: string;
  user: { id: string };
  likes_count: number;
}

/**
 * Zennのトレンド記事を取得
 */
async function fetchZennArticles(maxArticles: number): Promise<NewsArticle[]> {
  const response = await fetch(
    `https://zenn.dev/api/articles?order=trending&count=${maxArticles}`
  );

  if (!response.ok) {
    throw new Error(`Zenn API error: ${response.status}`);
  }

  const data = (await response.json()) as ZennResponse;

  return data.articles.slice(0, maxArticles).map((article) => ({
    title: article.title,
    url: `https://zenn.dev${article.path}`,
    author: article.user.username,
    likes: article.liked_count,
    source: 'zenn' as const,
  }));
}

/**
 * Qiitaのトレンド記事を取得
 */
async function fetchQiitaArticles(maxArticles: number): Promise<NewsArticle[]> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Qiitaトークンがあればレート制限が緩和される
  const qiitaToken = process.env.QIITA_ACCESS_TOKEN;
  if (qiitaToken) {
    headers['Authorization'] = `Bearer ${qiitaToken}`;
  }

  const response = await fetch(
    `https://qiita.com/api/v2/items?per_page=${maxArticles}&query=stocks:>10`,
    { headers }
  );

  if (!response.ok) {
    throw new Error(`Qiita API error: ${response.status}`);
  }

  const data = (await response.json()) as QiitaArticle[];

  return data.slice(0, maxArticles).map((article) => ({
    title: article.title,
    url: article.url,
    author: article.user.id,
    likes: article.likes_count,
    source: 'qiita' as const,
  }));
}

/**
 * ニュース記事を取得（Zenn + Qiita）
 */
export async function getNewsArticles(
  config: Config['news']
): Promise<DataSourceResult<NewsArticle[]>> {
  const articles: NewsArticle[] = [];
  const errors: string[] = [];

  // Zenn取得
  if (config.zenn.enabled) {
    try {
      const zennArticles = await fetchZennArticles(config.zenn.maxArticles);
      articles.push(...zennArticles);
    } catch (error) {
      const message = error instanceof Error ? error.message : '不明なエラー';
      errors.push(`Zenn: ${message}`);
    }
  }

  // Qiita取得
  if (config.qiita.enabled) {
    try {
      const qiitaArticles = await fetchQiitaArticles(config.qiita.maxArticles);
      articles.push(...qiitaArticles);
    } catch (error) {
      const message = error instanceof Error ? error.message : '不明なエラー';
      errors.push(`Qiita: ${message}`);
    }
  }

  // 部分的な成功も許容
  if (articles.length > 0) {
    return {
      success: true,
      data: articles,
      error: errors.length > 0 ? errors.join(', ') : undefined,
    };
  }

  if (errors.length > 0) {
    return {
      success: false,
      error: `ニュース取得失敗: ${errors.join(', ')}`,
    };
  }

  return {
    success: true,
    data: [],
  };
}
