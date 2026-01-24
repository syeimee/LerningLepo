// Googleカレンダー連携モジュール
import { google } from 'googleapis';
import type { CalendarEvent, DataSourceResult } from './types';

/**
 * Service Account認証でGoogleカレンダーに接続
 */
async function getCalendarClient() {
  const keyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyBase64) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY が環境変数に設定されていません');
  }

  const keyJson = JSON.parse(Buffer.from(keyBase64, 'base64').toString('utf-8'));

  const auth = new google.auth.GoogleAuth({
    credentials: keyJson,
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  });

  return google.calendar({ version: 'v3', auth });
}

/**
 * 当日の予定を取得
 */
export async function getTodayEvents(): Promise<DataSourceResult<CalendarEvent[]>> {
  try {
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    const calendar = await getCalendarClient();

    // 日本時間の今日の開始と終了を取得
    const now = new Date();
    const jstOffset = 9 * 60 * 60 * 1000; // JST is UTC+9
    const jstNow = new Date(now.getTime() + jstOffset);

    const todayStart = new Date(jstNow);
    todayStart.setUTCHours(0, 0, 0, 0);
    todayStart.setTime(todayStart.getTime() - jstOffset);

    const todayEnd = new Date(jstNow);
    todayEnd.setUTCHours(23, 59, 59, 999);
    todayEnd.setTime(todayEnd.getTime() - jstOffset);

    const response = await calendar.events.list({
      calendarId,
      timeMin: todayStart.toISOString(),
      timeMax: todayEnd.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events: CalendarEvent[] = (response.data.items || []).map((event) => ({
      title: event.summary || '(タイトルなし)',
      startTime: event.start?.dateTime || event.start?.date || '',
      endTime: event.end?.dateTime || event.end?.date || undefined,
      location: event.location || undefined,
    }));

    return {
      success: true,
      data: events,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : '不明なエラー';
    console.error('Googleカレンダー取得エラー:', message);
    return {
      success: false,
      error: `Googleカレンダー: ${message}`,
    };
  }
}
