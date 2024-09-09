msg = '電話番号は080-111-9999です！'
/(\d{2,4})-(\d{2,4})-(\d{4})/.match(msg) {|result|
  puts "市外局番：#{result[1]}"
  puts "市内局番：#{result[2]}"
  puts "加入者番号：#{result[3]}"
}
