loop do
  print '名前を教えてください：'
  name = gets.rstrip
  redo if name == ''
  puts "こんにちは、#{name}さん！"
  break
end
