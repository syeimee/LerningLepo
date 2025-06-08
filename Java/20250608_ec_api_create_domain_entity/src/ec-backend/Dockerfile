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
ENTRYPOINT ["java", "-jar", "app.jar","-Dflyway.migrate=true"]
