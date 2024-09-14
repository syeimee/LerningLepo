require 'open-uri'
require 'nokogiri'
require 'kramdown'

class Api::MarkdownController < ApplicationController

  # URLからHTMLコンテンツを取得し、Markdown記号を埋め込んだHTMLとしてJSONレスポンスとして返す。
  #
  # @return [JSON] JSON形式で変換後のMarkdownコンテンツまたはエラーメッセージを返す。
  #
  def convert
    url = params[:url]
    return render json: { error: 'URLを入力してください。' }, status: :bad_request if url.blank?

    begin
      html = display_markdown(url)
      markdown = convert_markdown(url)
      # content = extract_content(url)
      # html = convert_markdown_to_html(content)
      render json: { html: html ,markdown: markdown}
    rescue OpenURI::HTTPError => e
      render json: { error: "URLの取得に失敗しました: #{e.message}" }, status: :unprocessable_entity
    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  private

  # 指定されたURLからHTMLを抽出し、許可されたHTMLタグにMD記号を埋め込む(view表示用)。
  #
  # @param url [String] HTMLコンテンツを取得するためのURL。
  # @return [String] MD記号を埋め込んだHTMLをdivでラップして返す。
  #
  def display_markdown(url)
    html = URI.open(url).read
    doc = Nokogiri::HTML(html)
    allowed_tags = %w[ul li h1 h2 h3 h4 h5 h6 p em strong i b blockquote code img hr table tr th td br figure a]
    
    content = doc.css(allowed_tags.join(', ')).map do |element|
      cleaned_element = clean_element(element)
      
      case element.name
      when 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
        level = element.name[1].to_i
        "\n\n#{cleaned_element.to_html.sub('>', ">#{('#' * level)} ")}"
      when 'li'
        "\n\n#{cleaned_element.to_html.sub('>', "> - ")}"
      when 'p'
        text = cleaned_element.inner_html.gsub(/<code>(.*?)<\/code>/, '`\1`')
        "\n\n<p>#{text}</p>"
      when 'blockquote'
        "\n\n#{cleaned_element.to_html.sub('>', '>> ')}"
      when 'img'
        alt_text = element['alt'] || 'Image'
        "[Image: #{alt_text}]"
      end
    end.join
  
    "<div class='markdown-content'>#{content}</div>"
  end

  # 指定されたURLからHTMLを抽出し、許可されたHTMLタグにMD記号を埋め込む(view表示用)。
  #
  # @param url [String] HTMLコンテンツを取得するためのURL。
  # @return [String] MD記号を埋め込んだHTMLをdivでラップして返す。
  #
def convert_markdown(url)
  html = URI.open(url).read
  doc = Nokogiri::HTML(html)
  allowed_tags = %w[ul li h1 h2 h3 h4 h5 h6 p em strong i b blockquote code img hr table tr th td br figure a]

  markdown_content = doc.css(allowed_tags.join(', ')).map do |element|
    cleaned_element = clean_element(element)
    case element.name
    when 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
      level = element.name[1].to_i
      "#{'#' * level} #{cleaned_element.inner_text.strip}"
    when 'li'
      "- #{cleaned_element.inner_text.strip}"
    when 'p'
      text = cleaned_element.inner_html.gsub(/<code>(.*?)<\/code>/, '`\1`')
      "#{text}"
    when 'blockquote'
      "> #{cleaned_element.inner_text.strip}"
    when 'img'
      alt_text = element['alt'] || 'Image'
      "![#{alt_text}](#{element['src']})"
    when 'hr'
      "\n---\n"
    end
  end.join("\n")

  markdown_content
end


  # HTML要素から不要な属性を削除する。
  #
  # @param element [Nokogiri::XML::Element] クリーンアップするHTML要素。
  # @return [Nokogiri::XML::Element] 不要な属性が削除されたHTML要素。
  #
  def clean_element(element)
    case element.name
    when 'a'
      element.attributes.each { |attr, _| element.remove_attribute(attr) unless ['href'].include?(attr) }
    when 'img'
      element.attributes.each { |attr, _| element.remove_attribute(attr) unless ['src', 'alt'].include?(attr) }
    else
      element.attributes.each { |attr, _| element.remove_attribute(attr) }
    end
    element
  end

  # Markdown形式のコンテンツをHTML形式に変換する。
  #
  # @param content [String] 変換するMarkdownコンテンツ。
  # @return [String] 変換されたHTMLコンテンツ。
  #
  def convert_markdown_to_html(content)
    Kramdown::Document.new(content).to_html
  end
end