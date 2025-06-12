require 'set'

sets1 = Set[1, 20, 30, 60, 10, 15]
sets2 = Set[10, 15, 30, 35]
sets3 = Set[20, 40, 60]
p sets1 + sets2
p sets1 | sets2
p sets1 + sets2 + sets3
p sets1 - sets2
p sets1 - (sets2 + sets3)
p sets1 & sets2
p sets1 & sets2 & sets3
p sets1 ^ sets3

# p sets1.union(sets2)
