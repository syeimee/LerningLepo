require 'time'
require 'date'

puts Time.httpdate('Tue, 05 Oct 2021 01:23:17 GMT')
puts Time.iso8601('2021-10-05T01:23:17+09:00')
puts Time.rfc2822('Tue, 5 Oct 2021 01:23:17 +0900')
puts Time.rfc822('Tue, 5 Oct 2021 01:23:17 +0900')
puts Date.iso8601('2021-10-05T01:23:17+09:00')
puts Date.jisx0301('R03.10.05')
puts Date.rfc2822('Tue, 5 Oct 2021 01:23:17 +0900')
puts Date.rfc3339('2021-10-05T01:23:17+09:00')
puts Date.rfc822('Tue, 5 Oct 2021 01:23:17 +0900')
