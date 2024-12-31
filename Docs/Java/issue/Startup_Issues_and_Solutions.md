## 問題の概要

Spring Boot アプリケーションを `java -jar target/demo-app-1.0.0.jar` コマンドで実行しようとした際、
以下のエラーが発生した。

```bash
Exception in thread "main" java.lang.NoClassDefFoundError: org/springframework/boot/SpringApplication
Caused by: java.lang.ClassNotFoundException: org.springframework.boot.SpringApplication
```

また、Docker コンテナでアプリケーションを起動しようとした際には、以下のエラーが発生。

```bash
no main manifest attribute, in demo_app.jar
```

## 原因
1. **Jarファイルのマニフェストファイルにメインクラスが指定されていない**
   - `jar` コマンドで確認したところ、JARファイルの `META-INF/MANIFEST.MF` に `Main-Class` 属性が含まれいないことが分かった。この属性がないと、Javaが実行するメインクラスを特定できず、`java -jar` コマンドがこける。

2. **Mavenのビルド設定に問題があった**
   - Mavenの `pom.xml` において、`spring-boot-maven-plugin` の設定が正しく行われていなかったため、JARファイルの再パッケージングが適切に行われていなかった。
 https://stackoverflow.com/questions/54867295/springboot-no-main-manifest-attribute-maven

3. **コンパイラオプションの設定ミス**
   - Mavenのコンパイラプラグインの設定で、古いバージョンのJava（Source option 5）が指定されていたため、コンパイルエラーが発生していた。

## 解決策
1. **`pom.xml` の修正**
   - `pom.xml` の `spring-boot-maven-plugin` に `repackage` ゴールを追加し、正しいメインクラスを指定することで、JARファイルに正しくメインクラスが含まれるようにしました。

   ```xml
   <build>
       <plugins>
           <plugin>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-maven-plugin</artifactId>
               <version>${spring-boot.version}</version>
               <configuration>
                   <mainClass>com.example.demoapp.Demo</mainClass>
               </configuration>
               <executions>
                   <execution>
                       <goals>
                           <goal>repackage</goal>
                       </goals>
                   </execution>
               </executions>
           </plugin>
       </plugins>
   </build>


コンパイラオプションの修正
Mavenのコンパイラプラグインで、正しいJavaバージョン（Java 17）を指定するように設定。

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <source>${java.version}</source>
                <target>${java.version}</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```

Docker環境でのビルドと起動
docker-compose up --build コマンドを使用して、Docker環境でのビルドと再起動を行い、設定を反映させる。

## まとめ
JARファイルのマニフェストファイルに Main-Class 属性が不足していたことが主要な原因。
pom.xml の設定を修正し、コンパイラオプションを更新することで、問題が解決。