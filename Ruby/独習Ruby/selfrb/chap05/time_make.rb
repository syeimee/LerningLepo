require 'date'

puts Time.mktime(2021, 6, 25, 11, 37, 25, 103)
puts Time.mktime(2021, 'Jul', 25, 11, 37, 25, 103)
# puts Time.mktime(2021, 13, 11)
puts Time.new(2021, 6, 25, 11, 37, 25, '+05:00')
puts Time.utc(2021, 6, 25, 11, 37, 25, 103)
puts Date.new(2021, 8, 5)
puts Date.new(2021, -1, -1)
