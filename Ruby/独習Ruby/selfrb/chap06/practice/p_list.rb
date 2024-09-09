data1 = [10, 15, 30]
data2 = [60, 90]
data1.shift
data1.push(50)
data1.insert(1, 20)
data3 = data1 + data2
data3.each_with_index do |value, index|
  puts "#{index}:#{value}"
end
