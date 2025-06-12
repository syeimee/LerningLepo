data = ['さくら', 'うめ', 'ききょう', '×', 'ぼたん']

data.each do |item|
  break if item == '×'
  # if item == '×'
  #   break
  # end
  puts item
end
