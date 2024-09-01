msg = '仕事用はwings@example.comです。プライベート用はYAMA@example.comです。'
results = msg.scan(/[a-z\d+\-.]+        # local
                    @                   # delimiter
                    [a-z\d\-.]+\.[a-z]+ # domain
/ix)
# results = msg.scan(/[a-z\d+\-.]+(?# local)@(?# delimiter)[a-z\d\-.]+\.[a-z]+(?# domain)/i)
results.each do |result|
  puts result
end
