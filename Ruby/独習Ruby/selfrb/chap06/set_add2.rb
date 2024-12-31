require 'set'

sets = Set['鈴木',  '佐藤', '田中', '山本']

if sets.add?('山崎')
  puts '追加されました。'
else
  puts '追加されませんでした。'
end
p sets
