package servlet;

import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import javax.json.*;

public class SequencerServlet extends HttpServlet {

  // メモリ上の保存データ（ユーザー名 → JSON文字列）
  private static final java.util.Map<String, String> dataStore = new java.util.concurrent.ConcurrentHashMap<>();

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    HttpSession session = req.getSession(false);
    if(session == null || session.getAttribute("username") == null) {
      resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }
    String username = (String) session.getAttribute("username");
    String json = dataStore.getOrDefault(username, "{}");
    resp.setContentType("application/json;charset=UTF-8");
    resp.getWriter().write(json);
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    HttpSession session = req.getSession(false);
    if(session == null || session.getAttribute("username") == null) {
      resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }
    String username = (String) session.getAttribute("username");

    // JSONをリクエストボディから読み込み
    StringBuilder sb = new StringBuilder();
    try(BufferedReader reader = req.getReader()) {
      String line;
      while((line = reader.readLine()) != null) {
        sb.append(line);
      }
    }
    String json = sb.toString();

    // 簡単にバリデーション（空なら無視）
    if(json == null || json.trim().isEmpty()) {
      resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }

    // 保存
    dataStore.put(username, json);

    resp.setStatus(HttpServletResponse.SC_OK);
  }
}
