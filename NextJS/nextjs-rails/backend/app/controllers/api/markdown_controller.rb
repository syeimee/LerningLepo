require 'open-uri'
require 'nokogiri'
require 'kramdown'

class Api::MarkdownController < ApplicationController
  def convert
    url = params[:url]
    return render json: { error: 'URLを入力してください。' }, status: :bad_request if url.blank?

    begin
      content = extract_content(url)
      html = convert_markdown_to_html(content)
      render json: { html: html }
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

  def convert_markdown_to_html(content)
    Kramdown::Document.new(content).to_html
  end
end