package servlet;

import java.io.IOException;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class LoginServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    String username = req.getParameter("username");
    if(username == null || username.trim().isEmpty()) {
      req.setAttribute("errorMsg", "ユーザー名を入力してください");
      req.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(req, resp);
      return;
    }
    // セッションにユーザー名保存
    HttpSession session = req.getSession();
    session.setAttribute("username", username.trim());
    resp.sendRedirect("sequencer");
  }

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // ログイン画面表示
    req.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(req, resp);
  }
}
