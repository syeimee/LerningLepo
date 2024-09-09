i = 0
sum = 0

loop do
  break if i > 100
  i += 1
  next if i % 2 != 0
  sum += i
end

puts "合計値は#{sum}です。"
