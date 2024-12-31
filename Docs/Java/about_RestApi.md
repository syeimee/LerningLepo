## 1. プロジェクト概要

このプロジェクトは、フロントエンド（React）とバックエンド（Spring Boot）を組み合わせたアプリケーションで、バックエンドの API からデータを取得し、フロントエンドで表示する仕組みを取っている。

## 2. バックエンド設定

### 2.1 Spring Boot アプリケーションの設定

バックエンドは Spring Boot を使って構築している。基本的な設定ファイルとコードの例は以下の通りになる。

#### `Demo.java`

```java
package com.example.demoapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class Demo {

    public static void main(String[] args) {
        SpringApplication.run(Demo.class, args);
    }
}

@RestController
class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }
}
```
CORS設定を追加して、フロントエンドからのリクエストを許可する。
#### `application.properties`

```
spring.mvc.cors.allowed-origins=http://localhost:3000
```
CORSについては以下を参照
https://qiita.com/Hirohana/items/9b5501c561954ad32be7

### 2.2 Docker設定
Dockerでのビルドと実行に関する設定も行う。

#### `Dockerfile`
```dockerfile
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:17-jre-focal
WORKDIR /app
COPY --from=build /app/target/demo-app-1.0.0.jar ./demo_app.jar
ENTRYPOINT ["java", "-jar", "demo_app.jar"]
```
#### `docker-compose.yml`
```yaml
version: '3.8'
services:
  backend:
    build:
      context: ./backend
    ports:
      - "8080:8080"
  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:3000"
```

## 3. フロントエンド設定
#### 3.1 React アプリケーションの設定
フロントエンドは React を使っている。APIからデータを取得し、表示するためのコードの例は以下の通りだ。

#### `App.ts`
```ts
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        axios.get('http://localhost:8080/hello')  // ローカルホストの URL を使用
            .then(response => {
                console.log('Response data:', response.data);
                setMessage(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="App">
            <h1>{message}</h1>
            <h1>これはテストです</h1>
        </div>
    );
}

export default App;
```

### 3.2 ビルドとデプロイ
ビルド後に静的ファイルをデプロイするためのコマンド

```bash
npm run build
```

## 4. トラブルシューティング
#### 4.1 CORSエラー
フロントエンドからバックエンドの API にアクセスする際に CORS エラーが発生する場合、バックエンドの application.properties に CORS 設定を追加して対応。

#### 4.2 Docker関連の問題
Docker コンテナ内での通信に関する問題が発生した場合、localhost と backend の違い注意し、適切なホスト名やポートを使用することが重要。

### 5. 参考リンク
[Create React App](https://create-react-app.dev/)
[Spring Boot Documentation](https://spring.io/projects/spring-boot)