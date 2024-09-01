require 'time'
require 'date'

dt = Time.mktime(2021, 10, 5, 1, 23, 17)
d = Date.new(2021, 10, 5)
puts dt.httpdate
puts dt.iso8601
puts dt.rfc2822
puts dt.rfc822
puts d.iso8601
puts d.jisx0301
puts d.rfc2822
puts d.rfc3339 
puts d.rfc822
puts d.to_s
