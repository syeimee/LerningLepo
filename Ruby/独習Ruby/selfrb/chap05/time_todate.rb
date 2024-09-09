require 'date'

dt  = Time.mktime(2020, 12, 4, 11, 35, 57)
dt2 = Date.new(2021, 8, 5)

puts dt.to_date
puts dt2.to_time
