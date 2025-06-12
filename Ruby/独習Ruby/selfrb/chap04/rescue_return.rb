result = begin
  'begin'
  # 1 / 0
rescue
  'rescue'
else
  'else'
ensure
  'ensure'
end
puts result
