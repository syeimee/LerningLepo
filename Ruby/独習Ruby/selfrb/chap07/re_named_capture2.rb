msg = '電話番号は080-111-9999です！'
if /(?<area>\d{2,4})-(?<city>\d{2,4})-(?<local>\d{4})/ =~ msg
  puts "市外局番：#{area}"
  puts "市内局番：#{city}"
  puts "加入者番号：#{local}"
end
