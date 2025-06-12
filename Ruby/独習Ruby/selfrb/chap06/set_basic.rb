require 'set'

sets = Set['山田', '田中', '鈴木']
p sets
sets2 = Set.new(['山田', '田中', '鈴木', '山田'])
p sets2
sets3 = Set.new([15, 31, 35, 38]) { |e| e % 3 }
puts sets3

# p ['山田', '田中', '鈴木', '山田'].uniq
