data = "住所は〒160-0000 新宿区南町0-0-0です。\nあなたの住所は〒210-9999 川崎市北町1-1-1ですね"
results = data.scan(/\d{3}-\d{4}/)
results.each do |result|
  puts result
end
