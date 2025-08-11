// HelloWorld.java
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.*;

public class HelloWorld extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<h1>Hello, Syeimee!</h1>");
    }
}
