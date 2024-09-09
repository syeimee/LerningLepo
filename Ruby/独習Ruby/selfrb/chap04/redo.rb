loop do
  print '名前を教えてください：'
  name = gets.rstrip
  # name = gets.encode('UTF-8', 'Windows-31J', invalid: :replace, replace: '').rstrip
  redo if name == ''
  puts "こんにちは、#{name}さん！"
  break
end
