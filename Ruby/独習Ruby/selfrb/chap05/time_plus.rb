require 'date'

dt = Time.mktime(2021, 6, 25, 11, 37, 25, 103)
puts dt + (3 * 60 * 60)
puts dt - (3 * 60 * 60 * 24 * 7)

d = Date.new(2021, 11, 10)
puts d + 10
puts d - 10
puts d << 2
puts d >> 1
