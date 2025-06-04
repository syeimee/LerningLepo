# 学習テーマ
Rubyで作業ディレクトリを自動生成するスクリプトを作成

## 目的・背景 
勉強用のリポジトリ管理が煩雑になり、いつ学習した内容なのかが不明確になってきたため、
日付つきディレクトリを生成するスクリプトを作成してみた。


## 実装内容・学んだ技術  
- Rubyでのディレクトリ操作
```ruby
Dir.exist?("hoge") # hogeというディレクトリが存在するか
Dir.mkdir(path)    # ディレクトリを1つ作成（親が必要）
Dir.entries(path)  # 指定ディレクトリ内の全ファイル名
Dir.glob("*.rb")   # パターンにマッチするファイルの一覧
Dir.pwd            # カレントディレクトリの取得
Dir.chdir(path)    # カレントディレクトリの移動
```

- Rubyでのファイル操作
```ruby
File.read(path)             # ファイルを全て読み込む
File.write(path, content)   # ファイルに文字列を書き込む
File.exist?(path)           #ファイルが存在するかチェック
File.size(path)             # ファイルサイズをバイト単位で返す
File.delete(path)           #ファイルを削除する
```

- FileUtilsによるファイル・ディレクトリ操作
```ruby
FileUtils.mkdir_p(path)    # mkdir -pのように親もまとめて作成
FileUtils.cp(src, dest)    # srcをdestにコピー
FileUtils.mv(src, dest)    # srcをdestに移動
FileUtils.rm(path)         # ファイルを削除
FileUtils.rm(__FILE__)     # 自身のファイルを削除　__FILE__は自身のファイルパスを示すrubyの組み込み定数
FileUtils.rm_r(path)       # ディレクトリを再帰的に削除
FileUtils.cd(path)         # カレントディレクトリの移動　
```

`#!/usr/bin/env ruby`は「シバン（shebang）」 と呼ばれる記述で

#! は「このファイルを実行するには、次のパスのプログラムを使ってね」という意味のシバン

/usr/bin/env は、環境変数 PATH に基づいて ruby を探して実行してくれるコマンド

ruby はその名のとおり、Rubyインタプリタ


## 課題・問題点  
Rubyをインストールしていない環境では使えない



## 気づき・改善案  
実行コマンドは`./create_study_dir.rb`



