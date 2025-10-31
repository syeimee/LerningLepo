# 学習テーマ
作業日時: 2025-06-12


## 目的・背景 
ubuntuでapache tomcatを入れて簡単なアプリを作ってみる



## 実装内容・学んだ技術  
- apache tomcatのディレクトリ構造

①マッピングの定義をする

`webapps/アプリ名/WEB-INF/web.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
                             https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
         version="5.0">

  <servlet>
    <servlet-name>HelloWorld</servlet-name>
    <servlet-class>HelloWorld</servlet-class>
  </servlet>

  <servlet-mapping>
    <servlet-name>HelloWorld</servlet-name>
    <url-pattern>/hello</url-pattern>
  </servlet-mapping>

</web-app>
```

基本テンプレート
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
                             https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
         version="5.0">


</web-app>
```

HelloWorld.class を「HelloWorldという名前のサーブレット」として登録する
```xml
<servlet>
    <servlet-name>HelloWorld</servlet-name>
    <servlet-class>HelloWorld</servlet-class>
</servlet>
```

/hello というURLにアクセスされたとき、
servlet-name が "HelloWorld" というサーブレットに処理を任せる（つまり HelloWorld.class を呼ぶ）。
```xml
<servlet-mapping>
  <servlet-name>HelloWorld</servlet-name>
  <url-pattern>/hello</url-pattern>
</servlet-mapping>
```
---
②マッピングにより呼び出されるクラスの定義を行う

`webapp/アプリ名/HelloWorld.java`

```java
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
```

クライアント（ブラウザ）に送るデータの「種類（MIMEタイプ）」を指定。
"text/html" は「このレスポンスはHTMLの文章ですよ」という意味

```java
response.setContentType("text/html");
```

クライアントへ文字データを書き込むための「書き込み用ストリーム（PrintWriter）」を取得。
これを通じて、Javaの文字列をブラウザに送ることができる。

```java
PrintWriter out = response.getWriter();
```

HTMLのタグ付き文字列 `<h1>Hello, Syeimee!</h1>` をブラウザに送る

```java
out.println("<h1>Hello, Syeimee!</h1>");
```

コンパイルをしておく
```bash
javac -cp /home/syeimee/apache-tomcat-10.1.24/lib/servlet-api.jar -d WEB-INF/classes HelloWorld.java
```

`-cp`: class-pathオプション

HelloWorld.javaをWEB-INF/classesにコンパイルする

- 起動確認
```bash
http://localhost:8080/demoapp/hello
```
でHello, Syeimee!が表示されればいいのじゃ！



## 課題・問題点  




## 気づき・改善案  
- Tomcatのディレクトリ構造

```bash
webapps/
└─ demoapp/
   ├─ WEB-INF/
   │   ├─ classes/
   │   │   └─ HelloWorld.class (またはパッケージフォルダ以下)
   │   └─ web.xml
   └─ その他のリソース（HTML, CSSなど）

```

- パッケージ名について
Javaではパッケージ名つけてね

```java
package com.syeimee.demo;
```

```xml
<servlet>
    <servlet-name>HelloWorld</servlet-name>
    <servlet-class>com.syeimee.demo.HelloWorld</servlet-class>
</servlet>
```

コンパイルコマンド
```bash
javac -cp /home/syeimee/apache-tomcat-10.1.24/lib/servlet-api.jar -d WEB-INF/classes com/syeimee/demo/HelloWorld.java
```
