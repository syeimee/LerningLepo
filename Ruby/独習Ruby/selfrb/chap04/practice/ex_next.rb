sum= 0

(100..200).each do |i|
  next if  i % 2 == 0
  sum += i
end

puts "合計値は#{sum}です。"
