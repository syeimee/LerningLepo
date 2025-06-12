title = 'あいうえおかきくけこ'

puts title.slice(2)
puts title.slice(2, 3)
puts title.slice(-2)
puts title.slice(-2, 3)
puts title.slice(2..5)
puts title.slice(2...5)
puts title.slice(2..)
puts title.slice(..5)
puts title.slice('えおか')
puts title.slice('さしす')
puts title.slice(/[う-お]{2,}/)