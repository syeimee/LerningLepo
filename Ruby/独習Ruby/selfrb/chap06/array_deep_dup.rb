require 'active_support'
require 'active_support/core_ext'

data = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
] 

data2 = data.deep_dup
data2[0][0] = 1000
p data
p data2
