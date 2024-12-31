msg = '電話番号は080-111-9999です！'
if result = /(\d{2,4})-(\d{2,4})-(\d{4})/.match(msg)
# if result = msg.match(/(\d{2,4})-(\d{2,4})-(\d{4})/)
  puts "開始位置：#{result.begin(0)}"
  puts "終了位置：#{result.end(0)}"  
  puts "開始前の文字列：#{result.pre_match}"
  puts "開始後の文字列：#{result.post_match}"
  puts "マッチング文字列：#{result[0]}"
  puts "市外局番：#{result[1]}"
  puts "市内局番：#{result[2]}"
  puts "加入者番号：#{result[3]}"
else 
  puts "見つかりませんでした！"
end

# puts msg.slice(/\d{2,4}-\d{2,4}-\d{4}/)
