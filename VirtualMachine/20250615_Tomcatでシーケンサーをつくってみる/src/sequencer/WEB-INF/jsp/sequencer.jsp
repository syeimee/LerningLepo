<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="javax.servlet.http.HttpSession" %>
<%
  HttpSession session = request.getSession(false);
  String username = (session != null) ? (String)session.getAttribute("username") : null;
  if(username == null) {
    response.sendRedirect("login");
    return;
  }
%>
<html>
<head>
  <title>シーケンサー</title>
  <script src="js/sequencer.js"></script>
</head>
<body>
<h2>ようこそ <%= username %> さん</h2>
<button onclick="logout()">ログアウト</button>
<button onclick="loadSequence()">読み込み</button>
<button onclick="saveSequence()">保存</button>

<!-- ここにシーケンサーUI（例:4パート×16ステップのボタンなど）を実装 -->
<div id="sequencerGrid"></div>

<script>
  // 最初にUIを作る関数呼ぶなど
  createSequencerUI(4, 16);
</script>
</body>
</html>
