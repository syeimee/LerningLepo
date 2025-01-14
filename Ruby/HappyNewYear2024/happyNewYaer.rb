require 'artii'
require 'colorize'

def flowing_ascii_art_with_snake(text, font: 'slant')
  artii = Artii::Base.new(font: font)
  ascii_art = artii.asciify(text)

  snake_ascii_art = <<~ASCII
    　 ＿＿
   　／・・＼
   　L_＿　 ｜
   ～～／　 /
    　￣| /  /|
    　　ヽ二二ノ
  ASCII
  snake_ascii_art = snake_ascii_art.split("\n")

  ascii_art_lines = ascii_art.split("\n")
  max_text_width = ascii_art_lines.map(&:length).max
  console_width = `tput cols`.to_i
  colors = [:red, :green, :yellow, :blue, :magenta, :cyan]

  loop do
    (0..console_width + max_text_width).each do |offset|
      system('clear') # 画面をクリア
      ascii_art_lines.each_with_index do |line, index|
        # メッセージ部分をスライドさせる
        left_part = (' ' * [console_width - offset, 0].max + line).slice(0, console_width)
        puts left_part.colorize(colors.sample)
      end

      # 蛇をメッセージの最後の行に追従させる
      snake_offset = [console_width - offset, 0].max
      snake_ascii_art.each_with_index do |snake_line, index|
        snake_line_display = (' ' * snake_offset + snake_line).slice(0, console_width)
        puts snake_line_display.colorize(colors.sample)
      end

      sleep(0.05) # アニメーションの速度を調整
    end
  end
end

flowing_ascii_art_with_snake("Happy New Year 2025", font: 'slant')


