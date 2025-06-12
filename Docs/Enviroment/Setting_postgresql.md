## DBの定義情報
(1) docker-compose.ymlに記載

```yaml
  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: demo_app
      POSTGRES_USER: code_works
      POSTGRES_PASSWORD: P@ssCORD
    ports:
      - "54320:5432"
    networks:
      - app-network
```
※ portsの左がホストIP

(2) DBeaverへの接続方法
```yaml
Host: localhost
接続ポート: 54320
ユーザー名: postgres
パスワード: P@ssCORD
```

(3) ダンプファイルの取得およびロード
後日検討
