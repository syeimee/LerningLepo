# 学習テーマ
作業日時: 2025-06-08


## 目的・背景 
開発＋＋依頼の [API開発](https://github.com/syeimee/ec-backend) Entityクラスの実装およびRepositoryの作瀬


## 実装内容・学んだ技術
- Flywayによるマイグレーションおよびテストデータの注入
```
/backend
├── src
│   └── main
│       └── resources
│           └── db
│               └── migration
│                   ├── V1__init_schema.sql
│                   └── V2__insert_test_data.sql
├── Dockerfile
├── application.yml
docker-compose.yml
```
V1__init_schema.sqlにCREATE TABLEを記載
```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL, -- 最大10桁でそのうち小数点以下が２桁　最大値　99999999.99
    stock_quantity INT NOT NULL,
    category_id INT NOT NULL,
    producer_id INT NOT NULL,
    created_at DATETIME NOT NULL,　-- アプリケーション側の@CreationTimestampを使用するなら
    updated_at DATETIME NOT NULL　-- アプリケーション側の@UpdateTimestampを使用するなら
);


```

flywayの設定

application.yml
```yaml
  flyway:
    enabled: true # Flyway を有効にする
    locations: classpath:db/migration #Flyway を有効にする
    baseline-on-migrate: true  # 既存の DB に対して最初のマイグレーションを実行するための設定
    clean-disabled: false      # flyway clean で DB 全体を削除できるようになります（開発環境のみ推奨）
```

ビルドしてもflywayが実行されない。
※ Dockerfile に `ENTRYPOINT ["-Dflyway.migrate=true"]` を追加したが、Spring Bootの自動マイグレーション機能があるため不要だった。
どうやら、マイグレーションファイルには命名規則がありそう。
`V1_create_user.sql`では読み込まれない
正しくは`V1__create_user.sql`（半角アンダーバー２つ）

依存関係も設定が必要。
```xml
<properties>
	<java.version>21</java.version>
	<flyway.version>8.5.10</flyway.version>
</properties>
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
    <version>${flyway.version}</version>
</dependency>
```
これでやってみたがどうやらmysql8.0のサポート外だと怒られる

以下のように設定した結果、正しくマイグレーションできた。

```xml
<properties>
	<java.version>21</java.version>
	<flyway.version>8.5.10</flyway.version>
</properties>
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-mysql</artifactId>
    <version>${flyway.version}</version>
</dependency>
```
flyway-mysqlはmysql専用に拡張されたものらしい。
※ Flyway 7以降では、MySQL対応のために `flyway-mysql` モジュールが必須


## 課題・問題点  
- DBのタイムスタンプとAPのタイムスタンプどちらを使用するか吟味する必要がある

| 方針                                                  | 利点              | 懸念                |
| --------------------------------------------------- | --------------- | ----------------- |
| DBの `DEFAULT CURRENT_TIMESTAMP` を使用                 | 一貫性、パフォーマンス     | アプリ層で制御がしにくい      |
| アプリ側の `@CreationTimestamp` / `@UpdateTimestamp` を使用 | 単体テストやMockがしやすい | 時刻のズレ（特に複数インスタンス） |



## 気づき・改善案  
- FlywayのSQLファイル名には `V1__xxx.sql` のようにアンダースコア2つが必須（命名規則に厳密）
- Spring Bootでは `application.yml` の設定だけでFlywayは自動実行される
- `flyway-mysql` の追加がMySQL対応に必須（Flyway 7以降）




