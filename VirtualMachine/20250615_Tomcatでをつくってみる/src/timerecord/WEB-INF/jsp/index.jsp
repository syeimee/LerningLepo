<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head>
  <meta charset="UTF-8">
  <title>打刻システム</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 h-screen flex flex-col items-center p-8">

  <div class="bg-white w-full max-w-lg p-4 rounded shadow">
    <div class="bg-sky-400 rounded text-center">
        <h1 id="working_status" class="text-xl text-white w-full font-bold  mb-4">勤怠管理システム</h1>
    </div>

    <div class="flex w-full justify-between">
        <div class="text-center w-60 ">
            <!-- 現在日付 -->
            <div class="text-base  font-mono" id="date">2025年6月25日（水）</div>
            <!-- 現在時刻 -->
            <div class="text-5xl font-mono mt-4" id="clock_hhmm">20:01<span class="text-3xl font-mono" id="clock_ss">11</span></div>
        </div>
        <div>
            <div class="">
                <select id="place" class="border border-gray-400 rounded w-full">
                    <option value="">--勤務場所を選択--</option>
                    <option value="home">在宅勤務</option>
                    <option value="office">オフィス</option>
                </select>
            </div>
            <!-- 打刻ボタン -->
            <div class="flex space-x-4 mb-6 mt-4">
                <button id="btnStart" onclick="workingStart()" class="text-2xl bg-green-500 text-white px-8 py-4 rounded hover:bg-green-300 disabled:bg-gray-400 disabled:cursor-not-allowed">出勤</button>
                <button id="btnEnd" disabled onclick="workingEnd()" class="text-2xl bg-red-500 text-white px-8 py-4 rounded hover:bg-red-300 disabled:bg-gray-400 disabled:cursor-not-allowed">退勤</button>
            </div>
        </div>
    </div>
  </div>
  <div id="modal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden z-50">
  <div class="bg-white rounded-lg p-6 w-80 text-center shadow-xl">
    <p class="mb-8">勤務場所を選択してください。</p>
    <button id="closeModalBtn" onclick="closeModal()" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400">閉じる</button>
  </div>
</div>
  <!-- 履歴 -->
  <div class="bg-white w-full max-w-lg p-4 rounded shadow mt-10">
    <h2 class="text-lg font-bold mb-2">打刻履歴</h2>
    <ul id="history" class="text-sm space-y-1">
      <li>読み込み中...</li>
    </ul>
  </div>

  <script src="js/app.js"></script>
</body>
</html>
