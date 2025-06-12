# 学習テーマ  
作業日時: 2025-06-07

## 目的・背景  
開発＋＋依頼の [API開発](https://github.com/syeimee/ec-backend) プロジェクトの初期設定および環境構築を行う。

## 実装内容・学んだ技術  
- Spring Boot プロジェクト作成（Spring Initializr利用）  
- application.yml / application.properties 設定  
- Dockerfile作成（マルチステージビルド適用）  
- MySQLコンテナの起動とDBeaver接続設定

### 発生した問題と解決策

#### 1. MySQL接続時の「Public Key Retrieval is not allowed」エラー  
- **問題**: JDBC接続時に「Public Key Retrieval is not allowed」が発生。  
- **解決**: JDBC URLに `allowPublicKeyRetrieval=true` を追加。

#### 2. ポート3306の競合問題  
- **問題**: ホストの3306ポートがローカルMySQLで使用中のため、MySQLコンテナが起動できない。  
- **解決**:  
  - macOSでは `systemctl` 使えないため、`brew services stop mysql` でローカルMySQL停止。  
  - またはDockerのポートマッピングを `"3307:3306"` など別ポートに変更。

#### 3. mvn clean 実行時のファイル見つからないエラー  
- **問題**: マルチステージビルド無しでビルドした際に `mvn clean` がエラーになる。  
- **解決**: マルチステージビルドを使い、ビルド用環境（JDKやMavenが揃ったステージ）でコマンドを実行。  
  役割ごとに環境を分けることでビルド環境の整合性を確保し、エラー解消。


### 具体例（Spring Boot + Maven）
```dockerfile
# ===================================
# マルチステージビルドのDockerfile
# 目的: 開発に必要なMaven環境と、本番用の軽量な実行環境を分ける
# ===================================

# -----------------------------------
# 第1ステージ: ビルド専用の環境
# MavenとJDKが入ったイメージを使う
# -----------------------------------
FROM maven:3.9.4-eclipse-temurin-21 AS build

# 作業ディレクトリを /app に設定（以降の作業パスになる）
WORKDIR /app

# Mavenの設定ファイル（pom.xml）とソースコードをコンテナ内にコピー
COPY pom.xml .
COPY src ./src

# 依存関係をダウンロードし、プロジェクトをビルドして実行ファイル（.jar）を作る
# -DskipTests をつけるとテストをスキップし、ビルド時間を短縮できる
RUN mvn package -DskipTests


# -----------------------------------
# 第2ステージ: 実行専用の環境（軽量）
# ビルドしたjarファイルだけを使って、Javaでアプリを起動する
# -----------------------------------
FROM eclipse-temurin:21-jre

# 本番用の作業ディレクトリ（中身はjarと起動コマンドだけ）
WORKDIR /app

# 第1ステージのビルド成果物（.jarファイル）をコピー
COPY --from=build /app/target/*.jar app.jar

# アプリ起動コマンドを定義（jarファイルをJavaで実行）
ENTRYPOINT ["java", "-jar", "app.jar"]

```

### docker-compose.yml

```yaml
# ===========================================
# docker-compose.yml（複数コンテナを一括管理）
# ===========================================

version: '3.8'  # 使用するComposeファイルのバージョン

services:
  # -------------------------
  # MySQL データベースコンテナ
  # -------------------------
  db:
    image: mysql:8.0  # 使用するMySQLのバージョン
    container_name: ec_app-mysql  # コンテナ名
    restart: always  # コンテナが停止しても常に再起動する
    environment:
      MYSQL_ROOT_PASSWORD: rootpass     # rootユーザーのパスワード
      MYSQL_DATABASE: ec_db             # 作成する初期データベース名
      MYSQL_USER: user                  # 通常ユーザー名
      MYSQL_PASSWORD: userpass          # 通常ユーザーのパスワード
    ports:
      - "3306:3306"  # ホストの3306ポートをMySQLに割り当て（ポートが競合しないよう注意）
    volumes:
      - ./mysql-data:/var/lib/mysql  # データ永続化（ローカルにMySQLデータを保存）

  # -------------------------
  # Spring Boot アプリケーション
  # -------------------------
  api:
    build:
      context: ./ec-backend      # Dockerfile のあるディレクトリパス
      dockerfile: Dockerfile    # 使用するDockerfile名
    container_name: ec-backend   # コンテナ名
    depends_on:
      - db  # db コンテナが起動してからapiを起動する
    ports:
      - "8080:8080"  # Spring Bootのポートをホストに公開
    environment:
      # Spring Boot にMySQL接続情報を環境変数として渡す
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/ec_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
      SPRING_DATASOURCE_USERNAME: user
      SPRING_DATASOURCE_PASSWORD: userpass

```


---

## 課題・問題点  
- 環境構築に時間がかかった
Docker環境でMySQLがうまく起動しない・ポート競合により初期トラブルが多かった。

- マルチステージビルドの概念理解に少し時間がかかった
「開発用と実行用の環境を分ける」という目的が明確になると理解が進んだ。


## 気づき・改善案  
- 環境変数は.env ファイルで環境変数を一元管理する



