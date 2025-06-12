# 学習テーマ
作業日時: 2025-06-11


## 目的・背景 
ubuntuでapache tomcatを入れて簡単なアプリを作ってみる

Ubuntu Server 24.04.2 LTS

## 実装内容・学んだ技術  
- virtual boxでubuntuのisoを取り込んで、仮想マシンを構築する
実機にインストールする場合は以下の手順となります。

”Welcome”で”English”を選択して先へ進みます
”Keyboard configuration”で”Japanese”を選択して先へ進みます
”Choose the type of installation”は変更せず先へ進みます
”Network configuration”は変更せず先へ進みます
”Proxy ”で”configuration”は変更せず先へ進みます
”Ubuntu archive mirror ”は変更せず先へ進みます
”Guided storage configuration”は変更せず先へ進みます
”Storage configuration”は変更せず先へ進みます
”Are you sure you want to continue”で”Continue”を選択し先へ進みます
”Profile configuration”で名前、サーバー名、ログイン名、パスワードを入力して先へ進みます
”Upgrade to Ubuntu Pro”は変更せず先へ進みます
”SSH configuration”で”Install OpenSSH server”を選択し先へ進みます
”Featured server snaps”で何も選択せず先へ進みます
”Reboot Now”を選択して再起動します

- tomcatのインストール
```bash
wget https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.62/bin/apache-tomcat-9.0.62.tar.gz
```

解凍
```bash
tar -xvzf apache-tomcat-9.0.62.tar.gz
```

- tomcatの起動

```bash
cd apache-tomcat-9.0.62  # バージョン番号は実際に表示された名前に合わせて
cd bin
./startup.sh
```


ゲストIPの確認
```bash
ip a # ip addressの意味
```

ポートフォワーディング設定
VirtualBoxの設定 → 「ネットワーク」 → 「アダプター1」 → 「詳細」 → 「ポートフォワーディング」を開き、以下を追加：

```bash
名前	     プロトコル	ホストIP	ホストポート	ゲストIP	ゲストポート
tomcat8080	TCP	     127.0.0.1	 8080	       10.0.2.15  8080
```
ブラウザで`http://<UbuntuのIPアドレス>:8080`で起動確認

- teraterm/winscpの設定(SSH接続)
```bash
sudo apt install openssh-server
```

ネットワーク設定：NAT + ポートフォワーディング
VirtualBox の設定 → ネットワーク → アダプター1 を「NAT」にする。

「詳細」→「ポートフォワーディング」を開いて以下のように設定：

```bash
名前	プロトコル	ホストIP	ホストポート	ゲストIP	ゲストポート
SSH	    TCP	     127.0.0.1	 2222		              22
```

```bash
sudo systemctl start ssh
```


## 課題・問題点  
apacheのアプリケーションを作ってみる



## 気づき・改善案  
apacheとはリバースプロキシの役割をもつWebサーバー
railsでいうとこのnginx

tomcatだけだと処理を捌けない

### 🌐 Tomcatとは？

## ✅ Tomcatって何？

- **正式名称**：Apache Tomcat  
- **分類**：アプリケーションサーバ（Webコンテナ／サーブレットコンテナ）  
- **用途**：Java Servlet を動かすためのソフト  
- **補足**：簡易的なWebサーバとしての機能も持っている  

---

## ❓ここで湧く疑問

- Apache は Webサーバ用のソフト  
- Tomcat も簡易的な Webサーバの機能を持っている  

> **だったら Tomcat だけで良くない？！**

---

# 🔍 図解で理解する Tomcat と Apache の役割

## 【全体図から分かること】

- クライアントは **Webサーバ（Apache）** にリクエストを送る  
- Apache は **Tomcat** へ必要な処理を渡す（Webアプリ実行環境）  
- Tomcat の内部で Java が動き、DB をたたいたりテンプレートを作成する  
- ※ **Tomcatが直接DBをたたくわけではない**

<img src="./resources/image.png" alt="全体構成図">

---

# 🤔「Tomcatだけでよくない？」の疑問を深掘り

## 2. Apacheがないとどうなるのか？

**登場人物で例えると：**  
- **ホール担当のバイト：Apache**  
- **ホールもキッチンもできるオーナー：Tomcat**

### ✅ 少々のリクエスト＆レスポンスなら対応可能

<img src="./resources/image copy.png" alt="少量のリクエスト対応">

<img src="./resources/image copy 5.png" alt="404エラー：メニューにない注文">

- Tomcat 単体でも少量の処理なら対応可能  
- メニューに無い注文（存在しないページ）には 404 エラーを返せる  

---

### ❌ 大量のリクエストが来たら？

<img src="./resources/image copy 2.png" alt="大量アクセスによる負荷">

- Tomcat に負荷が集中し、レスポンス遅延やダウンの原因になる

---

## 3. Apache を入れるとどうなるか？

<img src="./resources/image copy 3.png" alt="Apache導入のメリット">

- 設定の柔軟性・拡張性が高くなる  
- 静的コンテンツ（HTML/CSS/JS）の高速化  
- Tomcat の負荷を軽減できる  
> ※ 条件によっては Tomcat 単体の方が速いケースもある

---

## 4. エラーコードを図で理解する

### 【404 Not Found】〜クライアント側に問題あり〜

<img src="./resources/image copy 4.png" alt="404エラーの例">

- Apache にリソースがないときに表示される  
- クライアントのリクエストが不正な場合

---

### 【500 Internal Server Error】〜サーバ側に問題あり〜

<img src="./resources/image copy 6.png" alt="500エラーの例">

- サーバ内部で処理中に問題が発生した場合に表示される  

---

# ⚙️ Apache vs Nginx の使い分け

| 特徴 | Apache | Nginx |
|------|--------|-------|
| アクセス急増時の負荷 | 急激に増加 | 緩やかに増加 |
| Webサーバーの動き | 遅くなりやすくダウンしやすい | 処理速度維持・ダウンしにくい |
| 駆動方式 | マルチプロセス | イベント駆動（シングルスレッド） |
| 向いているケース | 負荷が低く、シンプルな構成 | 高負荷・高スケーラビリティ・静的コンテンツ配信 |

---

## ✅ 選び方のポイント

**Nginxを選ぶ場合：**
- 負荷が高く、スケーラビリティが必要な場合
- 静的ページに同時多数アクセスが想定される場合  
> ※ CPUリソースが多く必要な処理は不向き

**Apacheを選ぶ場合：**
- 負荷が低い
- 簡単な構成・早期導入が目的
- 同時アクセス数が少なく、単純なリクエストが多い場合

---
