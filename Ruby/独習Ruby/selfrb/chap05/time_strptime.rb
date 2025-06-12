require 'time'
require 'date'

puts Time.strptime('2021年5月14日 11時37分40秒', '%Y年%m月%d日 %H時%M分%S秒')
puts Date.strptime('2021年5月14日', '%Y年%m月%d日')
