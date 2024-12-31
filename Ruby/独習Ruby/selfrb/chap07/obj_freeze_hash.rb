APP = {
  name: '独習Ruby',
  author: 'WINGS Project',
  platform: ['Windows', 'macOS']
}.freeze

# APP = {
#   name: '独習Ruby',
#   author: 'WINGS Project',
#   platform: ['Windows', 'macOS']
# }.each_value(&:freeze).freeze

APP[:name].upcase!
APP[:platform][0] = 'うぃんどうす'
p APP
