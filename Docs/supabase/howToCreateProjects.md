# 参考
Angular/angular-project
# supabaseでのプロジェクト作成
- ユーザー作成を行う
- Create a new projectより設定を行う。i+*h+En*yci5Xs?
DatabasePasswordを設定することDBツールから直接接続できる

# smtpの設定
- アプリパスワードを設定する。(生成アプリパス　gubi vfkh qogi wrrv)

# supabaseの設定
- project-settings→authentication→smtp settingsよりenable custom smtpを有効にする
- sender detailsに以下を入力
・ sender email: noreply@yourdomain.com
・ sender name: Supabase
- smtp provider settingsに以下を入力
・host: smtp.gmail.com
・port number 587
・Minimum interval between emails being sent　10

# 設定の確認
- authentication→Usersのadd userよりsend invitationを選択

# 接続例
Angularアプリの場合
src/envrionments/envrionments.tsに以下の内容を設定

```ts
export const environment = {
    supabaseUrl: 'https://emzrskxkwaijkriicyox.supabase.co',
    supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtenJza3hrd2FpamtyaWljeW94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NjcyMjksImV4cCI6MjA2NDI0MzIyOX0.vjUMxlT6ghsaB7p9EKLf-bTkTegWWBWg6ExueSd9YJ4',
    signUpRedirectUrl: 'http://localhopst:4200/login',
    resetPasswordRedirectUrl: 'http://localhopst:4200/reset-password'
}


```

# バックエンド側のプロジェクト設定

https://start.spring.io/

<img src='./スクリーンショット 2025-05-31 15.24.01.png'>

Angular/spring-project/src/main/resources/application.ymlに以下の内容を設定


```yaml
spring:
    application:
        name: spring-project
    detasource:
        url: jdbc:postgresql://db.emzrskxkwaijkriicyox.supabase.co:5432/postgres
        username: posetgres
        password: i+*h+En*yci5Xs?　//本来は環境変数で指定
    jpa:
        properties:
            hibernate:
                dualect: org.hibernate.dialect.PostgreSQLDialect //sqlを最適化する
```