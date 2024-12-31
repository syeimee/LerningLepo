require 'artii'
require 'colorize'

def flowing_ascii_art_with_snake(text, font: 'slant')
  artii = Artii::Base.new(font: font)
  ascii_art = artii.asciify(text)

  snake_ascii_art = <<~ASCII.split("\n")
    　 ＿＿
   　／・・＼
   　L_＿　 ｜
   ～～／　 /
    　￣| /  /|
    　　ヽ二二ノ
  ASCII

  ascii_art_lines = ascii_art.split("\n")
  max_text_width = ascii_art_lines.map(&:length).max
  max_snake_width = snake_ascii_art.map(&:length).max
  total_width = max_text_width + max_snake_width

  console_width = `tput cols`.to_i
  colors = [:red, :green, :yellow, :blue, :magenta, :cyan]

  20.times do |offset|
    ascii_art_lines.each_with_index do |line, index|
      # 画面の幅を超えないように調整
      left_part = (' ' * offset + line).slice(0, console_width)  # テキスト部分
      snake_part = snake_ascii_art[index] || ''                    # 蛇部分
      snake_display = (' ' * [offset - max_text_width, 0].max + snake_part).slice(0, console_width)  # 蛇部分

      puts left_part.colorize(colors.sample) + snake_display.colorize(colors.sample)
    end
  end
end

flowing_ascii_art_with_snake("Happy New Year 2025", font: 'slant')
