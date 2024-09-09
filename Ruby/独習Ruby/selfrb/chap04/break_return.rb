sum = 0

result = 101.times do |i|
  sum += i
  break i if sum > 1000
end

puts "合計が1000を超えるのは、1～#{result}を加算したときです。"
# puts "合計が1000を超えるのは、1～ #{i}を加算したときです。"
