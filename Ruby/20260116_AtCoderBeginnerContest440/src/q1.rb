inputs = gets.split(' ') 
x = inputs[0].to_i # ヘルツ
y = inputs[1].to_i # オクターブ

1.upto(y) do |i|
  x *= 2
end

puts x