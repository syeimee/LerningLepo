<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head><title>ログイン</title></head>
<body>
<h2>ログイン</h2>
<form action="login" method="post">
  ユーザー名：<input type="text" name="username" required>
  <button type="submit">ログイン</button>
</form>
<c:if test="${not empty errorMsg}">
  <p style="color:red">${errorMsg}</p>
</c:if>
</body>
</html>
