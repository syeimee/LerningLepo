// scripts/sendLine.ts
// LINE Messaging API を使用したプッシュメッセージ送信

import fetch from "node-fetch";

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
    second: '2-digit'
  });
}

/**
 * LINE Messaging APIでプッシュメッセージを送信
 */
export async function sendLineMessage(msg: string): Promise<void> {
  const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const userId = process.env.LINE_USER_ID;

  if (!channelAccessToken) {
    throw new Error("LINE_CHANNEL_ACCESS_TOKEN が環境変数に設定されていません");
  }

  if (!userId) {
    throw new Error("LINE_USER_ID が環境変数に設定されていません");
  }

  const body = {
    to: userId,
    messages: [
      {
        type: "text",
        text: msg
      }
    ]
  };

  try {
    const res = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${channelAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`LINE送信失敗: ${res.status} - ${errorText}`);
    }

    console.log("LINEに送信成功！");
    console.log(`送信内容: ${msg}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("エラーが発生しました:", error.message);
    } else {
      console.error("予期しないエラーが発生しました:", error);
    }
    throw error;
  }
}

/**
 * メイン処理
 */
async function main(): Promise<void> {
  try {
    const currentTime = getCurrentDateTime();
    const message = `日時通知\n${currentTime}\n\nバッチ処理が正常に実行されました。`;

    await sendLineMessage(message);
    process.exit(0);
  } catch (error) {
    console.error("メイン処理でエラーが発生しました");
    process.exit(1);
  }
}

// スクリプト実行
main();
