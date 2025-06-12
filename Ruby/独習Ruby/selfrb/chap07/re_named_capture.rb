msg = '電話番号は080-111-9999です！'
/(?<area>\d{2,4})-(?<city>\d{2,4})-(?<local>\d{4})/.match(msg) {|result|
  puts "市外局番：#{result[:area]}"
  puts "市内局番：#{result[:city]}"
  puts "加入者番号：#{result[:local]}"
}
