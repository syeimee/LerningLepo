msg = '仕事用はwings@example.comです。プライベート用はYAMA@example.comです。'

results = msg.scan(/[a-z\d+\-.]+@[a-z\d\-.]+\.[a-z]+/i)
# results = msg.scan(/(?i)[a-z\d+\-.]+@[a-z\d\-.]+\.[a-z]+/)
# results = msg.scan(/(?i:[a-z\d+\-.]+@[a-z\d\-.]+\.[a-z]+)/)
# results = msg.scan(/[a-z\d+\-.]+(?i)@[a-z\d\-.]+\.[a-z]+/)
# results = msg.scan(/(?i:[a-z\d+\-.]+)@[a-z\d\-.]+\.[a-z]+/)
results.each do |result|
  puts result
end