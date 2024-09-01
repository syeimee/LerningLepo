pos = 0
msg = '電話番号は000-999-9999です。携帯は080-2222-3333です！'
loop do
  result = /(\d{2,4})-(\d{2,4})-(\d{4})/.match(msg, pos)
  break unless result
  puts "マッチング文字列：#{result[0]}"
  puts "市外局番：#{result[1]}"
  puts "市内局番：#{result[2]}"
  puts "加入者番号：#{result[3]}"
  puts '------------------------'
  pos = result.end(0)
end
