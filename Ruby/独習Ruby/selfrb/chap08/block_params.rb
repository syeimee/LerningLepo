def walk_array(list)
  for item in list
    yield item
  end
end

data = [1, 3, 5, 7, 9]
walk_array(data) do |item|
  puts "[#{item}]"
end
