// scripts/sendLine.ts

import fetch from "node-fetch"; // Node 18以上なら不要です

// ここでメッセージを定義
const message = "Hello World";

async function sendLineNotify(msg: string) {
  const token = process.env.LINE_TOKEN;
  if (!token) {
    console.error("LINE_TOKEN が設定されていません");
    process.exit(1);
  }

  const res = await fetch("https://notify-api.line.me/api/notify", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ message: msg }),
  });

  if (res.ok) {
    console.log("LINEに送信成功！");
  } else {
    console.error("LINE送信失敗:", res.status, await res.text());
  }
}

sendLineNotify(message);
