msg = '電話番号は000-999-9999です。携帯は080-2222-3333です！'
results = msg.scan(/((\d{2,4})-(\d{2,4})-(\d{4}))/)
results.each do |result|
  puts "マッチング文字列：#{result[0]}"  
  puts "市外局番：#{result[1]}"
  puts "市内局番：#{result[2]}"
  puts "加入者番号：#{result[3]}"
  puts '------------------------'
end

# p msg.scan(/\d{2,4}-\d{2,4}-\d{4}/)
