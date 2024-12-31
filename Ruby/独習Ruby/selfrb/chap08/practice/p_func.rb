def get_diamond(diagonal1, diagonal2)
  diagonal1 * diagonal2 / 2
end 

area = get_diamond(8, 10)
puts "菱形の面積は#{area}です。"
