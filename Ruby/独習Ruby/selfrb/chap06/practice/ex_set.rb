require 'set'

sets1 = Set[2, 4, 8, 16, 32]
sets2 = sets1.select {|item| item < 20 }
p sets2
p sets1 - sets2
