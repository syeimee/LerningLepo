begin
  print '数字を入力してください：'
  num = Float(gets)
  puts "平方根は... #{Math.sqrt(num)}"
rescue Math::DomainError => ex
  puts "エラー発生： #{ex.message}"
end
