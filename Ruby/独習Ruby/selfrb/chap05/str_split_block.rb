msg = 'ねこ,いぬ,たぬき'

msg.split(',') do |substr|
  puts "こんにちは、#{substr}です。"
end
