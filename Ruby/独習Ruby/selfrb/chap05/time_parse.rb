require 'time'
require 'date'

puts Time.parse('2021/5/14 11:37:40')
puts Time.parse('2021-5-14 11:37:40')
puts Time.parse('2021/05')
puts Time.parse('20210514 113740')
puts Time.parse('Sat, 4 Dec 2021 11:37:11 +05:00')
puts Time.parse('S50.12.13')
puts Time.parse('12:15')
puts Time.parse('12:15', Time.mktime(2025, 8, 6))
puts Date.parse('2021-06-25 11:37:40')
puts Date.parse('20210625')
