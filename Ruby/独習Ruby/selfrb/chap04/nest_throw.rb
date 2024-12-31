output = catch :nest do
  1.upto(9) do |i|
    1.upto(9) do |j|
      result = i * j
      throw :nest, result if result > 50
      print "#{result} "
    end
    puts
  end
end

puts
puts "#{output}で終了しました。"
