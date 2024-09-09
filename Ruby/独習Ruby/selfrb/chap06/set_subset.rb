require 'set'

sets1 = Set[10, 13, 32]
sets2 = Set[15, 25, 37, 20]
sets3 = Set[25, 37]

p sets1.include?(15)
p sets3.subset?(sets2)
p sets3.proper_subset?(sets2)
p sets2.superset?(sets3)
p sets2.proper_superset?(sets3)
p sets1.intersect?(sets2)
p sets1.disjoint?(sets2)
# p sets1.include?(sets3)
