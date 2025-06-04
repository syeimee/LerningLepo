#!/usr/bin/env ruby
require 'date'
require 'fileutils'

# == 日付フォルダの作成　===
date_dir = Date.today.strftime('%Y%m%d')

while true
  puts "作業ディレクトリ名を入力してください。"
  input = gets.chomp
  dir_name = "#{date_dir}_#{input}"
  memo_path = "#{dir_name}/memo.md"
  
  if Dir.exist?(dir_name)
    puts "#{dir_name}はすでに存在します。"
  else
    break;
  end
end

# == ディレクトリ構造の作成　===
FileUtils.mkdir_p("#{dir_name}/src")
FileUtils.mkdir_p("#{dir_name}/resources")

# === memo.md テンプレート内容 ===
template = <<~MARKDOWN
# 学習テーマ


## 日時
#{Time.now.strftime('%Y-%m-%d')}
## 目的・背景 



## 実装内容・学んだ技術  




## 課題・問題点  




## 気づき・改善案  




MARKDOWN

# === メモファイル作成 ===
File.write(memo_path, template)
puts "✔️ #{dir_name}を作成しました。"

# === このスクリプト自身を削除 ===
FileUtils.rm(__FILE__)