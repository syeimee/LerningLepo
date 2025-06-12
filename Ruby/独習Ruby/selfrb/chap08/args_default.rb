def get_triangle(base = 5, height = 1)
  base * height / 2.0
end

puts "三角形の面積は#{get_triangle}です。"
puts "三角形の面積は#{get_triangle(10)}です。"
puts "三角形の面積は#{get_triangle(10, 5)}です。"
