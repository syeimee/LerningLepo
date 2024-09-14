require 'active_support'
require 'active_support/core_ext'

dt = Time.mktime(2021, 6, 25, 11, 37, 25, 103)
puts dt + 3.hours + 20.minutes
puts dt - 3.weeks
