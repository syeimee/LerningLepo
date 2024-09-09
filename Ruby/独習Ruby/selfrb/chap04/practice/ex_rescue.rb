begin
  print '名前を教えてください：'
  name = gets.rstrip
  raise RangeError, '入力がありません。' if name == ''
  puts "こんにちは、#{name}さん！ "
rescue RangeError => ex
  puts "エラー発生：#{ex.message}"
  retry
end