msg = '仕事用はwings@example.comです。'
ptn = /(?<localName>[a-z\d+\-.]+)@(?<domain>[a-z\d\-.]+\.[a-z]+)/i
puts msg.gsub(ptn, '\k<domain>の\k<localName>')
