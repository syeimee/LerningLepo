require 'set'

sets = Set['山崎', '佐藤', '田中', '山本']
sets.delete_if { |e| e.start_with?('山') }
p sets
