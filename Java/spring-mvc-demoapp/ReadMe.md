## SpringBoot MVCの学習（2024年9月2日）

ルーティングの時のアノテーションを使うにはpomに以下を記述

```bash
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>

```

## Controller
```java
@Controller //Controllerにはアノテーションをつける
public class HelloController {
    @GetMapping("/")
    public String Hello(Model model){
        model.addAttribute("msg", "Hello Spring MVC"); //Viewに渡す:msg 値:Hello Spring MVC
        return "hello";//Views名
    }
}
```

## Views

```html
<!DOCTYPE html>
<html lang="en" xmlns="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Spring MVC</title>
</head>
<body>
    <h1 th:text="${msg}"></h1>
</body>
</html>
```

`xmlns="http://www.thymeleaf.org"` でThymeleaf読み込む
`th:text="${msg}"`でcontrollerで定義したmsgの値を取得して表示する



