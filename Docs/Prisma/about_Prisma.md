# Prismaとは
次世代オープンソースORM

※ ORM（Object Relational Mapping）
　メソッドでSQLを実行することができる。（create(),update(),delete()）

# プロジェクトの作成
- packege.jsonの作成

```bash
npm init
```

- TypeScriptのインストール
```bash
 npm install typescript ts-node @types/node --save-dev 
```
- TypeScriptの設定ファイルであるtsconfig.jsonファイルを作成するためtsc –initコマンドを実行

```bash
 % npx tsc --init

Created a new tsconfig.json with:
                                                                                        TS 
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true

You can learn more at https://aka.ms/tsconfig.json
 
```

- Prismaのインストール(expressとnodemonも合わせて)

```bash
npm install prisma express nodemon @prisma/client
```

インストールが完了するとnpx prismaコマンドを実行することができる
```bash
npx prisma
```

npx prismaを実行するとPrismaで利用できるコマンドのオプションを確認することができる


- Prisma用の設定ファイルを作成する
```bash
npx prisma init
```

実行するとプロジェクトフォルダにはprismaフォルダと.envファイルが作成される

schema.prismaファイルを見るとgeneratorとdatasourceの2つのパートがある

```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
generator clientはschema.prismaファイルの内容を元にデータベースの操作に利用するPrisma Clientを作成するために利用されます。schema.prismaファイルの内容を更新してマイグレーションを実行すると毎回再作成されます(prisma generateコマンドでも作成されます)。作成されたファイルはmode_modulesの./prisma/clientに保存されます。
datasource dbのproviderにデータベースを設定することができます。npx prisma initを実行した際に表示されているメッセージを確認するとpostgresql, mysql, sqlite, sqlserverとPreviewとしてmongodbとcockroachdbがサポートされていることがわかります。デフォルトはpostgresqlが設定されています

以下のように実行することで、datasourceにsqliteが設定された状態でschema.prismaファイルが作成されます
```bash
npx prisma init --datasource-provider sqlite
```

- expressのインストール
バックエンドのサーバーにはexpress.jsを利用するためインストールを行う

```bash
npm install express
```

TS用にExpress.jsの型定義をインストールする

```bash
npm install @types/express --save-dev
```

# DBの設定
SQLiteを利用してみる

- schema.prismaの設定

```js
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

- envファイルの設定
SQLiteの場合はDATABASE_URLにはファイルのパスを設定します。schema.prismaと同じフォルダにdev.dbファイルが作成されます。

```bash
DATABASE_URL="file:./dev.db"
```

- schema.prismaの設定(ｍodelの設定)

データベースにUserテーブルを作成するためデータモデルの定義(Data model Definition)を記述する必要があります。モデルの記述はデフォルトのschema.prismaに存在しないので追加で記述する必要があります。modelの後にテーブル名(User)を指定してフィールドとデータタイプ、フィールドによってオプションを設定します。

```js
model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
}
```
UserモデルとUserテーブルは1対1に対応するためUserテーブルはid, email, nameの列を持つことになります。idはInt型でemailとnameは文字列なのでString型を設定しています。Stringの横に?がついているのはnameはオプションでnullでもいいことを表しています。

@idはSQLiteのようなリレーショナルデータベースではプライマリキーになることを表しています。@defaultはデフォルト値を設定することができ、autoincrement()を引数に設定しているのでデータを追加する度にidの値が自動で加算されます。@uniqueはemail列で一意の値のみ登録することができることを意味します。

autoincrement()が利用されていますが必ずしも数字である必要はなくuuid()を利用することができます。その場合の型はIntではなくStringになります。

# マイグレーションの実行

```bash
npx prisma migrate dev
```

コマンドを実行するとマイグレーションに任意の名前をつける必要があるのでここでは”init”という名前をつけています。

コマンド実行時にも名前をつけることができる
```bash
 npx prisma migrate dev --name init
```
実行が完了するとprismaフォルダの下にmigrationとさらにその中に日付とマイグレーション実行時に入力した名前のついたフォルダが作成されます。そのフォルダの中にはmigration.sqlファイルがありテーブル作成のSQLが保存されています。どのようなSQLを実行してテーブルを作成しているのかわかるのでSQLの学習にも役に立ちます。

`migration.sql`の中身

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
```

データベースに作成されたテーブルへのアクセスはPrisma Studioから行うことができます。Prisma Studioを起動するために”npx prisma sudio”コマンドを実行します。

```bash
npx prisma studio
```

ブラウザが自動で起動しhttp://localhost:5555にアクセスが行われます。画面には設定したUserモデルが表示されます。

# マイグレーションのreset

開発環境であれば作成したテーブルをリセットすることができます。一度テーブルが削除され再作成されます。もしデータが保存されている場合には削除してなくなってしまうので注意してください。

```bash
npx prisma migrate reset
```

# マイグレーションのpushとpull
schema.prismaファイルのモデルを変更した場合(新たなフィールドを追加した削除したり)に”prisma db push”コマンドを実行するとマイグレーションファイルの作成なしにデータベースのテーブルに変更を加えることができます。

```bash
npx prisma db push
```
modelのフィールド(テーブルの列)を変更(削除したい場合)にすでにその列にデータが入っている場合は変更によってデータロスにつながるので警告が表示されます。警告を無視して実行すると列が削除されるのでデータは消えます。

prisma db pullコマンドを実行した場合は既存のデータベースの状態をschema.prismaファイルに反映されせることができます。もし既存のデータベースが存在している場合にprisma db pullを利用することでスキーマを作成することができる便利な機能です。

```bash
npx prisma db pull
```

# マイグレーションによるSeeding

Seedingファイルを利用することでマイグレーションの実行時にテーブルにデータを挿入することができます。

prismaフォルダにseed.tsファイルを作成し1件のユーザ情報をテーブルに追加する処理を記述します。

```ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  });

  console.log({ alice });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

しかし実行するとエラーが発生します。TypeScriptに関係するエラーが発生しており、メッセージの中にエラーの解消方法が表示されているのでその指示に従ってpackage.jsonファイルを更新します。

```json
{
  "name": "nodejs-prisma",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "prisma": {
    "seed": "ts-node prisma/seed.ts"　//追加
  },
//略
}

```

```bash
 % npx prisma db seed
Environment variables loaded from .env
Running seed command `ts-node prisma/seed.ts` ...
{ alice: { id: 1, email: 'alice@prisma.io', name: 'Alice' } }

🌱  The seed command has been executed.
```