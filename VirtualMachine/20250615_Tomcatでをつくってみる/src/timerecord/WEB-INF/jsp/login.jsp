<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
  <head>
    <title>TimeRecord</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h1 class="text-4xl font-bold text-center text-sky-400 mb-6">Time Record</h1>

      <form method="post" action="/timerecord/login" class="space-y-4">
        <div>
          <label class="block text-sky-400">ユーザー名</label>
          <input type="text" name="username" class="w-full border border-sky-400 p-2 rounded" />
        </div>
        <div>
          <label class="block text-sky-400">パスワード</label>
          <input type="password" name="password" class="w-full border border-sky-400 p-2 rounded" />
        </div>
        <div class="flex justify-center">
          <input type="submit" value="ログイン" class="w-60 bg-sky-400 text-white p-2 rounded hover:bg-sky-300" />
        </div>

        <div class="flex justify-center">
          <% if (request.getAttribute("errorMessage") != null) { %>
            <p class="text-red-500 text-sm"><%= request.getAttribute("errorMessage") %></p>
          <% } %>
        </div>
      </form>
    </div>
  </body>
</html>
