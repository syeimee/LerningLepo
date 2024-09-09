msg = '電話番号は080-111-9999です！'
if /(\d{2,4})-(\d{2,4})-(\d{4})/ =~ msg
  puts "開始位置：#{$~.begin(0)}"
  puts "終了位置：#{$~.end(0)}"
  puts "開始前の文字列：#{$`}"
  puts "開始後の文字列：#{$'}"
  puts "マッチング文字列：#{$&}"
  puts "市外局番：#{$1}"
  puts "市内局番：#{$2}"
  puts "加入者番号：#{$3}"
else 
  puts '見つかりませんでした！'
end

# puts Regexp.last_match[0]
