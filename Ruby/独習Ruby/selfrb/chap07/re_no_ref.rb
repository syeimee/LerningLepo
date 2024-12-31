msg = '仕事用はwings@example.comです。プライベート用はYAMA@example.comです。'
# results = msg.scan(/([a-z\d+\-.]+)@([a-z\d\-]+(\.[a-z]+)*)/i)
results = msg.scan(/([a-z\d+\-.]+)@([a-z\d\-]+(?:\.[a-z]+)*)/i)
results.each do |result|
  puts result
  puts '--------------'
end
