1.upto(9) do |i|
  1.upto(9) do |j|
    result = i * j
    break if result > 50
    print "#{result} "
  end
  puts
end
