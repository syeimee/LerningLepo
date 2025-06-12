msg = '仕事用はwings@example.comです。プライベート用はhome@example.comです。'
ptn = /([a-z\d+\-.]+)@([a-z\d\-.]+\.[a-z]+)/i
puts msg.gsub(ptn) { |match| match.upcase }
