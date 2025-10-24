import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class LoginServlet extends HttpServlet {

    // CASE:ログインフォームを表示（GET）
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        //login.jspにdispachして、req,resを転送forwardする
        req.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(req, res);
    }

    // CASE:ログイン認証を処理（POST）
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        
        //jspからusername,passwordをパラメータでうけとる
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        //ログイン認証
        if ("admin".equals(username) && "xxxx".equals(password)) {
            //welcome.jspにdispachして、req,resを転送forwardする
            req.getRequestDispatcher("/WEB-INF/jsp/index.jsp").forward(req, res);
        } else {
            //だめだったら、メッセージを表示
            req.setAttribute("errorMessage", "ログイン情報が正しくありません。");
            req.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(req, res);
        }
    }
}
