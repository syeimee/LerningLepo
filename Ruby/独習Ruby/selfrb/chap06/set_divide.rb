require 'set'

sets = Set[1, 6, 11, 30, 23, 10]
p d_sets = sets.divide { |e| e % 3 }
