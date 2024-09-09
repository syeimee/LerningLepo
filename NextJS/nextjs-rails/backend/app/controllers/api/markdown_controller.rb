require 'open-uri'
require 'nokogiri'
require 'json'

class Api::MarkdownController < ApplicationController
  def convert
    url = params[:url]
    return render json: { error: 'URLを入力してください。' }, status: :bad_request if url.blank?

    begin
      content = extract_content(url)
      markdown = clean_up_markdown(content)
      render json: {markdown: markdown}
    rescue OpenURI::HTTPError => e
      render json: { error: "URLの取得に失敗しました: #{e.message}" }, status: :unprocessable_entity
    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  private

  def extract_content(url)
    html = URI.open(url).read
    doc = Nokogiri::HTML(html)
    allowed_tags = %w[h1 h2 h3 h4 h5 h6 p em strong i b blockquote code img hr li ol ul table tr th td br figure]

    doc.css(allowed_tags.join(', ')).map do |element|
      case element.name
      when 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
        level = element.name[1].to_i  # 'h1'〜'h6' の数字部分を取得
        "#{'#' * level} #{element.content.strip} \n"  # Markdownのヘッダ形式に変換
      when 'img'
        element['alt'] ? "![#{element['alt']}](#{element['src']}) \n" : ''
      when 'a'
        "[#{element.content.strip}](#{element['href']}) \n"  # リンクのMarkdown形式
      when 'br'
        "\n"  # 改行
      else
        "#{element.content.strip} \n"  # その他のタグの処理
      end
    end.join("\n")
  end

  def clean_up_markdown(content)
    content
      .gsub(/[\n\t]+/, " \n ")  # 連続する改行やタブを単一の改行に置換
      .gsub(/\n{3,}/, " \n \n ")  # 3つ以上連続する改行を2つに
      .gsub(/^\s+|\s+$/, '')   # 行頭と行末の空白を削除
      .gsub(/\n +/, " \n ")      # 行頭のスペースを削除
      .strip  # 前後の空白を削除
  end
end