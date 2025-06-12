require 'set'

sets = Set['鈴木',  '佐藤', '田中', '山本']
sets.add('伊藤')
sets.add('田中')
p sets

sets.delete('山本')

sets.each do |e|
  p e
end

p sets.first
p sets.length

sets.clear
p sets
