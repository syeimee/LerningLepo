<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
  <body>
    <h1>ログイン</h1>
    <form method = "post" action = "/sequencer/login">
      ユーザー名：<input type = "text" name = "username"><br>
      パスワード：<input type = "password" name = "password"><br>
      <input type = "submit" value = "ログイン">

      <% if (request.getAttribute("errorMessage") != null) { %>
        <p style="color: red;"><%= request.getAttribute("errorMessage") %></p>
      <% } %>
    </form>
  </body>
</html>