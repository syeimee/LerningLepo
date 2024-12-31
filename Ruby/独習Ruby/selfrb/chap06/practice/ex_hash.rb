map = { cucumber: 'キュウリ', lettuce: 'レタス', carrot: 'ニンジン' }
map[:cucumber] = '胡瓜'
map.delete(:lettuce)
map.transform_keys! { |key| key[0..3] }
map.each do |k, v|
  puts "#{k}:#{v}"
end
