# 学習テーマ
作業日時: 2025-06-14


## 目的・背景 
開発＋＋依頼の [API開発](https://github.com/syeimee/ec-backend) Entityクラスの実装およびRepositoryの作瀬


## 実装内容・学んだ技術  
- 仮想コンテナの時刻を日本標準時に変更する

日本の標準時(JST)を表すZoneIdオブジェクトを作成する
```java
ZoneId.of(String zoneId)
```

ZoneId.of("Asia/Tokyo") により、タイムゾーンを明示的に日本時間に固定できる。
LocalDateTime.now() だけだと、Docker等の環境によってはUTC になる場合があるため、ZoneId を使うのが安全。

```java
ZoneId timeZone = ZoneId.of("Asia/Tokyo");
System.out.println(timeZone); //Asia/Tokyo
LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Tokyo"));
System.out.println(now);//2025-06-15T07:40:55.393611
```

## 課題・問題点  
- 現時点では、Dockerコンテナ側の時刻がUTCに設定されていたため、ログやDB保存時刻がズレてしまう可能性があった。
- application.properties や DBのタイムゾーン設定にも注意が必要（未対応）。


## 気づき・改善案  
- Javaコード側で ZoneId を使うだけでなく、コンテナの起動時に TZ=Asia/Tokyo を環境変数として指定することで、OSレベルでの時刻ズレも防げる。
- DB（MySQL等）にも --default-time-zone='+09:00' のような設定を追加するべき。
- タイムゾーンが関係するアプリケーションでは、日時保存時の統一ルール（例：UTCで保存・JSTで表示）を最初に決めておくとよい。

