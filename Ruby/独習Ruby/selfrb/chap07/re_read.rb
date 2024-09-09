def show_match(msg, reg)
  results = msg.scan(reg)
  results.each do |result|
    puts result
  end
  puts '------------------------------'
end

reg1 = /いろ(?=はに)/
reg2 = /いろ(?!はに)/
reg3 = /(?<=。)いろ/
reg4 = /(?<!。)いろ/
msg1 = 'いろはにほへと'
msg2 = 'いろものですね。いろいろと'

show_match(msg1, reg1)
show_match(msg2, reg1)
show_match(msg1, reg2)
show_match(msg2, reg2)
show_match(msg1, reg3)
show_match(msg2, reg3)
show_match(msg1, reg4)
show_match(msg2, reg4)
